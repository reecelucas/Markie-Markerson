import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Global } from '@emotion/core';
import { graphql, StaticQuery } from 'gatsby';
import {
  startErrorTracking,
  logErrorReport
} from '../../error-handling/error-handling';

import globalStyles from '../../styles/global';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

/**
 * This serves as a crude `:focus-visible` polyfill. When the
 * user tabs, we take this as an indication that they are
 * using the keyboard to navigate, so we preserve the default
 * focus outline styling.
 */
const onFirstTabPress = event => {
  if (event.code === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', onFirstTabPress);
  }
};

const Layout = ({ children }) => {
  useEffect(() => {
    window.addEventListener('error', logErrorReport);
    window.addEventListener('keydown', onFirstTabPress);

    startErrorTracking();

    return () => {
      window.removeEventListener('error', logErrorReport);
      window.removeEventListener('keydown', onFirstTabPress);
    };
  }, []);

  return (
    // The result of the graphql `query` is passed into the `render` prop as `data`
    <StaticQuery
      query={graphql`
        query siteMetadata {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <React.Fragment>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              {
                name: 'description',
                content: data.site.siteMetadata.description
              }
            ]}
          />
          <Global styles={globalStyles} />
          {children}
        </React.Fragment>
      )}
    />
  );
};

Layout.propTypes = propTypes;

export default Layout;
