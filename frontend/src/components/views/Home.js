import React from "react";
import AuthService from "../../service/auth_service";
import {Button, Card} from "react-bootstrap";
import Popup from 'reactjs-popup';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: AuthService.getCurrentUser(),
            newEmail:"",
            newClassNum: "",
            newPassword:"",
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

        AuthService.modifyUserData(this.state.newEmail, this.state.newClassNum,this.state.currentUser.username).then(
            () => {
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
        const {currentUser} = this.state;

        return (
            <div style={{ width: '100%',margin:'0'}}>
                <Card style={{ width: '25rem',margin:"10px", backgroundColor:'rgba(99, 156, 156, 0.65)' , fontSize:'10'}}>
                    <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>Profil adatok</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <h5>Felhasználónév: {currentUser.username}</h5>
                            <h5>User ID: {currentUser.id}</h5>
                            <h5>E-mail: {currentUser.email}</h5>
                            <h5>Osztály: {currentUser.class}</h5>
                        </Card.Text>

                        <Popup trigger={<Button>Adatok módosítása</Button>}>
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="e-mail" className="form-label">Új e-mail</label>
                                    <input onChange={this.formOnChange} type="text" className="form-control" name="newEmail"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="classNumber" className="form-label">Új osztály</label>
                                    <input onChange={this.formOnChange} type="number" className="form-control" name="newClassNum"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Új jelszó</label>
                                    <input onChange={this.formOnChange} type="password" className="form-control" name="newPassword"/>
                                </div>
                                <Button type="submit" className="btn btn-primary">Módosítás</Button>
                            </form>
                        </Popup>
                    </Card.Body>
                </Card>
                <Card style={{ width: '25rem',margin:"10px", backgroundColor:'rgba(99, 156, 156, 0.65)' , fontSize:'10'}}>
                    <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>Korábbi eredmények</Card.Header>
                    <Card.Body>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}
