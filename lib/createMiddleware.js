export default function createMiddleware (router) {
  return store => next => action => {
    if (/^@@redux-routing/.test(action.type)) {
      const match = router.match(action)

      if (!match) {
        throw new Error(`Missing route for '${action.pathname}'`)
      }

      const result = next({ ...action, ...match })

      router.persistence(store, result)
      router.notify(match.handler)

      return result
    }

    return next(action)
  }
}
