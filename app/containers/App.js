import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Navigation from '../components/Navigation';

import styles from '../styles/index.css';

class App extends PureComponent {

  render() {
    const { children } = this.props;
    return (
      <div>
        <Helmet
          title="UpFront"
          titleTemplate="%s - UpFront"
          meta={[
            { 'char-set': 'utf-8' },
            { 'viewport': 'width=device-width, initial-scale=1.0' }
          ]}
        />
        <Navigation />

        <div className={styles.wrapper}>
          {children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const mapStateToProps = ({ states }) => ({
  states,
});

export default connect(mapStateToProps)(App);
