// Styles
import css from "./Meta.module.css";

// React
import React, { useRef, useState, useEffect, Fragment } from "react";
import Scroll from "react-scroll";

// Font Icons
import { FaNodeJs, FaGitAlt, FaReact } from "react-icons/fa";
import { SiRedux, SiWebpack } from "react-icons/si";

// JSON
import meta from "../../../utils/meta.json";

// Axios
import axiosFirebase from "../../../utils/axios-subscribers";
import axios from "axios";

// Components
import Spinner from "../UI/Spinner/Spinner";

const Element = Scroll.Element;
const Link = Scroll.Link;

const Meta = ({ isVisible, partialVisibility }) => {
    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(
        JSON.parse(localStorage.getItem("subscribed"))
    );
    console.log("isVisible", isVisible);

    useEffect(() => {
        console.log("isVisible", isVisible);
        if (!isVisible) {
            setEmail("");
        }
    }, [isVisible]);
    ////////////////////////// TO DO //////////////////////////
    // install wrapper component to track if react component is visible on screen to clear the input field
    // https://reactjsexample.com/a-wrapper-component-to-track-if-your-react-component-is-visible-on-screen/

    const handleChange = (event) => {
        setEmail(event.target.value);
        console.log(email);
        setErr(false);
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (validateEmail(email)) {
            try {
                const res = await axiosFirebase.get("/subscribers.json", {
                    email,
                });
                const obj = res.data;

                const emails = Object.keys(obj).map((key) => {
                    return obj[key].email ? obj[key].email : null;
                });

                console.log(emails);
                const emailExists = emails.includes(email);
                console.log("email exists in the db", emailExists);

                const payload = { email, exists: emailExists };

                if (emailExists) {
                    // send an email that the user is already subscribed
                    // this means making a req to the back to send "already subscribed email"
                    try {
                        const res = await axios.post("/api/subscribe", payload);
                        console.log("result from axios", res.data);
                    } catch (err) {
                        console.log("err --->", err);
                    }
                } else {
                    // email does not exist -> insert email
                    try {
                        const res = await axiosFirebase.post(
                            "/subscribers.json",
                            { email }
                        );
                        console.log(res.statusText);
                        if (res.statusText === "OK") {
                            try {
                                const res = await axios.post(
                                    "/api/subscribe",
                                    payload
                                );
                                console.log("result from axios", res.data);
                            } catch (err) {
                                console.log("err --->", err);
                            }
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
                setLoading(false);
                setEmail("");
                // localStorage.setItem("subscribed", true);
                setSubscribed(true);
            } catch (err) {
                console.log(err);
            }
        } else {
            setErr(true);
            setLoading(false);
            // setEmail("");
        }
    };
    const clickScrollHandler = (target) => {
        //////////////////////////////////////// TO CONTINUE //////////////////////////////
        ////////////// show font icon with a different color when active //////////////////
        console.log("clicked on ", target);
    };

    return (
        <span className={css.Meta}>
            {err ? (
                <div
                    style={{
                        fontSize: 12,
                        position: "absolute",
                        top: 10,
                        left: "42%",
                        color: "red",
                    }}
                >
                    Invalid email
                </div>
            ) : null}
            <h6>This is a demo app to showcase my skills</h6>
            <p className={css.Subtitle}>
                As part of my learning routine, I am working on this project
                regularly, by adding new features and fixing bugs. On a weekly
                basis I will be deploying to heroku. Enjoy!
            </p>

            <div className={css.Subscribe}>
                <p
                    style={{
                        fontSize: 12,
                        textAlign: "left",
                        width: "auto",
                        // lineHeight: 1.1,
                    }}
                >
                    Subscribe if you'd like to receive a weekly <br />
                    notification about my progress.
                </p>
                {loading ? (
                    <Spinner
                        size={"3em"}
                        fontsize={"10px"}
                        border={"5px"}
                        margin={0}
                    />
                ) : subscribed ? (
                    <div
                        style={{
                            color: "#7300ff",
                            fontSize: 14,
                            fontWeight: 600,
                            border: "0.3px solid #7300ff",
                            borderRadius: 3,
                            padding: "5px 10px",
                        }}
                    >
                        subscribed
                    </div>
                ) : (
                    <Fragment>
                        <input
                            type="email"
                            // placeholder="email"
                            name="email"
                            ref={inputRef}
                            value={email}
                            onChange={handleChange}
                        ></input>
                        <button
                            onClick={handleSubmit}
                            className={css.btnSubscribe}
                        >
                            subscribe
                        </button>
                    </Fragment>
                )}
            </div>

            <span className={css.TechnologiesIconsBox}>
                <h5>Technologies I am using</h5>
                <div>
                    <Link
                        // activeClass={css.Active}
                        to="react"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={300}
                        containerId="container"
                        onClick={clickScrollHandler}
                    >
                        <FaReact className={css.FontIcons} />
                    </Link>
                    <Link
                        activeClass={css.Active}
                        to="redux"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={300}
                        containerId="container"
                    >
                        <SiRedux className={css.FontIcons} />
                    </Link>
                    <Link
                        activeClass={css.Active}
                        to="nodeJS"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={300}
                        containerId="container"
                    >
                        <FaNodeJs className={css.FontIcons} />
                    </Link>
                    <Link
                        activeClass={css.Active}
                        to="webpack"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={300}
                        containerId="container"
                    >
                        <SiWebpack className={css.FontIcons} />
                    </Link>
                    <Link
                        activeClass={css.Active}
                        to="git"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={300}
                        containerId="container"
                    >
                        <FaGitAlt className={css.FontIcons} />
                    </Link>
                </div>
            </span>

            <div className={css.Technologies}>
                <ul className={css.Titles}>
                    <li>Technology</li>
                    <li>Feature</li>
                    <li>Description / method</li>
                </ul>

                <Element className={css.Table} id="container">
                    {meta && mapMetaToTable(meta)}
                </Element>
            </div>
        </span>
    );
};

export default Meta;
/*
 *
 *
 *
 *
 *
 * helper functions
 */
const mapMetaToTable = (array) => {
    return array.map((el, index) => {
        return (
            <Element
                style={{
                    display: "grid",
                    gridTemplateColumns: "20% 80%",
                    gap: 5,
                    padding: "10px 0",
                    borderBottom: "0.5px solid rgb(237, 224, 250)",
                }}
                className={css.Technology}
                key={el.technology}
                name={el.technology}
            >
                <div className={css.Name}>{el.technology}</div>
                <div>
                    {el.features.map((feat, idx) => {
                        return (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "45% 55%",
                                    fontSize: 13,
                                    marginBottom: 8,
                                }}
                                key={idx.toString()}
                            >
                                <p style={{ display: "inline-block" }}>
                                    <span className={css.Feat}>
                                        {feat.name}
                                    </span>
                                </p>
                                <p style={{ display: "inline-block" }}>
                                    {feat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Element>
        );
    });
};
/*
 *
 *
 */
const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
