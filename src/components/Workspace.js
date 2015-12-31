import React, { PropTypes, Component } from 'react'

import SelectedElementDialog from './SelectedElementDialog'
import WorkspaceSurface from '../containers/WorkspaceSurface'

const styles = {
  float: 'left',
  height: '100%'
}

export default class Workspace extends Component {
  render() {
    const {
      mainBrickId,
      selectedElement,
      unitTests
    } = this.props

    const {
      id: selectedElementId,
      mousePosition
    } = selectedElement

    return (
      <div style={ styles }>
        <h2>Workspace</h2>
        { unitTests.map((unitTest, index) => {
            return (
              <WorkspaceSurface
                key={ index }
                mainBrickId={ mainBrickId }
                unitTest={ unitTest }
              />
            )
          })
        }
        { (() => {
            if(selectedElementId)
              return <SelectedElementDialog elementId={ selectedElementId }/>
          })()
        }
      </div>
    )
  }
}

Workspace.propTypes = {
  mainBrickId: PropTypes.number.isRequired,
  selectedElement: PropTypes.shape({
    id: PropTypes.number,
    mousePosition: PropTypes.object
  }).isRequired,
  unitTests: PropTypes.array.isRequired
}
