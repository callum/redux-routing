import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export function history (store, action) {
  const { hash, pathname, search, url } = action

  const curr = window.history.state
  const next = { hash, pathname, search }

  switch (action.type) {
    case NAVIGATE:
      if (!equal(curr, next)) {
        window.history.pushState(next, null, url)
      }
      break

    case REPLACE:
      window.history.replaceState(next, null, url)
      break
  }

  window.onpopstate = event => store.dispatch(pop(event.state))
}

export function equal (a, b) {
  return a.hash === b.hash &&
         a.pathname === b.pathname &&
         a.search === b.search
}
