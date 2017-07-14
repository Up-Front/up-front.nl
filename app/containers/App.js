import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Helmet from 'react-helmet';

import Navigation from './Navigation';

const App = ({ children }) => (
  <div>
    <Helmet
      title="BizHost"
      titleTemplate="%s - BizHost"
      meta={[
        { 'char-set': 'utf-8' },
        { name: 'description', content: 'My super dooper dope app' },
      ]}
    />
    <Navigation />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default App;
