import React from 'react'

const Notification = ({ notification }) => {
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

export default Notification