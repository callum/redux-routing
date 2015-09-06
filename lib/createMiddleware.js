export default function createMiddleware (router) {
  return store => next => action => {
    if (/^@@redux-router/.test(action.type)) {
      const match = router.match(action.pathname, action.search)

      if (!match) {
        throw new Error(`Missing route for '${action.pathname}'`)
      }

      const result = next({ ...action, ...match })

      router.persistence(store, action)
      router.notify(match.handler)

      return result
    }

    return next(action)
  }
}
