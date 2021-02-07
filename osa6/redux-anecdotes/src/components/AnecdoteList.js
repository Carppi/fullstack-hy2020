import React from 'react'
import { voteTo } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notificationChange, notificationZero } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const showNotification = (notification) => {
    console.log('showNotification running', notification)
    dispatch(notificationChange(notification))
    setTimeout(() => {
      dispatch(notificationZero())
    }, 5000)
  }

  const vote = (anecdote) => {
    dispatch(voteTo(anecdote.id))
    showNotification(`you voted '${anecdote.content}'`)
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