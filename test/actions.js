import test from 'tape'
import { NAVIGATE, POP, REPLACE } from '../src/constants'
import { navigate, pop, replace } from '../src/actions'

test('navigate action', t => {
  t.plan(1)
  t.deepEqual(navigate('foo'), {
    location: 'foo',
    type: NAVIGATE
  })
})

test('pop action', t => {
  t.plan(1)
  t.deepEqual(pop('foo'), {
    location: 'foo',
    type: POP
  })
})

test('replace action', t => {
  t.plan(1)
  t.deepEqual(replace('foo'), {
    location: 'foo',
    type: REPLACE
  })
})
