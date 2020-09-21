import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Charts from './pages/charts';
import Home from './pages/home';
import Records from './pages/records';


const Routes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/records" component={Records} />
                <Route path="/charts" component={Charts} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;