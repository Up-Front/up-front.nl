/* globals fetch */
export const SITES_INVALID = 'SITES_INVALID';
export const SITES_FETCHING = 'SITES_FETCHING';
export const SITES_FETCHED = 'SITES_FETCHED';
export const SITES_FETCH_FAILED = 'SITES_FETCH_FAILED';

function fetchDNS() {
  return (dispatch) => {
    dispatch({ type: SITES_FETCHING });

    return fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(result => dispatch({ type: SITES_FETCHED, result }))
      .catch(error => dispatch({ type: SITES_FETCH_FAILED, error }));
  };
}

function shouldfetchDNS({ sites }) {
  if (!sites.list ||
    sites.readyState === SITES_FETCH_FAILED ||
    sites.readyState === SITES_INVALID) {
    return true;
  }

  return false;
}

export function fetchDNSIfNeeded() {
  return (dispatch, getState) => {
    if (shouldfetchDNS(getState())) {
      return dispatch(fetchDNS());
    }
    return null;
  };
}
