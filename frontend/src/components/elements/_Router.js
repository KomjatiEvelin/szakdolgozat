import React from "react";
import Home from "../views/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from "../views/LoginPage";
import RegPage from "../views/RegPage";

class _Router extends React.Component {
    render(){
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/register">
                            <RegPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
export default _Router