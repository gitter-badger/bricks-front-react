import { isNotEmpty } from '../utils'

export const ADD_BRICK = 'ADD_BRICK'
export const ADD_PIPE = 'ADD_PIPE'
export const ADD_PRIMITIVE = 'ADD_PRIMITIVE'
export const ADD_UNIT_TEST = 'ADD_UNIT_TEST'
export const CHANGE_PRIMITIVE_TYPE = 'CHANGE_PRIMITIVE_TYPE'
export const CHANGE_PRIMITIVE_VALUE = 'CHANGE_PRIMITIVE_VALUE'
export const CLEAR_SLOT_SELECTION = 'CLEAR_SLOT_SELECTION'
export const MOVE_ELEMENT = 'MOVE_ELEMENT'
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
export const REMOVE_SELECTED_ELEMENT = 'REMOVE_SELECTED_ELEMENT'
export const START_DRAG = 'START_DRAG'
export const STOP_DRAG = 'STOP_DRAG'
export const SELECT_ELEMENT = 'SELECT_ELEMENT'
export const SELECT_SLOT = 'SELECT_SLOT'

export const addBrick = (brick) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_addBrick(brick))
  }
}

const _addBrick = (brick) => {
  return {
    type: ADD_BRICK,
    payload: brick
  }
}

export const addPrimitive = (type) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_addPrimitive(type))
  }
}

const _addPrimitive = (type) => {
  return {
    type: ADD_PRIMITIVE,
    payload: type
  }
}

export const startDrag = (elementId, mousePosition, elementPosition) => {
  return {
    type: START_DRAG,
    payload: {
      elementId,
      mousePosition,
      elementPosition
    }
  }
}

export const selectElementOrStopDrag = (mousePosition) => {
  return (dispatch, getState) => {
    const { element } = getState().workspace.selectionState

    dispatch(stopDrag())

    if(element.mouseDownPosition.x == mousePosition.x &&
      element.mouseDownPosition.y == mousePosition.y ) {
      dispatch(selectElement(element.id, mousePosition))
    } else {
      dispatch(removeSelectedElement())
    }
  }
}

export const stopDrag = () => {
  return {
    type: STOP_DRAG
  }
}

export const moveElement = (currentMousePosition) => {
  return {
    type: MOVE_ELEMENT,
    payload: {
      currentMousePosition
    }
  }
}

export const addPipeOrSelectSlot = (type, elementId, slotId) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(selectSlot(type, elementId, slotId))
    dispatch(addPipeIfBothSlotsSelected())
  }
}

// type: 'input' or 'output' slot
export const selectSlot = (type, elementId, slotId) => {
  return {
    type: SELECT_SLOT,
    payload: {
      elementId,
      slotId,
      type
    }
  }
}

export const addPipeIfBothSlotsSelected = () => {
  return (dispatch, getState) => {
    const { input, output } = getState().workspace.selectionState.pipe

    if(isNotEmpty(input) && isNotEmpty(output)) {
      dispatch(addPipe())
      dispatch(clearSlotSelection())
    }
  }
}

export const addPipe = () => {
  return {
    type: ADD_PIPE
  }
}

export const clearSlotSelection = () => {
  return {
    type: CLEAR_SLOT_SELECTION
  }
}

export const selectElement = (elementId, mousePosition) => {
  return {
    type: SELECT_ELEMENT,
    payload: {
      elementId,
      mousePosition
    }
  }
}

export const removeElement = (elementId) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_removeElement(elementId))
  }
}

const _removeElement = (elementId) => {
  return {
    type: REMOVE_ELEMENT,
    payload: {
      elementId
    }
  }
}

export const removeSelectedElement = () => {
  return {
    type: REMOVE_SELECTED_ELEMENT
  }
}

export const addUnitTest = () => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_addUnitTest())
  }
}

const _addUnitTest = () => {
  return {
    type: ADD_UNIT_TEST
  }
}

export const changePrimitiveType = (elementId, newType) => {
  return {
    type: CHANGE_PRIMITIVE_TYPE,
    payload: {
      elementId,
      newType
    }
  }
}

export const changePrimitiveValue = (elementId, newValue) => {
  return {
    type: CHANGE_PRIMITIVE_VALUE,
    payload: {
      elementId,
      newValue
    }
  }
}
