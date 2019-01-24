import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import Container from '../components/Container/Container';
import TextBox from '../components/TextBox/TextBox';
import ActionPanel from '../components/ActionPanel/ActionPanel';
import Alert from '../components/Alert/Alert';
import getCharacterCount from '../helpers/getCharacterCount';
import formatXmlString from '../helpers/formatXmlString';
import capitaliseSentence from '../helpers/capitaliseSentence';
import {
  saveToLocalStorage,
  fetchFromLocalStorage
} from '../helpers/local-storage';
import {
  LABEL_XML_TEMPLATE,
  LOCAL_STORAGE_KEY,
  VOICE_COMMANDS
} from '../constants';

const sanitizeHtml = require('sanitize-html');

const IndexPage = () => {
  let recognition = null;
  let ignoreRecordingEndEvent = false;
  let label = null;
  let printerName = '';

  const [canRecord, setCanRecord] = useState(false);
  const [recording, setRecording] = useState(false);
  const [printerFound, setPrinterFound] = useState(false);
  const [recordingError, setRecordingError] = useState('');
  const [comment, setComment] = useState(
    fetchFromLocalStorage(LOCAL_STORAGE_KEY) || ''
  );

  /****************************************************
   ***** LIFECYCLE ************************************
   ****************************************************/

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      setCanRecord(true);
      initSpeechRecognition();
    }

    initPrinterSetup();
  }, []);

  useEffect(() => {
    saveToLocal();
  }, [comment]);

  /****************************************************
   ***** HELPERS **************************************
   ****************************************************/

  const saveToLocal = () => {
    saveToLocalStorage({
      key: LOCAL_STORAGE_KEY,
      value: comment
    });
  };

  /****************************************************
   ***** DYMO LABEL PRINTER API ***********************
   ****************************************************/

  const constructLabel = () => {
    label = window.dymo.label.framework.openLabelXml(LABEL_XML_TEMPLATE);
  };

  const getPrinterName = () => {
    window.dymo.label.framework
      .getPrintersAsync()
      .then(printers => {
        // For simplicity, just grab the first compatible printer we find
        const firstPrinter = printers.find(
          ({ printerType }) => printerType === 'LabelWriterPrinter'
        );

        if (firstPrinter && firstPrinter.isConnected && firstPrinter.name) {
          setPrinterFound(true);
          printerName = firstPrinter.name;
        }
      })
      .thenCatch(error => {
        // Handle errors using DYMO's weird non-standard `thenCatch` method
        console.error(error);
      });
  };

  const printLabel = () => {
    if (!label) return;

    const formattedComment = formatXmlString(comment);
    const cleanedComment = sanitizeHtml(formattedComment, {
      // Allow only the HTML tags that are valid in the DYMO label XML
      allowedTags: ['br', 'b', 'i', 'u']
    });
    const labelSet = new window.dymo.label.framework.LabelSetBuilder();
    const textMarkup = `<font size="14">${cleanedComment}</font>`;
    labelSet.addRecord().setTextMarkup('COMMENT', textMarkup);

    label.print(printerName, null, labelSet.toString());
  };

  const initPrinterSetup = () => {
    if (!window.dymo) return;

    if (process.env.NODE_ENV !== 'production') {
      window.dymo.label.framework.trace = 1; // Enable debug for development
    }

    window.dymo.label.framework.init(() => {
      constructLabel();
      getPrinterName();
    });
  };

  /****************************************************
   ***** SPEECH RECOGNITION API ***********************
   ****************************************************/

  const initSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

    /**
     * 1. Recognition will continue while the user is silent.
     * 2. Interim results will not be emitted while recognition occurs.
     *    This means the `onresult` callback will only fire once the
     *    final interpreted transcript is returned.
     */
    recognition.lang = 'en-UK';
    recognition.continuous = true; /* [1] */
    recognition.interimResults = false; /* [2] */

    // Bind event handlers
    recognition.onstart = onRecordingStart;
    recognition.onresult = onRecordingResult;
    recognition.onend = onRecordingEnd;
    recognition.onerror = onRecordingError;
  };

  const commandIssued = word => VOICE_COMMANDS[word];

  const handleCommand = word => {
    if (word === VOICE_COMMANDS.break) {
      setComment(comment => `${comment}<br>`);
      return;
    }

    if (word === VOICE_COMMANDS.print) {
      printLabel();
    }

    // We want to stop recognition for both "stop" and "print" commands
    recognition.stop();
  };

  const onRecordingStart = () => {
    setRecording(true);
    setRecordingError(''); // Reset any errors from the previous recording
  };

  const onRecordingEnd = () => {
    if (ignoreRecordingEndEvent) {
      recognition.start();
      return;
    }

    setRecording(false);
  };

  const onRecordingResult = ({ results }) => {
    let finalTranscript = '';
    const lastWord = results[results.length - 1][0].transcript
      .trim()
      .toLowerCase();

    /**
     * If the user issues a "stop" or "print" command we handle the
     * action and then return, to prevent the command from being appended
     * to the printed comment.
     */
    if (commandIssued(lastWord)) {
      handleCommand(lastWord);
      return;
    }

    Object.values(results).forEach(result => {
      finalTranscript = comment + result[0].transcript;
    });

    /**
     * The casing of the generated transcript can be a bit wayward, so
     * we format it before setting state to avoid the user having to
     * manually correct missing/incorrect capitalisation.
     */
    setComment(capitaliseSentence(finalTranscript));
  };

  const onRecordingError = ({ error }) => {
    if (
      error === 'no-speech' ||
      error === 'audio-capture' ||
      error === 'not-allowed'
    ) {
      ignoreRecordingEndEvent = true;
      return;
    }

    setRecordingError(error);
    setRecording(false);
  };

  /****************************************************
   ***** EVENT HANDLERS *******************************
   ****************************************************/

  const handleChange = html => {
    setComment(html);
  };

  const handleClear = () => {
    setComment('');
    saveToLocal(); // Clear the cached comment
  };

  const handleFocus = () => {
    if (recognition && recording) {
      /**
       * The user's expressed an intent to edit the recorded comment, so we
       * stop recording to ensure there's no conflicting updates.
       */
      recognition.stop();
    }
  };

  const handlePrint = () => {
    printLabel();
  };

  const handleRecord = () => {
    if (!recognition) return;

    ignoreRecordingEndEvent = false;

    if (!recording) {
      recognition.start();
    } else {
      recognition.stop();
    }
  };

  const actions = {
    clear: {
      handler: handleClear,
      disable: recording || !comment.length
    },
    print: {
      handler: handlePrint,
      disable:
        recording ||
        !comment.length ||
        getCharacterCount(comment) < 0 ||
        !printerFound
    },
    record: {
      handler: handleRecord,
      disable: !canRecord
    }
  };

  return (
    <Layout>
      <Container>
        <React.Fragment>
          {recordingError && (
            <Alert message={recordingError} appearance="error" />
          )}
          {!printerFound && (
            <Alert
              message="No DYMO label printers found. Please connect a DYMO printer"
              appearance="warning"
            />
          )}

          <TextBox
            text={comment}
            characterCount={getCharacterCount(comment)}
            onChange={handleChange}
            onFocus={handleFocus}
          />

          <ActionPanel actions={actions} isRecording={recording} />
        </React.Fragment>
      </Container>
    </Layout>
  );
};

export default IndexPage;
