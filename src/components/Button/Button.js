import React from 'react';
import PropTypes from 'prop-types';
import getAttributeProps from '../../helpers/getAttributeProps';
import styled from '@emotion/styled';
import { captureInteraction } from '../../error-handling/error-handling';
import { css } from '@emotion/core';
import { COLOURS, SPACING } from '../../styles/theme';

const propTypes = {
  children: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

const reset = css`
  appearance: none;
  background: none;
  border: 0;
  border-radius: 0;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
`;

const StyledButton = styled.button`
  ${reset};
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
    opacity: 0.4;
    pointer-events: none;
  }
`;

const Button = ({ id, disabled, onClick, children, className, ...rest }) => {
  const attributes = getAttributeProps(rest);
  const clickHandler = event => {
    captureInteraction(event);
    onClick(event);
  };

  if (disabled) {
    attributes['aria-disabled'] = true;
    attributes.disabled = true;
  }

  return (
    <StyledButton
      type="button"
      onClick={clickHandler}
      className={className}
      data-interaction-id={id}
      {...attributes}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = propTypes;

export default React.memo(Button);
