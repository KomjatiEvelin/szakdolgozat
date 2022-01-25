import React, { Component } from "react";

import GameService from "../../service/game_service";
import UserService from "../../service/user_service";
import {Button, Card} from "react-bootstrap";

export default class Games extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: UserService.getCurrentUser(),
            toastShown:false,
            toastVariant:"",
            message: "",
            content:[]
        };
    }

    componentDidMount() {
        if(this.state.currentUser!=null) {
            GameService.getGames(this.state.currentUser.class).then((res)=>
                this.setState({content: res}));
        }

    }

    render() {
        return (
            <div style={{ width: '100%',margin:'0', display:'flex'}}>
                {this.state.content.map(cont => (
                   <Card style={{margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'10', maxWidth:'20%'}}>
                    <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>{cont.name}</Card.Header>
                    <Card.Img variant="top" src={require(`../../assets/${cont.theme}`).default} alt={"logo"}/>
                    <Card.Body>
                        <Button href={`/games${cont.link}`} style={{margin:'5px', width:'100%', fontSize:'24px'}} variant="danger">Játszom</Button>
                    </Card.Body>
                </Card>
                    ))}
            </div>

        );
    }
}
