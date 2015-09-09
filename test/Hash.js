import test from 'tape'
import { NAVIGATE } from '../src/constants'
import Hash from '../src/Hash'

test('hashchange listener', t => {
  t.plan(1)

  const { addEventListener } = window

  window.addEventListener = event => {
    window.addEventListener = addEventListener
    t.equal(event, 'hashchange')
  }

  const hash = new Hash()
  hash.listen()
})

test('update state', t => {
  t.plan(1)

  const hash = new Hash()
  hash.update({ url: '/foo' })
  t.equal(hash.url, '/foo')
})

test('push on navigate', t => {
  t.plan(1)

  const hash = new Hash()
  hash.pushUrl = url => t.equal(url, '/foo')
  hash.update({ type: NAVIGATE, url: '/foo' })
})

test('on hashchange', t => {
  t.plan(1)

  const store = {
    dispatch (value) {
      t.ok(value)
    }
  }

  const hash = new Hash(store)
  hash.url = '/foo'

  hash.onPopUrl('/foo')
  hash.onPopUrl('/foo/bar')
})
