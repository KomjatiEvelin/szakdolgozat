import React from "react";
import { Card ,Button} from 'react-bootstrap';
import AuthService from "../../service/auth_service";


class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName:"",
            password:"",
            loading:false,
            message: ""
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
        this.setState({
            message: "",
            loading: true
        });

        AuthService.login(this.state.userName, this.state.password).then(
            () => {
                this.props.history.push("/profile");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
    }


    render() {

        return (

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
                                    <input onChange={this.formOnChange} type="password" className="form-control" name="password"/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input"/>
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <Button type="submit" className="btn btn-primary">Bejelentkezés</Button>
                            </form>
                    </Card.Text>
                </Card.Body>
            </Card>);
    }
}
export default LoginPage