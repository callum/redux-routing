import test from 'tape'
import { NAVIGATE, POP, REPLACE } from '../src/constants'
import { navigate, pop, replace } from '../src/actions'

test('navigate action', t => {
  t.plan(1)

  const action = navigate({
    pathname: '/foo',
    search: '?bar=baz',
    hash: '#quux'
  })

  t.deepEqual(action, {
    hash: '#quux',
    pathname: '/foo',
    search: '?bar=baz',
    type: NAVIGATE
  })
})

test('pop action', t => {
  t.plan(1)

  const action = pop({
    pathname: '/foo',
    search: '?bar=baz',
    hash: '#quux'
  })

  t.deepEqual(action, {
    hash: '#quux',
    pathname: '/foo',
    search: '?bar=baz',
    type: POP
  })
})

test('replace action', t => {
  t.plan(1)

  const action = replace({
    pathname: '/foo',
    search: '?bar=baz',
    hash: '#quux'
  })

  t.deepEqual(action, {
    hash: '#quux',
    pathname: '/foo',
    search: '?bar=baz',
    type: REPLACE
  })
})
