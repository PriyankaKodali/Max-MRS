import React, { Component } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './ClientEmployeeDashboard.css';

//import moment from 'moment';

var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;

class ClientEmployeeDashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1, sizePerPage: 10, dataTotalSize: 0,
            fromDate: moment().subtract(7, "days").format("MM-DD-YYYY"),
            searchClick: false,
            toDate: moment().format("MM-DD-YYYY"),
            UploadedJobs: [], Doctors: [], Doctor: null,
            jobNumber: '',
            status: '',
            sortCol: 'Date',
            sortDir: 'asc',
            Status: ""
        }
    }

    componentWillMount() {
        this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage);
    }

    getClientEmployeeUploads(page, count) {

        var url = "http://localhost:58528//api/Jobs/GetUploadedFiles?userName=" + sessionStorage.getItem("userName") +
            "&fromDate=" + moment(this.state.fromDate).format("MM-DD-YYYY") +
            "&toDate=" + moment(this.state.toDate).format("MM-DD-YYYY") +
            "&doctorId=" + this.state.Doctor +
            "&jobNumber=" + this.state.jobNumber +
            "&status=" + this.state.Status +
            "&page=" + page +
            "&count=" + count +
            "&sortCol=" + this.state.sortCol +
            "&sortDir=" + this.state.sortDir;

        $.ajax({
            url: url,
            type: "get",
            success: (data) => {
                this.setState({
                    Doctors: data["doctors"], UploadedJobs: data["EmployeeUploads"],
                    IsDataAvailable: true, dataTotalSize: data["totalcount"]
                })
            }
        })

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
                                         <DatePicker className="form-control col-md-3" name="fromDate" ref="fromDate" defaultValue={moment(this.state.fromDate).format("MM-DD-YYYY")} selected={moment(this.state.fromDate)} dateFormat="MM-DD-YYYY" onChange={(val) => this.setState({ fromDate: val }, () => { this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage) })} /> 
                                    </div>
                                </div>

                                <div className="col-sm-2 form-group">
                                    <label>To Date</label>
                                    <div className="form-group">
                                        <DatePicker className="form-control" name="toDate" ref="toDate" defaultValue={moment(this.state.toDate).format("MM-DD-YYYY")} selected={moment(this.state.toDate)} dateFormat="MM-DD-YYYY" onChange={(val) =>this.setState({toDate: val}, ()=>{this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage)} )} />
                                    </div>
                                </div>

                                <div className="col-sm-2 form-group">
                                    <label>DoctorName</label>
                                    <div className="form-group">
                                        <Select className="form-control" name="Doctor" value={this.state.Doctor} options={this.state.Doctors} onChange={this.DoctorChange.bind(this)} />
                                    </div>
                                </div>

                                <div className="col-sm-2 form-group">
                                    <label>Job Number</label>
                                    <div className="form-group">
                                        <input className="form-control" name="jobNumber" ref="jobNumber" onChange={this.search.bind(this)} />
                                    </div>
                                </div>


                                <div className="col-sm-2 form-group">
                                    <label>Status</label>
                                    <Select className="form-control" name="status" placeholder="Status" value={this.state.Status}
                                        options={[{ value: 'Completed', label: 'Completed' }, { value: 'Pending', label: 'Pending' }]}
                                        onChange={this.StatusChanged.bind(this)}
                                    />
                                </div>

                                <div className="col-sm-2 form-group clntEmpButton">
                                    <button type="button" name="submit" className="btnLeft btn btn-default" onClick={this.clearClick.bind(this)} > Clear </button>
                                </div>
                            </form>
                        </div>
                        :
                        <div />

                }

                <button type="button" name="submit" className="btn btn-md btn-success uploadFiles" onClick={() => this.props.history.push("/UploadFiles/")}> Upload Files </button>


                <div className="clearfix"> </div>
                {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        :
                        <div className="btstrap">
                            <BootstrapTable ref="clientEmployeestable" striped hover remote={true} pagination={true}
                                data={this.state.UploadedJobs}
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
                                <TableHeaderColumn dataField="JobDate" isKey={true} width="20" dataAlign="center" dataSort={true} dataFormat={this.JobDateFormat.bind(this)} > Date </TableHeaderColumn>
                                <TableHeaderColumn dataField="JobNumber" dataAlign="center" dataSort={true} width="23" > File Name</TableHeaderColumn>
                                <TableHeaderColumn dataField="DoctorName" dataSort={true} width="23" > Doctor </TableHeaderColumn>
                                <TableHeaderColumn dataField="JobNumber" dataSort={true} width="23" > Job Number</TableHeaderColumn>
                                <TableHeaderColumn dataField="totalpages" width="30" dataAlign="center" dataSort={true}>No. of pages </TableHeaderColumn>
                                <TableHeaderColumn dataField="Status" width="30" dataSort={true}> Status </TableHeaderColumn>
                                <TableHeaderColumn columnClassName="download" dataField='Download' dataFormat={this.downloadFormatter.bind(this)} width='18'></TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }
            </div>
        );
    }


    JobDateFormat(cell, row) {
        return (
            <p>  {moment(row["Arrival_Time"]).format("MM-DD-YYYY")} </p>
        )
    }

    downloadFormatter(cell, row) {
        if (row["Status"] != "Pending") {
            return (
                <a data-toggle="tooltip" className="tooltipLink" title="Download file" data-original-title="">
                    <i className='glyphicon glyphicon-cloud-download' headerText='Download file' style={{ cursor: 'pointer', fontSize: '17px', color: 'green' }} onClick={() => this.gotoClientInvoice(row["ClientId"], "", "", row["EmptyJobs"], row["Status"], row["AmountPerUnit"])} ></i>
                </a>
            )
        }
    }

    DoctorChange(val) {
        this.setState({ Doctor: val }, () => {
            this.search();
        })
    }

    StatusChanged(val) {
        this.setState({ Status: val.value || '' }, () => {
            this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage);
        })
    }


    handleChangeDate(date) {
        this.setState({ fromDate: date }, () => console.log(this.state.fromDate));
    }

    search() {

        this.setState({ jobNumber: this.refs.jobNumber.value }, () => {
            this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage);
        })


        if (this.state.Doctor != null) {
            this.setState({ Doctor: this.state.Doctor.value }, () => {
                this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage);
            });
        }

    }

    toDateChange(val)
    {
        console.log(val)
    }

    clearClick() {
        this.state.Doctor = '',
            this.refs.jobNumber.value = '',
            this.state.Status = '',
            this.state.fromDate = moment().subtract(7, "days").format("MM-DD-YYYY"),
            this.state.toDate = moment().format("MM-DD-YYYY"),
            this.setState({
                fromDate: this.state.fromDate,
                toDate: this.state.toDate,
                Status: this.state.Status,
                jobNumber: this.refs.jobNumber.value,
                Doctor: this.state.Doctor
            }, () => this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage))
    }

    onSortChange(sortCol, sortDir) {
        sortDir = this.state.sortCol === sortCol && this.state.sortDir === "asc" ? "desc" : "asc";
        this.setState({
            sortCol: sortCol,
            sortDir: sortDir
        }, () => {
            this.getClientEmployeeUploads(this.state.currentPage, this.state.sizePerPage);
        });
    }


    onPageChange(page, sizePerPage) {
        this.getClientEmployeeUploads(page, sizePerPage);

    }

    onSizePerPageList(sizePerPage) {
        this.getClientEmployeeUploads(this.state.currentPage, sizePerPage);
    }

}

export default ClientEmployeeDashboard