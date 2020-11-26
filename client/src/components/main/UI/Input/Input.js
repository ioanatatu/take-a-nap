import React from "react";
import cls from "Input.module.css";

const Input = (props) => {
    return (
        <div>
            <label>{props.label}</label>
            <input></input>
        </div>
    );
};

export default Input;
