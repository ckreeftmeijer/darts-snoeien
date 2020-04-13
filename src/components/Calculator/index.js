import React, { useState } from 'react'

import './styles.scss'

const Calculator = ({ setScore }) => {
  const [number, setNumber] = useState(0)

  const addNumber = (score) => {
    const newNumber = `${number}${score}`
    const numberInteger = parseInt(newNumber, 10)
    if (numberInteger > 180) return
    setNumber(numberInteger)
  }

  const removeNumber = () => {
    const numberString = number.toString()
    const lastRemoved = numberString.slice(0, -1)
    const parsedBack = parseInt(lastRemoved, 10)
    if (parsedBack && parsedBack >= 0) {
      setNumber(parsedBack)
    } else {
      setNumber(0)
    }
  }

  return (
    <>
      <div className="number-container">
        {number}
        <span
          className="number-container__close"
          onClick={removeNumber}
        >
          ×
        </span>
      </div>
      <div className="calculator">
        {
          [...new Array(10)].map((user, i) =>
            <div
              key={`button-${i}`}
              className="calculator__key"
              onClick={() => addNumber(9 - i)}
            >
              {9 - i}
            </div>
          )
        }
      </div>
      <div
        className={`button block`}
        onClick={() => {setScore(number); setNumber(0)}}
      >
        {number > 0 ? 'Set score' : 'No score'}
      </div>
    </>
  )
}

export default Calculator
