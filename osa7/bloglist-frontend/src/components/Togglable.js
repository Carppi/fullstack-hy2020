import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import {
  Button
} from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const hideButtonLabel = props.hideButtonLabel ? props.hideButtonLabel : 'cancel'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          id={props.showButtonId}
          onClick={toggleVisibility}
          variant="contained"
          color="primary"
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          variant="contained"
        >
          {hideButtonLabel}
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  hideButtonLabel: PropTypes.string,
  showButtonId: PropTypes.string
}

export default Togglable