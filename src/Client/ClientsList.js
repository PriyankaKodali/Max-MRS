import React, { Component } from 'react';
import $ from 'jquery';
import { ApiUrl } from '../Config';
import Select from 'react-select';

var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class ClientsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            sizePerPage: 10,
            dataTotalSize: 0,
            searchClick: false,
            clientsList: [],
            name: '',
            email: "",
            fax: '',
            phone: '',
            ClientType: "",
            sortCol: 'Name',
            sortDir: 'asc'

        }
    }

    componentWillMount() {
        this.getClientsList(this.state.currentPage, this.state.sizePerPage);
    }

    getClientsList(page, count) {
        this.setState({ IsDataAvailable: false });
        var url = ApiUrl + "/api/Client/GetAllClients?name=" + this.state.name +
            "&phone=" + this.state.phone +
            "&email=" + this.state.email +
            "&clientType=" + this.state.ClientType +
            "&fax=" + this.state.fax +
            "&page=" + page +
            "&count=" + count +
            "&sortCol=" + this.state.sortCol +
            "&sortDir=" + this.state.sortDir;

        $.ajax({
            url: url,
            type: "get",
            success: (data) => {
                this.setState({
                    clientsList: data["Clients"], dataTotalSize: data["totalCount"],
                    currentPage: page, sizePerPage: count, IsDataAvailable: true
                })
            }
        })
    }

    render() {
        return (
            <div className="container">
                <div className="headercon">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="col-md-10 formheader" style={{ paddingLeft: '10px' }}> Clients </h3>
                            <div className="col-md-2 mybutton">
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.setState({ searchClick: !this.state.searchClick })} >
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.props.history.push("/ClientRegistration")} >
                                    <span className="glyphicon glyphicon-plus"></span>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.searchClick ?
                        <form className="formSearch" id="searchform">
                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="ClientName" placeholder="Client Name" autoComplete="off" ref="clientName" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="Email" placeholder="Email" autoComplete="off" ref="email" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="PhoneNum" placeholder="Phone Number" autoComplete="off" ref="phoneNum" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="Fax" placeholder="Fax" autoComplete="off" ref="fax" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                {/* <input className="col-md-3 form-control" type="text" name="clientType" placeholder="Client Type" autoComplete="off" ref="clienttype" onChange={this.SearchClick.bind(this)} />  */}
                                <Select name="ClientType" placeholder="Client Type" value={this.state.ClientType}
                                    options={[{ value: 'Direct Client', label: 'Direct Client' },
                                    { value: 'Indirect Client', label: 'Indirect Client' },
                                    { value: 'Vendor', label: 'Vendor' }]}
                                    onChange={this.clientTypeChanged.bind(this)}
                                />
                            </div>

                            <div className="col-md-2 button-block text-center">
                                <input type="button" className="btn btn-default" value="Clear" onClick={this.ClearClick.bind(this)} />
                            </div>
                        </form>

                        : <div />
                }

                {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        :
                        <div style={{ marginTop: '1%' }}>

                            <BootstrapTable striped hover remote={true} pagination={true}
                                data={this.state.clientsList}
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
                                <TableHeaderColumn dataField="Name" isKey={true} dataAlign="left" dataSort={true} width="50" > Name</TableHeaderColumn>
                                <TableHeaderColumn dataField="Email" dataAlign="left" dataSort={true} width="45" >Email </TableHeaderColumn>
                                <TableHeaderColumn dataField="Phone" dataAlign="left" dataSort={true} width="30" >Phone</TableHeaderColumn>
                                <TableHeaderColumn dataField="Fax" dataAlign="left" dataSort={true} width="20" >Fax</TableHeaderColumn>
                                <TableHeaderColumn dataField="ClientType" dataAlign="left" dataSort={true} width="30" >Client Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="Vendor_Id" dataAlign="left" dataSort={true} width="20" >Vendor</TableHeaderColumn>
                                <TableHeaderColumn columnClassName="edit" dataField="Edit" dataAlign="center" width="10" dataFormat={this.editDataFormatter.bind(this)} ></TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }
            </div>
        )
    }

    clientTypeChanged(val) {
        this.setState({ ClientType: val || ''}, () => {
            this.SearchClick();
        })
    }

    SearchClick() {
        this.setState({
            name: this.refs.clientName.value,
            email: this.refs.email.value,
            phone: this.refs.phoneNum.value,
            fax: this.refs.fax.value,
            ClientType: this.state.ClientType.value
        }, () => {
            if (this.state.ClientType != undefined) {
                this.getClientsList(this.state.currentPage, this.state.sizePerPage);
            }
            else {
                this.state.ClientType = "";
                this.getClientsList(this.state.currentPage, this.state.sizePerPage);
            }
        })
    }

    ClearClick() {
        this.refs.clientName.value = "";
        this.refs.email.value = "";
        this.refs.phoneNum.value = "";
        this.refs.fax.value = "";
        this.state.ClientType = "";
        this.setState({
            name: this.refs.clientName.value,
            email: this.refs.email.value,
            phone: this.refs.phoneNum.value,
            fax: this.refs.fax.value,
            clientType: this.state.ClientType
        }, () => {
            this.getClientsList(this.state.currentPage, this.state.sizePerPage);
        })
    }

    ClientChanged(val) {
        this.setState({ Client: val || '' })
        this.SearchClick.bind(this);
    }

    editDataFormatter(cell, row) {
        return (
            <a>
                <i className='glyphicon glyphicon-edit' style={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => this.props.history.push("/ClientRegistration/" + row["Id"])} ></i>
            </a>

        )
    }

    onSortChange(sortCol, sortDir) {
        sortDir = this.state.sortCol === sortCol && this.state.sortDir === "asc" ? "desc" : "asc";
        this.setState({
            sortCol: sortCol,
            sortDir: sortDir
        }, () => {
            this.getClientsList(this.state.currentPage, this.state.sizePerPage)
        });
    }

    onPageChange(page, sizePerPage) {
        this.getClientsList(page, sizePerPage)
    }

    onSizePerPageList(sizePerPage) {
        this.getClientsList(this.state.currentPage, sizePerPage)
    }
}

export default ClientsList;