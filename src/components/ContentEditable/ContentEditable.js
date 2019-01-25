import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  html: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default class ContentEditable extends React.Component {
  static propTypes = propTypes;

  ref = React.createRef();
  lastHtml = this.props.html;

  shouldComponentUpdate = nextProps => {
    return nextProps.html !== this.ref.current.innerHTML;
  };

  onChange = () => {
    const html = this.ref.current.innerHTML;

    if (html !== this.lastHtml) {
      this.props.onChange(html);
      this.lastHtml = html;
    }
  };

  onKeyDown = event => {
    // Chrome doesn't implement `CMD/CTRL + u` for underline.
    if ((event.ctrlKey || event.metaKey) && event.key === 'u') {
      event.preventDefault();
      document.execCommand('underline');
    }
  };

  pasteAsPlainText = event => {
    event.preventDefault();

    // Remove formatting from any pasted text
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };

  render = () => (
    <div
      /**
       * Fixes issue with `dangerouslySetInnerHTML` not firing consistently
       * with `contentEditable`. Without this clearing the contentEditable
       * content does not work.
       */
      key={Math.random()}
      className={this.props.className}
      ref={this.ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={this.props.onFocus}
      onInput={this.onChange}
      onKeyDown={this.onKeyDown}
      onPaste={this.pasteAsPlainText}
      dangerouslySetInnerHTML={{ __html: this.props.html }}
    />
  );
}
