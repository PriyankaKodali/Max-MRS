import React, { Component } from 'react';
import $ from 'jquery';
import { ApiUrl } from '../Config';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
var validate = require('validate.js');
var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class EmployeeDocuments extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="headercon">
                <div className="container">

                    <button className="col-md-3 btn btn-default btn-circle" style={{ marginTop: '0.5%', marginLeft: '10%' }} onClick={() => this.props.history.push("/EmployeeRegistration")} title="General Details" > 1</button>
                    <hr className="col-md-4" />
                    <button className="col-md-3 btn btn-default btn-circle" style={{ marginTop: '0.5%' }} onClick={() => this.props.history.push("/EmployeeDocuments")} title="Documents" > 2</button>
                    <hr className="col-md-4" />
                    <button className="col-md-3 btn btn-default btn-circle" style={{ marginTop: '0.5%' }} onClick={() => this.props.history.push("/EmployeePayScale")} title="PayScales" > 3</button>

                    <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)}  >
                        <div className="headercon">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3 className="col-md-11 formheader" style={{ paddingLeft: '20px', marginTop: '1%' }}> Documents</h3>
                                    <div className="col-md-1 mybutton" style={{ marginTop: '1%' }}  >
                                        <button type="button" className="btn btn-default pull-left headerbtn" data-toggle="modal" data-target="#myModal">
                                            <span className="glyphicon glyphicon-plus"></span>
                                        </button>
                                    </div>
                                </div>

                                <div className="modal fade" id="myModal" role="dialog">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header formheader" style={{ paddingLeft: '20px' }}>
                                                <button type="button" className="close" style={{ marginRight: '4%', width: '30px', background: 'white', height: '30px' }} data-dismiss="modal"> &times; </button>
                                                <h4 className="modal-title">Add New Document</h4>
                                            </div>
                                            <div>
                                                <div className="modal-body col-xs-12">
                                                    <div className="col-md-4 form-group">
                                                        <label> Document</label>
                                                        <input className="form-control" type="file" name="files" ref="document" />
                                                    </div>

                                                    <div className="col-md-4 form-group">
                                                        <label> Category </label>
                                                        <input className="form-control" type="text" name="Category" ref="category" />
                                                    </div>

                                                    <div className="col-md-4 form-group">
                                                        <label> Document Date</label>
                                                        <input className="form-control" type="date" name="documentdate" ref="documentdate" />
                                                    </div>

                                                    <div className="col-xs-12">
                                                        <div className="col-md-3 form-group">
                                                            <label> Key Words </label>
                                                            <input className="form-control" type="text" name="keywords" ref="keywords" />
                                                        </div>

                                                        <div className="col-md-8 form-group">
                                                            <label>Notes</label>
                                                            <input className="form-control" type="text" name="keywords" ref="keywords" />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="col-xs-12">
                                                    <button type="button" style={{ marginLeft: '50%' }} name="submit" className="btn btn-md btn-success" > Save </button>
                                                </div>
                                            </div>

                                            <div className="modal-footer">
                                                {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="btstrap">
                        <BootstrapTable striped hover >
                            <TableHeaderColumn dataField="JobDate" isKey={true} dataAlign="left" dataSort={true} width="20" > Category</TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > Document Date </TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > Upload Date </TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" >Key words </TableHeaderColumn>
                            <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" headerText='Number of pages'  > Notes</TableHeaderColumn>
                        </BootstrapTable>
                    </div>

                    <div className="col-xs-12">
                        <button type="button" style={{ marginLeft: '96%', marginTop: '2%' }} className="btn  btn-default" onClick={() => this.props.history.push("/EmployeePayScale")} > Next </button>
                    </div>
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

        var data=new FormData();
        data.append("Category", this.refs.category.value);
        data.append("DocDate", this.refs.documentdate.value);
        data.append("Keywords", this.refs.keywords.value);
        data.append("Notes", this.refs.notes.value);
        data.append("Documents", this.refs.document.files[0]);



    }

    validate(e) {
        var success = ValidateForm(e);

        return success;
    }

}

export default EmployeeDocuments;