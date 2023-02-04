import { useEffect, useState, useReducer} from 'react'
import './sass/app.scss'
import CalcOutPut from './CalcOutPut'
import CalcInput from './CalcInput'
import ACTIONS from './ACTIONS'



function reducer(state, {type, payload} ){
  switch(type){
    case ACTIONS.ADD_DIGIT: 
    if(state.overwrite){
      return{
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      }
    }
    if(payload.digit === '0' && state.currentOperand === '0') {
      return state
    }
    if(payload.digit === '.' && state.currentOperand == ".") {
      return state
    }

    return {
      ...state, 
      currentOperand: `${state.currentOperand || ''}${payload.digit}`
    }

    case ACTIONS.CLEAR: 
      return{};

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }
      return {
      ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
        }
      

      

      case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperand == null || state.previousOperand == null) {
          return state
        }
        
        return {
          ...state,
          previousOperand: null,
          operation: null,
          overwrite: true,
          currentOperand: evaluate(state)
        }

      case ACTIONS.DELETE_DIGIT: 

        if(state.overwrite) return {
          ...state,
          currentOperand: null,
          overwrite: false,
        }
        else if(state.operation !== null && state.previousOperand !== null && state.currentOperand == null) return {
            ...state,
            operation: null,
        } 
        else if (state.previousOperand !== null && state.currentOperand == null && state.operation == null) return {
          ...state,
          currentOperand: state.previousOperand,
          previousOperand:  null
         
        } 
        else if (state.currentOperand == null ) {
          return state
          
        } 
       else if (state.currentOperand.length === 1)  {
          return { ...state, currentOperand: null }
        } 
        else {
          return {
            ...state, 
            currentOperand: state.currentOperand.slice(0, -1),
          }
        }
    }


}

function evaluate({currentOperand, previousOperand, operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ''
  if((current === 0 || prev === 0) && operation === '/') return 'cannot divide by zero'
  let computation = ""
  switch(operation){
    case '+':
    computation = prev + current
    break
    case '-':
    computation = prev - current
    break
    case '*':
    computation = prev * current
    break
    case '/':
    computation = prev / current
    break
  }
  return computation.toString()
}

 const INTEGER_FORMATTER = new Intl.NumberFormat(`en-us`,{
  maximumFractionDigits: 0
}
)

export function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  ) 
    

  const [theme, setTheme] = useState('first')
  
  useEffect(() => {
    document.body.setAttribute('theme', `${theme}`)
  }, [theme]);


  
  return (
    <div className="App" >
      <CalcOutPut currentOperand={currentOperand} previousOperand={previousOperand} dispatch={dispatch} operation={operation} setTheme={setTheme} />
      <CalcInput dispatch={dispatch} currentOperand={currentOperand} previousOperand={previousOperand} />
    </div>
  )
}

export default App
