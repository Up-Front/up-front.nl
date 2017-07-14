import  React from 'react'

const renderer = require('react-test-renderer');

import { Navigation } from '../index';
import * as SitesActions from '../actions';

const dispatch = (e) => {
    console.log('dispatched:', e);
}

const sites = {
    readyState: SitesActions.SITES_FETCHED,
    list: [
        {
            id: 0,
            name: 'Bakker Bollebof',
            url: 'bakkerbollebof.nl'
        },
        {
            id: 1,
            name: 'Sjakie Slager',
            url: 'sjakieslager.nl'
        },
    ]
}

it('renders correctly', () => {
  const tree = renderer.create(
    <Navigation sites={sites} dispatch={dispatch} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
