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

      let { location } = action

      if (typeof location === 'string') {
        location = url.parse(action.location)
      }

      let query

      if (location.search) {
        query = querystring.parse(location.search.slice(1))
      }

      location = {
        hash: location.hash || undefined,
        pathname: location.pathname,
        search: location.search || undefined
      }

      const result = next({
        ...action,
        url: url.format(location),
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
