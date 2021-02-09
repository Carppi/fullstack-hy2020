import React from 'react'
import { voteTo } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteTo(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (

    props.anecdotes
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter(anecdote => (
        anecdote
          .content
          .toLowerCase()
          .includes(
            state.filter.toLowerCase()
          )
      ))
  }
}

const mapDispatchToProps = {
  voteTo,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList