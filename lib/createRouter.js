import Path from 'path-parser'
import qs from 'qs'

export default function createRouter (strategy = () => {}) {
  if (typeof strategy !== 'function') {
    throw new Error('Expected strategy to be a function')
  }

  const listeners = new Set()
  const routes = new Set()

  function match (pathname, search) {
    for (let route of routes) {
      const match = route.path.match(pathname)

      if (match) {
        let query

        if (search) {
          query = qs.parse(search.slice(1))
        }

        return {
          handler: route.handler,
          matcher: route.matcher,
          params: match,
          pathname,
          query,
          search
        }
      }
    }
  }

  function route (matcher, handler) {
    routes.add({
      path: new Path(matcher),
      matcher,
      handler
    })
  }

  function subscribe (listener) {
    return listeners.add(listener)
  }

  function trigger (callback) {
    listeners.forEach(listener => listener(callback))
  }

  function unsubscribe (listener) {
    listeners.remove(listener)
  }

  return {
    match,
    route,
    strategy,
    subscribe,
    trigger,
    unsubscribe
  }
}
