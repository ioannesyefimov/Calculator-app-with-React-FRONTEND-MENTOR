import React from 'react'
import ACTIONS from './ACTIONS';

function OperationButton({ dispatch, operation, digit }) {
  return (
    <button 
    className={`${digit ? 'multiply-btn' : ''}`}
    onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}
    >
        {digit ? <p className='multiply'>{digit}</p> : operation}
    </button>
    )

}

export default OperationButton