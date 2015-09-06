import test from 'tape'
import { NAVIGATE, POP, REPLACE } from '../lib/constants'
import reducer from '../lib/reducer'

test('initial state', t => {
  t.plan(1)
  t.deepEqual(reducer(undefined, {}), {})
})

function action (type) {
  return {
    matcher: 'foo',
    params: 'bar',
    pathname: 'baz',
    query: 'quux',
    search: 'norf',
    type
  }
}

const expected = {
  matcher: 'foo',
  params: 'bar',
  pathname: 'baz',
  query: 'quux',
  search: 'norf'
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
