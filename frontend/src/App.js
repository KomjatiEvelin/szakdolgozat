import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./service/user_service";

import Login from "./components/views/LoginPage";
import Register from "./components/views/RegPage";
import Home from "./components/views/Home";
import LearningMaterials from "./components/views/LearningMaterials";
import {Container, Navbar, Nav} from "react-bootstrap";


import user_icon from "./assets/user_icon.png";

class App extends Component {
    constructor(props) {
        super(props);

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


    render() {
        const { currentUser } = this.state;

        return (
            <>
                <Navbar className="navbar navbar-expand navbar-dark bg-dark" style={{fontSize:'24px'}}>

                    {currentUser ? (
                        <Container>
                            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                                <Nav.Link href="/pages/materials">Tananyagok</Nav.Link>
                                <Nav.Link href="/">Feladatok</Nav.Link>
                            </Nav>
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    <Link to={"/"} className="nav-link">
                                        <img src={user_icon} alt={"icon"} style={{height:'30px', marginRight:'5px'}}/>{currentUser.username}
                                    </Link>
                                </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    ) : (
                        <Container>
                            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                                <Nav.Link href="/users/login">Bejelentkezés</Nav.Link>
                            </Nav>
                            <Nav className="me-auto my-2 my-lg-0 justify-content-end" style={{ maxHeight: '100px' }}>

                                <Nav.Link href="/users/register">Regisztráció</Nav.Link>
                            </Nav>
                        </Container>
                    )}
                </Navbar>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/pages/home"]} component={Home} />
                        <Route exact path="/users/login" component={Login} />
                        <Route exact path="/users/register" component={Register} />
                        <Route path="/pages/materials" component={LearningMaterials} />
                    </Switch>
                </div>
                </ >
        );
    }
}

export default App;