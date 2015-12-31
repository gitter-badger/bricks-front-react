import { connect } from 'react-redux'

import Workspace from '../components/Workspace'

const mapStateToProps = (state) => {
  return {
    mainBrickId: state.workspace.mainBrickId,
    selectedElement: state.workspace.selectionState.element,
    unitTests: state.workspace.unitTests
  }
}

export default connect(mapStateToProps)(Workspace)
