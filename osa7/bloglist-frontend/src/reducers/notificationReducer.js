const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const setNotification = (message, positive) => {
  const duration = 5
  const notification = { message, positive }
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