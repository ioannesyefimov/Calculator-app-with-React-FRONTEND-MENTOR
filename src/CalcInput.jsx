import React, {useCallback, useEffect, useReducer} from 'react'
import ACTIONS from './ACTIONS.JSX';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';




function CalcInput({dispatch}) {
    
  const operators = ['+', '*', '/', '-']
  const handleKeyPress = useCallback((event) => {
    let digit = event.key
    let operation = event.key
    console.log(operation)
    
    console.log('clicked key: ', digit)
      if(operators.includes(operation)){
        dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})
      } else if(/\d/.test(digit)){
        dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})

      } else if (digit == 'Enter'){
        dispatch({type: ACTIONS.EVALUATE})

      } else if(digit == 'Backspace' ){
        dispatch({type: ACTIONS.DELETE_DIGIT})


      } else if (digit == 'r'){
        dispatch({type: ACTIONS.CLEAR})

      }else if (digit == '.'){
        dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})

      } 
      else return
    }, );
  
    useEffect(() => {
      // attach the event listener
      document.addEventListener('keydown', handleKeyPress);
  
      // remove the event listener
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress]);
    


    
    
  return (
    <div
        className='calc-input-cont'
    >
        <div
         className="wrapper"
         >
          <DigitButton digit="7" dispatch={dispatch}/>
          <DigitButton digit="8" dispatch={dispatch}/>
          <DigitButton digit="9" dispatch={dispatch}/>
          <button className='del-btn' onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
          <DigitButton digit="4" dispatch={dispatch}/>
          <DigitButton digit="5" dispatch={dispatch}/>
          <DigitButton digit="6" dispatch={dispatch}/>
          <OperationButton operation='+' dispatch={dispatch}/>
          <DigitButton digit="1" dispatch={dispatch}/>
          <DigitButton digit="2" dispatch={dispatch}/>
          <DigitButton digit="3" dispatch={dispatch}/>
          <OperationButton operation='-' dispatch={dispatch}/>
          <DigitButton digit="." dispatch={dispatch}/>
          <DigitButton digit="0" dispatch={dispatch}/>
          <OperationButton operation='/' dispatch={dispatch}/>
          <OperationButton operation='*' digit={"×"} dispatch={dispatch}/>
          <button className='reset-btn' onClick={() => dispatch({type: ACTIONS.CLEAR})}>RESET</button>

          <button className='calc-btn' onClick={() => dispatch({type : ACTIONS.EVALUATE})}>=</button>

          

        </div>
    </div>
  )
}

export default CalcInput
