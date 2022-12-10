import React from 'react';
import { IPropsInput } from '../../interface/globalType';
import './input.scss';
function Input(props: IPropsInput) {
  return (
    <div className='infield'>
      <div className='group__input'>
        <input
          type={props.type}
          required
          value={props.value}
          onChange={(e) => {
            props.setValue(e.target.value);
          }}
        />
        <span className='highlight'></span>
        <span className='bar'></span>
        <label>{props.placeholder}</label>
      </div>
    </div>
  );
}
export default Input;
