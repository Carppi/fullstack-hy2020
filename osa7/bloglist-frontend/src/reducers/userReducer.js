const userReducer = (state = null, action) => {

  switch (action.type) {
    case 'SET_USER':
      return action.data

    default: return state
  }
}

export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: user ? user : null
    })
  }
}

export const clearUser = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }
}

export default userReducer