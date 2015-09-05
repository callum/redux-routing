import { NAVIGATE, POP, REPLACE } from './constants'

export function navigate (pathname, search) {
  return { type: NAVIGATE, pathname, search }
}

export function pop (pathname, search) {
  return { type: POP, pathname, search }
}

export function replace (pathname, search) {
  return { type: REPLACE, pathname, search }
}
