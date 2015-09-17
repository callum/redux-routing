import test from 'tape'
import createMiddleware from '../src/createMiddleware'
import Hash from '../src/Hash'
import History from '../src/History'
import match from '../src/match'
import reducer from '../src/reducer'
import route from '../src/route'
import { navigate, replace } from '../src/actions'
import * as exported from '../src'

test('exports', t => {
  t.plan(8)
  t.equal(exported.createMiddleware, createMiddleware)
  t.equal(exported.Hash, Hash)
  t.equal(exported.History, History)
  t.equal(exported.match, match)
  t.equal(exported.navigate, navigate)
  t.equal(exported.reducer, reducer)
  t.equal(exported.replace, replace)
  t.equal(exported.route, route)
})
