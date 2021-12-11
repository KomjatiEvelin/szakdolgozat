import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./assets/reg_backgr.jpg";
import "./App.css";

import AuthService from "./service/auth_service";

import Login from "./components/views/LoginPage";
import Register from "./components/views/RegPage";
import Home from "./components/views/Home";
import Profile from "./components/views/ProfilePage";
import BoardUser from "./components/views/BoardUser";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;

        return (
            <body style={{backgroundImage:`url(${background})`, backgroundSize:"cover", color:"white"}}>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/pages/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/pages/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/users/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/users/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/users/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/pages/home"]} component={Home} />
                        <Route exact path="/users/login" component={Login} />
                        <Route exact path="/users/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route path="/pages/user" component={BoardUser} />
                    </Switch>
                </div>
            </body>
        );
    }
}

export default App;