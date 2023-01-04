import React from 'react';
import { IPropsInput } from '../../interface/globalType';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './input.scss';
function Input(props: IPropsInput) {
  const [iconHide, setIconHide] = React.useState(true);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (props.keyDown) {
        props.keyDown();
      }
    }
  };
  return (
    <div className='infield'>
      <div className='group__input'>
        <input
          type={props.type !== 'password' ? props.type : (iconHide ? props.type : 'text')}
          required
          value={props.value}
          onChange={(e) => {
            props.setValue(e.target.value);
          }}
          onKeyDown={e => handleKeyDown(e)}
        />
        {props.type === 'password' && (
          iconHide ? <VisibilityOffIcon className='eye-icon' onClick={() => setIconHide(false)}/> : <VisibilityIcon className='eye-icon' onClick={() => setIconHide(true)}/>
        )}
        <span className='highlight'></span>
        <span className='bar'></span>
        <label>{props.placeholder}</label>
      </div>
    </div>
  );
}
export default Input;
