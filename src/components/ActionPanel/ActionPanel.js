import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { COLOURS, SPACING } from '../../styles/theme';

const propTypes = {
  isRecording: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    clear: PropTypes.shape({
      handler: PropTypes.func.isRequired,
      disable: PropTypes.bool.isRequired
    }).isRequired,
    print: PropTypes.shape({
      handler: PropTypes.func.isRequired,
      disable: PropTypes.bool.isRequired
    }).isRequired,
    record: PropTypes.shape({
      handler: PropTypes.func.isRequired,
      disable: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired
};

const blink = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button:not(:last-child) {
    margin-right: ${SPACING.small};
  }
`;

const StyledClearButton = styled(Button)`
  background-color: transparent;
  color: ${COLOURS.accent};
  padding: ${SPACING.tiny};
`;

const StyledRecordButton = styled(Button)`
  background-color: ${COLOURS.accent};

  &:before {
    animation: ${props =>
      props.isRecording ? `${blink} 1.25s ease infinite both` : 'none'};
    background-color: #ff003b;
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 0.8em;
    margin-right: ${SPACING.tiny};
    width: 0.8em;
  }
`;

const ActionPanel = ({ actions, isRecording }) => {
  const { clear, print, record } = actions;

  return (
    <StyledContainer>
      <StyledClearButton
        onClick={clear.handler}
        disabled={clear.disable}
        id="action-panel-clear-button"
      >
        Clear
      </StyledClearButton>
      <StyledRecordButton
        onClick={record.handler}
        disabled={record.disable}
        isRecording={isRecording}
        id="action-panel-record-button"
      >
        {isRecording ? 'Recording' : 'Record'}
      </StyledRecordButton>
      <Button
        onClick={print.handler}
        disabled={print.disable}
        id="action-panel-print-button"
      >
        Print Label
      </Button>
    </StyledContainer>
  );
};

ActionPanel.propTypes = propTypes;

export default React.memo(ActionPanel);
