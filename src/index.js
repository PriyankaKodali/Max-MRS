import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './Login/Login';
import './Login/Login.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import EmployeeRegistration from './Employee/EmployeeRegistration';
import ClientEmployee from './ClientEmployee/ClientEmployee';
import Coordinator from './Coordinator/Coordinator';
import Employee from './Employee/EmployeeDashboard';
import ClientEmpRegistration from './ClientEmpRegistration/ClientEmpRegistration';
import ClientRegistration from './Client/ClientRegistration';

import AllocateJob from './AllocateJob/AllocateJob';
import UploadFiles from './UploadFiles/UploadFiles';
import ClientEmployeesList from './ClientEmpRegistration/ClientEmployeesList';
import SplitJob from './SplitJob/SplitJob';
import EmployeesList from './Employee/EmployeesList';
import ClientsList from './Client/ClientsList';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Router, Route, IndexRoute } from 'react-router';
import { HashRouter } from 'react-router-dom';
import 'react-select/dist/react-select.css';
import EmployeePayScale from './Employee/EmployeePayScale';
import EmployeeDocuments from './Employee/EmployeeDocuments';
import EditClientEmployee from './ClientEmpRegistration/EditClientEmployee';
import Doctor from './Doctor/Doctor';
import DoctorsList from './Doctor/DoctorsList';
import DoctorGroups from './Doctor/DoctorGroups';


import 'bootstrap-fileinput/js/plugins/piexif.min.js';
import 'bootstrap-fileinput/js/plugins/purify.min.js';
import 'bootstrap-fileinput/js/fileinput.js';
import 'bootstrap-fileinput/themes/fa/theme.js';

window.jQuery = window.$ = require("jquery");
var bootstrap = require('bootstrap');
window.isLoggedIn = sessionStorage.getItem("access_token") !== null;

ReactDOM.render((
    <HashRouter>
        <div>
            <ToastContainer autoClose={3000} position="top-center" />
            <App>
                <Route exact path='/' component={Login} />
                <Route exact path='/ClientEmployee' component={ClientEmployee} />
                <Route exact path='/Coordinator' component={Coordinator} />
                <Route exact path='/Employee' component={Employee} />
                <Route exact path='/AllocateJob' component={AllocateJob} />
                <Route exact path="/UploadFiles" component={UploadFiles} />
                <Route exact path="/SplitJob" component={SplitJob} />

                <Route exact path="/ClientEmpRegistration" component={ClientEmpRegistration} />
                <Route exact path="/ClientRegistration/:id?" component={ClientRegistration} />
                <Route exact path="/EmployeeRegistration/:id?" component={EmployeeRegistration} />
                <Route exact path="/EmployeePayScale/:id" component={EmployeePayScale} />
                <Route exact path="/EmployeeDocuments/:id" component={EmployeeDocuments} />
                <Route exact path="/Doctor/:id?" component={Doctor} />

                <Route exact path="/ClientEmployeesList" component={ClientEmployeesList} />
                <Route exact path="/EmployeesList" component={EmployeesList} />
                <Route exact path="/ClientsList" component={ClientsList} />
                <Route exact path="/EditClientEmployee/:id" component={EditClientEmployee} />

                <Route exact path="/DoctorsList" component={DoctorsList} />
                <Route exact path="/DoctorGroups" component={DoctorGroups} />
        
            </App>
        </div>
    </HashRouter>
),
    document.getElementById('root')
);
