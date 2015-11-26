import React, { PropTypes, Component } from 'react'
import { Group } from 'react-art'

import composeBrick from './composeBrick'
import Constants from './constants'
import Primitive from './Primitive'

class RootBrick extends Component {
  render() {
    const { inner } = this.props

    return (
      <Group>
        { inner.map((primitive) => {
            return (
              <Primitive
                key={ primitive.id }
                { ...primitive }
              />
            )
          })
        }
      </Group>
    )
  }
}

const PositionPropTypes =
  PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    })

RootBrick.propTypes = {
  inner: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      position: PositionPropTypes.isRequired,
      value: PropTypes.any
    })
  ).isRequired,
}

export default composeBrick(
  RootBrick,
  {
    Slot: Constants.Slot,
    Brick: Constants.RootBrick
  }
)
