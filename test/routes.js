import 'babelify/polyfill'

import test from 'tape'
import Router from '../src/Router'

test('adding a route', t => {
  t.plan(3)

  const router = new Router()
  const route = router.route('/foo', 'bar')

  t.ok(route.handler)
  t.ok(route.matcher)
  t.ok(route.path)
})

test('adding route to set', t => {
  t.plan(1)

  const router = new Router()
  const route = router.route('/foo')

  t.ok(router.routes.has(route))
})
