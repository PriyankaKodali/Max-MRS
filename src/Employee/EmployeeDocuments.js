import React, { Component } from 'react';
import $ from 'jquery';
import { ApiUrl } from '../Config';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax';
import { toast } from 'react-toastify';

var validate = require('validate.js');
var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class EmployeeDocuments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Documents: [], category: '', notes: '', keywords: '', uploadDate: '',
            documentDate: '', sortCol: 'Category', sortDir: 'asc', currentPage: 1,
            sizePerPage: 10, dataTotalSize: 0, EmpName: null, EmpNumber: null, EmployeeId: null
        }
    }

    componentWillMount() {
        this.setState({ EmployeeId: this.props.match.params["id"] }, () => {
            if (this.props.match.params["id"] != null) {
                this.getEmployeeDocuments(this.state.currentPage, this.state.sizePerPage);
            }
        })
    }

    componentDidMount() {
        setUnTouched(document);
    }

    getEmployeeDocuments(page, count) {
        var url = ApiUrl + "/api/Employee/GetEmpDocuments?EmpId=" + this.state.EmployeeId +
            "&category=" + this.state.category +
            "&uploadDate=" + this.state.uploadDate +
            "&documentDate=" + this.state.documentDate +
            "&notes=" + this.state.notes +
            "&keyWords=" + this.state.keywords +
            "&page=" + page +
            "&count=" + count +
            "&sortCol=" + this.state.sortCol +
            "&sortDir=" + this.state.sortDir

        $.ajax({
            url: url,
            type: "get",
            success: (data) => {
                this.setState({
                    Documents: data["employeeDocumnets"], EmpName: data["EmployeeName"],
                    EmpNumber: data["EmpNumber"], dataTotalSize: data["totalCount"]
                })
            }
        })
    }

    render() {
        return (
            <div className="headercon" key={this.state.EmpName}>
                <button className="col-md-3 btn btn-default btn-circle" style={{ marginLeft: '10%' }} onClick={() => this.props.history.push("/EmployeeRegistration")} title="General Details" > 1</button>
                <hr className="col-md-4" />
                <button className="col-md-3 btn btn-default btn-circle" onClick={() => this.props.history.push("/EmployeeDocuments/" + this.props.match.params["id"])} title="Documents" > 2</button>
                <hr className="col-md-4" />
                <button className="col-md-3 btn btn-default btn-circle" onClick={() => this.props.history.push("/EmployeePayScale/" + this.props.match.params["id"])} title="PayScales" > 3</button>

                <div className="container">

                    <div className="col-md-12">
                        <h3 className="col-md-11 formheader" style={{ paddingLeft: '20px', marginTop: '1%' }}> Documents</h3>
                        <div className="col-md-1 mybutton" style={{ marginTop: '1%' }}  >
                            <button type="button" className="btn btn-default pull-left headerbtn" data-toggle="modal" data-target="#myModal">
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>
                        </div>


                        <div className="docSearch">
                            <div className="col-md-2 form-group">
                                <label>Name:</label> {this.state.EmpName}
                            </div>
                            <div className="col-md-2 form-group">
                                <input className="col-md-2 form-control" type="text" name="Category" placeholder="Category" autoComplete="off" ref="category" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-2 form-control" type="date" name="DocumentDate" placeholder="Documnet Date" autoComplete="off" ref="documentDate" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-2 form-control" type="date" name="PhoneNum" placeholder="Upload Date" autoComplete="off" ref="uploadDate" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-2 form-control" type="text" name="Notes" placeholder="Notes" autoComplete="off" ref="notes" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-2 form-control" type="text" name="Keywords" placeholder="Keywords" autoComplete="off" ref="keywords" onChange={this.SearchClick.bind(this)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <BootstrapTable striped hover remote={true} pagination={true}
                            data={this.state.Documents}
                            fetchInfo={{ dataTotalSize: this.state.dataTotalSize }}
                            options={{
                                sizePerPage: this.state.sizePerPage,
                                onPageChange: this.onPageChange.bind(this),
                                sizePerPageList: [{ text: '10', value: 10 },
                                { text: '25', value: 25 },
                                { text: 'ALL', value: this.state.dataTotalSize }],
                                page: this.state.currentPage,
                                onSizePerPageList: this.onSizePerPageList.bind(this),
                                paginationPosition: 'bottom',
                                onSortChange: this.onSortChange.bind(this)
                            }}
                        >
                            <TableHeaderColumn dataField="Category" isKey={true} dataAlign="left" dataSort={true} width="20" > Category</TableHeaderColumn>
                            <TableHeaderColumn dataField="DocumentDate" dataAlign="left" dataSort={true} width="30" dataFormat={this.DocDateFormatter.bind(this)} > DocumentDate </TableHeaderColumn>
                            <TableHeaderColumn dataField="UploadDate" dataAlign="left" dataSort={true} width="30" dataFormat={this.UploadDateFormatter.bind(this)} >Upload Date</TableHeaderColumn>
                            <TableHeaderColumn dataField="Notes" dataAlign="left" dataSort={true} width="30" >Notes </TableHeaderColumn>
                            <TableHeaderColumn dataField="Keywords" dataAlign="left" dataSort={true} width="15" >KeyWords</TableHeaderColumn>

                        </BootstrapTable>
                    </div>

                    <div className="col-xs-12">
                        <button type="submit" style={{ marginLeft: '96%', marginTop: '2%' }} className="btn  btn-default" onClick={() => this.props.history.push("/EmployeePayScale/" + this.props.match.params["id"])} > Next </button>
                    </div>

                </div>

                <form onSubmit={this.handleSubmit.bind(this)} onChange={this.validate.bind(this)}  >

                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header formheader" style={{ paddingLeft: '20px' }}>
                                    <button type="button" className="close btnClose" data-dismiss="modal"> &times; </button>
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
                                                <input className="form-control" type="text" name="nptes" ref="notes" />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-xs-12">
                                        <button className="btn btn-md btn-success btnSave" type="submit" name="submit" > Save </button>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>

            </div>

        )
    }
    DocDateFormatter(cell, row) {
        return <p > {moment(row["DocumentDate"]).format("DD-MM-YYYY")} </p>
    }
    UploadDateFormatter(cell, row) {
        return <p> {moment(row["UploadDate"]).format("DD-MM-YYYY")}</p>
    }

    AllDocuments() {
        this.getEmployeeDocuments(this.state.currentPage, this.state.sizePerPage)
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

        data.append("Documents", this.refs.document.files[0]);
        data.append("EmployeeId", this.props.match.params["id"]);
        data.append("Category", this.refs.category.value);
        data.append("DocDate", this.refs.documentdate.value);
        data.append("Keywords", this.refs.keywords.value);
        data.append("Notes", this.refs.notes.value);

        var url = ApiUrl + "/api/Employee/AddDocument";

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast(" Employee Documents saved successfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $("button[name='submit']").show();
                    //this.props.history.push("/EmployeeDocuments/" + this.props.match.params["id"]);
                    this.AllDocuments()
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
        return success;
    }

    SearchClick() {
        this.setState({
            category: this.refs.category.value,
            documentDate: this.refs.documentDate.value,
            uploadDate: this.refs.uploadDate.value,
            notes: this.refs.notes.value,
            keywords: this.refs.keywords.value
        }, () => {
            this.getEmployeeDocuments(this.state.currentPage, this.state.sizePerPage);
        })

    

    }

    onSortChange(sortCol, sortDir) {
        sortDir = this.state.sortCol === sortCol && this.state.sortDir === "asc" ? "desc" : "asc";
        this.setState({
            sortCol: sortCol,
            sortDir: sortDir
        }, () => {
            this.getEmployeeDocuments(this.state.currentPage, this.state.sizePerPage)
        });
    }

    onPageChange(page, sizePerPage) {
        this.getEmployeeDocuments(page, sizePerPage)
    }

    onSizePerPageList(sizePerPage) {
        this.getEmployeeDocuments(this.state.currentPage, sizePerPage)
    }

}

export default EmployeeDocuments;