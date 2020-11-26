import React from "react";
import classes from "./Logo.module.css";
// import napLogo from "../../../assets/images/nap-logo.png";

const Logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        {/*<img src={napLogo} alt="burger logo" />*/}nap.
    </div>
);

export default Logo;
