import Path from 'path-parser'
import qs from 'qs'

export default function createRouter (persistence = () => {}) {
  if (typeof persistence !== 'function') {
    throw new Error('Expected persistence to be a function')
  }

  const subscribers = new Set()
  const routes = new Set()

  function match (location) {
    const { hash, pathname, search } = location

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
          url: locationUrl(location),
          hash,
          pathname,
          query,
          search
        }
      }
    }
  }

  function route (matcher, handler) {
    const route = {
      path: new Path(matcher),
      handler,
      matcher
    }

    routes.add(route)
    return route
  }

  function subscribe (listener) {
    subscribers.add(listener)

    return function unsubscribe () {
      subscribers.delete(listener)
    }
  }

  function notify (callback) {
    subscribers.forEach(subscriber => subscriber(callback))
  }

  return {
    match,
    notify,
    persistence,
    route,
    routes,
    subscribe,
    subscribers
  }
}

function locationUrl(location) {
  let url = location.pathname

  if (location.search) url += location.search
  if (location.hash) url += location.hash

  return url
}
