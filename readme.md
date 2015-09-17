# redux-routing

[![Build Status](https://travis-ci.org/callum/redux-routing.svg?branch=master)](https://travis-ci.org/callum/redux-routing)

Universal routing built on top of [redux](https://github.com/rackt/redux).

For usage with React see [example/main.js](example/main.js). See [redux-routing-universal-example](https://github.com/callum/redux-routing-universal-example) for an example of a universal application that renders on both client and server.

## install

```
npm install redux-routing --save
```

## how it works

```js
import { applyMiddleware, createStore } from 'redux'
import { createMiddleware, History, match, navigate, reducer, route } from 'redux-routing'

// define routes
const routes = [
  route('/', () => console.log('navigated to /')),
  route('/foo', () => console.log('navigated to /foo')),
  route('/foo/:bar', () => console.log('navigated to /foo/:bar'))
]

// create routing middleware, set up with HTML5 History
const middleware = createMiddleware(History)

// create store with middleware
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

// subscribe to changes
store.subscribe(() => {
  const route = store.getState()
  const matched = match(route.href, routes)

  if (matched) {
    matched.handler()
  } else {
    console.log('404 not found')
  }
})

// start navigating
store.dispatch(navigate('/'))
// logs 'navigated to /'
store.dispatch(navigate('/foo'))
// logs 'navigated to /foo'
store.dispatch(navigate('/foo/123'))
// logs 'navigated to /foo/:bar'
store.dispatch(navigate('/foo/bar/baz'))
// logs '404 not found'
```

See [path-parser](https://github.com/troch/path-parser) for more detail on defining routes.
