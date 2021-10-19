import React from "react";

class RegPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            userName: "",
            passwd: "",
            class:""
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
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Regisztráció</h4>
                    <div className="card-text">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="username" className="form-control" id="exampleInputUsername1"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">Password again</label>
                                <input type="password" className="form-control" id="exampleInputPassword2"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="exampleClassk1">Class</label>
                                <input type="number" className="form-control" id="exampleClass1"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                </div>
            </div>
            </body>);
    }
}
export default RegPage