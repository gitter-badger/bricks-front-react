export const updateElementInWorkspace = (workspace, payload) => {
  const { dragState } = workspace

  if(!dragState.dragStarted) {
    return workspace
  }

  const { currentMousePosition } = payload
  const { elementId, startElementPosition, startMousePosition } = dragState
  const element = workspace.entities[elementId]

  return Object.assign({}, workspace, {
    ...workspace,
    entities: {
      ...workspace.entities,
      [elementId]: {
        ...element,
        position: {
          x: startElementPosition.x + currentMousePosition.x - startMousePosition.x,
          y: startElementPosition.y + currentMousePosition.y - startMousePosition.y,
        }
      }
    }
  })
}

export const addDragStartedToWorkspace = (workspace, payload) => {
  let { elementId, elementPosition, mousePosition } = payload

  return setDragStateToWorkspace(
    workspace,
    {
      dragStarted: true,
      elementId: elementId,
      startElementPosition: elementPosition,
      startMousePosition: mousePosition
    }
  )
}

export const addDragStoppedToWorkspace = (workspace, payload) => {
  return setDragStateToWorkspace(
    workspace,
    {
      dragStarted: false
    }
  )
}

export const setDragStateToWorkspace = (workspace, dragState) => {
  return Object.assign({}, workspace, {
    ...workspace,
    dragState
  })
}
