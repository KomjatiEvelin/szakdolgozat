import React from "react";
import Home from "../views/Home";
import LoginPage from "../views/LoginPage";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class _Router extends React.Component {
    render(){
        return(
            <Router>
                <div>

                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
export default _Router