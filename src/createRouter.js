import Path from 'path-parser'
import querystring from 'querystring'
import url from 'url'

export default function createRouter (persistence = () => {}) {
  if (typeof persistence !== 'function') {
    throw new Error('Expected persistence to be a function')
  }

  const subscribers = new Set()
  const routes = new Set()

  function match (location) {
    if (typeof location === 'string') {
      location = url.parse(location)
    }

    for (let route of routes) {
      const match = route.path.match(location.pathname)

      if (match) {
        let query

        location = {
          hash: location.hash,
          pathname: location.pathname,
          search: location.search
        }

        if (location.search) {
          query = querystring.parse(location.search.slice(1))
        }

        return {
          handler: route.handler,
          matcher: route.matcher,
          params: match,
          url: url.format(location),
          location,
          query
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
