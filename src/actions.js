import { NAVIGATE, REPLACE } from './constants'

export function navigate (href) {
  return { type: NAVIGATE, href }
}

export function replace (href) {
  return { type: REPLACE, href }
}
