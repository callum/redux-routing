import { replace } from './actions'
import { NAVIGATE } from './constants'

export default class History {
  constructor (store) {
    this.store = store
  }

  listen () {
    window.addEventListener('popstate', event => {
      this.onPopUrl(event.state)
    }, false)
  }

  update (action) {
    const url = this.getCurrentUrl()

    if (action.type === NAVIGATE) {
      if (url && action.url !== url) {
        this.pushUrl(action.url)
      } else {
        this.replaceUrl(action.url)
      }
    }
  }

  pushUrl (url) {
    window.history.pushState(url, null, url)
  }

  replaceUrl (url) {
    window.history.replaceState(url, null, url)
  }

  onPopUrl (url) {
    this.store.dispatch(replace(url))
  }

  getCurrentUrl () {
    return window.history.state
  }
}
