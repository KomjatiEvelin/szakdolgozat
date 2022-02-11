import React, { Component } from "react";

import MaterialService from "../../service/material_service";
import {Button, Card} from "react-bootstrap";

export default class LearningMaterials extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content:""
        };
    }

    componentDidMount() {
        MaterialService.getLearningMaterials().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div style={{ width: '100%',margin:'0', display:'flex'}}>

                    <Card style={{margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'10', maxWidth:'20%'}}>
                        <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>{this.state.content}</Card.Header>
                    </Card>
            </div>
        );
    }
}
