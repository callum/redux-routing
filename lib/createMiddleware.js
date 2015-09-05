export default function createMiddleware (router) {
  return store => next => action => {
    if (action.type.startsWith('@@redux-router')) {
      const match = router.match(action.pathname, action.search)

      if (!match) {
        throw new Error(`Missing route for '${action.pathname}'`)
      }

      const result = next({ ...action, ...match })

      router.strategy(store, action)
      router.trigger(match.handler)

      return result
    }

    return next(action)
  }
}
