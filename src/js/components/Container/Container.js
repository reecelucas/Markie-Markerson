import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { SPACING } from '../../../styles/theme';

const propTypes = {
  children: PropTypes.element.isRequired
};

const styles = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin: 0 auto;
  max-width: 940px;
  padding: 0 ${SPACING.base};
  width: 100%;
`;

const Container = ({ children }) => <main className={styles}>{children}</main>;

Container.propTypes = propTypes;

export default Container;
