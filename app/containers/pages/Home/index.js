import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PersonNavigator from '../../../components/PersonNavigator/index.js';

import styles from './style.css';

class Home extends PureComponent {

	render() {
		return (
			<div className={styles.wrapper}>
				<Helmet title="Home" />

				<div className={styles.personNavigator}>
					<PersonNavigator />
				</div>

				<div className={styles.contentWrapper}>
					<section className={styles.screenPart}>
						<div className={styles.currentPerson}>
							Person
						</div>
						<div className={styles.separator}>
							<div className={styles.arrow} />
						</div>
						<div className={styles.content}>
							CONTENT 1
						</div>
					</section>

					<section className={styles.screenPart}>
						<div className={styles.currentPerson}>
							Person
						</div>
						<div className={styles.separator}>
							<div className={styles.arrow} />
						</div>
						<div className={styles.content}>
							CONTENT 1
						</div>
					</section>

					<section className={styles.screenPart}>
						<div className={styles.currentPerson}>
							Person
						</div>
						<div className={styles.separator}>
							<div className={styles.arrow} />
						</div>
						<div className={styles.content}>
							CONTENT 1
						</div>
					</section>

				</div>

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
