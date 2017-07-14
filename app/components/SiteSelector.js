import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SiteSelector = ({ sites }) => (
  <ul>
    {sites.map(site => (
      <li key={site.id}>
        <Link to={`site/${site.id}`}>{site.name}</Link>
      </li>
    ))}
  </ul>
);

SiteSelector.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default SiteSelector;
