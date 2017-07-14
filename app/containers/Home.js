import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Home extends PureComponent {

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <h1>HOME</h1>
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
