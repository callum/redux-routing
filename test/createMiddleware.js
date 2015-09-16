import 'babelify/polyfill'

import test from 'tape'
import createMiddleware from '../src/createMiddleware'

function noop () {
}

test('sets up history', t => {
  t.plan(2)

  class History {
    constructor () {
      t.pass()
    }

    listen () {
      t.pass()
    }
  }

  const middleware = createMiddleware(History)
  middleware()
})

test('ignore actions outside of redux-routing', t => {
  t.plan(1)

  function next (action) {
    t.equal(action, 'foo')
  }

  const middleware = createMiddleware()
  middleware()(next)('foo')
})

test('calling next and returning a value', t => {
  t.plan(5)

  function next (result) {
    t.pass()
    return result
  }

  const middleware = createMiddleware()

  const result = middleware()(next)({
    location: {
      hash: '#quux',
      pathname: '/foo',
      search: '?bar=baz'
    },
    type: '@@redux-routing/foo'
  })

  t.deepEqual(result.location, {
    hash: '#quux',
    pathname: '/foo',
    search: '?bar=baz'
  })
  t.equal(result.type, '@@redux-routing/foo')
  t.equal(result.url, '/foo?bar=baz#quux')
  t.deepEqual(result.query, { bar: 'baz' })
})

test('updating history', t => {
  t.plan(1)

  class History {
    listen () {
    }

    update () {
      t.pass()
    }
  }

  const middleware = createMiddleware(History)

  middleware()(noop)({
    location: {
      pathname: '/foo'
    },
    type: '@@redux-routing/foo'
  })
})
