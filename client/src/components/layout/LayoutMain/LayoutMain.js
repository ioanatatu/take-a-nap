import css from "./LayoutMain.module.css";

import React from "react";

// Components
import Nav from "../../main/Nav/Nav";

const LayoutMain = (props) => {
    return (
        <section className={css.LayoutMain}>
            <Nav />
            <div className={css.Content}>LAYOUT MAIN{props.children}</div>
        </section>
    );
};

export default LayoutMain;
