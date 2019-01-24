import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { SPACING } from '../../styles/theme';

const propTypes = {
  children: PropTypes.element.isRequired
};

const StyledContainer = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  margin: 0 auto;
  max-width: 940px;
  padding: 0 ${SPACING.base};
  width: 100%;
`;

const Container = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

Container.propTypes = propTypes;

export default Container;
