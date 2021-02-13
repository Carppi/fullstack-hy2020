const notificationReducer = (state = null, action) => {
  console.log('reducer running', state)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const setNotification = (notification, duration) => {
  return async dispatch => {

    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)

  }
}

const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

const clearNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer