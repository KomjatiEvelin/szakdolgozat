import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/elements/NavBar";
import Router from "./components/elements/Router";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {


        return (
            <>
               <NavBar/>
               <Router/>
            </>
        );
    }
}

export default App;