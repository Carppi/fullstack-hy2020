import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':

      const id = action.data.id
      
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      )

    case 'NEW_ANECDOTE':
      return state.concat(action.data)

    case 'INIT_ANECDOTES':
      return action.data

    default: return state
  }

}

export const voteTo = (anecdote) => {
  return async dispatch => {

    const changedAnecdote = await anecdoteService
      .update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })

    dispatch({
      type: 'VOTE',
      data: { ...changedAnecdote }
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {

  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }

}

export default anecdoteReducer