import React, {Component, Fragment} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { slide as Menu } from 'react-burger-menu';
import AuthService from "../../service/user_service";
import {Navbar, Nav} from "react-bootstrap";


import user_icon from "../../assets/user_icon.png";

class MobileNav extends Component {
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

    render(){
        const { currentUser } = this.state;

        return (
            <Navbar id="outer-container" className={"MobileNav navbar navbar-expand navbar-dark bg-dark"} style={{height:'40px'}} >
            <Menu outerContainerId={ "outer-container"}>
                {currentUser ? (
                    <Nav>
                        <Nav.Link className="my-auto mx-4 justify-content-end" href={"/"}>
                            <img src={user_icon} alt={"icon"} style={{height:'30px', marginRight:'5px'}}/>{currentUser.username}
                        </Nav.Link>
                        <Nav.Link className="my-auto mx-4 justify-content-end" href="/pages/materials">Tananyagok</Nav.Link>
                        <Nav.Link className="my-auto mx-4 justify-content-end" href="/pages/games">Feladatok</Nav.Link>

                    </Nav>

                ) : (
                        <Nav className="me-auto mx-4 " style={{ maxHeight: '100px',margin:'5px'}}>
                            <Nav.Link href="/users/login">Bejelentkezés</Nav.Link>
                            <Nav.Link href="/users/register">Regisztráció</Nav.Link>
                        </Nav>
                )}
            </Menu>
            </Navbar>
        );
    }
}

export default MobileNav;
