import { NAVIGATE, POP, REPLACE } from './constants'

export default function reducer (route = {}, action) {
  switch (action.type) {
    case NAVIGATE:
    case POP:
    case REPLACE:
      return {
        location: action.location,
        matcher: action.matcher,
        params: action.params,
        query: action.query,
        url: action.url
      }

    default:
      return route
  }
}
