import React from 'react';
import ReactDOM from 'react-dom';

import {Router, Route, browserHistory} from 'react-router';


import Dashboard from '../components/screens/dashboard/Dashboard';
import Exam from '../components/screens/Exam';
import Doctor from '../components/screens/Doctor';
import Pacient from '../components/screens/Pacient';
import User from '../components/screens/User';
import Appointment from '../components/screens/Appointment';
import Login from '../components/screens/Login';

const RouterConfig = () => {
    return(
        <Router history={browserHistory}>
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={Dashboard}>
                <Route path='/exams' component={Exam} />
                <Route path='/doctors' component={Doctor} />
                <Route path='/pacients' component={Pacient} />
                <Route path='/users' component={User} />
                <Route path='/appointments' component={Appointment} />
            </Route>
        </Router>
    )
}

export default RouterConfig;