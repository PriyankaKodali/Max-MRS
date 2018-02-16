import React, { Component } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ValidateForm, showErrorsForInput, setUnTouched, showErrors } from '.././Validation';
import { ApiUrl } from '../Config';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax';


class EditClientEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ClientEmp: '',
            Clients: [],
            Client: '',
        }
    }

    componentWillMount() {
        this.setState({ Employee_Id: this.props.match.params["id"] });
        $.ajax({
            url: ApiUrl + "/api/Client/GetClientEmployee?empId=" + this.props.match.params["id"],
            type: "GET",
            success: (data) => {
                this.setState({ ClientEmp: data["clientEmp"],
                 Client: { value: data["clientEmp"]["Client_Id"], label: data["clientEmp"]["client"] } 
                });
            }
        });
        
    $.ajax({
            url: ApiUrl + "/api/MasterData/GetAllClients",
            type: "get",
            success: (data) => { this.setState({ Clients: data["clients"] }) }
        })
    }

    componentDidMount() {
        setUnTouched(document);
    }

    render() {

        if (this.state.ClientEmp !== null) {
            return (
                <div className="headercon" key={this.state.ClientEmp}>
                    <div className="container">
                        <div className="col-xs-12 headerstyle">
                            <h3 className="col-xs-11 formheader" style={{ paddingLeft: '10px' }}> Employee Details</h3>
                            <div className="col-md-1 mybutton">
                                <button type="button" className="btn btn-default pull-left headerbtn" onClick={() => this.props.history.push("/ClientEmployeesList")} >
                                    <span className="glyphicon glyphicon-th-list"></span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)} >
                            <div className="col-xs-12">
                                <div className="col-md-4">
                                    <label> Client </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon" >
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>
                                            <Select className="form-control" name="clientname" ref="clientname" placeholder="Select Client" value={this.state.Client} options={this.state.Clients} onChange={this.ClientChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label> First Name </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon" >
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>
                                            <input className="col-md-3 form-control" type="text" name="FirstName" placeholder=" First Name" autoComplete="off" ref="firstname" defaultValue={this.state.ClientEmp["FirstName"]} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label>Middle Name </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon" >
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>
                                            <input className="col-md-3 form-control" name="MiddleName" type="text" placeholder="Middle Name" autoComplete="off" ref="middlename" defaultValue={this.state.ClientEmp["MiddleName"]} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xs-12">

                                <div className="col-md-4">
                                    <label> Last Name </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon" >
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>
                                            <input className="col-md-3 form-control" name="LastName" type="text" placeholder="Last Name" autoComplete="off" ref="lastname" defaultValue={this.state.ClientEmp["LastName"]} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label> Primary Phone Number </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="	glyphicon glyphicon-phone"></span>
                                            </span>
                                            <input className="col-md-3 form-control" name="PhoneNumber" type="text" placeholder="Primary Phone Number" autoComplete="off" ref="primaryNumber" defaultValue={this.state.ClientEmp["PhoneNumber"]} />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <label> Secondary Phone Number </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="	glyphicon glyphicon-phone"></span>
                                            </span>
                                            <input className="col-md-3 form-control" type="text" placeholder="Secondary Phone Number" autoComplete="off" ref="secondaryNum" defaultValue={this.state.ClientEmp["SecondaryNumber"]} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12" >
                                <div className="col-md-4">
                                    <label> Email </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-envelope"></span>
                                            </span>
                                            <input className="col-md-3 form-control" name="email" type="text" placeholder="Email" autoComplete="off" ref="email" defaultValue={this.state.ClientEmp["Email"]} />
                                        </div>
                                    </div>
                                </div>


                                <div className="col-md-4">
                                    <label> Fax </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-fax"></span>
                                            </span>
                                            <input className="col-md-3 form-control" name="fax" type="text" placeholder="FAX" autoComplete="off" ref="fax" defaultValue={this.state.ClientEmp["Fax"]} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <label> Department </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>
                                            <input className="col-md-3 form-control" type="text" name="Department" placeholder="Department" autoComplete="off" ref="department" defaultValue={this.state.ClientEmp["Department"]} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <button type="submit" name="submit" className="btn btn-md btn-success" style={{marginLeft:'45%'}} > Save </button>
                            </div>
                        </form>
                    </div>
                </div>

            )
        }

        else {
            return (<div className="loader"></div>)
        }

    }

    ClientChanged(val) {
        this.setState({ Client: val || '' })
    }

    handleSubmit(e) {

        e.preventDefault();

        $(e.currentTarget.getElementsByClassName('form-control')).map((i, ele) => {
            ele.classList.remove("un-touched");
            return null;
        })

        if (!this.validate(e)) {
            return;
        }

        // var inputs = $(e.currentTarget.getElementsByClassName('form-control')).map((i, el) => {
        //     if (el.closest(".form-group").classList.contains("hidden")) {
        //         return null;
        //     }
        //     else {
        //         return el;
        //     }
        // });

        var data = new FormData();

        data.append("ClientId", this.state.Client.value);
        data.append("FirstName", this.refs.firstname.value);
        data.append("MiddleName", this.refs.middlename.value);
        data.append("LastName", this.refs.lastname.value);
        data.append("Email", this.refs.email.value);
        data.append("Fax", this.refs.fax.value);
        data.append("PrimaryPhoneNum", this.refs.primaryNumber.value);
        data.append("SecondaryPhoneNum", this.refs.secondaryNum.value);
        data.append("Department", this.refs.department.value);
        data.append("Id", this.props.match.params["id"]);

        let url = ApiUrl + "api/Client/UpdateClientEmployee?EmployeeId=" + this.props.match.params["id"];

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Client Employee Updated successfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $("button[name='submit']").show();
                    this.props.history.push("/ClientEmployeesList");
                    return true;
                },
                (error) => {
                    toast("An error occoured, please try again!", {
                        type: toast.TYPE.ERROR,
                        autoClose: false
                    });
                    $(".loader").hide();
                    $("button[name='submit']").show();
                    return false;
                },
                "POST",
                data
            );
        }
        catch (e) {
            toast("An error occoured, please try again!", {
                type: toast.TYPE.ERROR
            });
            $(".loader").hide();
            $("button[name='submit']").show();
            return false;
        }
    }

    validate(e) {
        let errors = {};
        var success = ValidateForm(e);

        if (!this.state.Client || !this.state.Client.value) {
            success = false;
            showErrorsForInput(this.refs.clientname.wrapper, ["Please select a valid client"]);
        }

        return success;
    }
}

export default EditClientEmployee






                                // {
                                //     this.state.ClientLocation.map((item) => {
                                //         <Clie location={itemX} >
                                //             })
                                // }