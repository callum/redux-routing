import test from 'tape'
import createMiddleware from '../src/createMiddleware'
import Hash from '../src/Hash'
import History from '../src/History'
import reducer from '../src/reducer'
import Router from '../src/Router'
import { navigate, replace } from '../src/actions'
import * as exported from '../src'

test('exports', t => {
  t.plan(7)
  t.equal(exported.createMiddleware, createMiddleware)
  t.equal(exported.Hash, Hash)
  t.equal(exported.History, History)
  t.equal(exported.reducer, reducer)
  t.equal(exported.Router, Router)
  t.equal(exported.navigate, navigate)
  t.equal(exported.replace, replace)
})
