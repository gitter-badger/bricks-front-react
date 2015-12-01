import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'
import Rectangle from 'react-art/lib/Rectangle.art'
import Circle from 'react-art/lib/Circle.art'
import Constants from './constants'
import { PositionPropTypes } from '../propTypes'

export default class Primitive extends Component {
  constructor(props) {
    super(props)

    this._constants = Constants
  }

  render() {
    const {
      id,
      name,
      handleMouseDown,
      handleMouseUp,
      position,
      value
    } = this.props
    const { Primitive, Slot } = this._constants
    const fillColor = Primitive.fillColor[name]

    return (
      <Group x={ position.x } y={ position.y } >
        <Group
          onMouseDown={ (e) => {
              handleMouseDown(id, { x: e.clientX, y: e.clientY })
            }
          }
          onMouseUp={ (e) => { handleMouseUp() } }
        >
          <Circle
            fill={ fillColor }
            radius={ Primitive.radius }
            stroke={ fillColor }
            strokeWidth={ Primitive.strokeWidth }
            x={ Primitive.radius / 2 }
            y={ Primitive.radius / 2 }
          />
          <Text
            fill={ Primitive.textColor }
            font={ Primitive.font }
          >
            { value === null ? "<NONE>" : value }
          </Text>
        </Group>
        <Rectangle
          cursor={ Slot.cursor }
          fill={ fillColor }
          height={ Slot.height }
          width={ Slot.width }
          x={ (Primitive.radius / 2)- (Slot.width / 2) }
          y={ Primitive.radius + Slot.height }
        />
      </Group>
    )
  }
}

Primitive.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleMouseUp: PropTypes.func.isRequired,
  position: PositionPropTypes.isRequired,
  value: PropTypes.any
}
