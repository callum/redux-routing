import url from 'url'

export default function match (location, routes) {
  if (typeof location === 'string') {
    location = url.parse(location)
  }

  if (routes instanceof Map) {
    routes = routes.values()
  }

  for (const route of routes) {
    const matched = route.matcher.match(location.pathname)

    if (matched) {
      return {
        handler: route.handler,
        params: matched,
        path: route.path
      }
    }
  }
}
