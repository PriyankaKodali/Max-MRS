import React, { Component } from 'react';
import $ from 'jquery';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../Config';
import Select from 'react-select';
import './ClientRegistration.css';
import ClientLocation from './ClientLocation';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax';

var moment = require('moment');

class ClientRegistration extends Component {

    constructor(props) {
        super(props);
        var ClientLocations = [];
        this.state = {
            ClientVerticals: [], ClientVertical: '', Countries: [], Country: null, States: [], State: null,
            Cities: [], City: null, TimeZone: null, TimeZones: null, AddClientAddressClick: true, LocationCount: 0,
            ClientLocations: ClientLocations, ClientLocationRefs: [], PaymentType: null, Currency: null,
            ClientType: '', removeSelected: true, IsVendor: false, ClientId: null, Client: [], ClientLoc: [],
            IsActive: true,
        }
    }

    componentDidMount() {
        setUnTouched(document);
    }

    componentWillMount() {
        this.setState({ ClientId: this.props.match.params["id"] }, () => {
            if (this.props.match.params["id"] != null) {
                $.ajax({
                    url: ApiUrl + "/api/Client/GetClient?ClientId=" + this.props.match.params["id"],
                    type: "get",
                    success: (data) => {
                        this.setState({
                            Client: data["clientModel"], ClientVertical: data["clientModel"]["Verticals"],
                            ClientType: { value: data["clientModel"]["ClientType"], label: data["clientModel"]["ClientType"] },
                            Currency: { value: data["clientModel"]["Currency"], label: data["clientModel"]["Currency"] },
                            PaymentType: { value: data["clientModel"]["PaymentType"], label: data["clientModel"]["PaymentType"] },
                            ClientLoc: data["clientModel"]["ClientLocations"]
                        }, () => {
                            this.renderLocations(data["clientModel"]["ClientLocations"]);
                            if (data["clientModel"]["ClientType"] == "Vendor") {
                                this.state.IsVendor = true
                            }
                           // console.log(this.state.Client["IsActive"]);
                        })
                    }
                })
            }
            else {
                this.AddClientLocations();
            }

        })
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetClientVerticals",
            type: "get",
            success: (data) => { this.setState({ ClientVerticals: data["clientVerticals"] }) }
        })
    }

    renderLocations(locations) {
        var clientLocations = locations.map((item, i) => {
            return <div key={i}>
                <ClientLocation location={item} ref={(i) => this.state.ClientLocationRefs.push(i)} InvoiceChanged={this.removePreviousInvoiceAddress.bind(this)} ClientId={this.state.ClientId} />
            </div>
        })
        this.setState({ ClientLocations: clientLocations });
    }

    render() {
        return (
            <div className="headercon" key={this.state.Client}>
                <div className="container">
                    <div className="col-xs-12 headerstyle" >
                        <h3 className="col-xs-11 Empheading" style={{ paddingLeft: '10px' }}>General Details</h3>
                        <div className="col-md-1 mybutton clientAddressbtn">
                            <button type="button" style={{ marginTop: '3%' }} className="btn btn-default pull-left headerbtn" onClick={() => this.props.history.push("/ClientsList")} >
                                <span className="glyphicon glyphicon-th-list"></span>
                            </button>
                        </div>
                    </div>

                    <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)}>
                        <div className="col-xs-12">

                            <div className="col-md-4">
                                <label> Name </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="ClientName" placeholder="Client Name" autoComplete="off" ref="clientname" defaultValue={this.state.Client["Name"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2">
                                <label> Short Name </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-user"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="ShortName" placeholder="Short Name" autoComplete="off" ref="shortname" defaultValue={this.state.Client["ShortName"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label> Primary Phone Number </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="	glyphicon glyphicon-phone"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="PhoneNumber" placeholder="Primary Phone Number" autoComplete="off" ref="primaryNumber" defaultValue={this.state.Client["PrimaryNum"]} />
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
                                        <input className="col-md-3 form-control" type="text" placeholder="Secondary Phone Number" autoComplete="off" ref="secondaryNum" defaultValue={this.state.Client["SecondaryNum"]} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">

                            <div className="col-md-4">
                                <label> Fax </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon" >
                                            <span className="glyphicon glyphicon-hdd "></span>
                                            {/* <i className="fa fa-fax"></i> */}
                                        </span>
                                        <input className="col-md-3 form-control" type="text" placeholder="Fax" autoComplete="off" ref="fax" defaultValue={this.state.Client["Fax"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label> Email </label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-envelope"></span>
                                        </span>
                                        <input className="col-md-3 form-control" type="text" name="email" placeholder="Email" autoComplete="off" ref="email" defaultValue={this.state.Client["Email"]} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-4">
                                <label> Client Type</label>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-group-chat"></span>
                                        </span>
                                        <Select className="form-control" name="clienttype" ref="clienttype" placeholder="select client type" value={this.state.ClientType}
                                            options={[{ value: 'Direct', label: 'Direct' }, { value: 'Indirect', label: 'Indirect' }, { value: 'Vendor', label: 'Vendor' }]}
                                            onChange={this.ClientTypeChanged.bind(this)}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-12">
                            {
                                this.props.match.params["id"] != null ?
                                    <div >
                                        <div className="col-xs-10">
                                            <label> Client vertical</label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="glyphicon glyphicon-group-chat"></span>
                                                    </span>
                                                    {/* <Select className="form-control" name="clientvertical" ref="clientvertical" placeholder="Select vertical" value={this.state.Vertical} options={this.state.ClientVerticals} onChange={this.ClientVerticals.bind(this)} multi removeSelected={this.state.removeSelected} /> */}
                                                    <Select className="form-control" name="clientvertical" ref="clientvertical" placeholder="Select Client verticals"
                                                        options={this.state.ClientVerticals}
                                                        value={this.state.ClientVertical}
                                                        onChange={this.ClientVerticalsChange.bind(this)}
                                                        multi
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xs-2" style={{ marginTop: '2.5%' }}>
                                            <label> <input className="form-group activeCheckboxes" type="checkbox" name="isActive" ref="isActive" value={this.state.IsActive} onChange={this.isActiveChanged.bind(this)} defaultChecked={this.state.Client["IsActive"]} /> <span />  IsActive</label>
                                        </div>

                                    </div>

                                    :

                                    <div className="col-xs-12">
                                        <label> Client vertical</label>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">
                                                    <span className="glyphicon glyphicon-group-chat"></span>
                                                </span>
                                                {/* <Select className="form-control" name="clientvertical" ref="clientvertical" placeholder="Select vertical" value={this.state.Vertical} options={this.state.ClientVerticals} onChange={this.ClientVerticals.bind(this)} multi removeSelected={this.state.removeSelected} /> */}
                                                <Select className="form-control" name="clientvertical" ref="clientvertical" placeholder="Select Client verticals"
                                                    options={this.state.ClientVerticals}
                                                    value={this.state.ClientVertical}
                                                    onChange={this.ClientVerticalsChange.bind(this)}
                                                    multi
                                                />
                                            </div>
                                        </div>
                                    </div>
                            }

                        </div>

                        <div className="col-xs-12">
                            <h3 className="col-xs-11 Empheading">Address Details</h3>
                            <div className="col-md-1 mybutton clientAddressbtn">
                                <button type="button" style={{ marginTop: '3%' }} className="btn btn-default pull-left" onClick={this.AddClientLocations.bind(this)} >
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button>
                            </div>
                        </div>

                        {
                            this.state.ClientLocations.map((item, i) =>
                                <div>
                                    <div key={i}> <h4 className="col-xs-12"> Location {i + 1} </h4> {item}</div>
                                </div>
                            )
                        }
                        {
                            this.state.IsVendor ?

                                <div />
                                :
                                <div>
                                    <div className="col-xs-12">
                                        <h3 className="Empheading">Payment Details</h3>
                                    </div>

                                    <div className="col-xs-12">
                                        <div className="col-xs-3">
                                            <label>Payment Type </label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="glyphicon glyphicon-credit-card"></span>
                                                    </span>
                                                    <Select className="form-control" ref="paymenttype" name="paymenttype" placeholder="Payment Type" value={this.state.PaymentType}
                                                        options={[{ value: 'Fixed', label: 'Fixed' }, { value: 'FTE', label: 'FTE' }, { value: 'Per Unit', label: 'PerUnit' }]}
                                                        onChange={this.PaymentTypeChanged.bind(this)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xs-3">
                                            <label>Currency</label>
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-addon">
                                                        <span className="glyphicon glyphicon-credit-card"></span>
                                                    </span>
                                                    <Select className="form-control" name="currency" ref="currency" value={this.state.Currency}
                                                        options={[{ value: 'INR', label: 'INR' }, { value: 'USD', label: 'USD' }]}
                                                        onChange={this.CurrencyChanged.bind(this)}
                                                    />

                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-xs-3">
                                            <label> Payment Amount </label>
                                            <div className="form-group">
                                                <input className="form-control" name="PaymentAmount" type="number" ref="paymentamount" step="0.0001" defaultValue={this.state.Client["PaymentAmount"]} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                        }
                        <div className="col-xs-12">
                            <button type="submit" style={{ marginLeft: '45%' }} name="submit" className="btn btn-md btn-success"  > Save </button>
                        </div>
                    </form>
                </div>
            </div >
        )
    }

    removePreviousInvoiceAddress(newInvoiceRef) {
        this.state.ClientLocationRefs.map((ele, i) => {
            if (ele.refs.isInvoice != newInvoiceRef) {
                ele.refs.isInvoice.checked = false;
            }
        })
    }

    CountryChanged(val) {
        this.setState({ Country: val || '' })
    }

    StateChanged(val) {
        this.setState({ State: val || '' })
    }

    ClientVerticalsChange(val) {
        this.setState({ ClientVertical: val || '' })
        showErrorsForInput(this.refs.clientvertical.wrapper, null);
        // http://jedwatson.github.io/react-select/
    }

    CityChanged(val) {
        this.setState({ City: val || '' })
    }

    CurrencyChanged(val) {
        this.setState({ Currency: val || '' })
        showErrorsForInput(this.refs.currency.wrapper, null)
    }

    ClientTypeChanged(val) {
        this.setState({ ClientType: val });

        if (val.value == "Vendor") {
            this.state.IsVendor = true
        }
        else {
            this.state.IsVendor = false;
        }
        showErrorsForInput(this.refs.clienttype.wrapper, null)
    }

    PaymentTypeChanged(val) {
        this.setState({ PaymentType: val || '' })
        showErrorsForInput(this.refs.paymenttype.wrapper, null)
    }

    isActiveChanged(val) {
        this.setState({ IsActive: !this.state.IsActive })
    }

    AddClientLocations() {

        var clientLocations = this.state.ClientLocations;
        var clientLocationRefs = this.state.ClientLocationRefs;
        var count = "location" + clientLocations.length;

        var dummyLoc = { dummy: "" }
        clientLocations.push(<ClientLocation location={dummyLoc} ref={(count) => clientLocationRefs.push(count)} InvoiceChanged={this.removePreviousInvoiceAddress.bind(this)} ClientId={this.state.ClientId} />)
        this.setState({ ClientLocations: clientLocations, ClientLocationRefs: clientLocationRefs });
    }


    handleSubmit(e) {
        e.preventDefault();

        var clientLocationRefs = this.state.ClientLocationRefs;
        var clientloc = [];

        //  var clientVerticals = []
        //  this.state.ClientVertical.map(ele,i)
        //  clientVerticals.push(this.state.ClientVertical);
        //  console.log(clientVerticals);

        var clientLocs = clientloc;

        clientLocationRefs.map((ele, i) => {
            // if (clientLocationRefs[i].refs.locationId.value == null) {
            //     this.state.locationId = 0
            // }
            // else {
            //     this.state.locationId = clientLocationRefs[i].refs.locationId.value
            // }
            var location = {
                locationId: clientLocationRefs[i].refs.locationId.value,
                addressLine1: clientLocationRefs[i].refs.addressLine1.value.trim(),
                addressLine2: clientLocationRefs[i].refs.addressLine2.value.trim(),
                landMark: clientLocationRefs[i].refs.landmark.value.trim(),
                country: clientLocationRefs[i].state.Country.value,
                state: clientLocationRefs[i].state.State.value,
                city: clientLocationRefs[i].state.City.value,
                zip: clientLocationRefs[i].refs.zip.value,
                timeZone: clientLocationRefs[i].state.TimeZone.value,
                isInvoice: clientLocationRefs[i].state.IsInvoice
            }
            clientloc.push(location);
        })


        $(e.currentTarget.getElementsByClassName('form-control')).map((i, ele) => {
            ele.classList.remove("un-touched");
            return null;
        })

        if (!this.validate(e)) {
            return;
        }

        var data = new FormData();

        data.append("ClientId", this.props.match.params["id"]);
        data.append("Name", this.refs.clientname.value);
        data.append("ShortName", this.refs.shortname.value);
        data.append("Email", this.refs.email.value);
        data.append("Fax", this.refs.fax.value);
        data.append("PrimaryPhone", this.refs.primaryNumber.value);
        data.append("SecondaryPhone", this.refs.secondaryNum.value);
        data.append("ClientVerticals", JSON.stringify(this.state.ClientVertical));
        data.append("Cv", this.state.ClientVertical);
        data.append("ClientType", this.state.ClientType.value);
        data.append("PaymentType", this.state.PaymentType.value);
        data.append("Currency", this.state.Currency.value);
        data.append("PaymentAmount", this.refs.paymentamount.value);
        data.append("ClientLocations", JSON.stringify(clientloc));

        if (this.props.match.params["id"] != null) {

            data.append("IsActive", this.state.IsActive);
            var url = ApiUrl + "/api/Client/UpdateClient"
        }
        else {
            var url = ApiUrl + "/api/Client/AddClient"
        }

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Client saved successfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $("button[name='submit']").show();
                    this.props.history.push("/ClientsList");
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

        let fields = this.state.fields;
        let IsError = false;
        let errors = {};
        var success = ValidateForm(e);

        var clientLocationRefs = this.state.ClientLocationRefs;

        if (this.state.ClientType == "Vendor") {

            if (!this.state.PaymentType || !this.state.PaymentType.value) {
                success = false;
                showErrorsForInput(this.refs.paymenttype.wrapper, ["Please select Payment type"]);
            }

            if (!this.state.Currency || !this.state.Currency.value) {
                success = false;
                showErrorsForInput(this.refs.currency.wrapper, ["Please select Currency"])
            }
        }

        if (!this.state.ClientType || !this.state.ClientType.value) {
            success = false;
            showErrorsForInput(this.refs.clienttype.wrapper, ["Please select Client Type"])
        }

        if (this.state.ClientVertical.length == 0) {
            success = false;
            showErrorsForInput(this.refs.clientvertical.wrapper, ["Please Select Client Verticals"])
        }

        clientLocationRefs.map((ele, i) => {

            if (!clientLocationRefs[i].refs.addressLine1.value) {
                success = false;
                showErrorsForInput(clientLocationRefs[i].refs.addressLine1, ["Address Line 1 should not be empty"]);
            }
            if (!clientLocationRefs[i].state.Country || !clientLocationRefs[i].state.Country.value) {
                success = false;
                showErrorsForInput(clientLocationRefs[i].refs.country.wrapper, ["Select a Country"]);
            }
            if (!clientLocationRefs[i].state.State || !clientLocationRefs[i].state.State.value) {
                success = false;
                showErrorsForInput(clientLocationRefs[i].refs.state.wrapper, ["Select a valid State"]);
            }
            if (!clientLocationRefs[i].state.City || !clientLocationRefs[i].state.City.value) {
                success = false;
                showErrorsForInput(clientLocationRefs[i].refs.city.wrapper, ["Select a valid city"]);
            }
            if (!clientLocationRefs[i].state.TimeZone || !clientLocationRefs[i].state.TimeZone.value) {
                success = false;
                showErrorsForInput(clientLocationRefs[i].refs.timezone.wrapper, ["Select a valid Timezone"]);
            }
            if (!clientLocationRefs[i].refs.zip.value) {
                success = false;
                showErrorsForInput(clientLocationRefs[i].refs.zip, ["ZIP should not be empty"]);
            }

        })

        return success;
    }
}

export default ClientRegistration
