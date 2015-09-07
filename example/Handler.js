import React, { Component } from 'react'
import { connect } from 'react-redux'
import { navigate } from '../src'

@connect(route => ({ route }))
export default class Handler extends Component {
  render () {
    return <div>
      <h1>route</h1>
      <code>
        <pre>{JSON.stringify(this.props.route)}</pre>
      </code>
      <ol>
        <li><a href="/" onClick={this.onNavigate.bind(this)}>/</a></li>
        <li><a href="/foo" onClick={this.onNavigate.bind(this)}>/foo</a></li>
        <li><a href="/foo/bar" onClick={this.onNavigate.bind(this)}>/foo/bar</a></li>
        <li><a href="/foo/bar?baz=quux#123" onClick={this.onNavigate.bind(this)}>/foo/bar?baz=quux#123</a></li>
        <li><a href="/foo/bar/baz" onClick={this.onNavigate.bind(this)}>/foo/bar/baz</a></li>
      </ol>
    </div>
  }

  onNavigate (event) {
    event.preventDefault()

    const anchor = event.target

    this.props.dispatch(navigate({
      hash: anchor.hash,
      pathname: anchor.pathname,
      search: anchor.search
    }))
  }
}
