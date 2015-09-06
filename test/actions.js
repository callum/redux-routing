import test from 'tape'
import { NAVIGATE, POP, REPLACE } from '../lib/constants'
import { navigate, pop, replace } from '../lib/actions'

test('navigate action', t => {
  t.plan(1)

  t.deepEqual(navigate('/foo', '?bar=baz'), {
    pathname: '/foo',
    search: '?bar=baz',
    type: NAVIGATE
  })
})

test('pop action', t => {
  t.plan(1)

  t.deepEqual(pop('/foo', '?bar=baz'), {
    pathname: '/foo',
    search: '?bar=baz',
    type: POP
  })
})

test('replace action', t => {
  t.plan(1)

  t.deepEqual(replace('/foo', '?bar=baz'), {
    pathname: '/foo',
    search: '?bar=baz',
    type: REPLACE
  })
})
