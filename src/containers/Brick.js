import { connect } from 'react-redux'

import Brick from '../components/Brick'
import Draggable from './Draggable'
import { selectSlot } from '../actions'

function mapDispatchToProps(dispatch) {
  return {
    selectSlot: (elementId, slotId) => {
      dispatch(selectSlot(elementId, slotId))
    }
  }
}

export default connect(null, mapDispatchToProps)(Draggable(Brick))
