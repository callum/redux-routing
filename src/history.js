import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export function history (store, action) {
  const curr = window.history.state
  const next = action.location

  switch (action.type) {
    case NAVIGATE:
      if (!equal(curr, next)) {
        window.history.pushState(next, null, action.url)
      }
      break

    case REPLACE:
      window.history.replaceState(next, null, action.url)
      break
  }

  window.onpopstate = event => store.dispatch(pop(event.state))
}

export function equal (a, b) {
  return a.hash === b.hash &&
         a.pathname === b.pathname &&
         a.search === b.search
}
