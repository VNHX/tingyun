import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Login from 'bundle-loader?lazy&name=login!pages/Home/login';
import Overview from 'bundle-loader?lazy&name=overview!pages/Overview/Overview';
import Application from 'bundle-loader?lazy&name=application!pages/Application/Application';
import Affairs from 'bundle-loader?lazy&name=affairs!pages/Affairs/Affairs';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Setup from 'bundle-loader?lazy&name=setUp!pages/Setup/Setup';
import Alarm from 'bundle-loader?lazy&name=Alarm!pages/alarm/AlarmPage.js';

const createComponent = (modFn) => props => (
    <Bundle load={modFn}>
        {
            (WaitingComponent) => WaitingComponent ? <WaitingComponent {...props}/> : <Loading {...props}/>
        }
    </Bundle>
);

export default () => (
    <div>
        <Switch>
            <Route exact path="/server/" component={createComponent(Home)}/>
            <Route exact path="/login" component={createComponent(Login)}/>
            <Route path="/server/alarm" component={createComponent(Alarm)}/>
            <Route path="/server/overview" component={createComponent(Overview)}/>
            <Route path="/server/application" component={createComponent(Application)}/>
            <Route path="/server/affairs" component={createComponent(Affairs)}/>
            <Route path="/server/setup" component={createComponent(Setup)}/>
            <Route component={createComponent(NotFound)}/>
        </Switch>
    </div>
);
