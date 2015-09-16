import 'babelify/polyfill'

import test from 'tape'
import Router from '../src/Router'

test('public api', t => {
  t.plan(3)

  const router = new Router(() => {})

  t.ok(router.routes instanceof Set)
  t.equal(typeof router.match, 'function')
  t.equal(typeof router.route, 'function')
})
