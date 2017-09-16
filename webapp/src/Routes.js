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
                 	<Route exact path="/" component={Create} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/create/:pin" component={Create} />
                    <Route exact path="/poll/:id" component={Poll} />
                    <Route exact path="/results/:id" component={Results} />
                </Switch>
            </BrowserRouter>
        );
    }
}