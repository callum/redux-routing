import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export default function hash (store, action) {
  switch (action.type) {
    case NAVIGATE:
    case REPLACE:
      window.location.href = `#${action.pathname}`
      break
  }

  window.onhashchange = () =>
    store.dispatch(pop(window.location.hash.slice(1)))
}
