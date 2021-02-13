import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state)

  console.log('notification',notification)
  if (notification === null || notification.message === null) {
    return null
  }

  if (notification.positive === true) {
    return (
      <div className='notification'>
        {notification.message}
      </div>
    )
  } else {
    return (
      <div className='error'>
        {notification.message}
      </div>
    )
  }
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification