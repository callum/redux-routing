import { NAVIGATE, REPLACE } from './constants'

export default function reducer (route = {}, action) {
  switch (action.type) {
  case NAVIGATE:
  case REPLACE:
    return {
      location: action.location,
      query: action.query,
      url: action.url
    }

  default:
    return route
  }
}
