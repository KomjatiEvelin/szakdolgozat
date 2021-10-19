import React from "react";
import Home from "../views/Home";
import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
import LoginPage from "../views/LoginPage";

class _Router extends React.Component {
    render(){
        return(
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <LoginPage />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}
export default _Router