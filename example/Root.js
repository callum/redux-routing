import React, { Component } from 'react'
import { connect } from 'react-redux'
import { match } from '../src'

@connect(route => ({ route }))
export default class Root extends Component {
  render () {
    const matched = match(this.props.route.location, this.props.routes)

    if (matched) {
      return <matched.handler {...this.props} />
    } else {
      return <div>404 not found</div>
    }
  }
}
