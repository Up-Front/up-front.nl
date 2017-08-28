import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import styles from './style.css';

export class Navigation extends PureComponent {

  render() {
    return (
      <div className={styles.wrapper}>
      	<div className={styles.home}>
          <Link to="/">HOME</Link>
        </div>

        <div className={styles.logo}>
	        LOGO
        </div>

        <div className={styles.contact}>
          CONTACT
        </div>
	    </div>
    );
  }
}

export default Navigation;
