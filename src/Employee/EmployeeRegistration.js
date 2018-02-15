import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { ApiUrl } from '../Config';
import Select from 'react-select';
import './EmployeeRegistration.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax';


var validate = require('validate.js');
var moment = require('moment');

class EmployeeRegistration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Country: null, Employee: [], Countries: [], State: null, States: [], EmpType: null, Department: null,
            Departments: [], Designation: null, Designations: [], Role: null, Roles: [], Gender: null,
            BloodGroup: null, Managers: [], Manager: null, EmployeeId: null, ProvisionalPeriod: 0,

        }
    }

    componentWillMount() {

        this.setState({ EmployeeId: this.props.match.params["id"] }, () => {
            if (this.props.match.params["id"] != null) {
                $.ajax({
                    url: ApiUrl + "/api/Employee/GetEmployee?EmpId=" + this.props.match.params["id"],
                    type: "get",
                    success: (data) => {
                        this.setState({
                            Employee: data["employee"],
                            BloodGroup: { value: data["employee"]["BloodGroup"], label: data["employee"]["BloodGroup"] },
                            Country: { value: data["employee"]["Country"], label: data["employee"]["CountryName"] },
                            State: { value: data["employee"]["State"], label: data["employee"]["StateName"] },
                            City: { value: data["employee"]["City"], label: data["employee"]["CityName"] },
                            EmpType: { value: data["employee"]["EmploymentType"], label: data["employee"]["EmploymentType"] },
                            Designation: { value: data["employee"]["DesgId"], label: data["employee"]["DesgName"] },
                            Department: { value: data["employee"]["DeptId"], label: data["employee"]["DeptName"] },
                            Role: { value: data["employee"]["RoleId"], label: data["employee"]["RoleName"] },
                            Manager: { value: data["employee"]["ManagerId"], label: data["employee"]["ManagerName"] },
                            Gender: { value: data["employee"]["Gender"], label: data["employee"]["Gender"] },
                        })

                        //    console.log(this.state.Employee["DOB"]);
                        console.log(this.state.Employee["DOJ"]);

                    }
                })
            }

        })

        $.ajax({
            url: ApiUrl + "/api/MasterData/GetCountries",
            type: "get",
            success: (data) => { this.setState({ Countries: data["countries"] }) }
        });

        $.ajax({
            url: ApiUrl + "/api/MasterData/GetDesignations",
            type: "get",
            success: (data) => { this.setState({ Designations: data["designations"] }) }
        });

        $.ajax({
            url: ApiUrl + "/api/MasterData/GetDepartments",
            type: "get",
            success: (data) => { this.setState({ Departments: data["departments"] }) }
        });

        $.ajax({
            url: ApiUrl + "/api/MasterData/GetEmpRoles",
            type: "get",
            success: (data) => { this.setState({ Roles: data["empRoles"] }) }
        });

    }

    componentDidMount() {
        setUnTouched(document);
    }


    render() {
        return (
            <div className="headercon" key={this.state.Employee}>
                <div className="container">
                    <button className="col-md-3 btn btn-default btn-circle" style={{ marginLeft: '10%' }} title="General Details" > 1</button>

                    {
                        this.props.match.params["id"] != null ?
                            <div>
                                <hr className="col-md-4" />
                                <button className="col-md-3 btn btn-default btn-circle" onClick={() => this.props.history.push("/EmployeeDocuments/" + this.props.match.params["id"])} title="Documents" > 2</button>
                                <hr className="col-md-4" />
                                <button className="col-md-3 btn btn-default btn-circle" onClick={() => this.props.history.push("/EmployeePayScale/" + this.props.match.params["id"])} title="PayScales" > 3 </button>
                            </div>
                            :
                            <div>
                                <hr className="col-md-4" />
                                <button className="col-md-3 btn btn-default btn-circle" title="Documents" > 2</button>
                                <hr className="col-md-4" />
                                <button className="col-md-3 btn btn-default btn-circle" title="PayScales" > 3</button>

                            </div>
                    }



                    <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)} >

                        <div className="col-xs-12">
                            <h3 className="col-xs-11 Empheading" style={{ paddingLeft: '10px' }}>Personal Details</h3>
                            <div className="col-md-1 mybutton clientAddressbtn">
                                <button type="button" style={{ marginTop: '3%' }} className="btn btn-default pull-left headerbtn" onClick={() => this.props.history.push("/EmployeesList")} >
                                    <span className="glyphicon glyphicon-th-list"></span>
                                </button>
                            </div>
                        </div>

                        <div className="col-xs-12">

                            <div className="col-md-3 form-group">
                                <label> First Name </label>
                                <div className="input-group">
                                    <span className="input-group-addon" >
                                        <i className="glyphicon glyphicon-user" aria-hidden="true"></i>
                                    </span>
                                    <input className="form-control" type="text" name="FirstName" placeholder="First Name" autoComplete="off" ref="firstname" defaultValue={this.state.Employee["FirstName"]} />
                                </div>
                            </div>

                            <div className="col-md-3 form-group">
                                <label> Middle Name </label>
                                <div className="input-group">
                                    <span className="input-group-addon" >
                                        <i className="glyphicon glyphicon-user" aria-hidden="true"></i>
                                    </span>
                                    <input className="form-control" type="text" name="MiddleName" placeholder="Middle Name" autoComplete="off" ref="middlename" defaultValue={this.state.Employee["MiddleName"]} />
                                </div>

                            </div>

                            <div className="col-md-3">
                                <label> Last Name </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="LastName" placeholder="Last Name" autoComplete="off" ref="lastname" defaultValue={this.state.Employee["LastName"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label> Email </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-envelope"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="email" type="text" placeholder="Email" autoComplete="off" ref="email" defaultValue={this.state.Employee["Email"]} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12">

                            <div className="col-md-4">
                                <label> Primary Phone Number </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-phone"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="PhoneNumber" type="text" placeholder="Primary Phone Number" autoComplete="off" ref="primaryNum" defaultValue={this.state.Employee["PrimaryPhoneNum"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label> Secondary Phone Number </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-phone"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="secondaryNum" type="text" placeholder="Secondary Phone Number" autoComplete="off" ref="secondaryNum" defaultValue={this.state.Employee["SecondaryPhoneNum"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-4">
                                <label> Gender </label>

                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <Select className="form-control" name="gender" ref="gender" placeholder="Select Gender" value={this.state.Gender}
                                            options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                                            onChange={this.onGenderChanged.bind(this)} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">

                            <div className="col-md-4">
                                <label>Date of birth </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                        <input className="col-md-3 form-control" style={{ lineHeight: '19px' }} type="date" name="DateOfBirth" ref="dob" autoComplete="off" defaultValue={this.state.Employee["DOB"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <label>Blood Group </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <Select className="form-control" name="BloodGroup" ref="bloodgroup" placeholder="Blood Group" value={this.state.BloodGroup}
                                            options={[{ value: 'A+', label: 'A+' }, { value: 'A-', label: 'A-' }, { value: 'B+', label: 'B+' },
                                            { value: 'B-', label: 'B-' }, { value: 'AB+', label: 'AB-' }, { value: 'O+', label: 'O+' },
                                            { value: 'O-', value: 'O-' }]}
                                            onChange={this.onBloodGroupChanged.bind(this)} />
                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-3">
                                <label>Aadhar </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-info-sign"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="aadhar" type="text" placeholder="Aadhar Number" autoComplete="off" ref="aadhar" defaultValue={this.state.Employee["Aadhar"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <label>Pan</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-info-sign"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="pan" type="text" placeholder="Pan Number" autoComplete="off" ref="panNum" defaultValue={this.state.Employee["Pan"]} />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12">
                            <h3 className="Empheading">Address Details</h3>
                        </div>

                        <div className="col-xs-12">
                            <div className="col-md-6">
                                <label>Address Line 1 </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-map-marker"></span>
                                        </span>
                                        <input className="col-md-5 form-control" type="text" name="AddressLine1" placeholder="Address " autoComplete="off" ref="addressLine1" defaultValue={this.state.Employee["AddressLine1"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label>Address Line 2 </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-map-marker"></span>
                                        </span>
                                        <input className="col-md-5 form-control" type="text" placeholder="Address " autoComplete="off" ref="addressLine2" defaultValue={this.state.Employee["AddressLine2"]} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <div className="col-xs-3">
                                <label> Country </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-map-marker"></span>
                                        </span>
                                        <Select className="form-control" name="country" ref="country" placeholder="Select Country" value={this.state.Country} options={this.state.Countries} onChange={this.onCountryChanged.bind(this)} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> State </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-map-marker"></span>
                                        </span>
                                        <Select className="form-control" name="state" ref="state" placeholder="Select State" value={this.state.State} options={this.state.States} onChange={this.onStateChanged.bind(this)} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> City </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-map-marker"></span>
                                        </span>
                                        <Select className="form-control" name="city" ref="city" placeholder="Select city" value={this.state.City} options={this.state.Cities} onChange={this.onCityChanged.bind(this)} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> Zip </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-home"></span>
                                        </span>
                                        <input className="form-control" type="text" name="zip" ref="zip" placeholder="Postal code" defaultValue={this.state.Employee["ZIP"]} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <h3 className="Empheading">Employment Details</h3>
                        </div>

                        <div>
                            <div className="col-xs-12">

                                <div className="col-xs-3" >
                                    <label> Date of joining </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-calendar"></span>
                                            </span>
                                            <input className="form-control" type="date" name="dateOfJoining" style={{ lineHeight: '19px' }} ref="doj" autoComplete="off" defaultValue={this.state.Employee["DOJ"]} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-3">
                                    <label> Provisional Period(Months) </label>
                                    <div className="form-group">
                                        <input className="form-control" type="number" name="provisional period" defaultValue={this.state.Employee["ProvisionalPeriod"]} placeholder="Provisional Period" ref="provisionalPeriod" autoComplete="off" min="0" />
                                    </div>
                                </div>

                                <div className="col-xs-3">
                                    <label> Employment Type </label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>
                                            <Select className="form-control" ref="EmpType" placeholder="Select Employment Type" value={this.state.EmpType}
                                                options={[{ value: 'Consultant', label: 'Consultant' }, { value: 'Permanent', label: 'Permanent' }]}
                                                onChange={this.onEmpTypeChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-3">
                                    <label> Designation</label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-group-chat"></span>
                                            </span>
                                            <Select className="form-control" name="designation" ref="designation" placeholder="Select Designation" value={this.state.Designation} options={this.state.Designations} onChange={this.onDesignationChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12">
                                <div className="col-xs-4">
                                    <label> Department</label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-group-chat"></span>
                                            </span>
                                            <Select className="form-control" name="department" ref="department" placeholder="Select Department" value={this.state.Department} options={this.state.Departments} onChange={this.onDepartmentChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-4">
                                    <label>Head/Manager</label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </span>

                                            <Select className="form-control" name="manager" ref="manager" placeholder="Select Manager" value={this.state.Manager} options={this.state.Managers} onChange={this.onManagerChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xs-4">
                                    <label> Role</label>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <span className="input-group-addon">
                                                <span className="glyphicons-group-chat"></span>
                                            </span>
                                            <Select className="form-control" name="role" ref="role" placeholder="Select Role" value={this.state.Role} options={this.state.Roles} onChange={this.onRoleChanged.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-xs-12" >
                                <button type="submit" name="submit" className="btn btn-md btn-default btnSave" > Submit </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // GenderChange() {
    //     var gender = this.refs.gender.value;
    //     if (!gender) {
    //         showErrorsForInput(this.refs.gender, ["Gender is required"]);
    //         return false;
    //     } else {
    //         showErrorsForInput(this.refs.gender, null);
    //         return true;
    //     }
    // }

    onGenderChanged(val) {
        this.setState({ Gender: val })
        showErrorsForInput(this.refs.gender.wrapper, null);
    }

    onBloodGroupChanged(val) {
        this.setState({ BloodGroup: val })
        showErrorsForInput(this.refs.bloodgroup.wrapper, null);
    }

    onCountryChanged(val) {
        this.setState({ Country: val }, () => {
            if (this.state.Country && this.state.Country.value) {
                $.ajax({
                    url: ApiUrl + "/api/MasterData/GetStates?countryId=" + this.state.Country.value,
                    success: (data) => { this.setState({ States: data["states"] }) }
                })
                showErrorsForInput(this.refs.country.wrapper, null);
            }
            else {
                this.setState({ States: [], State: null });
                showErrorsForInput(this.refs.country.wrapper, ["Please select a valid country"]);
                showErrorsForInput(this.refs.state.wrapper, ["Please select a valid state"]);
                showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
            }
        });
    }

    onStateChanged(val) {
        this.setState({ State: val }, () => {
            if (this.state.State && this.state.State.value) {
                $.ajax({
                    url: ApiUrl + "/api/MasterData/GetCities?stateId=" + this.state.State.value,
                    success: (data) => { this.setState({ Cities: data["cities"] }) }
                })
                showErrorsForInput(this.refs.state.wrapper, null);
            }
            else {
                this.setState({ Cities: [], City: null });
                showErrorsForInput(this.refs.state.wrapper, ["Please select a valid state"]);
                showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
            }
        });
    }


    onCityChanged(val) {
        this.setState({ City: val })
        showErrorsForInput(this.refs.city.wrapper, null);
    }

    onEmpTypeChanged(val) {
        this.setState({ EmpType: val })
        showErrorsForInput(this.refs.EmpType.wrapper, null);
    }

    onDesignationChanged(val) {
        this.setState({ Designation: val });
        showErrorsForInput(this.refs.designation.wrapper, null);
    }

    onRoleChanged(val) {
        this.setState({ Role: val })
        showErrorsForInput(this.refs.role.wrapper, null);
    }

    onDepartmentChanged(val) {
        this.setState({ Department: val },
            () => {
                $.ajax({
                    url: ApiUrl + "/api/MasterData/GetManagers?departmentId=" + this.state.Department.value,
                    type: "get",
                    success: (data) => { this.setState({ Managers: data["managers"] }) }
                })

            }
        );
        showErrorsForInput(this.refs.department.wrapper, null);
    }

    onManagerChanged(val) {
        this.setState({ Manager: val })
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

        var data = new FormData();

        data.append("FirstName", this.refs.firstname.value);
        data.append("MiddleName", this.refs.middlename.value);
        data.append("LastName", this.refs.lastname.value);
        data.append("Email", this.refs.email.value);
        data.append("PrimaryNum", this.refs.primaryNum.value);
        data.append("SecondaryNum", this.refs.secondaryNum.value);
        data.append("Gender", this.state.Gender.value);
        data.append("CountryId", this.state.Country.value);
        data.append("StateId", this.state.State.value);
        data.append("CityId", this.state.City.value);
        data.append("RoleId", this.state.Role.value);
        data.append("DesignationId", this.state.Designation.value);
        data.append("DepartmentId", this.state.Department.value);
        data.append("EmpType", this.state.EmpType.value);
        data.append("Aadhar", this.refs.aadhar.value);
        data.append("Pan", this.refs.panNum.value);
        data.append("AddressLine1", this.refs.addressLine1.value);
        data.append("AddressLIne2", this.refs.addressLine2.value);
        data.append("Zip", this.refs.zip.value);
        data.append("DOB", this.refs.dob.value);
        data.append("DOJ", this.refs.doj.value);
        data.append("ProvisionalPeriod", this.refs.provisionalPeriod.value);
        data.append("BloodGroup", this.state.BloodGroup.value);

        if (!this.state.Manager || !this.state.Manager.value) {
            data.append("Manager", "");
        }
        else {
            data.append("Manager", this.state.Manager.value);
        }

        if (this.props.match.params["id"] != null) {
            data.append("OldUserName", this.state.Employee["Email"]);
            var url = ApiUrl + "/api/Employee/UpdateEmployee?EmpId=" + this.props.match.params["id"]
        }
        else {
            var url = ApiUrl + "/api/Employee/AddEmployee"
        }

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast(" Employee saved successfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $("button[name='submit']").show();
                    this.props.history.push("/EmployeesList");
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

        if (!this.state.Gender || !this.state.Gender.value) {
            success = false;
            showErrorsForInput(this.refs.gender.wrapper, ["Please select a gender"]);
        }
        if (!this.state.Country || !this.state.Country.value) {
            success = false;
            showErrorsForInput(this.refs.country.wrapper, ["Please select a country"]);
        }
        if (!this.state.State || !this.state.State.value) {
            success = false;
            showErrorsForInput(this.refs.state.wrapper, ["Please select a valid state"]);
        }
        if (!this.state.City || !this.state.City.value) {
            success = false;
            showErrorsForInput(this.refs.city.wrapper, ["Please select a valid city"]);
        }
        if (!this.state.Department || !this.state.Department.value) {
            success = false;
            showErrorsForInput(this.refs.department.wrapper, ["Please select department"]);
        }
        if (!this.state.Designation || !this.state.Designation.value) {
            success = false;
            showErrorsForInput(this.refs.designation.wrapper, ["Please select designation"]);
        }
        if (!this.state.Role || !this.state.Role.value) {
            success = false;
            showErrorsForInput(this.refs.role.wrapper, ["Please select role"]);
        }
        if (!this.state.EmpType || !this.state.EmpType.value) {
            success = false;
            showErrorsForInput(this.refs.EmpType.wrapper, ["Please select employment type"])
        }
        if (!this.state.BloodGroup || !this.state.BloodGroup.value) {
            success = false;
            showErrorsForInput(this.refs.bloodgroup.wrapper, ["Please select blood group"])
        }
        return success;
    }
}

export default EmployeeRegistration;