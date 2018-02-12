import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import $ from 'jquery';
import './Coordinator.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;


class Coordinator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1, sizePerPage: 10, dataTotalSize: 0,
            searchClick: false,
            fromDate: moment(),
            Client: {},
            Clients: []
        }
    }

    render() {
        return (
            <div>
                <div className="headercon">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="col-md-11 formheader"> Coordinator </h3>
                            <div className="col-md-1 mybutton">
                                <button type="button" className="btn btn-default pull-left headerbtn" onClick={this.search.bind(this)} >
                                    <span className="glyphicon glyphicon-search"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.searchClick ?
                        <div>
                            <form className="CodntformSearch">

                                <div className="col-md-2 form-group">
                                    <label> From Date </label>
                                    <DatePicker className="form-control" name="fromDate" ref="fromDate" defaultValue={this.state.fromDate} selected={this.state.fromDate} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> To Date </label>
                                    <DatePicker className="form-control" name="fromDate" ref="fromDate" defaultValue={this.state.fromDate} selected={this.state.fromDate} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> Client </label>
                                    <Select className="form-control" name="clientname" ref="clientname" placeholder="Select Client" value={this.state.Client} options={this.state.Clients} onChange={this.ClientChanged.bind(this)} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> MRA </label>
                                    <input className="form-control" type="text" name="mt" ref="mtName" placeholde="Employee name" />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> AQA </label>
                                    <input className="form-control" type="text" name="aqa" ref="aqaName" placeholde="Employee name" />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> QA </label>
                                    <input className="form-control" type="text" name="qa" ref="qaName" placeholde="Employee name" />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> Status</label>
                                    <input className="form-control" type="text" name="status" ref="status" />
                                </div>

                                <div className="col-md-2 form-group">
                                    <label> Job Number</label>
                                    <input className="form-control" type="text" name="jobNum" ref="jobNum" />
                                </div>
                                <div className="col-md-2 form-group button" >
                                    <button type="button" name="submit" className="btn btn-default" > Search </button>
                                    <button type="button" name="submit" className="btnLeft btn btn-default" > Clear </button>
                                </div>

                            </form>

                        </div>
                        :
                        <div />

                }

                <div className="btstrap">
                    <BootstrapTable striped hover remote={true} pagination={true}
                        fetchInfo={{ dataTotalSize: this.state.dataTotalSize }}
                        options={{
                            sizePerPage: this.state.sizePerPage,
                            onPageChange: this.onPageChange.bind(this),
                            sizePerPageList: [{ text: '10', value: 10 },
                            { text: '25', value: 25 },
                            { text: 'ALL', value: this.state.dataTotalSize }],
                            page: this.state.currentPage,
                            onSizePerPageList: this.onSizePerPageList.bind(this),
                            paginationPosition: 'bottom'
                        }}
                    >
                        <TableHeaderColumn dataField="JobDate" isKey={true} dataAlign="left" dataSort={true} width="20" > Date </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > Job Number </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > Client </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > Job Level </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" headerText='Number of pages'  > No.of pages </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > MRA </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > AQA </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > QA </TableHeaderColumn>
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > TAT </TableHeaderColumn>                       
                        <TableHeaderColumn dataField="" dataAlign="left" dataSort={true} width="30" > Status </TableHeaderColumn>
                        <TableHeaderColumn columnClassName="AllocateJob" dataAlign="left" width="30" dataFormat={this.AllocateJobFormatter.bind(this)} > </TableHeaderColumn>
                        <TableHeaderColumn columnClassName="SplitJob" dataAlign="left" width="30" dataFormat={this.SplitJobFormatter.bind(this)} > </TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }


    AllocateJobFormatter(cell, row) {
        return (
            <a data-toggle="tooltip" className="tooltipLink" title="Allocate Job" data-original-title="">
                <i className='glyphicon glyphicon-pencil' headerText='Allocate Job' style={{ cursor: 'pointer', fontSize: '17px', color: 'black' }}  ></i>
            </a>
        )
    }

    SplitJobFormatter(cell, row) {
        return (
            <a data-toggle="tooltip" className="tooltipLink" title="Split Job" data-original-title="">
                <i className='glyphicon glyphicon-resize-full' headerText='Split Job' style={{ cursor: 'pointer', fontSize: '17px', color: 'black' }}  ></i>
            </a>
        )
    }

    search() {
        this.setState({ searchClick: !this.state.searchClick })
    }

    ClientChanged(val) {

    }

    onPageChange(page, sizePerPage) {

    }

    onSizePerPageList(sizePerPage) {

    }
}

export default Coordinator;