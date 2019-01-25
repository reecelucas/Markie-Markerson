import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SPACING } from '../../styles/theme';
import Button from '../Button/Button';
import warningIcon from '../../images/alert-icon--warning.svg';
import errorIcon from '../../images/alert-icon--error.svg';

const propTypes = {
  message: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(['warning', 'error']).isRequired,
  className: PropTypes.string
};

const alertIconSize = '24px';
const themes = {
  warning: {
    color: '#8a6d3b',
    backgroundColor: '#fcf8e3',
    borderColor: '#faebcc',
    icon: warningIcon
  },
  error: {
    color: '#a94442',
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
    icon: errorIcon
  }
};

const Container = styled.div`
  align-items: flex-start;
  background-color: ${({ appearance }) => themes[appearance].backgroundColor};
  border: 1px solid ${({ appearance }) => themes[appearance].borderColor};
  border-radius: 2px;
  color: ${({ appearance }) => themes[appearance].color};
  display: flex;
  margin-bottom: ${SPACING.base};
  padding: ${SPACING.small};
  width: 100%;

  span {
    display: inline-block;
    padding-right: ${SPACING.base};
  }

  &:before {
    content: '';
    background: url(${({ appearance }) => themes[appearance].icon}) no-repeat
      center center / 100% 100% transparent;
    display: inline-block;
    flex-shrink: 0;
    height: ${alertIconSize};
    margin-right: ${SPACING.small};
    width: ${alertIconSize};
  }
`;

const DismissButton = styled(Button)`
  align-self: center;
  background-color: transparent;
  color: currentColor;
  font-weight: 600;
  letter-spacing: 0.025em;
  margin-left: auto;
  padding: 0;
  text-transform: uppercase;
`;

const Alert = ({ message, appearance, className }) => {
  const [show, setShow] = useState(true);

  const dismiss = () => {
    setShow(false);
  };

  const renderAlert = () => (
    <Container
      role="alert"
      aria-live="assertive"
      appearance={appearance}
      className={className}
    >
      <span>{message}</span>
      <DismissButton onClick={dismiss} id="alert-dismiss-button">
        Dismiss
      </DismissButton>
    </Container>
  );

  return show ? renderAlert() : null;
};

Alert.propTypes = propTypes;

export default Alert;
