import { NAVIGATE, POP, REPLACE } from './constants'

export default function reducer (route = {}, action) {
  switch (action.type) {
    case NAVIGATE:
    case POP:
    case REPLACE:
      return {
        matcher: action.matcher,
        params: action.params,
        pathname: action.pathname,
        query: action.query,
        search: action.search
      }

    default:
      return route
  }
}
