const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    default:
      return state
  }
}

export const notificationChange = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationZero = () => {
  return {
    type: 'SET_NOTIFICATION',
    notification: null
  }
}

export default notificationReducer