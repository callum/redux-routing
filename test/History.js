import test from 'tape'
import { NAVIGATE } from '../src/constants'
import History from '../src/History'

test('popstate listener', t => {
  t.plan(1)

  const { addEventListener } = window

  window.addEventListener = event => {
    window.addEventListener = addEventListener
    t.equal(event, 'popstate')
  }

  const history = new History()
  history.listen()
})

test('push or replace on navigate', t => {
  t.plan(2)

  const history = new History()
  history.getCurrentUrl = () => '/foo'
  history.replaceUrl = url => t.equal(url, '/foo')
  history.pushUrl = url => t.equal(url, '/foo/bar')

  history.update({ type: NAVIGATE, url: '/foo' })
  history.update({ type: NAVIGATE, url: '/foo/bar' })
})

test('call pushState', t => {
  t.plan(3)

  const { pushState } = window.history

  function stub (state, title, url) {
    window.history.pushState = pushState
    t.equal(state, '/foo')
    t.equal(title, null)
    t.equal(url, '/foo')
  }

  window.history.pushState = stub

  const history = new History()
  history.pushUrl('/foo')
})

test('call replaceState', t => {
  t.plan(3)

  const { replaceState } = window.history

  function stub (state, title, url) {
    window.history.replaceState = replaceState
    t.equal(state, '/foo')
    t.equal(title, null)
    t.equal(url, '/foo')
  }

  window.history.replaceState = stub

  const history = new History()
  history.replaceUrl('/foo')
})

test('on popstate', t => {
  t.plan(1)

  const store = {
    dispatch (value) {
      t.ok(value)
    }
  }

  const history = new History(store)
  history.onPopUrl('/foo')
})
