import Path from 'path-parser'
import url from 'url'

export default class Router {
  constructor () {
    this.routes = new Set()
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
}
