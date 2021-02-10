const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (notification, duration, timeOutID) => {
  return async dispatch => {
    
    clearTimeout(timeOutID)
    dispatch(notificationChange(notification))
    const newTimeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)

    dispatch(notificationChange(notification,newTimeoutID))
  }
}

const notificationChange = (notification,timeoutID) => {
  const updatedNotification = timeoutID ? {message: notification, timeoutID} : {message: notification}
  return {
    type: 'SET_NOTIFICATION',
    notification: updatedNotification
  }
}

const clearNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer