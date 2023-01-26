import React, {useState} from 'react'
import { formatOperand } from './App'

function CalcOutPut({ operation, dispatch, currentOperand, previousOperand, setTheme }) {
  
  const [sliderValue, setSliderValue] = useState('1')
  function handleTheme() {
    if(sliderValue == '1'){
      setSliderValue('2')
      setTheme('second')
    } else if (sliderValue == '2'){
      setSliderValue('3')
      setTheme('third')
    } else if (sliderValue == '3'){
      setSliderValue('1')
      setTheme('first')
    }
  }
  
 

  return (
    <div
      className='calc-out-put-cont'
    >
      <div 
        className='wrapper'
        >
          <p>calc</p>
          <label 
          htmlFor="theme-switcher"
          className='theme-label'
          onClick={() => handleTheme()}
          >
          
            Theme
            <input
            type="range"
             name="swithcer"
              id="theme-switcher"
               min="1" max='3'
               className='theme-switcher'
               defaultValue={'1'}
               
               />
          </label>
        </div>
        <div
          className='output-cont'
        >
          {/* <p className="output previo">{currentOperand}</p> */}
          <p className="output">{formatOperand(previousOperand)}{operation}{formatOperand(currentOperand)}</p>
        </div>
    </div>
  )

}

export default CalcOutPut