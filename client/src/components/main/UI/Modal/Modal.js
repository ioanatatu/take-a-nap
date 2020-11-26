// Styles
import css from "./Modal.module.css";

import React, { Fragment, useState } from "react";
import Backdrop from "../Backdrop/Backdrop";
import { MdClear } from "react-icons/md";

const Modal = ({ showmodalhandler, show, children }) => {
    // !!! remember that in many browsers local storage can only store string. So when we store the boolean true or false, it actually stores the strings "true" or "false". In order to get back the real boolean values, we can use the JSON.parse() method.
    const [showModalOnLoad, setShowModalOnLoad] = useState(
        JSON.parse(localStorage.getItem("showModalOnLoad"))
    );

    const checkHandler = (event) => {
        localStorage.setItem("showModalOnLoad", event.target.checked);
        setShowModalOnLoad(event.target.checked);
    };
    return (
        <Fragment>
            <Backdrop show={show} clicked={showmodalhandler} />
            <div
                className={css.Modal}
                style={{
                    transform: show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: show ? "1" : "0",
                }}
            >
                <MdClear
                    onClick={showmodalhandler}
                    className={css.CloseIcon}
                    fill="white"
                />
                <span className={css.Pad}>{children}</span>

                <div className={css.Footer}>
                    <span className={css.FooterTextWrapper}>
                        <span
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 8,
                            }}
                        >
                            <input
                                onChange={checkHandler}
                                type="checkbox"
                                checked={showModalOnLoad}
                            ></input>
                            <h5 style={{ marginBottom: 4 }}>
                                Don't show this again.
                            </h5>
                        </span>
                        <p>
                            If you want to revisit these informations, you can
                            click
                            <br /> on the top right button of the main window.
                        </p>
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default Modal;

///////////////// IF I USE HERE A CLASS-BASED COMPONENT INSTEAD OF A FUNCTIONAL COMPONENT, code is more complicated //////
///////////////// revisit lesson 183 to see difference and component life cycle methods //////////////////////////////////
