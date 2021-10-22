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
        this.handleSubmit=this.handleSubmit.bind(this);
        this.formOnChange=this.formOnChange.bind(this);


    }

    handleSubmit(event) {
        event.preventDefault()
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
            return response.json();
        }).then(function(data) {
            console.log(data)
            if(data == "success"){
                this.setState({msg: "Thanks for registering"});
            }
        }).catch(function(err) {
            console.log(err)
        });
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
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input onChange={this.formOnChange} type="email" className="form-control" name="email"
                                       aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">User name</label>
                                <input onChange={this.formOnChange} type="username" className="form-control" name="userName"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input onChange={this.formOnChange} type="password" className="form-control" name="passwd"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword2" className="form-label">Password again</label>
                                <input type="password" className="form-control" name="exampleInputPassword2"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="exampleClassk1">Class</label>
                                <input onChange={this.formOnChange} type="number" className="form-control" name="class"/>
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