import { selectElement } from '../actions'
import { LEFT } from '../components/constants'

export * from './slotSelection'
export * from './slotPosition'

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
