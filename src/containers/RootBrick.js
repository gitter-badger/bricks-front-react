import { connect } from 'react-redux'

import RootBrick from '../components/RootBrick'
import { selectSlot } from '../actions'
import { selectedSlots } from './containerUtils'

const mapStateToProps = (state) => {
  return {
    selectedSlots: selectedSlots(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectBrickInputSlot: (elementId, slotId) => {
      dispatch(selectSlot('INPUT', elementId, slotId))
    },
    selectBrickOutputSlot: (elementId, slotId) => {
      dispatch(selectSlot('OUTPUT', elementId, slotId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootBrick)
