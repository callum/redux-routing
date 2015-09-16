import test from 'tape'
import route from '../src/route'

test('creating a route', t => {
  t.plan(4)

  const foo = route('/foo', 'bar')

  t.equal(foo.handler, 'bar')
  t.equal(foo.path, '/foo')
  t.equal(typeof foo.build, 'function')
  t.ok(foo.matcher)
})
