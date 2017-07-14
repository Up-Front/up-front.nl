import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import * as DNSActions from './actions';

class DNSOverview extends PureComponent {

  static readyOnActions(dispatch) {
    return Promise.all([
      dispatch(DNSActions.fetchDNSIfNeeded()),
    ]);
  }

  componentDidMount() {
    DNSOverview.readyOnActions(this.props.dispatch);
  }

  renderUsers() {
    const users = this.props.users;

    if (users.readyState === DNSActions.USERS_INVALID ||
      users.readyState === DNSActions.USERS_FETCHING) {
      return <p>Loading...</p>;
    }

    if (users.readyState === DNSActions.USERS_FETCH_FAILED) {
      return <p>Failed to fetch users</p>;
    }

    if (users.readyState === DNSActions.USERS_FETCHED) {
      return <UserList users={users.list} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        <Helmet title="DNS" />
        <h1>DNS</h1>
      </div>
    );
  }
}

DNSOverview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users }) => ({

});

export default connect(mapStateToProps)(DNSOverview);
