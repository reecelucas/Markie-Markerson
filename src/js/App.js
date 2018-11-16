import React from 'react';
import Container from './components/Container/Container';
import TextBox from './components/TextBox/TextBox';
import ActionPanel from './components/ActionPanel/ActionPanel';
import Alert from './components/Alert/Alert';
import { saveToLocalStorage, fetchFromLocalStorage } from './helpers/local-storage';
import {
  AUTO_SAVE_INTERVAL,
  CHAR_LIMIT,
  LABEL_XML_TEMPLATE,
  LOCAL_STORAGE_KEY,
  VOICE_COMMANDS
} from './constants';

export default class App extends React.Component {
  intervalId = null;
  recognition = null;
  ignoreRecordingEndEvent = false;
  label = null;
  printerName = '';

  state = {
    canRecord: false,
    recording: false,
    printerFound: false,
    comment: fetchFromLocalStorage(LOCAL_STORAGE_KEY) || ''
  };

  /****************************************************
   ***** LIFECYCLE ************************************
   ****************************************************/

  componentDidMount() {
    if ('webkitSpeechRecognition' in window) {
      this.setState({ canRecord: true });
      this.initSpeechRecognition();
    }

    this.initPrinterSetup();
    this.initAutoSave();
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  /****************************************************
   ***** HELPERS **************************************
   ****************************************************/

  saveToLocal = () => {
    saveToLocalStorage({
      key: LOCAL_STORAGE_KEY,
      value: this.state.comment
    });
  };

  initAutoSave = () => {
    this.intervalId = window.setInterval(() => {
      this.saveToLocal();
    }, AUTO_SAVE_INTERVAL);
  };

  getCharacterCount = () => {
    /**
     * Remove HTML tags from the comment string, since we don't
     * want these included in the character count. We could use
     * the DOM here (https://tinyurl.com/ydy6s7r9), but we'd need to
     * sanitize the input, and the DOM is pretty slow for this use case.
     */
    const cleanComment = this.state.comment.replace(/(<([^>]+)>)/gi, '');
    return CHAR_LIMIT - cleanComment.length;
  };

  /****************************************************
   ***** DYMO LABEL PRINTER API ***********************
   ****************************************************/

  constructLabel = () => {
    this.label = window.dymo.label.framework.openLabelXml(LABEL_XML_TEMPLATE);
  };

  getPrinterName = () => {
    // Get printer. For simplicity just use the first LabelWriter printer
    const printers = window.dymo.label.framework.getPrinters();
    const firstPrinter = printers.find(({ printerType }) => printerType === 'LabelWriterPrinter');

    if (firstPrinter && firstPrinter.name) {
      this.setState({ printerFound: true });
      this.printerName = firstPrinter.name;
    }
  };

  printLabel = () => {
    if (!this.label) {
      return;
    }

    this.label.setObjectText('Comment', this.state.comment);
    this.label.print(this.printerName);
  };

  initPrinterSetup = () => {
    if (!window.dymo) {
      return;
    }

    this.constructLabel();
    this.getPrinterName();
  };

  /****************************************************
   ***** SPEECH RECOGNITION API ***********************
   ****************************************************/

  initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    /**
     * 1. Recognition will continue while the user is silent.
     * 2. Interim results will not be emitted while recognition occurs.
     */
    this.recognition.lang = 'en-UK';
    this.recognition.continuous = true; /* [1] */
    this.recognition.interimResults = false; /* [2] */

    // Bind event handlers
    this.recognition.onstart = this.onRecordingStart;
    this.recognition.onresult = this.onRecordingResult;
    this.recognition.onend = this.onRecordingEnd;
    this.recognition.onerror = this.onRecordingError;
  };

  commandIssued = word => VOICE_COMMANDS[word];

  handleCommand = word => {
    // We want to stop recognition for both "stop" and "print" commands
    this.recognition.stop();

    if (word === VOICE_COMMANDS.print) {
      this.printLabel();
    }
  };

  onRecordingStart = () => {
    this.setState({ recording: true });
    this.ignoreRecordingEndEvent = false;
  };

  onRecordingEnd = () => {
    if (this.ignoreRecordingEndEvent) {
      return;
    }

    this.setState({ recording: false });
  };

  onRecordingResult = ({ results }) => {
    let finalTranscript = '';
    const lastWord = results[results.length - 1][0].transcript.trim().toLowerCase();

    /**
     * If the user issues a "stop" or "print" command we handle the
     * action and then return, to prevent the command from being appended
     * to the printed comment.
     */
    if (this.commandIssued(lastWord)) {
      this.handleCommand(lastWord);
      return;
    }

    Object.values(results).forEach(result => {
      finalTranscript = this.state.comment + result[0].transcript;
    });

    this.setState({ comment: finalTranscript });
  };

  onRecordingError = ({ error }) => {
    if (error === 'no-speech' || error === 'audio-capture' || error === 'not-allowed') {
      this.ignoreRecordingEndEvent = true;
    }
  };

  /****************************************************
   ***** EVENT HANDLERS *******************************
   ****************************************************/

  handleChange = html => {
    this.setState({ comment: html });
  };

  handleClear = () => {
    this.setState({ comment: '' }, () => {
      this.saveToLocal();
    });
  };

  handlePrint = () => {
    this.printLabel();
  };

  handleRecord = () => {
    if (!this.recognition) {
      return;
    }

    if (!this.state.recording) {
      this.recognition.start();
    } else {
      this.recognition.stop();
    }
  };

  handleTextAreaFocus = () => {
    if (this.recognition && this.state.recording) {
      this.recognition.stop();
    }
  };

  render = () => {
    const { comment, canRecord, recording, printerFound, error } = this.state;
    const actions = {
      clear: {
        handler: this.handleClear,
        disable: recording || !comment.length
      },
      print: {
        handler: this.handlePrint,
        disable: recording || !comment.length || this.getCharacterCount() <= 0 || !printerFound
      },
      record: {
        handler: this.handleRecord,
        disable: !canRecord
      }
    };

    return (
      <Container>
        <React.Fragment>
          {!printerFound && (
            <Alert
              message="No DYMO label printers found. Please connect a DYMO printer"
              theme="warning"
            />
          )}

          <TextBox
            text={comment}
            charCount={this.getCharacterCount()}
            onChange={this.handleChange}
            onFocus={this.handleTextAreaFocus}
          />

          <ActionPanel actions={actions} isRecording={recording} />
        </React.Fragment>
      </Container>
    );
  };
}
