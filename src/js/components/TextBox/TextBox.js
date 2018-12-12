import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import ContentEditable from '../ContentEditable/ContentEditable';
import { SPACING, COLOURS, TYPE_SCALE } from '../../../styles/theme';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  characterCount: PropTypes.number.isRequired
};

/**
 * Note: setting `display: inline-block` on the contenteditable
 * div ensures newlines are created using `br` tags not `div` tags
 * (see: https://tinyurl.com/ybndot2l). `br` tags are required for
 * correctly formatting the label XML.
 */
const styles = css`
  text-align: left;
  width: 100%;

  h1 {
    align-items: baseline;
    display: flex;
    font-size: ${TYPE_SCALE[20]};
    font-weight: 400;
    justify-content: space-between;
    margin-bottom: ${SPACING.tiny};

    span {
      color: ${COLOURS.secondaryText};
      font-size: ${TYPE_SCALE[12]};
    }
  }

  div[contenteditable] {
    border: 2px solid ${COLOURS.divider};
    border-radius: 0;
    color: ${COLOURS.secondaryText};
    display: inline-block;
    font-size: ${TYPE_SCALE[20]};
    margin-bottom: ${SPACING.base};
    min-height: 400px;
    padding: ${SPACING.base};
    resize: none;
    width: 100%;
  }
`;

const TextBox = ({ text, characterCount, onChange, onFocus }) => (
  <div className={styles}>
    <h1>
      Comments <span>{characterCount}</span>
    </h1>

    <ContentEditable html={text} onChange={onChange} onFocus={onFocus} />
  </div>
);

TextBox.propTypes = propTypes;

export default React.memo(TextBox);
