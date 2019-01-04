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
  margin-bottom: ${SPACING.base};
  padding: ${SPACING.small};
  width: 100%;

  span {
    display: inline-block;
    padding-right: ${SPACING.base};
  }

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
  font-weight: 600;
  letter-spacing: 0.025em;
  margin-left: auto;
  text-transform: uppercase;
`;

class Alert extends React.PureComponent {
  state = {
    show: true
  };

  dismiss = () => {
    this.setState({ show: false });
  };

  renderAlert = () => (
    <div
      className={cx(styles(this.props.theme), this.props.className)}
      role="alert"
      aria-live="assertive"
    >
      <span>{this.props.message}</span>
      <button className={buttonStyles} onClick={this.dismiss}>
        Dismiss
      </button>
    </div>
  );

  render = () => (this.state.show ? this.renderAlert() : null);
}

Alert.propTypes = propTypes;

export default Alert;
