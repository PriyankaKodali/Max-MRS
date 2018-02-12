import React, { Component } from 'react';
import './Login.css';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
//import { MyAjaxForAttachments, MyAjax } from './../MyAjax';
//import validate from 'validate.js';
import { ApiUrl } from '../Config';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { error: "" };
        // sessionStorage.removeItem("access_token");
        // sessionStorage.removeItem("roles");
        // window.isLoggedIn = false;
    }


    render() {
        return (
            <div classNa="container">
                <div className="wrapper">
                    <form action="" method="post" name="Login_Form" className="form-signin">
                        <div className="row text-center bol">
                            {/* <i className="fa fa-circle"></i> */}
                            </div>
                        <h3 className="text-center" >
                            <img className="logo" src="Images/logo.png"  alt=""/>
                        </h3>

                        <div className="form-group" style={{ paddingTop: '10px' }}>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-user"></span>
                                </span>
                                <input className="form-control usrName" type="text" placeholder="Username" name="email" autoComplete="off" ref="username" />
                            </div>
                        </div>
                        
                        <div className="form-group" style={{ paddingTop: '20px' }}>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span class="glyphicon glyphicon-lock"></span>
                                </span>
                                <input type="password" className="form-control usrName" name="Password" placeholder="Password" required="" ref="password"  />
                            </div>
                        </div>
                        <button className="btn btn-md btn-primary btn-block" name="Submit" value="Login" type="Submit"  onClick={this.handleSubmit.bind(this)}>Login</button>

                        <div style={{ marginTop: '18px' }}>
                            <a href=""> Forget your password? </a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

      handleSubmit(e) {
        e.preventDefault();
        toast.dismiss();
        $(".loader").css("display", "inline-block");
        $("button[name='submit']").hide();

        if (!ValidateForm(e)) {
            $(".loader").hide();
            $("button[name='submit']").show();
            return false;
        }

        var data = {
            username: this.refs.username.value,
            password: this.refs.password.value,
            grant_type: "password"
        };

        let url = ApiUrl + "/Token";
        try {
            $.post(url, data).done(
                (data) => {
                     window.isLoggedIn = true;
                    sessionStorage.setItem("access_token", data["access_token"]);
                    sessionStorage.setItem("roles", data["roles"]);
                    sessionStorage.setItem("displayName",   data["displayName"]);
                      sessionStorage.setItem("userName", data["userName"]);
                    this.props.history.push("/DashBoard");
                }
            ).fail(
                (error) => {
                    $(".loader").hide();
                    $("button[name='submit']").show();
                    if (error.responseJSON) {
                        toast(error.responseJSON.error_description, {
                            type: toast.TYPE.ERROR,
                            autoClose: false
                        });
                    }
                    else {
                        toast("An error occoured, please try again", {
                            type: toast.TYPE.ERROR,
                            autoClose: false
                        });
                    }
                    return false;
                }
                )

                console.log(sessionStorage.getItem("roles"));
        }
        catch (e) {
            toast("An error occoured, please try again!", {
                type: toast.TYPE.ERROR,
                autoClose: false
            });
            $(".loader").hide();
            $("button[name='submit']").show();
            return false;
        }
    }
}
export default Login;