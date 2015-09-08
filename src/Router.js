import Path from 'path-parser'
import url from 'url'

export default class Router {
  constructor (history = () => {}) {
    if (typeof history !== 'function') {
      throw new Error('Expected history to be a function')
    }

    this.history = history
    this.routes = new Set()
    this.subscribers = new Set()
  }

  match (location) {
    let matcher = location

    if (typeof location === 'string') {
      matcher = url.parse(location)
    }

    for (const route of this.routes) {
      const match = route.path.match(matcher.pathname)

      if (match) {
        return {
          handler: route.handler,
          matcher: route.matcher,
          params: match
        }
      }
    }
  }

  route (matcher, handler) {
    const route = {
      path: new Path(matcher),
      handler,
      matcher
    }

    this.routes.add(route)

    return route
  }

  notify (callback) {
    this.subscribers.forEach(subscriber => subscriber(callback))
  }

  subscribe (subscriber) {
    this.subscribers.add(subscriber)
  }

  unsubscribe (subscriber) {
    this.subscribers.delete(subscriber)
  }
}
