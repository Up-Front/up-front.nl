import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './style.css';

class PersonNavigator extends Component {

  render() {
    return (
      <div>
        <div className={styles.person}>IMG</div>
        <div className={styles.person}>IMG</div>
        <div className={styles.person}>IMG</div>
        <div className={styles.person}>IMG</div>
        <div className={styles.person}>IMG</div>
      </div>
    );
  }
}

PersonNavigator.propTypes = {
 
};

export default PersonNavigator;
