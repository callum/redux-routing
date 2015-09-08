import url from 'url'
import { pop } from './actions'
import { NAVIGATE, REPLACE } from './constants'

export default class Hash {
  constructor () {
    window.onhashchange = () => {
      const hash = Hash.parse(window.location.hash)
      store.dispatch(pop(hash))
    }
  }

  notify (action) {
    const { type } = action

    if (type === NAVIGATE || type === REPLACE) {
      window.location.hash = action.url
    }
  }

  static parse (hash) {
    return url.parse(hash.slice(1))
  }
}
