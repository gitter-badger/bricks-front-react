import React, { PropTypes, Component } from 'react'

import Module from './Module'
import { PrimitivePropTypes } from '../propTypes'
import Translate from './Translate'

const styles = {
  float: 'left',
  height: '100%',
  width: '250px',
  overflow: 'auto'
}

const ulStyles = {
  display: 'inline-block',
  margin: 0
}

const primitiveStyles = {
  cursor: 'pointer'
}

export default class Library extends Component {
  componentDidMount() {
    const { fetchLibrary } = this.props
    fetchLibrary()
  }

  render() {
    const {
      isFetching,
      items,
      onFunctionClick,
      onPrimitiveClick
    } = this.props

    return (
      <div style={ styles }>
        <Translate
          HtmlElement="h2"
          message="library"
        />
        { isFetching &&
          <Translate
            HtmlElement="h3"
            message="loading"
          />
        }
        { !isFetching && items.primitives &&
          <div>
            <div>
              <Translate
                HtmlElement="h3"
                message="primitives"
              />
              <ul style={ ulStyles }>
                { items.primitives.map((primitive) =>
                  <li
                    key={ primitive.id }
                    onClick={ () => onPrimitiveClick(primitive.type) }
                    style={ primitiveStyles }
                  >
                    {primitive.label}
                  </li>
                )}
              </ul>
            </div>
            <div>
              <Translate
                HtmlElement="h3"
                message="functions"
              />
              <ul>
                { items.modules.map((module, i) =>
                  <Module
                    key={ i }
                    name={ module.name }
                    functions={ module.functions }
                    onFunctionClick={ onFunctionClick }
                  />
                )}
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}

Library.propTypes = {
  fetchLibrary: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  items: PropTypes.shape({
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        functions: PropTypes.array.isRequired
      })
    ),
    primitives: PropTypes.arrayOf(PrimitivePropTypes)
  }).isRequired,
  onFunctionClick: PropTypes.func.isRequired,
  onPrimitiveClick: PropTypes.func.isRequired
}
