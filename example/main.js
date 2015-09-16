import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMiddleware, History, navigate, reducer, Router } from '../src'
import Handler from './Handler'
import Root from './Root'

const router = new Router()
const middleware = createMiddleware(History)

router.route('/', Handler)
router.route('/foo', Handler)
router.route('/foo/:bar', Handler)

const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

store.dispatch(navigate(window.location))

React.render(<Provider store={store}>
  {() => <Root router={router} />}
</Provider>, document.getElementById('root'))
