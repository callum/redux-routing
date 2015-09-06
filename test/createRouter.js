import 'babelify/polyfill'

import test from 'tape'
import createRouter from '../lib/createRouter'

test('throws on invalid persistence', t => {
  t.plan(1)
  t.throws(() => createRouter('foo'))
})

test('public api', t => {
  t.plan(7)

  const router = createRouter()
  t.ok(router.subscribers instanceof Set)
  t.ok(router.routes instanceof Set)
  t.equal(typeof router.match, 'function')
  t.equal(typeof router.notify, 'function')
  t.equal(typeof router.persistence, 'function')
  t.equal(typeof router.route, 'function')
  t.equal(typeof router.subscribe, 'function')
})
