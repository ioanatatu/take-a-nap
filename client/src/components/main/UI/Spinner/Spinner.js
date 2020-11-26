import React from "react";
import classes from "./Spinner.module.css";

const Spinner = ({ size, fontSize, border, margin }) => (
    <div
        className={classes.Loader}
        style={{
            width: size,
            height: size,
            fontSize: fontSize,
            borderTop: `${border} solid rgba(104, 30, 184, 0.2)`,
            borderRight: `${border} solid rgba(156, 30, 184, 0.2)`,
            borderBottom: `${border} solid rgba(117, 30, 184, 0.2)`,
            borderLeft: `${border} solid #4f1eb8`,
            margin: margin,
        }}
    >
        Loading...
    </div>
);

export default Spinner;
