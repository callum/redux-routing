import url from 'url'
import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export function hash (store, action) {
  switch (action.type) {
    case NAVIGATE:
    case REPLACE:
      window.location.hash = action.url
      break
  }

  window.onhashchange = () =>
    store.dispatch(pop(parse(window.location.hash)))
}

export function parse (hash) {
  return url.parse(hash.slice(1))
}
