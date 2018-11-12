import * as React from 'react';
import PropTypes from 'prop-types';
import { cx, css } from 'react-emotion';
import { SPACING } from '../../../styles/theme';
import warningIcon from '../../../images/alert-icon--warning.svg';
import errorIcon from '../../../images/alert-icon--error.svg';

const propTypes = {
  message: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['warning', 'error']).isRequired,
  className: PropTypes.string
};

const alertIconSize = '24px';
const alertBtnSize = '16px';
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

const styles = theme => css`
  align-items: flex-start;
  background-color: ${themes[theme].backgroundColor};
  border: 1px solid ${themes[theme].borderColor};
  border-radius: 2px;
  color: ${themes[theme].color};
  display: flex;
  margin-bottom: ${SPACING.large};
  padding: ${SPACING.small};
  width: 100%;

  &:before {
    content: '';
    background: url(${themes[theme].icon}) no-repeat center center / 100% 100% transparent;
    display: inline-block;
    flex-shrink: 0;
    height: ${alertIconSize};
    margin-right: ${SPACING.small};
    width: ${alertIconSize};
  }
`;

const buttonStyles = css`
  align-self: center;
  color: currentColor;
  height: ${alertBtnSize};
  margin-left: auto;
  position: relative;
  transform: rotate(45deg);
  width: ${alertBtnSize};

  &:before,
  &:after {
    box-shadow: inset 0 0 0 ${alertBtnSize};
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    height: 2px;
    width: 100%;
  }

  &:after {
    height: 100%;
    width: 2px;
  }
`;

class Alert extends React.Component {
  state = {
    show: true
  };

  dismiss = () => {
    this.setState({ show: false });
  };

  render = () =>
    this.state.show ? (
      <div
        className={cx(styles(this.props.theme), this.props.className)}
        role="alert"
        aria-live="assertive"
      >
        {this.props.message}
        <button className={buttonStyles} onClick={this.dismiss} aria-label="Close Alert" />
      </div>
    ) : null;
}

Alert.propTypes = propTypes;

export default React.memo(Alert);
