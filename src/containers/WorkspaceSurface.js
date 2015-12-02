import { connect } from 'react-redux'
import WorkspaceSurface from '../components/WorkspaceSurface'

function mapStateToProps(state) {
    return { ...state.workspace.rootBrick, dragState: state.workspace.dragState }
}

export default connect(mapStateToProps)(WorkspaceSurface)
