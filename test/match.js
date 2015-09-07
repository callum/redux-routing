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
    location: {
      hash: undefined,
      pathname: '/foo',
      search: undefined
    },
    matcher: '/foo',
    params: {},
    query: undefined,
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
  t.equal(match.location.search, '?bar=baz')
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

  t.equal(match.location.hash, '#bar')
  t.equal(match.url, '/foo#bar')
})

test('accepts url strings', t => {
  t.plan(1)

  const router = createRouter()
  router.route('/foo/:bar')
  const match = router.match('/foo/bar?baz=quux#123')

  t.deepEqual(match.location, {
    hash: '#123',
    pathname: '/foo/bar',
    search: '?baz=quux'
  })
})
