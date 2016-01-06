import { connect } from 'react-redux'

import { moveElement, stopDrag } from '../actions'
import WorkspaceSurface from '../components/WorkspaceSurface'

const mapStateToProps = (state, ownProps) => {
  const { entities, selectionState, unitTests } = state.workspace
  const { mainBrickId } = ownProps

  return {
    dragStarted: selectionState.dragStarted,
    mainBrick: entities[mainBrickId],
    unitTests
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    moveElement: (position) => {
      dispatch(moveElement(position))
    },
    stopDrag: () => {
      dispatch(stopDrag())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceSurface)
