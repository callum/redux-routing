import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createMiddleware, createRouter, history, replace, reducer } from '../'
import Handler from './Handler'

const router = createRouter(history)
const middleware = createMiddleware(router)

router.route('/', Handler)
router.route('/foo', Handler)
router.route('/foo/:bar', Handler)

const createStoreWithMiddleware = applyMiddleware(middleware)(createStore)
const store = createStoreWithMiddleware(reducer)

router.subscribe(Handler => {
  React.render(<Provider store={store}>
    {() => <Handler />}
  </Provider>, document.getElementById('root'))
})

store.dispatch(replace('/'))
