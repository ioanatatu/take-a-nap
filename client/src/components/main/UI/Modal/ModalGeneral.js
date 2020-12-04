// Styles
import css from "./Modal.module.css";

import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";

const ModalGeneral = ({ show, children }) => {
    return (
        <Fragment>
            <Backdrop show={show} />
            <div
                className={css.ModalGeneral}
                style={{
                    opacity: show ? "1" : "0",
                }}
            >
                <span className={css.Pad}>{children}</span>
            </div>
        </Fragment>
    );
};

export default ModalGeneral;
