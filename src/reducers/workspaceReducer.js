import {
  ADD_BRICK,
  ADD_PIPE,
  ADD_PRIMITIVE,
  MOVE_ELEMENT,
  REMOVE_ELEMENT,
  REMOVE_SELECTION,
  SELECT_ELEMENT,
  SELECT_SLOT,
  START_DRAG,
  STOP_DRAG,
} from '../actions'

// TODO: Read constants from MainBrick component
import {
  MainBrick as MainBrickConstants,
  TestInput as TestInputConstants
} from '../components/constants'
import MainBrick from '../containers/MainBrick'

import { inputSlotPosition } from '../utils'
import { MAIN_BRICK } from '../utils/componentsEnum'

import {
  appendToInner,
  newBrick,
  newPipe,
  newPrimitive
} from './workspace/addElementReducer'

import {
  addDragStartedToWorkspace,
  addDragStoppedToWorkspace,
  updateElementInWorkspace
} from './workspace/dragReducer'

import {
  addSelectedElementToWorkspace,
  removeSlotSelectionState,
  updateSlotSelectionStateInWorkspace
} from './workspace/selectionReducer'

import { nextId } from './workspace/workspaceReducerUtils'

const mainBrickId = nextId()
const firstInputId = nextId()
const secondInputId = nextId()
const thirdInputId = nextId()
const fourthInputId = nextId()

const mainBrick = {
  Component: MAIN_BRICK,
  id: mainBrickId,
  inner: [],
  inputSlots:[
    { id: nextId() },
    { id: nextId() }
  ],
  outputSlots: [
    { id: nextId() }
  ],
  position: MainBrickConstants.defaultPosition,
  size: MainBrickConstants.defaultSize
}

const testInputPositions = mainBrick.inputSlots.map((inputSlot) => {
  return inputSlotPosition(mainBrick, inputSlot.id)
})

const initialWorkspace = {
  actions: [],
  dragState: {
    dragStarted: false
  },
  entities: {
    [mainBrickId]: mainBrick,
    [firstInputId]: {
      id: firstInputId,
      slotPosition: testInputPositions[0],
      size: TestInputConstants.defaultSize,
      type: 'string',
      value: null
    },
    [secondInputId]: {
      id: secondInputId,
      slotPosition: testInputPositions[1],
      size: TestInputConstants.defaultSize,
      type: null,
      value: null
    },
    [thirdInputId]: {
      id: thirdInputId,
      slotPosition: testInputPositions[0],
      size: TestInputConstants.defaultSize,
      type: null,
      value: null
    },
    [fourthInputId]: {
      id: fourthInputId,
      slotPosition: testInputPositions[1],
      size: TestInputConstants.defaultSize,
      type: 'number',
      value: null
    }
  },
  mainBrickId: mainBrickId,
  selectionState: {
    element: {
      id: null,
      mousePosition: null
    },
    pipe: {
      input: null,
      output: null
    }
  },
  unitTests: [
    [firstInputId, secondInputId],
    // [thirdInputId, fourthInputId]
  ]
}

export const workspace = (state = initialWorkspace, action) => {
  const { payload, type } = action

  switch (type) {
    case ADD_BRICK:
      return appendToInner(state, newBrick(payload))
    case ADD_PIPE:
      return appendToInner(state, newPipe(state))
    case ADD_PRIMITIVE:
      return appendToInner(state, newPrimitive(payload))
    case MOVE_ELEMENT:
      return updateElementInWorkspace(state, payload)
    case REMOVE_ELEMENT:
      console.log('remove', payload)
      return state
    case REMOVE_SELECTION:
      return removeSlotSelectionState(state)
    case SELECT_ELEMENT:
      return addSelectedElementToWorkspace(state, payload)
    case SELECT_SLOT:
      return updateSlotSelectionStateInWorkspace(state, payload)
    case START_DRAG:
      return addDragStartedToWorkspace(state, payload)
    case STOP_DRAG:
      return addDragStoppedToWorkspace(state, payload)
    default:
      return state
  }
}
