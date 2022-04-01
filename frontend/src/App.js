import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import NavBar from "./components/elements/NavBar";
import Router from "./components/elements/Router";
import MobileNav from "./components/elements/MobileNav";

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }


    render() {


        return (
            <>
               <MobileNav/>
               <NavBar/>
               <Router/>
            </>
        );
    }
}

export default App;
