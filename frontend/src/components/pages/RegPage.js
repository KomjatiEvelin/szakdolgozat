import React from "react";
import { Card ,Button, Toast, ToastContainer} from 'react-bootstrap';

import AuthService from "../../service/user_service";

class RegPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            userName: "",
            password: "",
            class:"",
            successful: false,
            toastShown:false,
            toastVariant:"",
            message: "",
            emailValid: false,
            passwordValid: false,
            usernameValid: false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.formOnChange=this.formOnChange.bind(this);
        this.closeToast=this.closeToast.bind(this);


    }

    validateFields() {
        let emailValid= this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        let passwordValid = this.state.password.length >= 6 && this.state.password.match();
        let usernameValid = true;


        this.setState({
            emailValid: emailValid,
            passwordValid: passwordValid,
            usernameValid: usernameValid
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            message: "",
            successful: false
        });
        this.validateFields();
        if(this.state.emailValid&&this.state.usernameValid&&this.state.passwordValid){
        AuthService.register(
            this.state.userName,
            this.state.class,
            this.state.email,
            this.state.password
        ).then(
            response => {
                this.setState({
                    message: response.data.message,
                    successful: true,
                    toastShown:true,
                    toastVariant:"success"
                });
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    successful: false,
                    message: resMessage,
                    toastShown:true,
                    toastVariant:"danger"
                });
            }
        );}
        else{
            this.setState({
                successful: false,
                message: "Nem megfelelő formátum",
                toastShown:true,
                toastVariant:"danger"
            });
        }
    }

    formOnChange(event){
        const {name,value} = event.target;
        this.setState({[name] : value});
    }

    closeToast(){

        this.setState({toastShown:false})
    }

    render() {

        return (
           <>
            <Card style={{ width: '25rem', margin:"auto",marginTop:"10rem", backgroundColor:'rgba(171, 151, 0, 0.65)'}}>
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
                                <input onChange={this.formOnChange} type="password" className="form-control" name="password"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="exampleClassk1">Évfolyam</label>
                                <input onChange={this.formOnChange} type="number" className="form-control" min="1" max={"4"} name="class"/>
                            </div>
                            <Button type="submit" variant="primary">Regisztráció</Button>
                        </form>
                    </Card.Text>

                </Card.Body>
             </Card>
               <ToastContainer position="top-center" className="p-3">
               <Toast onClose={this.closeToast} show={this.state.toastShown} bg={this.state.toastVariant}>
                   <Toast.Header>

                   </Toast.Header>
                   <Toast.Body>{this.state.message}</Toast.Body>
               </Toast>
               </ToastContainer>
           </>);
    }
}
export default RegPage