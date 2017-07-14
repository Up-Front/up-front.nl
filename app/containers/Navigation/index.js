import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as SitesActions from './actions';

import SiteSelector from '../../components/SiteSelector';

export class Navigation extends PureComponent {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(SitesActions.fetchSitesIfNeeded()),
    ]);
  }

  componentDidMount() {
    Navigation.readyOnActions(this.props.dispatch);
  }

  renderSiteSelector() {
    const sites = this.props.sites;

    if (sites.readyState === SitesActions.SITES_INVALID ||
      sites.readyState === SitesActions.SITES_FETCHING) {
      return <p>Loading...</p>;
    }

    if (sites.readyState === SitesActions.SITES_FETCH_FAILED) {
      return <p>Failed to fetch sites</p>;
    }

    if (sites.readyState === SitesActions.SITES_FETCHED) {
      return <SiteSelector sites={sites.list} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.renderSiteSelector()}
        <Link to="/">Home</Link>
        <Link to="/DNS">DNS</Link>
        <Link to="/settings">Instellingen</Link>
      </div>
    );
  }
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sites }) => ({
  sites,
});

export default connect(mapStateToProps)(Navigation);
