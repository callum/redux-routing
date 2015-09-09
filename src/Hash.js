import { replace } from './actions'
import { NAVIGATE } from './constants'

function hashToUrl (hash) {
  return hash.slice(1) || '/'
}

export default class Hash {
  constructor (store) {
    this.store = store
  }

  listen () {
    window.addEventListener('hashchange', () => {
      this.onPopUrl(hashToUrl(window.location.hash))
    }, false)
  }

  update (action) {
    this.url = action.url

    if (action.type === NAVIGATE) {
      this.pushUrl(action.url)
    }
  }

  pushUrl (url) {
    window.location.hash = url
  }

  onPopUrl (url) {
    if (url !== this.url) {
      this.store.dispatch(replace(url))
    }
  }
}
