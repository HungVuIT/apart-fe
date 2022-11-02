import React, { useState } from "react";
import { IPropsInput } from "../../interface/globalType";
import './input.scss';
function Input(props: IPropsInput) {
  const [value, setValue] = useState("");
  return (
    <div className="infield">
      <div className="group__input">
        <input
          type={props.type}
          required
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>{props.placeholder}</label>
      </div>
    </div>
  );
}
export default Input;
