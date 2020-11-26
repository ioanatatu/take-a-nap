import css from "./LayoutLanding.module.css";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LayoutLanding = (props) => {
    return (
        <section className={css.Landing}>
            <div className={css.Content}>
                <div className={css.Logo}>
                    <Link to="/" className={css.Logo}>
                        nap.
                    </Link>
                </div>

                <Fragment>{props.children}</Fragment>
            </div>

            <div className={css.ImageContainer}>
                <img
                    className={css.ImageDesktop}
                    src="../../../../img/nap-desktop.png"
                    alt="nap"
                />
                <img
                    className={css.ImageMobile}
                    src="../../../../img/nap-mobile.png"
                    alt="nap"
                />
            </div>
        </section>
    );
};

export default LayoutLanding;
