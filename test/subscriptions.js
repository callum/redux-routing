import 'babelify/polyfill'

import test from 'tape'
import Router from '../src/Router'

test('add subscriber to set', t => {
  t.plan(1)

  function subscriber () {
  }

  const router = new Router()
  router.subscribe(subscriber)
  t.ok(router.subscribers.has(subscriber))
})

test('delete subscriber from set', t => {
  t.plan(2)

  function subscriber () {
  }

  const router = new Router()
  router.subscribe(subscriber)

  t.ok(router.subscribers.has(subscriber))
  router.unsubscribe(subscriber)
  t.notOk(router.subscribers.has(subscriber))
})

test('notify', t => {
  t.plan(1)

  function callback () {
  }

  const router = new Router()
  router.subscribe(cb => t.equal(cb, callback))
  router.notify(callback)
})
