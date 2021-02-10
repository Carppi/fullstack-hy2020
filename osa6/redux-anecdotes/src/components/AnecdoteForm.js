import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const timeoutID = props.timeoutID
    props.setNotification(`'${content}' was added`, 5, timeoutID)
    event.target.anecdote.value = ''
    props.createAnecdote(content)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )

}

const mapDispatchToProps = {
  setNotification,
  createAnecdote
}

const mapStateToProps = (state) => {

  let timeoutID = null

  if (state.notification && state.notification.timeoutID) {
    timeoutID = state.notification.timeoutID
  }

  return {
    timeoutID
  }
}

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm