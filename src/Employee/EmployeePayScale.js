import React, { Component } from 'react';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { ApiUrl } from '../Config';

var validate = require('validate.js');
var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class EmployeePayScale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //  ctc: 0,
            // bankname: null,
            // branchname: null,
            // accNumber: null,
            // accName: null
        }
    }

    componentDidMount() {
        setUnTouched(document);
    }

    render() {
        return (
            <div className="headercon">

                 <button className="col-md-3 btn btn-default btn-circle" style={{ marginTop: '0.5%', marginLeft: '10%' }} onClick={() => this.props.history.push("/EmployeeRegistration")} title="General Details" > 1</button>
                    <hr className="col-md-4" />
                    <button className="col-md-3 btn btn-default btn-circle" style={{ marginTop: '0.5%' }} onClick={() => this.props.history.push("/EmployeeDocuments")} title="Documents" > 2</button>
                    <hr className="col-md-4" />
                    <button className="col-md-3 btn btn-default btn-circle" style={{ marginTop: '0.5%' }} onClick={() => this.props.history.push("/EmployeePayScale")} title="PayScales" > 3</button>

            
                <div className="container">
                    <div className="col-xs-12">
                        <h3 className="Empheading">Payscale Details</h3>
                    </div>

                    <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)}  >

                        <div className="col-xs-12">
                            <div className="col-md-4 form-group">
                                <label> CTC </label>
                                <input className="form-control" type="text" name="CTC" placeholder="Current CTC" autoComplete="off" ref="ctc" autoFocus />
                            </div>
                            <div className="col-md-4 form-group">
                                <label> Bank Name </label>
                                <input className="form-control" type="text" name="BankName" placeholder="Bank Name" autoComplete="off" ref="bankname" />
                            </div>

                            <div className="col-md-4 form-group">
                                <label> Branch Name </label>
                                <input className="form-control" type="text" name="BranchName" placeholder="Branch Name" ref="branchname" />
                            </div>
                        </div>
                        <div className="col-xs-12">

                            <div className="col-xs-5 form-group">
                                <label> Branch Account Number </label>
                                <input className="form-control" type="text" name="AccountNumber" placeholder="Bank Account Number" ref="accNumber" />
                            </div>

                            <div className="col-xs-5 form-group">
                                <label>Account Name</label>
                                <input className="form-control" type="text" name="AccountName" placeholder="Account Name" autoComplete="off" ref="accName" />
                            </div>
                        </div>

                        <div className="col-xs-12">
                            <button className="btn btn-primary mybutton" type="submit" name="submit" style={{ marginLeft: '45%', marginTop: '3%' }}  >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
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

        var inputs = $(e.currentTarget.getElementsByClassName('form-control')).map((i, el) => {
            if (el.closest(".form-group").classList.contains("hidden")) {
                return null;
            }
            else {
                return el;
            }
        });

        //     var data = new FormData();
    }

    validate(e) {
        //let fields = this.state.fields;
        //console.log(fields);
        //let IsError = false;
        //let errors = {};
        var success = ValidateForm(e);
        return success;
    }
}

export default EmployeePayScale;