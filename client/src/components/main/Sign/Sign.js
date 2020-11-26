import cl from "./Sign.module.css";
import css from "../Profile/Profile.module.css";
import btn from "../../buttons.module.css";
import axios from "axios";
import setAuthToken from "../../../utils/setAuthToken";

// React
import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

// Redux
import { connect } from "react-redux";
import { saveSignature } from "../../../redux/actions/signature";
import { deleteSignature } from "../../../redux/actions/signature";
import PropTypes from "prop-types";

// Components
import Spinner from "../UI/Spinner/Spinner";

const Sign = ({
    isAuthenticated,
    saveSignature,
    deleteSignature,
    hasSigned,
    sign,
}) => {
    const canvas = useRef(null);
    const [signature, setSignature] = useState(sign);

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    console.log("hasSigned_outside", hasSigned);

    useEffect(() => {
        // Using an IIFE
        console.log("hasSigned", hasSigned);

        (async () => {
            const result = await axios.get("api/signature");
            console.log("result.data from Sign/useEffect", result.data);

            if (result.data) {
                setSignature(result.data.signature);
                // canvas.current.clear();
                // console.log(signature);
            }
        })();
    }, [hasSigned]);

    const clearCanvasHandler = () => {
        canvas.current.clear();
        console.log("äääääää", canvas.current.isEmpty());
        setSignature(null);
    };
    const submitCanvasHandler = async () => {
        const signature = getSignature(canvas.current);

        if (!canvas.current.isEmpty()) {
            saveSignature(signature);
        }
    };
    const deleteSignatureHandler = () => {
        setSignature(null);
        canvas.current = null;
        deleteSignature();
        console.log("canvas.current ", canvas.current);
    };

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return (
        <div className={css.Profile}>
            <header className={cl.Center}>
                {hasSigned ? (
                    <Fragment>
                        <h1 className={css.TextBlue}>
                            Thank you for your support!
                        </h1>
                        <div>
                            {!signature ? (
                                <Spinner />
                            ) : (
                                <img
                                    src={`data:image/png;base64,${signature}`}
                                    alt="signature"
                                />
                            )}
                        </div>
                        <Link
                            to="/nappers"
                            className={`${btn.BtnGeneral} ${btn.Btn2}`}
                        >
                            see all nappers
                        </Link>
                        <button
                            className={`${btn.BtnGeneral} ${btn.Btn3} ${cl.BtnBottom}`}
                            onClick={deleteSignatureHandler}
                        >
                            delete signature
                        </button>
                        <span>
                            <p className={cl.DeleteExplanation}>
                                This will not remove your account, only your
                                signature.
                                <br />
                                If you want to delete your account go to{" "}
                                <Link
                                    to="/profile"
                                    className={cl.LinkToProfile}
                                >
                                    profile.
                                </Link>
                            </p>
                            <p className={cl.DeleteExplanation}>
                                But please create a new one afterwards :)
                            </p>
                        </span>
                    </Fragment>
                ) : (
                    <Fragment>
                        <h2>Sign and support the cause</h2>
                        <SignatureCanvas
                            penColor="#79589f"
                            canvasProps={{
                                width: 500,
                                height: 150,
                                className: `"sigCanvas" ${cl.Canvas}`,
                            }}
                            ref={canvas}
                        />
                        <span className={cl.ButtonsContainer}>
                            <button
                                className={`${btn.BtnGeneral} ${btn.Btn2}`}
                                value="Sign petition"
                                onClick={submitCanvasHandler}
                            >
                                Submit
                            </button>
                            <button
                                className={`${btn.BtnGeneral} ${btn.Btn2}`}
                                onClick={clearCanvasHandler}
                            >
                                Redo
                            </button>
                        </span>
                    </Fragment>
                )}
            </header>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    hasSigned: state.signature.hasSigned,
    sign: state.signature.signature,
});
Sign.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    hasSigned: PropTypes.bool.isRequired,
    saveSignature: PropTypes.func.isRequired,
    deleteSignature: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { saveSignature, deleteSignature })(
    Sign
);
/*
 *
 *
 *
 *
 *
 * helper functions
 */
function getSignature(canvas) {
    if (canvas) {
        let signatureImage = new Image();
        signatureImage.src = canvas.toDataURL("signature/png", 1);

        let str = signatureImage.src;

        // console.log(signatureImage.src);
        // console.log(str.substring(str.indexOf(",") + 1));

        return str.substring(str.indexOf(",") + 1);
    }
    return null;
}
