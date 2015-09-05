# redux-router

Routing with redux

## example

```js
import { applyMiddleware, createStore } from 'redux'
import { createMiddleware, createRouter, history, navigate, replace, reducer } from 'redux-router'

const router = createRouter(history)
const middleware = createMiddleware(router)

router.route('/', () => console.log('foo'))
router.route('/foo', () => console.log('bar'))
router.route('/foo/:bar', () => console.log('baz'))

const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

const unsubscribe = router.subscribe(handler => {
  console.log('navigated')
  handler()
})

store.dispatch(replace('/'))
store.dispatch(navigate('/foo'))
store.dispatch(navigate('/foo/123'))

unsubscribe()
```
