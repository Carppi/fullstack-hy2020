import React from 'react'
import { voteTo } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const anecdotes = useSelector(state => {
    return state.anecdotes
      .filter(anecdote => (
        anecdote
          .content
          .toLowerCase()
          .includes(
            state.filter.toLowerCase()
          )
      ))
  })

  const vote = (anecdote) => {
    dispatch(voteTo(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`,5))
  }

  return (

    anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )

  )
}

export default AnecdoteList