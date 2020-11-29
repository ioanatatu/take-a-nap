import css from "./Landing.module.css";

// Components
// import Logo from "../Logo/Logo";

// React Tools
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
    const history = useHistory();

    useEffect(() => {
        console.log("history", history);

        if (history.location.pathname === "/") {
            setTimeout(init, 5000);
        }
        console.log("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    return (
        <div className={css.Wrapper}>
            <span className={css.Inline}>
                <h1>take a&nbsp;</h1>
                {/*{" "}
                <h1
                    className="txtype"
                    id={css.type}
                    words='["seat", "sip", "nap"]'
                    wait="3000"
                >
                    {" "}
                </h1>{" "}
                */}
            </span>
            <h1>petition</h1>
            <p className={css.TextBlue}>
                People all over the world suffer from severe sleep deprivation.
            </p>
            <div className={css.TextNormal}>
                <span className={css.InlineSmall}>
                    <p>They are&nbsp;</p>
                    <p
                        className="txtype"
                        id={css.type}
                        words='["unhealthy", "unhappy", "unproductive", "or simply cranky"]'
                        wait="3000"
                    ></p>
                </span>
            </div>

            <div className={css.Line}></div>
            <p className={css.TextCursive}>
                Help us turn napping at work into reality and you will make the
                world a happier place.
            </p>

            {!isAuthenticated ? (
                <div className={css.ButtonsContainer}>
                    <Link
                        to="/register"
                        className={css.Btn}
                        style={{ backgroundColor: "#3333dd" }}
                    >
                        register
                    </Link>
                    <Link
                        to="/login"
                        className={css.Btn}
                        style={{ backgroundColor: "#3610af" }}
                    >
                        login
                    </Link>
                </div>
            ) : (
                <div className={css.ButtonContainer}>
                    <Link
                        to="/signature"
                        className={css.Btn}
                        style={{ backgroundColor: "#3333dd" }}
                    >
                        back to signature
                    </Link>
                </div>
            )}
        </div>
    );
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Landing);
/*
 *
 *
 *
 *
 *
 * helper functions
 */
const Type = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
};
Type.prototype.type = function () {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span className="txt">${this.txt}</span>`;

    let typeSpeed = 200;

    if (this.isDeleting) {
        typeSpeed /= 2.5;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
};
function init() {
    const txtElement = document.querySelector(".txtype");
    const words = JSON.parse(txtElement.getAttribute("words"));
    const wait = txtElement.getAttribute("wait");

    new Type(txtElement, words, wait);
}
