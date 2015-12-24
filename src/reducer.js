import { NAVIGATE, REPLACE } from './constants'

export default function reducer (route = {}, action) {
  switch (action.type) {
    case NAVIGATE:
    case REPLACE:
      return {
        href: action.href,
        location: action.location,
        query: action.query
      }

    default:
      return route
  }
}
