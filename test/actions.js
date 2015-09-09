import test from 'tape'
import { NAVIGATE, REPLACE } from '../src/constants'
import { navigate, replace } from '../src/actions'

test('navigate action', t => {
  t.plan(1)
  t.deepEqual(navigate('foo'), {
    location: 'foo',
    type: NAVIGATE
  })
})

test('replace action', t => {
  t.plan(1)
  t.deepEqual(replace('foo'), {
    location: 'foo',
    type: REPLACE
  })
})
