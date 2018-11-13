import React from 'react';
import Container from './components/Container/Container';
import TextBox from './components/TextBox/TextBox';
import ActionPanel from './components/ActionPanel/ActionPanel';
import Alert from './components/Alert/Alert';
import { saveToLocalStorage, fetchFromLocalStorage } from './utilities/local-storage';
import { LOCAL_STORAGE_KEY, AUTO_SAVE_INTERVAL, CHAR_LIMIT } from './constants';

export default class App extends React.Component {
  timerId = null;
  recognition = null;
  ignoreRecordingEndEvent = false;

  state = {
    recording: false,
    printer: false,
    comment: fetchFromLocalStorage(LOCAL_STORAGE_KEY) || ''
  };

  /****************************************************
   ***** LIFECYCLE ************************************
   ****************************************************/

  componentDidMount() {
    if ('webkitSpeechRecognition' in window) {
      this.initialiseSpeechRecognition();
    }

    this.timerId = window.setInterval(() => {
      saveToLocalStorage({
        key: LOCAL_STORAGE_KEY,
        value: this.state.comment
      });
    }, AUTO_SAVE_INTERVAL);
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  /****************************************************
   ***** HELPERS **************************************
   ****************************************************/

  getCharacterCount = () => {
    /**
     * Remove HTML tags from the comment string, since we don't
     * want these included in the character count. We could use
     * the DOM here (https://tinyurl.com/ydy6s7r9), but we'd need to
     * sanitize the imput, and the DOM is pretty slow for this use case.
     */
    const cleanComment = this.state.comment.replace(/(<([^>]+)>)/gi, '');
    return CHAR_LIMIT - cleanComment.length;
  };

  /****************************************************
   ***** SPEECH RECOGNITION API ***********************
   ****************************************************/

  initialiseSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();

    /**
     * 1. Recognition will continue while the user is silent.
     * 2. Interim results will not be emitted while recognition occurs.
     */
    this.recognition.continuous = true; /* [1] */
    this.recognition.interimResults = false; /* [2] */

    // Bind event handlers
    this.recognition.onstart = this.onRecordingStart;
    this.recognition.onresult = this.onRecordingResult;
    this.recognition.onend = this.onRecordingEnd;
    this.recognition.onerror = this.onRecordingError;
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
    this.setState({ comment: '' });
  };

  handlePrint = () => {
    alert(`printing: ${this.state.comment}`);
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
    const allowClear = !this.state.recording && this.state.comment.length;
    const allowPrint = allowClear && this.getCharacterCount() > 0 && this.state.printer;

    return (
      <Container>
        <React.Fragment>
          {!this.state.printer && (
            <Alert message="Could not find any connected label makers" theme="warning" />
          )}

          <TextBox
            text={this.state.comment}
            charCount={this.getCharacterCount()}
            onChange={this.handleChange}
            onFocus={this.handleTextAreaFocus}
          />
          <ActionPanel
            onClear={this.handleClear}
            onPrint={this.handlePrint}
            onRecord={this.handleRecord}
            isRecording={this.state.recording}
            allowPrint={allowPrint}
            allowClear={allowClear}
          />
        </React.Fragment>
      </Container>
    );
  };
}
