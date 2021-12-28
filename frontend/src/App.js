import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./service/auth_service";

import Login from "./components/views/LoginPage";
import Register from "./components/views/RegPage";
import Home from "./components/views/Home";
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
            <>
                <nav className="navbar navbar-expand navbar-dark bg-dark" style={{fontSize:'24px'}}>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>

                            {currentUser && (
                                <li className="nav-item">
                                    <Link to={"/pages/user"} className="nav-link">
                                        Tananyagok
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <a href="/" className="nav-link" >
                                    Feladatok
                                </a>
                            </li>
                            <li className="nav-item" >
                                <a href="/users/login" className="nav-link" onClick={this.logOut}>
                                    Kijelentkezés
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/users/login"} className="nav-link">
                                    Bejelentkezés
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/users/register"} className="nav-link">
                                    Regisztráció
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
                        <Route path="/pages/user" component={BoardUser} />
                    </Switch>
                </div>
                </ >
        );
    }
}

export default App;