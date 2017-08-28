import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import PersonNavigator from '../../../components/PersonNavigator/index.js';

import styles from './style.css';

class Home extends PureComponent {

  render() {
    return (
      <div className={styles.wrapper}>
        <Helmet title="Home" />

        <Grid>
	        <Row>
	          <Col xs={2}>
	            <PersonNavigator />
	          </Col>

	          <Col xs={4}>
	          	SelectedPerson
	          </Col>

	          <Col xs={6}>
	          	<div className={styles.content}>
	          		CONTENT 1
	          	</div>

	          	<div className={styles.content}>
	          		CONTENT 2
	          	</div>

	          	<div className={styles.content}>
	          		CONTENT 3
	          	</div>

	          	<div className={styles.content}>
	          		CONTENT 4
	          	</div>
	          </Col>
	        </Row>
	      </Grid>

      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({

});

export default connect(mapStateToProps)(Home);
