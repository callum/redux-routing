import { replace } from './actions'
import { NAVIGATE } from './constants'

function hashToHref (hash) {
  return hash.slice(1) || '/'
}

export default class Hash {
  constructor (store) {
    this.store = store
  }

  listen () {
    window.addEventListener('hashchange', () => {
      this.onPopHref(hashToHref(window.location.hash))
    }, false)
  }

  update (action) {
    this.href = action.href

    if (action.type === NAVIGATE) {
      this.pushHref(action.href)
    }
  }

  pushHref (href) {
    window.location.hash = href
  }

  onPopHref (href) {
    if (href !== this.href) {
      this.store.dispatch(replace(href))
    }
  }
}
