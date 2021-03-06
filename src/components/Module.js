import React, { PropTypes, Component } from 'react'

const ulStyles = {
  display: 'inline-block',
  margin: 0
}

const libraryFunctionStyles = {
  cursor: 'pointer'
}

export default class Module extends Component {
  render() {
    const { functions, name, onFunctionClick } = this.props
    return (
      <div>
        <li>
          { name }
        </li>
        <ul style={ ulStyles }>
          { functions.map((libraryFunction) => {
              return (
                <li
                  key={ libraryFunction.id }
                  onClick={ () => onFunctionClick(libraryFunction) }
                  style={ libraryFunctionStyles }
                >
                  { libraryFunction.label }
                </li>
              )
            }
          )}
        </ul>
      </div>
    )
  }
}

Module.propTypes = {
  name: PropTypes.string.isRequired,
  functions: PropTypes.arrayOf(
    PropTypes.shape({
      arity: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onFunctionClick: PropTypes.func.isRequired
}
