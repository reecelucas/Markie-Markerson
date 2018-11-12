import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { SPACING, COLOURS, TYPE_SCALE } from '../../../styles/theme';
import { CHAR_LIMIT } from '../../constants';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onfocus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  reference: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired
};

const styles = css`
  text-align: left;
  width: 100%;

  label {
    align-items: baseline;
    display: flex;
    font-size: ${TYPE_SCALE[20]};
    justify-content: space-between;
    margin-bottom: ${SPACING.tiny};

    span {
      color: ${COLOURS.secondaryText};
      font-size: ${TYPE_SCALE[12]};
    }
  }

  textarea {
    border: 2px solid ${COLOURS.divider};
    border-radius: 0;
    color: ${COLOURS.secondaryText};
    display: block;
    font-size: ${TYPE_SCALE[20]};
    margin-bottom: ${SPACING.base};
    min-height: 400px;
    padding: ${SPACING.base};
    resize: none;
    width: 100%;
  }
`;

const TextBox = ({ onChange, onfocus, text, reference }) => {
  const characterCount = CHAR_LIMIT - text.length;

  return (
    <div className={styles}>
      <label htmlFor="comment-box">
        Comments
        <span>{characterCount}</span>
      </label>
      <textarea
        ref={reference}
        id="comment-box"
        name="comment-box"
        value={text}
        onChange={onChange}
        onFocus={onfocus}
      />
    </div>
  );
};

TextBox.propTypes = propTypes;

export default TextBox;
