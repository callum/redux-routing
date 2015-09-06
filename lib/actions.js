import { NAVIGATE, POP, REPLACE } from './constants'

export function navigate (location) {
  return typedLocation(NAVIGATE, location)
}

export function pop (location) {
  return typedLocation(POP, location)
}

export function replace (location) {
  return typedLocation(REPLACE, location)
}

function typedLocation (type, location) {
  return {
    hash: location.hash,
    pathname: location.pathname,
    search: location.search,
    type
  }
}
