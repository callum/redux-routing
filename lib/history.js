import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export default function history (store, action) {
  const { pathname } = action

  switch (action.type) {
    case NAVIGATE:
      window.history.pushState(pathname, null, pathname)
      break

    case REPLACE:
      window.history.replaceState(pathname, null, pathname)
      break
  }

  window.onpopstate = event => store.dispatch(pop(event.state))
}
