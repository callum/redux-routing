import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export default function history (store, action) {
  const { hash, pathname, search, url } = action

  const curr = window.history.state
  const next = { hash, pathname, search }

  switch (action.type) {
    case NAVIGATE:
      if (curr.hash !== next.hash ||
          curr.pathname !== next.pathname ||
          curr.search !== curr.search) {
        window.history.pushState(next, null, url)
      }
      break

    case REPLACE:
      window.history.replaceState(next, null, url)
      break
  }

  window.onpopstate = event => store.dispatch(pop(event.state))
}
