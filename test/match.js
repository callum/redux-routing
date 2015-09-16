import 'babelify/polyfill'

import test from 'tape'
import match from '../src/match'

test('no match', t => {
  t.plan(1)
  t.equal(match({ pathname: '/foo' }, []), undefined)
})

test('a match', t => {
  t.plan(1)

  function handler () {
  }

  const routes = [
    {
      handler,
      path: '/foo',
      matcher: {
        match: () => ({})
      }
    }
  ]

  const matched = match({ pathname: '/foo' }, routes)

  t.deepEqual(matched, {
    handler,
    params: {},
    path: '/foo'
  })
})

test('location as a string', t => {
  t.plan(1)

  const matched = match('/foo', [{ matcher: '/foo' }])
  t.ok(matched)
})

test('a map for routes', t => {
  t.plan(1)

  const routes = new Map([
    ['foo', { matcher: '/foo' }]
  ])

  t.doesNotThrow(() => match('/foo', routes))
})
