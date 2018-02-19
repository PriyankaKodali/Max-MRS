import React, { Component } from 'react';
import $ from 'jquery';
import { ApiUrl } from '../Config';
import './ClientEmployees.css';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

var validate = require('validate.js');
var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class ClientEmployeesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            sizePerPage: 10,
            dataTotalSize: 0,
            FirstName: '',
            LastName: "",
            Email: "",
            PhoneNumber: "",
            Department: "",
            IsDataAvailable: false,
            sortCol: 'Client',
            sortDir: 'asc',
            searchClick: false,
            Clients: [],
            Client: '',
            ClientEmployeesList: []
        }
    }

    componentWillMount() {

       $.ajax({
            url: ApiUrl + "/api/MasterData/GetAllClients",
            type: "get",
            success: (data) => { this.setState({ Clients: data["clients"] }) }
        })

        this.getClientEmpList(this.state.currentPage, this.state.sizePerPage)
    }

    getClientEmpList(page, count) {
        this.setState({ IsDataAvailable: false })
        var url = ApiUrl + "/api/Client/GetClientEmployees?ClientId=" + this.state.Client.value +
            "&FirstName=" + this.state.FirstName +
            "&LastName=" + this.state.LastName +
            "&Email=" + this.state.Email +
            "&PrimaryPhone=" + this.state.PhoneNumber +
            "&Department=" + this.state.Department +
            "&page=" + page +
            "&count=" + count +
            "&SortCol=" + this.state.sortCol +
            "&SortDir=" + this.state.sortDir;
        $.ajax({
            url,
            type: "GET",
            success: (data) =>
                this.setState({
                    ClientEmployeesList: data["clientEmployees"], dataTotalSize: data["totalCount"],
                    currentPage: page, sizePerPage: count, IsDataAvailable: true
                })
        })
    }


    render() {
        return (
            <div className="clientEmpListContainer">
                <div className="headercon">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="col-md-10 formheader" style={{ paddingLeft: '10px' }}> Client Employees </h3>
                            <div className="col-md-2 mybutton">
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.setState({ searchClick: !this.state.searchClick })} >
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.props.history.push("/ClientEmpRegistration")} >
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button>

                            </div>
                        </div>
                    </div>
                    {
                        this.state.searchClick ?

                            <form className="formSearch" id="searchform">
                                <div className="col-md-2 form-group">
                                    <Select className="col-md-2 form-control" name="Client" ref="client" placeholder="Select Client" options={this.state.Clients} value={this.state.Client} onChange={this.ClientChanged.bind(this)} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-3 form-control" type="text" name="FirstName" placeholder="First Name" autoComplete="off" ref="firstname" onChange={this.searchClick.bind(this)} />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-3 form-control" type="text" name="LastName" placeholder="Last Name" autoComplete="off" ref="lastname"  onChange={this.searchClick.bind(this)}  />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-3 form-control" type="text" name="Email" placeholder="Email" autoComplete="off" ref="email"  onChange={this.searchClick.bind(this)}  />
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="col-md-3 form-control" type="text" name="Department" placeholder="Department" autoComplete="off" ref="department"  onChange={this.searchClick.bind(this)}  />
                                </div>

                                <div className="col-md-2 button-block text-center">
                                    {/* <input type="button" className="btn btn-success" value="Search" onClick={this.searchClick.bind(this)} /> */}
                                    <input type="button" className="mleft10 btn btn-default" value="Clear" onClick={this.clearClick.bind(this)} />
                                </div>
                            </form>
                            : <div />
                    }
                </div>

                <div className="clearfix"> </div>
                {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        :
                        <div style={{ marginTop: '1%' }}>
                            <BootstrapTable striped hover remote={true} pagination={true} data={this.state.ClientEmployeesList}
                                fetchInfo={{ dataTotalSize: this.state.dataTotalSize }}
                                options={{
                                    sizePerPage: this.state.sizePerPage,
                                    onPageChange: this.onPageChange.bind(this),
                                    sizePerPageList: [{ text: '10', value: 10 },
                                    { text: '25', value: 25 },
                                    { text: 'ALL', value: this.state.dataTotalSize }],
                                    page: this.state.currentPage,
                                    onSizePerPageList: this.onSizePerPageList.bind(this),
                                    onSortChange: this.onSortChange.bind(this),
                                    paginationPosition: 'bottom'
                                }}
                            >
                                <TableHeaderColumn dataField="Client" isKey={true} dataAlign="left" dataSort={true} width="50" > Client</TableHeaderColumn>
                                <TableHeaderColumn dataField="FirstName" dataAlign="left" dataSort={true} width="20" > FirstName</TableHeaderColumn>
                                <TableHeaderColumn dataField="LastName" dataAlign="left" dataSort={true} width="30" > LastName </TableHeaderColumn>
                                <TableHeaderColumn dataField="Phone" dataAlign="left" dataSort={true} width="30">Phone Number</TableHeaderColumn>
                                <TableHeaderColumn dataField="Email" dataAlign="left" dataSort={true} width="30" >Email</TableHeaderColumn>
                                <TableHeaderColumn dataField="Department" dataAlign="left" dataSort={true} width="20" >Department </TableHeaderColumn>
                                <TableHeaderColumn columnClassName="edit" dataField="Edit" dataAlign="center" width="10" dataFormat={this.editDataFormatter.bind(this)} > </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }
            </div>
        )
    }

    onSortChange(sortCol, sortDir) {
        sortDir = this.state.sortCol === sortCol && this.state.sortDir === "asc" ? "desc" : "asc";
        this.setState({
            sortCol: sortCol,
            sortDir: sortDir
        }, () => {
            this.getClientEmpList(this.state.currentPage, this.state.sizePerPage)
        });
    }

    editDataFormatter(cell, row) {
        return (
            <a>
            <i className='glyphicon glyphicon-edit' style={{ cursor:'pointer', fontSize: '18px' }} onClick={() => this.props.history.push("/EditClientEmployee/" + row["Id"])}></i>
           </a>
        )
    }


    ClientChanged(val) {
        this.setState({ Client: val || '' }, ()=>{
             this.searchClick();
        })
    }

    onPageChange(page, sizePerPage) {
        this.getClientEmpList(this.state.currentPage, this.state.sizePerPage)
    }

    onSizePerPageList(sizePerPage) {
        this.getClientEmpList(this.state.currentPage, this.state.sizePerPage)
    }

    searchClick() {
         this.setState({
            FirstName: this.refs.firstname.value,
            LastName: this.refs.lastname.value,
            Email: this.refs.email.value,
            Client: this.state.Client,
            Department: this.refs.department.value
        }, ()=>{
            this.getClientEmpList(this.state.currentPage, this.state.sizePerPage)

        });
       
    
    }

    clearClick() {
        this.refs.firstname.value = "";
        this.refs.lastname.value = "";
        this.state.Client = "";
        this.refs.email.value = "";
        this.refs.department.value = "";
        this.getClientEmpList(this.state.currentPage, this.state.sizePerPage);
    }

}


export default ClientEmployeesList;