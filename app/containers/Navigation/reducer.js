import {
  SITES_INVALID,
  SITES_FETCHING,
  SITES_FETCHED,
  SITES_FETCH_FAILED,
} from './actions';

export default function users(state = {
  readyState: SITES_INVALID,
  list: null,
}, action) {
  switch (action.type) {
    case SITES_FETCHING:
      return {
        ...state,
        readyState: SITES_FETCHING,
      };
    case SITES_FETCH_FAILED:
      return {
        ...state,
        readyState: SITES_FETCH_FAILED,
        error: action.error,
      };
    case SITES_FETCHED:
      return {
        ...state,
        readyState: SITES_FETCHED,
        list: action.result,
      };
    default:
      return state;
  }
}
