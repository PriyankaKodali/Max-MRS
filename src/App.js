import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';


class App extends Component {

    constructor(props) {
        super(props);
        var isLoggedIn = sessionStorage.getItem("access_token") != null;
        window.isLoggedIn = isLoggedIn;
    }

    logoutClick(e) {
        e.preventDefault();
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("roles");
        window.isLoggedIn = false;
        window.open("/", "_self")
    }


    render() {
        var roles = sessionStorage.getItem("roles");
        return (
            <div >

                {
                    window.isLoggedIn && roles.indexOf("Admin") != -1 ?
                        <div className="my-nav-bar" style={{ zIndex: '1000' }}>
                            <div className="container-fluid">
                                <div className="navbar-header header headerimage">
                                    <img className="headerimage" src="Images/logo.png" alt="" />
                                </div>
                                <div id="navbar2" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{"Hi " + sessionStorage.getItem("displayName")}</a>
                                            <ul className="dropdown-menu">
                                                <li> <Link to="/ChangePassword" > Change Password </Link> </li>
                                                <li><a onClick={this.logoutClick.bind(this)}>Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Menu</a>
                                            <ul className="dropdown-menu">
                                                <li> <Link to="/AllocateJob"> AllocateJob</Link> </li>
                                                <li> <Link to="../Coordinator"> Coordinator </Link> </li>
                                                <li> <Link to="../SplitJob"> Split Job </Link> </li>
                                            </ul>
                                        </li>
                                    </ul>

                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <Link className="dropdown-toggle" to="../EmployeesList"> Employees  </Link>
                                        </li>
                                    </ul>


                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Clients</a>
                                            <ul className="dropdown-menu">
                                                <li> <Link to="../ClientsList"> Clients </Link> </li>
                                                <li> <Link to="../ClientEmployeesList"> Client Employee  </Link> </li>
                                                <li> <Link to="../DoctorsList" > Doctor </Link> </li>
                                                <li> <Link to="../DoctorGroups">Doctor Groups </Link> </li>
                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        :
                        <div />
                }

                {
                    window.isLoggedIn && roles.indexOf("ClientEmployee") != -1 ?
                        <div className="my-nav-bar" style={{ zIndex: '1000' }}>
                            <div className="container-fluid">
                                <div className="navbar-header header headerimage">
                                    <img className="headerimage" src="Images/logo.png" alt="" />
                                </div>
                                <div id="navbar2" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{"Hi " + sessionStorage.getItem("displayName")}</a>
                                            <ul className="dropdown-menu">
                                                <li> <Link to="/ChangePassword" > Change Password </Link> </li>
                                                <li><a onClick={this.logoutClick.bind(this)}>Logout</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                    <ul className="nav navbar-nav navbar-right">
                                        <li className="dropdown">
                                            <Link to="../ClientEmployeeDashboard" > Dashboard</Link>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                        :
                       <div />
                }
                {this.props.children}
            </div>
        );
    }
}

export default App;
