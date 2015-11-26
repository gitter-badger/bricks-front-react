import React, { PropTypes, Component } from 'react'
import { Group } from 'react-art'
import Rectangle from 'react-art/lib/Rectangle.art'

export default function composeBrick(InnerComponent, _constants) {
  class AbstractBrick extends Component {
    constructor(props) {
      super(props)

      this.renderSlot = this.renderSlot.bind(this)
      this.slotGroup = this.slotGroup.bind(this)
    }

    render() {
      const { inputSlots, outputSlots, position, size } = this.props
      const { Brick, Slot } = _constants

      return (
        <Group x={ position.x } y={ position.y }>
          { this.slotGroup(inputSlots, 0) }
          <Rectangle
            height={ size.height }
            width={ size.width }
            y={ Slot.height }
            stroke={ Brick.strokeColor }
            fill={ Brick.fillColor }
          />
          { this.slotGroup(outputSlots, size.height + Slot.height) }
          <InnerComponent { ...this.props } />
        </Group>
      )
    }

    slotGroup(slots, y) {
      const { size } = this.props
      const { Brick } = _constants
      const slotsWidth = Brick.slotOffset + (slots.length * Brick.slotAndOffset)
      const xOffset = (size.width - slotsWidth) / 2

      return (
        <Group x={ xOffset } y={ y }>
          { slots.map(this.renderSlot) }
        </Group>
      )
    }

    renderSlot(slot, index) {
      const { Brick, Slot } = _constants
      const x = Brick.slotOffset + (index * Brick.slotAndOffset)

      return (
        <Rectangle
          key={ slot.id }
          height={ Slot.height }
          width={ Slot.width }
          x={ x }
          cursor={ Slot.cursor }
          fill={ Brick.fillColor }
          stroke={ Brick.strokeColor }
        />
      )
    }
  }

  const PositionPropTypes =
    PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })

  const SizePropTypes =
    PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired
      })

  const SlotPropTypes =
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      }).isRequired
    ).isRequired

  AbstractBrick.propTypes = {
    inputSlots: SlotPropTypes,
    outputSlots: SlotPropTypes,
    position: PositionPropTypes.isRequired,
    size: SizePropTypes.isRequired
  }

  return AbstractBrick
}
