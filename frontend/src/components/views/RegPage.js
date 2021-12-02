import React from "react";
import { Card ,Button} from 'react-bootstrap';
import background from "../../assets/reg_backgr.jpg";
import {Redirect} from "react-router-dom";

class RegPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            userName: "",
            passwd: "",
            class:"",
            redirect:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.formOnChange=this.formOnChange.bind(this);


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

        fetch("http://localhost:9000/users/register", {
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

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    render() {
        if(this.state.redirect){

            return(<Redirect to={"/login"}/>);
        }
        return (
            <body style={{backgroundImage:`url(${background})`, backgroundSize:"cover", color:"white"}}>
            <Card style={{ width: '25rem', margin:"auto",marginTop:"10rem", backgroundColor:'rgba(99, 156, 156, 0.65)'}}>
                <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>Regisztráció</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email cím</label>
                                <input onChange={this.formOnChange} type="email" className="form-control" name="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Felhasználónév</label>
                                <input onChange={this.formOnChange} type="username" className="form-control" name="userName"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Jelszó</label>
                                <input onChange={this.formOnChange} type="password" className="form-control" name="passwd"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">Jelszó ismét</label>
                                <input type="password" className="form-control" name="exampleInputPassword2"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="exampleClassk1">Évfolyam</label>
                                <input onChange={this.formOnChange} type="number" className="form-control" name="class"/>
                            </div>
                            <Button type="submit" variant="primary">Regisztráció</Button>
                        </form>
                    </Card.Text>

                </Card.Body>
            </Card>
            </body>);
    }
}
export default RegPage