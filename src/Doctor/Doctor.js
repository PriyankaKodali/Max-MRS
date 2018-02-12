import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { ApiUrl } from '../Config';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax'
import Select from 'react-select';


class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Country: null,
            Countries: [],
            State: null,
            States: [],
            City: null,
            Cities: [],
            Client: null,
            Clients: [],
            VoiceGrade: null,
            JobLevel: null,
            DictationMode: null,
            Specialities:[],
            Speciality:'',
            removeSelected: true,
            DoctorGroups:[],
            DoctorGroup:null,
            secondaryNum:null
        
        }
    }

    componentWillMount() {
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetCountries",
            type: "get",
            success: (data) => { this.setState({ Countries: data["countries"] }) }
        });

        $.ajax({
            url: ApiUrl + "/api/MasterData/GetSpecialties",
            type:"get",
            success: (data) => {this.setState({ Specialities: data["specialties"]})}
        });
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetDoctorGroups",
            type:"get",
            success:(data)=> {this.setState({DoctorGroups: data["doctorGroups"]})}
        });
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetAllClients",
            type: "get",
            success:(data)=> {this.setState({Clients: data["clients"]})}
        })
    }

    componentDidMount() {
        setUnTouched(document);
    }

    render() {
        return (
            <div className="headercon">
                <div className="container">
                    <div className="col-xs-12 headerstyle" >
                        <h3 className="col-xs-11 Empheading" style={{ paddingLeft: '10px' }}>Personal Details</h3>
                        <div className="col-md-1 mybutton clientAddressbtn">
                            <button type="button" style={{ marginTop: '3%' }} className="btn btn-default pull-left headerbtn" onClick={() => this.props.history.push("/DoctorsList")} >
                                <span className="glyphicon glyphicon-th-list"></span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)} >
                        <div className="col-xs-12">

                            <div className="col-md-2">
                                <label> Salutation</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="col-md-2 form-control" type="text" name="Salutation" placeholder="Salutation" autoComplete="off" ref="salutation" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
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

                            <div className="col-md-3">
                                <label>Middle Name </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="MiddleName" placeholder="Middle Name" autoComplete="off" ref="middlename" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label>Last Name </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="LastName" placeholder="Last Name" autoComplete="off" ref="lastname" />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12">
                            <div className="col-md-3">
                                <label> Primary Phone Number </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-phone"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="PhoneNumber" type="text" placeholder="Primary Phone Number" autoComplete="off" ref="primaryNumber" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label> Secondary Phone Number </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-phone"></span>
                                        </span>
                                        <input className="col-md-3 form-control" name="secondaryNum" type="text" placeholder="Secondary Phone Number" autoComplete="off" ref="secondaryNum" />
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
                                        <input className="col-md-3 form-control" name="email" type="text" placeholder="Email" autoComplete="off" ref="email" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
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
                        </div>

                        <div className="col-xs-12">
                            <h3 className="col-xs-12 Empheading">Address Details</h3>
                        </div>

                        <div className="col-xs-12">
                            <div className="col-md-6">
                                <label>Address Line 1 </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-map-marker"></span>
                                        </span>
                                        <input className="col-md-5 form-control" name="AddressLine1" type="text" ref="addressLine1" placeholder="Address " autoComplete="off" />
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
                                        <input className="col-md-5 form-control" type="text" name="AddressLine2" ref="addressLine2" placeholder="Address" autoComplete="off" />
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
                                        <Select className="form-control" name="country" ref="country" placeholder="Select Country" value={this.state.Country} options={this.state.Countries} onChange={this.CountryChanged.bind(this)} />
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
                                        <Select className="form-control" name="state" ref="state" placeholder="Select State" value={this.state.State} options={this.state.States} onChange={this.StateChanged.bind(this)} />
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
                                        <Select className="form-control" name="city" ref="city" placeholder="Select city" value={this.state.City} options={this.state.Cities} onChange={this.CityChanged.bind(this)} />
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
                                        <input className="form-control" type="text" name="zip" ref="zip" placeholder="Postal code" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <h3 className="col-xs-12 Empheading">Speciality Details</h3>
                        </div>
                        <div className="col-xs-12">

                            <div className="col-xs-3">
                                <label> Dictation Mode </label>
                                <div className="form-group">
                                        <Select className="form-control" name="dictatioMode" ref="dictationMode" placeholder="Dictation Mode" value={this.state.DictationMode}
                                            options={[{ value: 'DictaPhone', label: 'DictaPhone' }, { value: 'Toll-Free', label: 'Toll-Free' },
                                            { value: 'DictaPhone & TollFree', label: 'DictaPhone & TollFree' }, { value: 'Email', label: 'Email' }]}
                                            onChange={this.DictationModeChanged.bind(this)} />
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> IdigitalId </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="form-control" name="IDigitalId" type="text" ref="idigitalId" placeholder=" IDigital Id" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> IdigitalAuthorId </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="form-control" name="IDigitalAuthorId" type="text" ref="idigitalAuthorId" placeholder=" IDigital Author Id" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> Job Level</label>
                                <div className="form-group">
                                        <Select className="form-control" name="jobLevel" ref="jobLevel" placeholder="select Job level" value={this.state.JobLevel}
                                            options={[{ value: 'L1', label: 'L1' }, { value: 'L1-L3', label: 'L1-L3' }, { value: 'L1-L2-L3', label: 'L1-L2-L3' }]}
                                            onChange={this.JobLevelChanged.bind(this)} />
                                </div>
                            </div>

                        </div>

                        <div className="col-xs-12">

                            <div className="col-xs-3">
                                <label>Voice Grade</label>
                                <div className="form-group">
                                        <Select className="form-control" name="VoiceGrade" ref="voicegrade" placeholder="Voice Grade" value={this.state.VoiceGrade}
                                            options={[{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }, { value: 'C', label: 'C' }, { value: 'D', label: 'D' }]}
                                            onChange={this.VoiceGradeChanged.bind(this)} />
                                </div>
                            </div>

                            <div className="col-xs-3">
                                <label> Macro Percent</label>
                                <div className="form-group">
                                    <input className="form-control" name="MacroPercent" type="number" ref="macroPercent" />
                                </div>
                            </div>
                            <div className="col-xs-3">
                                <label> Doctor Group</label>
                                <div className="form-group">
                                      <Select className="form-control" name="doctorgroup" ref="doctorgroup" placeholder="Doctor Group" value={this.state.DoctorGroup} options={this.state.DoctorGroups} onChange={this.DoctorGroupChanged.bind(this)} />
                                </div>
                            </div>
                            <div className="col-xs-12">
                                <label> Speciality</label>
                                <div className="form-group">
                                         <Select className="form-control" name="speciality" ref="specialities" placeholder="Select Speciality" value={this.state.Speciality} options={this.state.Specialities} 
                                         onChange={this.specialityChanged.bind(this)} multi
                                         />
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <button type="submit" style={{ marginLeft: '45%' }} name="submit" className="btn btn-md btn-success" > Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    ClientChanged(val) {
        this.setState({ Client: val || '' });
        showErrorsForInput(this.refs.clientname.wrapper, null);
    }

    VoiceGradeChanged(val) {
        this.setState({ VoiceGrade: val || '' })
        showErrorsForInput(this.refs.voicegrade.wrapper, null);
    }

    DictationModeChanged(val) {
        this.setState({ DictationMode: val || '' })
        showErrorsForInput(this.refs.dictationMode.wrapper, null);
    }

    JobLevelChanged(val) {
        this.setState({ JobLevel: val || '' })
        showErrorsForInput(this.refs.jobLevel.wrapper, null);
    }

    specialityChanged(val){
        this.setState({ Speciality: val || ''})
        showErrorsForInput(this.refs.specialities.wrapper, null);
    }

    DoctorGroupChanged(val){
        this.setState({ DoctorGroup: val || ''})
    }


    CountryChanged(val) {
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

    StateChanged(val) {
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


    CityChanged(val) {
        this.setState({ City: val || '' })
        showErrorsForInput(this.refs.city.wrapper, null);
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

        data.append("salutation", this.refs.salutation.value);
        data.append("firstName", this.refs.firstname.value.trim());
        data.append("middleName", this.refs.middlename.value.trim());
        data.append("lastName", this.refs.lastname.value.trim());
        data.append("email", this.refs.email.value.trim());
        data.append("primaryPhoneNum", this.refs.primaryNumber.value);
        data.append("secondaryPhoneNum", this.refs.secondaryNum.value);
        data.append("clientId", this.state.Client.value);
        data.append("addressLine1", this.refs.addressLine1.value.trim());
        data.append("addressLin2", this.refs.addressLine2.value.trim());
        data.append("countryId", this.state.Country.value);
        data.append("stateId", this.state.State.value);
        data.append("cityId", this.state.City.value);
        data.append("zip", this.refs.zip.value);
        data.append("dictationMode", this.state.DictationMode.value);
        data.append("idigitalId", this.refs.idigitalId.value);
        data.append("idigitalAuthId", this.refs.idigitalAuthorId.value);
        data.append("jobLevel", this.state.JobLevel.value);
        data.append("macroPercent", this.refs.macroPercent.value);
        data.append("voiceGrade", this.state.VoiceGrade.value);
        data.append("doctorGroup", this.state.DoctorGroup.value);
        data.append("specialities", JSON.stringify(this.state.Speciality));


        let url = ApiUrl + "api/Doctors/AddDoctor"

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Client Employee saved successfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $("button[name='submit']").show();
                    this.props.history.push("/DoctorsList");
                    return true;
                },
                (error) => {
                    toast("User with Idigital AuthorId of " + this.refs.idigitalAuthorId.value + ", already exists!", {
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
        if (!this.state.VoiceGrade || !this.state.VoiceGrade.value) {
            success = false;
            showErrorsForInput(this.refs.voicegrade.wrapper, ["Please select voice grade"]);
        }
        if (!this.state.JobLevel || !this.state.JobLevel.value) {
            success = false;
            showErrorsForInput(this.refs.jobLevel.wrapper, ["Please select job level"])
        }
        if (!this.state.DictationMode || !this.state.DictationMode.value) {
            success = false;
            showErrorsForInput(this.refs.dictationMode.wrapper, ["Please select dictation mode"])
        }
        if( this.state.Speciality.length == 0 ){
            success=false;
            showErrorsForInput(this.refs.specialities.wrapper, ["please select specialities"])
        }


        return success;
    }
}

export default Doctor;