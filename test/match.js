import test from 'tape'
import Path from 'path-parser'
import match from '../src/match'

test('no match', t => {
  t.plan(1)
  t.equal(match('/foo', []), undefined)
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

  const matched = match('/foo', routes)

  t.deepEqual(matched, {
    handler,
    params: {},
    path: '/foo'
  })
})

test('a match with query string parameters', t => {
  t.plan(1)

  function handler () {
  }

  const path = '/foo?:bar'

  const routes = [
    {
      handler,
      path,
      matcher: new Path(path)
    }
  ]

  const matched = match('/foo?bar=baz', routes)

  t.deepEqual(matched, {
    handler,
    params: { bar: 'baz' },
    path: '/foo?:bar'
  })
})
