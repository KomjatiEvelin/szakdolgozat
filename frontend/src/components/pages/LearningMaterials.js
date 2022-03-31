import React, { Component } from "react";
import MaterialService from "../../service/material_service";
import {Card} from "react-bootstrap";

export default class LearningMaterials extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toastShown:false,
            toastVariant:"",
            message: "",
            content:[]
        };
    }

    componentDidMount() {


            MaterialService.getLearningMaterials().then((res)=>
                this.setState({content: res}));

    }

    render() {
        return (
            <div className={"maincontainer"} style={{ width: '100%',margin:'0', display:'flex'}}>
                {this.state.content.map(cont => (
                    <Card className={"gamecard"} style={{margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'10', width:'20vw'}}>
                        <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>{cont.name}</Card.Header>
                        <Card.Body>
                            {cont.content}
                        </Card.Body>
                    </Card>
                ))}
            </div>
        );
    }
}
