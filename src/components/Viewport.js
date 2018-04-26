import React from 'react'
import PropTypes from 'prop-types'

export default class Viewport extends React.PureComponent {
  static propTypes = {
    initialWidth: PropTypes.number,
    initialHeight: PropTypes.number,

    /**
     * The children is a function which received the viewport rectangle.
     * @param {object} rect - The rectangle of the viewport
     * @param {number} rect.width - viewport width
     * @param {number} rect.height - viewport height
     */
    children: PropTypes.func.isRequired,
  }

  state = {
    width: 0,
    height: 0,
  }

  componentWillMount() {
    const { initialHeight, initialWidth } = this.props

    this.setState({
      width: initialWidth,
      height: initialHeight,
    })
  }

  render() {
    const { children } = this.props
    const { width, height } = this.state

    return children({ width, height })
  }
}
