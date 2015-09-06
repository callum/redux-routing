import 'babelify/polyfill'

import test from 'tape'
import createRouter from '../lib/createRouter'

test('no match', t => {
  t.plan(1)
  t.equal(createRouter().match('/foo'), undefined)
})

test('a match', t => {
  t.plan(1)

  function handler () {
  }

  const router = createRouter()
  router.route('/foo', handler)

  t.deepEqual(router.match('/foo'), {
    matcher: '/foo',
    params: {},
    pathname: '/foo',
    query: undefined,
    search: undefined,
    handler
  })
})

test('a match with a search string', t => {
  t.plan(2)

  const router = createRouter()
  router.route('/foo')

  const match = router.match('/foo', '?bar=baz')
  t.deepEqual(match.query, { bar: 'baz' })
  t.equal(match.search, '?bar=baz')
})
