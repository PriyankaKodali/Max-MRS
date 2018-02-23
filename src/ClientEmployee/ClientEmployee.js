import React, { Component } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './ClientEmployee.css';

var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class ClientEmployee extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1, sizePerPage: 10, dataTotalSize: 0,
            fromDate: moment().subtract(7, "days").format("MM/DD/YYYY"),
            searchClick: false,
            toDate: moment().format("MM/DD/YYYY"),
        }
    }

    render() {
        return (
            <div>
                <div className="clntEmpheadercon">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="col-md-11 formheader"> Client Employee </h3>
                            <div className="col-md-1 mybutton">
                                <button type="button" className="btn btn-default pull-left headerbtn" onClick={() => { this.setState({ searchClick: !this.state.searchClick }) }} >
                                    <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.searchClick ?
                        <div className="ClientEmpSearch">
                            <form>
                                <div className="col-sm-2 form-group">
                                    <label style={{ textAlign: "left" }}> From Date</label>
                                    <div className="form-group">
                                        <DatePicker className="form-control col-md-3" name="fromDate" ref="fromDate" defaultValue={moment(this.state.fromDate)} selected={moment(this.state.fromDate)} dateFormat="MM-DD-YYYY" onChange={(val) => this.setState({ fromDate: val })} />
                                    </div>
                                </div>

                                <div className="col-sm-2 form-group">
                                    <label>To Date</label>
                                    <div className="form-group">
                                        <DatePicker className="form-control" name="toDate" ref="toDate" defaultValue={moment(this.state.toDate).format("MM/DD/YYYY")} selected={moment(this.state.toDate)} dateFormat="MM-DD-YYYY" onChange={(val) => this.setState({ fromDate: val })} />
                                    </div>
                                </div>

                                <div className="col-sm-2 form-group">
                                    <label>Job Number</label>
                                    <div className="form-group">
                                        <input className="form-control" name="fileName" ref="fileName" />
                                    </div>
                                </div>
                                <div className="col-sm-2 form-group">
                                    <label>Status</label>
                                    <select className="form-control" name="status" ref="status" autoComplete="off" >
                                        <option value="">All</option>
                                        <option>Completed</option>
                                        <option >Pending</option>
                                    </select>
                                </div>

                                <div className="col-sm-4 form-group clntEmpButton">
                                    {/* <div className="col-xs-8 clntEmpButton"> */}
                                        <button type="button" name="submit" className="btnLeft btn btn-success" > Search </button>
                                        <button type="button" name="submit" className="btnLeft btn btn-default" > Clear </button>
                                    {/* </div> */}
                                </div>
                            </form>
                        </div>
                        :
                        <div />

                }

                  <button type="button" name="submit" className="btn btn-md btn-success uploadFiles" onClick={() => this.props.history.push("/UploadFiles/")}> Upload Files </button>


                <div className="clearfix"> </div>
                {/* {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        : */}
                <div className="btstrap">
                    <BootstrapTable ref="clientEmployeestable" striped hover remote={true} pagination={true}
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
                            // onSortChange: this.onSortChange.bind(this)
                        }}
                    >
                        <TableHeaderColumn dataField="Date" isKey={true} width="20" dataAlign="center" dataSort={true} > Date </TableHeaderColumn>
                        <TableHeaderColumn dataField="JobNum" dataAlign="center" dataSort={true} width="23" > Job Number</TableHeaderColumn>
                        <TableHeaderColumn dataField="FileName" width="30" dataAlign="center" dataSort={true}> File Name </TableHeaderColumn>
                        <TableHeaderColumn dataField="status" width="30" dataAlign="center" dataSort={true}> Status </TableHeaderColumn>
                        <TableHeaderColumn columnClassName="download" dataField='Download' dataFormat={this.downloadFormatter.bind(this)} width='18'></TableHeaderColumn>
                    </BootstrapTable>

                </div>


                {/* } */}
                <div > </div>
            </div>
        );
    }

    downloadFormatter(cell, row) {
        return (
            <a data-toggle="tooltip" className="tooltipLink" title="Download file" data-original-title="">
                <i className='glyphicon glyphicon-cloud-download' headerText='Download file' style={{ cursor: 'pointer', fontSize: '17px', color: 'green' }} onClick={() => this.gotoClientInvoice(row["ClientId"], "", "", row["EmptyJobs"], row["Status"], row["AmountPerUnit"])} ></i>
            </a>
        )
    }

    onPageChange(page, sizePerPage) {

    }

    onSizePerPageList(sizePerPage) {

    }

}

export default ClientEmployee