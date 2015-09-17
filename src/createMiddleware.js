import querystring from 'querystring'
import url from 'url'

export default function createMiddleware (History) {
  return store => {
    let history

    if (History) {
      history = new History(store)
      history.listen()
    }

    return next => action => {
      if (!/^@@redux-routing/.test(action.type)) {
        return next(action)
      }

      const parsed = url.parse(action.href)

      const location = {
        hash: parsed.hash || undefined,
        pathname: parsed.pathname,
        search: parsed.search || undefined
      }

      let query

      if (parsed.query) {
        query = querystring.parse(parsed.query)
      }

      const result = next({
        ...action,
        href: url.format(location),
        location,
        query
      })

      if (history) {
        history.update(result)
      }

      return result
    }
  }
}
