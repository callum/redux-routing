import Path from 'path-parser'
import qs from 'qs'

export default function createRouter (strategy = () => {}) {
  const routes = new Set()
  const listeners = new Set()

  function route (matcher, handler) {
    routes.add({
      path: new Path(matcher),
      matcher,
      handler
    })
  }

  function match (pathname, search) {
    for (let route of routes) {
      const match = route.path.match(pathname)

      let query

      if (search) {
        query = qs.parse(search.slice(1))
      }

      if (match) {
        return {
          matcher: route.matcher,
          handler: route.handler,
          params: match,
          query
        }
      }
    }
  }

  function subscribe (listener) {
    return listeners.add(listener)
  }

  function unsubscribe (listener) {
    listeners.remove(listener)
  }

  function trigger (callback) {
    listeners.forEach(listener => listener(callback))
  }

  return {
    route,
    match,
    strategy,
    subscribe,
    unsubscribe,
    trigger
  }
}
