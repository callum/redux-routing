import test from 'tape'
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
