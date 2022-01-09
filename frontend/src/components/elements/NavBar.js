import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "../../service/user_service";
import {Navbar, Nav} from "react-bootstrap";


import user_icon from "../../assets/user_icon.png";

class NavBar extends Component {
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
                <Navbar className="navbar navbar-expand navbar-dark bg-dark" style={{fontSize:'24px'}}>

                    {currentUser ? (
                        <div style={{ width: '100%', display:'flex'}}>
                            <Nav className="me-auto mx-4 " style={{ maxHeight: '100px' ,margin:'5px'}}>
                                <Nav.Link href="/pages/materials">Tananyagok</Nav.Link>
                                <Nav.Link href="/pages/materials">Feladatok</Nav.Link>
                            </Nav>
                            <Nav className="my-auto mx-4 justify-content-end ">

                                    <Nav.Link href={"/"} className="nav-link">
                                        <img src={user_icon} alt={"icon"} style={{height:'30px', marginRight:'5px'}}/>{currentUser.username}
                                    </Nav.Link>
                            </Nav>
                        </div>
                    ) : (
                        <div style={{ width: '100%', display:'flex'}}>
                            <Nav className="me-auto mx-4" style={{ maxHeight: '100px',margin:'5px'}}>
                                <Nav.Link href="/users/login">Bejelentkezés</Nav.Link>
                            </Nav>
                            <Nav className="my-auto mx-4 justify-content-end" style={{ maxHeight: '100px' }}>

                                <Nav.Link href="/users/register">Regisztráció</Nav.Link>
                            </Nav>
                        </div>
                    )}
                </Navbar>
        );
    }
}

export default NavBar;