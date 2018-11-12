import React from 'react';
import Container from './components/Container/Container';
import TextBox from './components/TextBox/TextBox';
import ActionPanel from './components/ActionPanel/ActionPanel';
import Alert from './components/Alert/Alert';
import { saveToLocalStorage, fetchFromLocalStorage } from './utilities/local-storage';
import { LOCAL_STORAGE_KEY, AUTO_SAVE_INTERVAL } from './constants';

export default class App extends React.Component {
  timerId = null;
  recognition = null;
  ignoreRecordingEndEvent = false;
  textareaRef = React.createRef();

  state = {
    recording: false,
    comment: fetchFromLocalStorage(LOCAL_STORAGE_KEY) || ''
  };

  /****************************************************
   ***** LIFECYCLE ************************************
   ****************************************************/

  componentDidMount() {
    if ('webkitSpeechRecognition' in window) {
      this.initialiseSpeechRecognition();
    }

    if (this.textareaRef && this.textareaRef.current) {
      this.textareaRef.current.focus();
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

  handleChange = event => {
    this.setState({ comment: event.target.value });
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

  render = () => (
    <Container>
      <React.Fragment>
        <Alert message="This is an example warning message" modifier="warning" dismissable />
        <TextBox
          text={this.state.comment}
          onChange={this.handleChange}
          onfocus={this.handleTextAreaFocus}
          reference={this.textareaRef}
        />
        <ActionPanel
          comment={this.state.comment}
          onClear={this.handleClear}
          onPrint={this.handlePrint}
          onRecord={this.handleRecord}
          isRecording={this.state.recording}
        />
      </React.Fragment>
    </Container>
  );
}
