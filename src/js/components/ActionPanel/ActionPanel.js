import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { css, keyframes } from 'emotion';
import { COLOURS, SPACING } from '../../../styles/theme';

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

const styles = css`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  button:not(:last-child) {
    margin-right: ${SPACING.small};
  }
`;

const clearStyles = css`
  background-color: transparent;
  color: ${COLOURS.accent};
  padding: ${SPACING.tiny};
`;

const recordStyles = isRecording => css`
  background-color: ${COLOURS.accent};

  &:before {
    animation: ${isRecording ? `${blink} 1.25s ease infinite both` : 'none'};
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
    <div className={styles}>
      <Button className={clearStyles} onClick={clear.handler} disabled={clear.disable}>
        Clear
      </Button>
      <Button
        className={recordStyles(isRecording)}
        onClick={record.handler}
        disabled={record.disable}
      >
        {isRecording ? 'Recording' : 'Record'}
      </Button>
      <Button onClick={print.handler} disabled={print.disable}>
        Print Label
      </Button>
    </div>
  );
};

ActionPanel.propTypes = propTypes;

export default React.memo(ActionPanel);
