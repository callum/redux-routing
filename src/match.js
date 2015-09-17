import url from 'url'

export default function match (href, routes) {
  const parsed = url.parse(href)

  for (const route of routes) {
    const matched = route.matcher.match(parsed.pathname)

    if (matched) {
      return {
        handler: route.handler,
        params: matched,
        path: route.path
      }
    }
  }
}
