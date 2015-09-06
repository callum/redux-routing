import { NAVIGATE, POP, REPLACE } from './constants'

export default function reducer (route = {}, action) {
  switch (action.type) {
    case NAVIGATE:
    case POP:
    case REPLACE:
      return {
        hash: action.hash,
        matcher: action.matcher,
        params: action.params,
        pathname: action.pathname,
        query: action.query,
        search: action.search,
        url: action.url
      }

    default:
      return route
  }
}
