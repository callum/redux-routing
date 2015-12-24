import React from 'react'
import { connect } from 'react-redux'
import { match } from 'redux-routing'

const Root = props => {
  const matched = match(props.route.href, props.routes)

  if (matched) {
    return <matched.handler {...props} />
  } else {
    return <div>404 not found</div>
  }
}

export default connect(route => ({ route }))(Root)
