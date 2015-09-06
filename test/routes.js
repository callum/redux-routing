import 'babelify/polyfill'

import test from 'tape'
import Path from 'path-parser'
import createRouter from '../src/createRouter'

test('adding a route', t => {
  t.plan(3)

  function handler () {
  }

  const route = createRouter().route('/foo', handler)
  t.equal(route.handler, handler)
  t.equal(route.matcher, '/foo')
  t.ok(route.path instanceof Path)
})

test('adding route to set', t => {
  t.plan(1)
  const router = createRouter()
  const route = router.route('/foo')
  t.ok(router.routes.has(route))
})
