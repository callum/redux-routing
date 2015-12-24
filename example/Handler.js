import React from 'react'
import { navigate } from 'redux-routing'

const Handler = props => {
  const onNavigate = event => {
    event.preventDefault()
    props.dispatch(navigate(event.target.href))
  }

  return <div>
    <h1>route</h1>
    <code>
      <pre>{JSON.stringify(props.route)}</pre>
    </code>
    <ol>
      <li><a href="/" onClick={onNavigate}>/</a></li>
      <li><a href="/foo" onClick={onNavigate}>/foo</a></li>
      <li><a href="/foo/bar" onClick={onNavigate}>/foo/bar</a></li>
      <li><a href="/foo/bar?baz=quux#123" onClick={onNavigate}>/foo/bar?baz=quux#123</a></li>
      <li><a href="/foo/bar/baz" onClick={onNavigate}>/foo/bar/baz</a></li>
      <li><a href="/baz" onClick={onNavigate}>/baz</a></li>
    </ol>
  </div>
}

export default Handler
