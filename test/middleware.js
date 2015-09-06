import 'babelify/polyfill'

import test from 'tape'
import createMiddleware from '../lib/createMiddleware'
import createRouter from '../lib/createRouter'

function noop () {
}

test('ignore actions outside of redux-routing', t => {
  t.plan(1)

  function next (action) {
    t.equal(action, 'foo')
  }

  const middleware = createMiddleware()
  middleware()(next)('foo')
})

test('throws on invalid route', t => {
  t.plan(1)

  const middleware = createMiddleware(createRouter())

  t.throws(() => {
    middleware()()({
      pathname: '/foo',
      search: '?bar=baz',
      type: '@@redux-routing/foo'
    })
  })
})

test('calling next and returning a value', t => {
  t.plan(6)

  function handler () {
  }

  function next (result) {
    t.pass()
    return result
  }

  const router = createRouter()
  router.route('/foo', handler)
  const middleware = createMiddleware(router)

  const result = middleware()(next)({
    hash: '#quux',
    pathname: '/foo',
    search: '?bar=baz',
    type: '@@redux-routing/foo'
  })

  t.equal(result.handler, handler)
  t.equal(result.hash, '#quux')
  t.equal(result.pathname, '/foo')
  t.equal(result.search, '?bar=baz')
  t.equal(result.type, '@@redux-routing/foo')
})

test('calling persistence', t => {
  t.plan(1)

  const router = createRouter()
  router.persistence = () => t.pass()
  router.route('/foo')

  const middleware = createMiddleware(router)

  middleware()(noop)({
    pathname: '/foo',
    type: '@@redux-routing/foo'
  })
})

test('calling notify', t => {
  t.plan(1)

  const router = createRouter()
  router.notify = () => t.pass()
  router.route('/foo')

  const middleware = createMiddleware(router)

  middleware()(noop)({
    pathname: '/foo',
    type: '@@redux-routing/foo'
  })
})
