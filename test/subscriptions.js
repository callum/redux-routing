import 'babelify/polyfill'

import test from 'tape'
import createRouter from '../src/createRouter'

test('add subscriber to set', t => {
  t.plan(1)

  function subscriber () {
  }

  const router = createRouter()
  router.subscribe(subscriber)
  t.ok(router.subscribers.has(subscriber))
})

test('delete subscriber from set', t => {
  t.plan(2)

  function subscriber () {
  }

  const router = createRouter()
  const unsubscribe = router.subscribe(subscriber)

  t.ok(router.subscribers.has(subscriber))
  unsubscribe()
  t.notOk(router.subscribers.has(subscriber))
})

test('notify', t => {
  t.plan(1)

  function callback () {
  }

  const router = createRouter()
  router.subscribe(cb => t.equal(cb, callback))
  router.notify(callback)
})
