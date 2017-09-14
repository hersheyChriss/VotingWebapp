import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Poll from './Containers/Poll/Poll';
import Create from './Containers/Create/Create';

export default class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Poll} />
                    <Route exact path="/create" component={Create} />
                </Switch>
            </BrowserRouter>
        );
    }
}