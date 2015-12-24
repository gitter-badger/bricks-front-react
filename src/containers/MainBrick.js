import { connect } from 'react-redux'

import { addPipeOrSelectSlot } from '../actions'
import MainBrick from '../components/MainBrick'
import { selectedSlots } from '../utils'

const mapStateToProps = (state, ownProps) => {
  return {
    inner: ownProps.inner.map((elementId) => {
      return state.workspace.entities[elementId]
    }),
    selectedSlots: selectedSlots(state.workspace),
    unitTest: ownProps.unitTest.map((elementId) => {
      return state.workspace.entities[elementId]
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectBrickInputSlot: (elementId, slotId) => {
      dispatch(addPipeOrSelectSlot('input', elementId, slotId))
    },
    selectBrickOutputSlot: (elementId, slotId) => {
      dispatch(addPipeOrSelectSlot('output', elementId, slotId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBrick)
