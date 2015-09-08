import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

function isEqualLocation (a, b) {
  return a.hash === b.hash &&
         a.pathname === b.pathname &&
         a.search === b.search
}

export default class History {
  constructor (store) {
    window.onpopstate = event => store.dispatch(pop(event.state))
  }

  notify (action) {
    const { type, url } = action

    const curr = window.history.state
    const next = action.location

    if (type === NAVIGATE && !isEqualLocation(curr, next)) {
      window.history.pushState(next, null, url)
    }

    if (type === REPLACE) {
      window.history.replaceState(next, null, url)
    }
  }
}
