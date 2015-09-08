import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(state => ({ route: state }))
export default class Root extends Component {
  render () {
    const match = this.props.router.match(this.props.route.location)

    if (match) {
      return <match.handler {...this.props} params={match.params} />
    } else {
      return <div>404 not found</div>
    }
  }
}
