import React from 'react'
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { ApiUrl } from '../Config';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax'
import Select from 'react-select';
import './ClientEmployees.css';

class ClientEmpRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Clients: [],
            Client: null,
            firstname: null,
            lastname: null,
            secondaryNum: null,
            primaryNumber: null,
            fax: null,
            email: null,
            department: null,
            Countries: [],
            Country: null
        }
    }

    componentDidMount() {
        setUnTouched(document);
    }

    componentWillMount() {
       $.ajax({
            url: ApiUrl + "/api/MasterData/GetAllClients",
            type: "get",
            success:(data)=> {this.setState({Clients: data["clients"]})}
        })
    }

    render() {
        return (
            <div className="headerCon">
                <div className="clientEmpContainer">
                    <div className="col-xs-12 headerstyle" >
                        <h3 className="col-xs-11 formheader" style={{ paddingLeft: '10px'}}> Client Employees </h3>
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
                                        <input className="col-md-3 form-control" type="text" name="FirstName" placeholder="First Name" autoComplete="off" ref="firstname" />
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
                                        <input className="col-md-3 form-control" name="MiddleName" type="text" placeholder="Middle Name" autoComplete="off" ref="middlename" />
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
                                        <input className="col-md-3 form-control" name="LastName" type="text" placeholder="Last Name" autoComplete="off" ref="lastname" />
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
                                        <input className="col-md-3 form-control" name="PhoneNumber" type="text" placeholder="Primary Phone Number" autoComplete="off" ref="primaryNumber" />
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
                                        <input className="col-md-3 form-control" type="text" placeholder="Secondary Phone Number" autoComplete="off" ref="secondaryNum" />
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
                                        <input className="col-md-3 form-control" name="email" type="text" placeholder="Email" autoComplete="off" ref="email" />
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-4">
                                <label> Fax </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-hdd"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="fax" type="text" placeholder="FAX" autoComplete="off" ref="fax" />
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
                                        <input className="col-md-3 form-control" type="text" name="Department" placeholder="Department" autoComplete="off" ref="department" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <div className="loader loaderActivity" style={{ marginLeft: '43%', marginBottom: '8px' }} ></div>
                            <button type="submit" style={{ marginLeft: '43%' }} name="submit" className="btn btn-md btn-success" > Save </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    ClientChanged(val) {
        this.setState({ Client: val || '' })
         showErrorsForInput(this.refs.clientname.wrapper, null);
    }

    handleSubmit(e) {
        e.preventDefault();

           $(".loaderActivity").show();
           $("button[name='submit']").hide();

        $(e.currentTarget.getElementsByClassName('form-control')).map((i, ele) => {
            ele.classList.remove("un-touched");
            return null;
        })

        if (!this.validate(e)) {
              $(".loaderActivity").hide();
              $("button[name='submit']").show();
            return;
        }

        var data = new FormData();

        data.append("FirstName", this.refs.firstname.value);
        data.append("MiddleName", this.refs.middlename.value);
        data.append("LastName", this.refs.lastname.value);
        data.append("PrimaryPhoneNum", this.refs.primaryNumber.value);
        data.append("SecondaryPhoneNumber", this.refs.secondaryNum.value);
        data.append("Email", this.refs.email.value);
        data.append("Department", this.refs.department.value);
        data.append("Fax", this.refs.fax.value);
        data.append("ClientId", this.state.Client.value)

        let url = ApiUrl + "api/Client/AddClientEmployee";

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Client Employee saved successfully!", {
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
        var success = ValidateForm(e);

        if (!this.state.Client || !this.state.Client.value) {
            success = false;
            showErrorsForInput(this.refs.clientname.wrapper, ["Please select a valid client"]);
        }
        return success;
    }

}

export default ClientEmpRegistration;

