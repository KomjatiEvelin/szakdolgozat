import React from "react";
import UserService from "../../service/user_service";
import {Button, Card, Table} from "react-bootstrap";
import Popup from 'reactjs-popup';
import user_icon from "../../assets/user_icon.png";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: UserService.getCurrentUser(),
            newEmail:"",
            newClassNum: "",
            newPassword:"",
            loading:false,
            message: ""
        };
        this.formOnChange = this.formOnChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        UserService.logout();
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

        UserService.modifyUserData(this.state.newEmail, this.state.newClassNum,this.state.currentUser.username).then(
            () => {
                this.setState({currentUser:UserService.getCurrentUser()});
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
            <div style={{ width: '100%',margin:'0', display:'flex'}}>
                <Card style={{ width: '25rem',margin:"10px", backgroundColor:'rgba(171, 151, 0, 0.65)' , fontSize:'10'}}>
                    <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)', textAlign:"center"}}>
                        Profil adatok
                            <img src={user_icon} alt={"icon"} style={{width:"50%", margin:"10px"}}/>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <h5>Felhasználónév: {currentUser.username}</h5>
                            <h5>User ID: {currentUser.id}</h5>
                            <h5>E-mail: {currentUser.email}</h5>
                            <h5>Osztály: {currentUser.class}</h5>
                        </Card.Text>

                        <Popup trigger={<Button style={{margin:'5px'}}>Adatok módosítása</Button>}>
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
                        <Button href="/users/login" onClick={this.logOut} style={{margin:'5px'}}>Kijelentkezés</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '100%',margin:"10px", backgroundColor:'rgba(0, 11, 171, 0.65)' , fontSize:'10'}}>
                    <Card.Header as="h2" style={{backgroundColor:'rgba(60, 93, 93, 0.8)'}}>Korábbi eredmények</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant={"dark"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Témakör</th>
                                <th>Feladat</th>
                                <th>Időpont</th>
                                <th>Pontszám</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Alapműveletek</td>
                                <td>Kiegészítő</td>
                                <td>2021.12.28. 16:57</td>
                                <td>32</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

            </div>
        );
    }
}
