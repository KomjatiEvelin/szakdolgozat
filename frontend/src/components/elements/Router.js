import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../pages/LoginPage";
import Register from "../pages/RegPage";
import Home from "../pages/Home";
import LearningMaterials from "../pages/LearningMaterials";
import Games from "../pages/Games";

class Router extends Component {

    render() {

        return (
            <div style={{margin:'20px'}}>
                    <Switch>
                        <Route exact path={["/", "/pages/home"]} component={Home} />
                        <Route exact path="/users/login" component={Login} />
                        <Route exact path="/users/register" component={Register} />
                        <Route path="/pages/materials" component={LearningMaterials} />
                        <Route path="/pages/games" component={Games} />
                    </Switch>
            </div>
        );
    }
}

export default Router;
