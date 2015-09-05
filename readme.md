# redux-router

Routing with redux

## example

```js
import { applyMiddleware, createStore } from 'redux'
import { createMiddleware, createRouter, history, navigate, replace, reducer } from 'redux-router'

// create a router using html5 history
const router = createRouter(history)

// configure routes, mapping urls to handlers
router.route('/', () => console.log('foo'))
router.route('/foo', () => console.log('bar'))
router.route('/foo/:bar', () => console.log('baz'))

// subscribe to changes and call handlers as defined above
router.subscribe(handler => handler())

// create routing middleware and set up store
const middleware = createMiddleware(router)
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// start routing
store.dispatch(replace('/'))
// logs 'foo'
store.dispatch(navigate('/foo'))
// logs 'bar'
store.dispatch(navigate('/foo/123'))
// logs 'baz'
store.dispatch(navigate('/foo/123', '?name=callum'))
// logs 'baz'

console.log(store.getState())
// {
//   matcher: '/foo/:bar',
//   params: {
//     bar: 123
//   },
//   pathname: '/foo/123',
//   query: {
//     name: 'callum'
//   },
//   search: '?name=callum'
// }
```

For usage with React see `example/main.js`
