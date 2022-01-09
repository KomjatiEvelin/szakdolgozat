import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import Login from "../../components/views/LoginPage";
import Register from "../../components/views/RegPage";
import Home from "../../components/views/Home";
import LearningMaterials from "../../components/views/LearningMaterials";
import Games from "../../components/views/Games";

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