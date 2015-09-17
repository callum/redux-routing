import test from 'tape'
import { NAVIGATE, REPLACE } from '../src/constants'
import reducer from '../src/reducer'

test('initial state', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, {}), {})
})

function action (type) {
  return {
    location: {
      hash: 'foo',
      pathname: 'bar',
      search: 'baz'
    },
    href: 'baz',
    query: 'bar',
    type
  }
}

const expected = {
  location: {
    hash: 'foo',
    pathname: 'bar',
    search: 'baz'
  },
  href: 'baz',
  query: 'bar'
}

test('handle navigate', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, action(NAVIGATE)), expected)
})

test('handle replace', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, action(REPLACE)), expected)
})
