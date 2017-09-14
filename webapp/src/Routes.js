import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Poll from './Containers/Poll/Poll';
import Create from './Containers/Create/Create';
import Results from './Containers/Results/Results';

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Vote/:id" component={Poll} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/results" component={Results} />
                </Switch>
            </BrowserRouter>
        );
    }
}