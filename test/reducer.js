import test from 'tape'
import { NAVIGATE, POP, REPLACE } from '../src/constants'
import reducer from '../src/reducer'

test('initial state', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, {}), {})
})

function action (type) {
  return {
    location: {
      hash: 'foo',
      pathname: 'quux',
      search: 'bar'
    },
    matcher: 'bar',
    params: 'baz',
    query: 'foo',
    url: 'baz',
    type
  }
}

const expected = {
  location: {
    hash: 'foo',
    pathname: 'quux',
    search: 'bar'
  },
  matcher: 'bar',
  params: 'baz',
  query: 'foo',
  url: 'baz'
}

test('handle navigate', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, action(NAVIGATE)), expected)
})

test('handle pop', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, action(POP)), expected)
})

test('handle replace', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, action(REPLACE)), expected)
})
