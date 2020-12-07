// Styles
import cl from "./App.css";

// React Tools
import React, { useEffect, useState } from "react";
// import TrackVisibility from "react-on-screen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LastLocationProvider } from "react-router-last-location";

// Components
import Landing from "./components/main/Landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/main/Profile/Profile";
import Sign from "./components/main/Sign/Sign";
import Nappers from "./components/main/Nappers/Nappers";
import LayoutMain from "./components/layout/LayoutMain/LayoutMain";
import LayoutLanding from "./components/layout/LayoutLanding/LayoutLanding";
import PrivateRoute from "./components/routing/PrivateRoute";
import NotFound from "./components/main/NotFound/NotFound";
import Github from "./components/main/UI/Github/Github";
import Modal from "./components/main/UI/Modal/Modal";
import ModalGeneral from "./components/main/UI/Modal/ModalGeneral";
import Meta from "./components/main/Meta/Meta";
import RemoveAccount from "./components/main/RemoveAccount/RemoveAccount";

// React Icons
import { ImFileText2 } from "react-icons/im";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./redux/actions/auth";
import { loadProfile } from "./redux/actions/profile";
import { loadSignature } from "./redux/actions/signature";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalGeneral, setShowModalGeneral] = useState(false);

    useEffect(() => {
        // fb login
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });

        store.dispatch(loadUser());

        if (localStorage.token) {
            console.log(
                "---------- CHECK ONCE USER IS REGISTERED/ LOGGED IN ------------"
            );
            // here get the data every time the app renders/ page is refreshed
            store.dispatch(loadUser());
            store.dispatch(loadProfile());
            store.dispatch(loadSignature());
        }

        // show Modal on load if box is not checked
        // in many browsers local storage can only store string
        let show = JSON.parse(localStorage.getItem("showModalOnLoad"));
        if (!show) {
            console.log(
                "showModalOnLoad",
                localStorage.getItem("showModalOnLoad")
            );

            setTimeout(() => {
                setShowModal(true);
            }, 1500);
        }
    }, []);

    const showModalHandler = () => {
        setShowModal(!showModal);
    };
    const showModalGeneralHandler = (arg) => {
        setShowModalGeneral(arg);
    };

    return (
        <Provider store={store}>
            <Router>
                <LastLocationProvider>
                    <div className={cl.App}>
                        <Modal
                            show={showModal}
                            showmodalhandler={showModalHandler}
                        >
                            <Meta show={showModal} />
                        </Modal>
                        <ModalGeneral show={showModalGeneral}>
                            {showModalGeneral && (
                                <RemoveAccount
                                    showModalGeneralHandler={
                                        showModalGeneralHandler
                                    }
                                />
                            )}
                        </ModalGeneral>
                        <Switch>
                            <Route exact path="/">
                                <LayoutLanding>
                                    <Landing />
                                </LayoutLanding>
                            </Route>
                            <Route exact path="/register">
                                <LayoutLanding>
                                    <Register />
                                </LayoutLanding>
                            </Route>
                            <Route exact path="/login">
                                <LayoutLanding>
                                    <Login />
                                </LayoutLanding>
                            </Route>

                            <LayoutMain>
                                <PrivateRoute
                                    exact
                                    path="/profile"
                                    showModalGeneralHandler={
                                        showModalGeneralHandler
                                    }
                                    component={Profile}
                                />
                                <PrivateRoute
                                    exact
                                    path="/signature"
                                    component={Sign}
                                />
                                <PrivateRoute
                                    exact
                                    path="/nappers"
                                    component={Nappers}
                                />
                            </LayoutMain>
                            <Route path="*">
                                <LayoutLanding>
                                    <NotFound />
                                </LayoutLanding>
                            </Route>
                        </Switch>
                    </div>
                    <Github />
                    <ImFileText2
                        onClick={showModalHandler}
                        style={{
                            position: "absolute",
                            top: "23px",
                            right: "30px",
                            fontSize: 20,
                            cursor: "pointer",
                            zIndex: "100",
                        }}
                    />
                </LastLocationProvider>
            </Router>
        </Provider>
    );
};

export default App;
