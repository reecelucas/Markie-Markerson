import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  html: PropTypes.string.isRequired
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

  render = () => (
    <div
      /**
       * TODO: find out more about this!
       * Fixes issue with `dangerouslySetInnerHTML` not firing consistently with `contentEditable`
       */
      key={Math.random()}
      ref={this.ref}
      contentEditable
      suppressContentEditableWarning
      onFocus={this.props.onFocus}
      onInput={this.onChange}
      onKeyDown={this.onKeyDown}
      dangerouslySetInnerHTML={{ __html: this.props.html }}
    />
  );
}
