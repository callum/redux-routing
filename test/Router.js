import 'babelify/polyfill'

import test from 'tape'
import Router from '../src/Router'

test('throws on invalid history', t => {
  t.plan(1)
  t.throws(() => new Router('foo'))
})

test('public api', t => {
  t.plan(8)

  const router = new Router()

  t.ok(router.subscribers instanceof Set)
  t.ok(router.routes instanceof Set)
  t.equal(typeof router.history, 'function')
  t.equal(typeof router.match, 'function')
  t.equal(typeof router.notify, 'function')
  t.equal(typeof router.route, 'function')
  t.equal(typeof router.subscribe, 'function')
  t.equal(typeof router.unsubscribe, 'function')
})
