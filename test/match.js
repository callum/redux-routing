import 'babelify/polyfill'

import test from 'tape'
import Router from '../src/Router'

test('no match', t => {
  t.plan(1)
  t.equal(new Router().match({ pathname: '/foo' }), undefined)
})

test('a match', t => {
  t.plan(1)

  function handler () {
  }

  const router = new Router()
  router.route('/foo', handler)
  const match = router.match({ pathname: '/foo' })

  t.deepEqual(match, {
    matcher: '/foo',
    params: {},
    handler
  })
})

test('location as a string', t => {
  t.plan(1)

  const router = new Router()
  router.route('/foo')
  const match = router.match('/foo')

  t.ok(match)
})
