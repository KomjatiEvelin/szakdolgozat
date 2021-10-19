import React from "react";
import logo from '../../logo.svg';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {apiResponse: ""};
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    componentWillMount() {
        this.callAPI();
    }
    render(){
        return(
            <div className="App>">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <body className="App-body">{this.state.apiResponse}</body>

            </div>);
    }
}

export default Home