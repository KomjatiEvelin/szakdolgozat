import React, { Component } from "react";

import UserService from "../../service/user_service";
import {Card} from "react-bootstrap";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <Card style={{ width: '25rem', margin:"auto",marginTop:"10rem", backgroundColor:'rgba(99, 156, 156, 0.65)'}}>
                <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>Üdvözlöm!</Card.Header>
                <Card.Body>
                    <Card.Text>
                    <h3>{this.state.content}</h3>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
