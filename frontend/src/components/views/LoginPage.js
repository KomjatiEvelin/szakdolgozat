import React from "react";
import {Button, Form} from "react-bootstrap";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            passwd: ""
        };
        this.formOnChange = this.formOnChange.bind(this);
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    render() {
        return (
            <body  className="App-body">
            <div className={"loginForm"}>
                <Form>

                    <Form.Row>
                        <Form.Group controlId={"formGridLoginEmail"}>
                            <Form.Label> Email </Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="email"
                                          type="email"
                                          value={this.state.email}
                                          onChange={this.formOnChange}
                                          placeholder="Please enter your email address:"/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group  controlId={"formGridLoginPasswd"}>
                            <Form.Label> Password </Form.Label>
                            <Form.Control required autoComplete="off"
                                          name="passwd"
                                          type="password"
                                          value={this.state.passwd}
                                          onChange={this.formOnChange}
                                          pattern="[A-Z a-z 0-9]*"
                                          placeholder="Please enter your password:"/>
                        </Form.Group>
                    </Form.Row>
                    <Button
                        disabled={this.state.email.length === 0 ||  this.state.passwd === 0}
                        size={"sm"} variant="success" type="submit" >
                        Submit
                    </Button>


                </Form>
            </div>
            </body>);
    }
}
export default LoginPage