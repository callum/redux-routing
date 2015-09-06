import 'babelify/polyfill'

import test from 'tape'
import createRouter from '../src/createRouter'

test('no match', t => {
  t.plan(1)
  t.equal(createRouter().match({ pathname: '/foo' }), undefined)
})

test('a match', t => {
  t.plan(1)

  function handler () {
  }

  const router = createRouter()
  router.route('/foo', handler)

  t.deepEqual(router.match({ pathname: '/foo' }), {
    hash: undefined,
    matcher: '/foo',
    params: {},
    pathname: '/foo',
    query: undefined,
    search: undefined,
    url: '/foo',
    handler
  })
})

test('a match with a search', t => {
  t.plan(3)

  const router = createRouter()
  router.route('/foo')

  const match = router.match({
    pathname: '/foo',
    search: '?bar=baz'
  })

  t.deepEqual(match.query, { bar: 'baz' })
  t.equal(match.search, '?bar=baz')
  t.equal(match.url, '/foo?bar=baz')
})

test('a match with a hash', t => {
  t.plan(2)

  const router = createRouter()
  router.route('/foo')

  const match = router.match({
    hash: '#bar',
    pathname: '/foo'
  })

  t.equal(match.hash, '#bar')
  t.equal(match.url, '/foo#bar')
})
