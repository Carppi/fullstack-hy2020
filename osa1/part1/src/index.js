import React, { useState } from 'react'
import ReactDOM from 'react-dom';

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}


//Counter-appin alikomponentteja, jotka tukevat sen toimintaa
const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const CounterApp = (props) => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  console.log("Counter-appi alkaa tästä", counter)

  return (
    <div>
      <Display counter={counter} />
      <Button
        handleClick={increaseByOne}
        text='plus'
      />
      <Button
        handleClick={setToZero}
        text='zero'
      />
      <Button
        handleClick={decreaseByOne}
        text='minus'
      />
    </div>
  )
}

const App = (props) => {

  //nimi-appin muuttujat
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
      <h1>Counter-app</h1>
      <div>{CounterApp()}</div>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
