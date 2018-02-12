import React, { Component } from 'react';
import $ from 'jquery';
import { ApiUrl } from '../Config';

var validate = require('validate.js');
var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class EmployeesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            sizePerPage: 10,
            dataTotalSize: 0,
            EmployeesList: [],
            name: '',
            email: '',
            phone: '',
            designation: '',
            department: '',
            empNum: '',
            IsDataAvailable: false,
            sortCol: 'Name',
            sortDir: 'asc',
            searchClick: false
        }
    }

    componentWillMount() {
        this.getEmployeesList(this.state.currentPage, this.state.sizePerPage);
    }

    getEmployeesList(page, count) {
        this.setState({ IsDataAvailable: false });

        var url = ApiUrl + "/api/Employee/GetAllEmployees?empNum=" + this.state.empNum +
            "&name=" + this.state.name +
            "&email=" + this.state.email +
            "&phoneNum=" + this.state.phone +
            "&department=" + this.state.department +
            "&designation=" + this.state.designation +
            "&page=" + page +
            "&count=" + count +
            "&sortCol=" + this.state.sortCol +
            "&sorDir=" + this.state.sortDir

        $.ajax({
            url: url,
            type: "get",
            success: (data) => {
                this.setState({
                    EmployeesList: data["employees"], dataTotalSize: data["totalCount"],
                    IsDataAvailable: true, currentPage: page, sizePerPage: count
                })
            }
        })

    }

    render() {
        return (
            <div className="container" style={{ marginTop: '1%' }}>
                <div className="headercon">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="col-md-10 formheader" style={{ paddingLeft: '10px' }}> Employees </h3>
                            <div className="col-md-2 mybutton">
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.setState({ searchClick: !this.state.searchClick })} >
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.props.history.push("/EmployeeRegistration")} >
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button>

                            </div>
                        </div>
                    </div>

                    {
                        this.state.searchClick ?

                            <form className="formSearch" id="searchform">
                                <div className="col-md-2 form-group">
                                    <input className="col-md-2 form-control" type="text" name="EmpNum" placeholder="Employee Number" autoComplete="off" ref="empNum" onChange={this.SearchClick.bind(this)} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-2 form-control" type="text" name="FirstName" placeholder="Name" autoComplete="off" ref="name" onChange={this.SearchClick.bind(this)} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-2 form-control" type="text" name="PhoneNum" placeholder="Phone Number" autoComplete="off" ref="phoneNum" onChange={this.SearchClick.bind(this)} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-2 form-control" type="text" name="Email" placeholder="Email" autoComplete="off" ref="email" onChange={this.SearchClick.bind(this)} />
                                </div>

                                {/* <div className="col-md-1 form-group">
                                    <input className="col-md-1 form-control" type="text" name="Department" placeholder="Department" autoComplete="off" ref="department" onChange={this.SearchClick.bind(this)} />
                                </div> */}

                                <div className="col-md-2 form-group">
                                    <input className="col-md-1 form-control" type="text" name="Designation" placeholder="Designation" autoComplete="off" ref="designation" onChange={this.SearchClick.bind(this)} />
                                </div>

                                <div className="col-md-1 button-block text-center">
                                    <input type="button" className="mleft10 btn btn-default" value="Clear" onClick={this.clearClick.bind(this)} />
                                </div>
                            </form>
                            : <div />
                    }
                </div>

                {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        :
                        <div style={{ marginTop: '1%' }}>
                            <BootstrapTable striped hover remote={true} pagination={true}
                                data={this.state.EmployeesList}
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
                                <TableHeaderColumn dataField="EmpNum" isKey={true} dataAlign="left" dataSort={true} width="20" > EmpNum</TableHeaderColumn>
                                <TableHeaderColumn dataField="Name" dataAlign="left" dataSort={true} width="30" > Name </TableHeaderColumn>
                                <TableHeaderColumn dataField="PrimaryPhone" dataAlign="left" dataSort={true} width="30" >Phone Num</TableHeaderColumn>
                                <TableHeaderColumn dataField="Email" dataAlign="left" dataSort={true} width="30" >Email </TableHeaderColumn>
                                <TableHeaderColumn dataField="Department" dataAlign="center" dataSort={true} width="15" >Department</TableHeaderColumn>
                                <TableHeaderColumn dataField="Designation" dataAlign="left" dataSort={true} width="20" >Designation </TableHeaderColumn>
                                <TableHeaderColumn columnClassName="edit" dataField="Edit" dataAlign="center" width="10" dataFormat={this.editDataFormatter.bind(this)} ></TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }

            </div>

        )
    }

    SearchClick() {

        this.setState({
            empNum:  this.refs.empNum.value,
            name:this.refs.name.value,
            email:  this.refs.email.value,
            phone:this.refs.phoneNum.value,
            designation: this.refs.designation.value
        },() =>{
             this.getEmployeesList(this.state.currentPage, this.state.sizePerPage);
        })
    }

    clearClick() {
        this.refs.name.value="";
        this.refs.empNum.value="";
        this.refs.email.value= "";
        this.refs.phoneNum.value="";
        this.refs.designation.value="";
        
        this.setState({
            empNum:  "",
            name:"",
            email:  "",
            phone:"",
            designation: ""
        },() =>{
             this.getEmployeesList(this.state.currentPage, this.state.sizePerPage);
        })
    }


    editDataFormatter(cell, row) {
        return (
            <i className='glyphicon glyphicon-pencil' style={{ fontSize: '18px' }} onClick={() => this.props.history.push("/EmployeeRegistration/" + row["Id"])}  ></i>
        )
    }

    onSortChange(sortCol, sortDir) {
        sortDir = this.state.sortCol === sortCol && this.state.sortDir === "asc" ? "desc" : "asc";
        this.setState({
            sortCol: sortCol,
            sortDir: sortDir
        }, () => {
            this.getEmployeesList(this.state.currentPage, this.state.sizePerPage)
        });
    }

    onPageChange(page, sizePerPage) {
        this.getEmployeesList(page, sizePerPage)
    }

    onSizePerPageList(sizePerPage) {
        this.getEmployeesList(this.state.currentPage, sizePerPage)
    }
}

export default EmployeesList;