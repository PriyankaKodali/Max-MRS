import React, { Component } from 'react';
import $ from 'jquery';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax';
import { ValidateForm, showErrorsForInput, setUnTouched, showErrors } from '../Validation.js';
import { ApiUrl } from '../Config.js';
import { toast } from 'react-toastify';

class ForgotPassword extends Component {

    constructor(props) {

        super(props);
        this.state = {
            error: ""
        }
    }

    render() {
        return (
            <div className="container">
                <div className="wrapper">
                    <form className="forgetPwdForm" action="" name="ForgetPassword" method="post" onSubmit={this.handleSubmit.bind(this)} >
                        <div className="row text-center bol">

                        </div>
                        <h3 className="text-center" >
                            <img className="logo" src="Images/logo.png" alt="" />
                        </h3>
                        <div className="form-group">
                            <label> Enter the registered email</label>
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-user"></span>
                                </span>
                                <input className="form-control usrName" type="text" placeholder="Email" name="email" autoComplete="off" ref="email" />
                            </div>
                        </div>

                        <button className="btn btn-success submitbtn" name="submit" value="Login" type="submit">Submit</button>
                        <div className="loader loaderActivity submitbtn" ></div>

                    </form>
                </div>
            </div>
        )
    }

    handleSubmit(e) {
        e.preventDefault();

        $(".loaderActivity").show();
        $("button[name='submit']").hide();

        if (!ValidateForm(e)) {
            $(".loaderActivity").hide();
            $("button[name='submit']").show();
            return false;
        }

        var data = new FormData();
        data.append("Email", this.refs.email.value);

        var data = {
            Email: this.refs.email.value
        };

        let url = ApiUrl + "/api/Account/ForgotPassword";

        MyAjax(
            url,
            (data) => {
                toast("Please check your mail!", {
                    type: toast.TYPE.SUCCESS
                });
                this.props.history.push("/");
            },
            (error) => {
                $(".loaderActivity").hide();
                $("button[name='submit']").show();
                this.setState({ error: error.responseText.replace(/\[|"|\]/g, '') });
                toast(error.responseText, {
                    type: toast.TYPE.ERROR,
                    autoClose: false
                });
            },
            "POST",
            data
        );

    }
}

export default ForgotPassword;