import React, { Component, PropTypes } from 'react'
import { Path, Shape } from 'react-art'

import { SizePropTypes } from '../propTypes'

class Ellipse extends Component {
  render() {
    const {
      fillColor,
      size
    } = this.props

    const xRadius = size.width / 2
    const yRadius = size.height / 2

    const path = new Path()
    path.move(0, yRadius)
    path.arc(size.width, 0, xRadius, yRadius)
    path.arc(-size.width, 0, xRadius, yRadius)
    path.close()

    return (
      <Shape
        fill={ fillColor }
        d={ path }
        stroke={ fillColor }
      />
    )
  }
}

Ellipse.propTypes = {
  fillColor: PropTypes.string.isRequired,
  size: SizePropTypes.isRequired
}

export default Ellipse
