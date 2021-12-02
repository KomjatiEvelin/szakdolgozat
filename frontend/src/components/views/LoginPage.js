import React from "react";
import { Card ,Button} from 'react-bootstrap';
import background from "../../assets/reg_backgr.jpg";
import { Redirect } from 'react-router-dom';


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            passwd:"",
            redirect:false
        };
        this.formOnChange = this.formOnChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const self=this;
           var data = {
            userName: this.state.userName,
            email: this.state.email,
            passwd: this.state.passwd,
            class:this.state.class
        }

        fetch("http://localhost:9000/users/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            self.setState({redirect: true});
        }).catch(function(err) {
            console.log(err)
        });
    }


    render() {
        if(this.state.redirect){

            return(<Redirect to={"/"}/>);
        }
        return (
            <body style={{backgroundImage:`url(${background})`, backgroundSize:"cover", color:"white"}}>
            <Card style={{ width: '25rem', margin:"auto",marginTop:"10rem", backgroundColor:'rgba(99, 156, 156, 0.65)'}}>
                <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>Bejelentkezés</Card.Header>
                <Card.Body>
                    <Card.Text>
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="userName" className="form-label">Felhasználónév</label>
                                    <input onChange={this.formOnChange} type="text" className="form-control" name="userName"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Jelszó</label>
                                    <input onChange={this.formOnChange} type="password" className="form-control" name="passwd"/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <Button type="submit" className="btn btn-primary">Bejelentkezés</Button>
                            </form>
                    </Card.Text>
                </Card.Body>
            </Card>
            </body>);
    }
}
export default LoginPage