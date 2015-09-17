import { replace } from './actions'
import { NAVIGATE } from './constants'

export default class History {
  constructor (store) {
    this.store = store
  }

  listen () {
    window.addEventListener('popstate', event => {
      this.onPopHref(event.state)
    }, false)
  }

  update (action) {
    const href = this.getCurrentHref()

    if (action.type === NAVIGATE) {
      if (href && action.href !== href) {
        this.pushHref(action.href)
      } else {
        this.replaceHref(action.href)
      }
    }
  }

  pushHref (href) {
    window.history.pushState(href, null, href)
  }

  replaceHref (href) {
    window.history.replaceState(href, null, href)
  }

  onPopHref (href) {
    this.store.dispatch(replace(href))
  }

  getCurrentHref () {
    return window.history.state
  }
}
