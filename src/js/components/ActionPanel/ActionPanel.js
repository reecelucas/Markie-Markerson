import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { css } from 'emotion';
import { COLOURS, SPACING } from '../../../styles/theme';

const propTypes = {
  allowPrint: PropTypes.bool.isRequired,
  allowClear: PropTypes.bool.isRequired,
  onClear: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired
};

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
    background-color: ${isRecording ? '#ff003b' : 'currentColor'};
    border-radius: 50%;
    content: '';
    display: inline-block;
    height: 0.8em;
    margin-right: ${SPACING.tiny};
    width: 0.8em;
  }
`;

const ActionPanel = ({ allowPrint, allowClear, onClear, onPrint, onRecord, isRecording }) => {
  const clearBtnState = !allowClear ? ['disabled'] : [];
  const printBtnState = !allowPrint ? ['disabled'] : [];

  return (
    <div className={styles}>
      <Button className={clearStyles} onClick={onClear} uiState={clearBtnState}>
        Clear
      </Button>
      <Button className={recordStyles(isRecording)} onClick={onRecord}>
        {isRecording ? 'Recording' : 'Record'}
      </Button>
      <Button onClick={onPrint} uiState={printBtnState}>
        Print Label
      </Button>
    </div>
  );
};

ActionPanel.propTypes = propTypes;

export default React.memo(ActionPanel);
