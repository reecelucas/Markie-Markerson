import * as React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'react-emotion';

const propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
  modifier: PropTypes.string
};

class Alert extends React.Component {
  state = {
    show: true
  };

  dismiss = () => {
    this.setState({ show: false });
  };

  render = () =>
    this.state.show ? (
      <div className={cx(this.props.className)} role="alert" aria-live="assertive">
        {this.props.message}

        <button onClick={this.dismiss}>
          <span>Close alert</span>
        </button>
      </div>
    ) : null;
}

Alert.propTypes = propTypes;

export default Alert;
