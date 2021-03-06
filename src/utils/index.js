import { selectElement } from '../actions'
import { LEFT } from '../components/constants'

export * from './colors'
export * from './slotPosition'
export * from './slotSelection'

export const isNotEmpty = (object) => {
  return Object.keys(object).length > 0
}

export const handleSelectElement = (dispatch) => {
  return (elementId, mouseEvent) => {
    if(mouseEvent.button != LEFT)
      return

    dispatch(
      selectElement(
        elementId,
        { x: mouseEvent.clientX, y: mouseEvent.clientY }
      )
    )
  }
}
