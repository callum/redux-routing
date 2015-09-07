import { NAVIGATE, POP, REPLACE } from './constants'

export function navigate (location) {
  return { type: NAVIGATE, location }
}

export function pop (location) {
  return { type: POP, location }
}

export function replace (location) {
  return { type: REPLACE, location }
}
