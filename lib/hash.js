import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export default function hash (store, action) {
  switch (action.type) {
    case NAVIGATE:
    case REPLACE:
      window.location.hash = action.url
      break
  }

  window.onhashchange = () =>
    store.dispatch(pop(hashToLocation(window.location.hash)))
}

function hashToLocation(str) {
  let pathname
  let hash
  let search

  [ pathname, search ] = str.slice(1).split('?')

  if (search) {
    [ search, hash ] = search.split('#')

    if (hash) {
      hash = `#${hash}`
    }

    search = `?${search}`
  }

  return { hash, pathname, search }
}
