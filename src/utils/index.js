import { Brick, MainBrick, Slot } from '../components/constants'

export const selectedSlots = (workspace) => {
  const { input, output } = workspace.selectionState.pipe
  let selectedSlots = [input && input.slotId, output && output.slotId]

  return selectedSlots.filter(element => element !== null)
}

export const isSlotSelected = (selectedSlots, slotId) => {
  return selectedSlots.indexOf(slotId) !== -1
}

export const inputSlotPosition = (element, slotId) => {
  const { position, size } = element

  switch(element.Component.WrappedComponent.displayName) {
    case 'Brick':
      const { outputSlots } = element

      return {
        x: position.x + brickSlotXPosition(outputSlots, slotId, size.width),
        y: position.y + size.height + Slot.height
      }
    case 'MainBrick':
      const { inputSlots } = element

      return {
        x: mainBrickSlotXPosition(inputSlots, slotId, size.width),
        y: -Slot.height
      }
    case 'Primitive':
      const slotPosition = innerInputSlotPosition(size)

      return {
        x: position.x + slotPosition.x,
        y: position.y + slotPosition.y
      }
  }
}

export const outputSlotPosition = (element, slotId) => {
  const { position, size } = element

  switch(element.Component.WrappedComponent.displayName) {
    case 'Brick':
      const { inputSlots } = element
      return {
        x: position.x + brickSlotXPosition(inputSlots, slotId, size.width),
        y: position.y
      }
    case 'MainBrick':
      const { outputSlots } = element

      return {
        x: mainBrickSlotXPosition(outputSlots, slotId, size.width),
        y: size.height
      }
  }
}

const brickSlotXPosition = (slots, slotId, width) => {
  return slotXPosition(slots, slotId, width, Brick)
}

const mainBrickSlotXPosition = (slots, slotId, width) => {
  return slotXPosition(slots, slotId, width, MainBrick)
}

const slotXPosition = (slots, slotId, width, constants) => {
  const xOffset = (width - slotGroupWidth(slots, constants)) / 2
  let slotIndex = 0

  for(var i=0; i < slots.length; i++) {
    if(slots[i].id == slotId) {
      slotIndex = i
      break
    }
  }

  return xOffset + (constants.slotOffset + (slotIndex * constants.slotAndOffset))
}

const slotGroupWidth = (slots, constants) => {
  return constants.slotOffset + (slots.length * constants.slotAndOffset)
}

export const innerInputSlotPosition = (size) => {
  return {
    x: (size.width - Slot.width) / 2,
    y: size.height
  }
}
