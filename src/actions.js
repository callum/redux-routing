import { NAVIGATE, REPLACE } from './constants'

export function navigate (location) {
  return { type: NAVIGATE, location }
}

export function replace (location) {
  return { type: REPLACE, location }
}
