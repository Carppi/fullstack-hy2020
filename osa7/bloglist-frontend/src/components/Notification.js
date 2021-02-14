import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification === null || notification.message === null) {
    return null
  }

  if (notification.positive === true) {
    return (
      <Alert severity='success'>
        {notification.message}
      </Alert>
    )
  } else {
    return (
      <Alert severity='error'>
        {notification.message}
      </Alert>
    )
  }
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification