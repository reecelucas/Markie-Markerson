import React from 'react';
import PropTypes from 'prop-types';
import getAttributeProps from '../../helpers/getAttributeProps';
import { cx, css } from 'emotion';
import { COLOURS, SPACING } from '../../../styles/theme';

const propTypes = {
  uiState: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.any.isRequired
};

const styles = {
  reset: css`
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
  `,

  button: css`
    align-items: center;
    background-color: ${COLOURS.primary};
    color: ${COLOURS.base};
    display: inline-flex;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.025em;
    padding: ${SPACING.small} ${SPACING.base};
    text-transform: uppercase;

    &:disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  `
};

const Button = ({ uiState = [], onClick, children, className, ...rest }) => {
  const attributes = getAttributeProps(rest);

  if (uiState.includes('disabled')) {
    attributes['aria-disabled'] = true;
    attributes.disabled = true;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(styles.reset, styles.button, className)}
      {...attributes}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;

export default Button;
