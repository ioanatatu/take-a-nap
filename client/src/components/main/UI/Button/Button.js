import React from "react";
import classes from "./Button.module.css";

const Button = (props) => (
    <button
        className={[classes.Button, classes[props.btnType]].join(" ")} // to have a list of classes which is a string
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default Button;
