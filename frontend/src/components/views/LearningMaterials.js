import React, { Component } from "react";

import MaterialService from "../../service/material_service";

export default class LearningMaterials extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
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

                    <h3>{this.state.content}</h3>
            </div>
        );
    }
}