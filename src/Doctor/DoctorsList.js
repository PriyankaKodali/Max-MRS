import React, { Component } from 'react';
import $ from 'jquery';
import './Doctors.css';
import { ApiUrl } from '../Config';
import Select from 'react-select';

var moment = require('moment');
var ReactBSTable = require('react-bootstrap-table');
var BootstrapTable = ReactBSTable.BootstrapTable;
var TableHeaderColumn = ReactBSTable.TableHeaderColumn;


class DoctorsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            sizePerPage: 10,
            dataTotalSize: 0,
            searchClick: false,
            DoctorsList: [],
            authId: '',
            client: '',
            name: '',
            email: '',
            phoneNum: '',
            jobLevel: '',
            voiceGrade: '',
            sortCol: 'Name',
            sortDir: 'asc',
            IsDataAvailable: false

        }
    }

    componentWillMount() {
        this.getDoctorsList(this.state.currentPage, this.state.sizePerPage);
    }

    getDoctorsList(page, count) {
        this.setState({ IsDataAvailable: false });
        var url = ApiUrl + "/api/Doctors/GetDoctorsList?authId=" + this.state.authId +
            "&name=" + this.state.name +
            "&client=" + this.state.client +
            "&email=" + this.state.email +
            "&phoneNum=" + this.state.phoneNum +
            "&jobLevel=" + this.state.jobLevel +
            "&voiceGrade=" + this.state.voiceGrade +
            "&page=" + page +
            "&count=" + count +
            "&sortCol=" + this.state.sortCol +
            "&sortDir=" + this.state.sortDir;

        $.ajax({
            url: url,
            type: "get",
            success: (data) => {
                this.setState({
                    DoctorsList: data["DoctorsList"], dataTotalSize: data["totalCount"],
                    IsDataAvailable: true, currentPage: page, sizePerPage: count
                })
            }
        })

    }

    render() {
        return (
            <div className="Container">
                <div className="headercon">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="col-md-10 formheader" style={{ paddingLeft: '10px' }}> Doctors </h3>
                            <div className="col-md-2 mybutton">
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.setState({ searchClick: !this.state.searchClick })} >
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </button>
                                <button type="button" className="btn btn-default pull-right headerbtn" onClick={() => this.props.history.push("/Doctor")} >
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
                                <input className="col-md-3 form-control" type="text" name="Name" placeholder="Name" autoComplete="off" ref="name" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="Client" placeholder="Client Name" autoComplete="off" ref="clientName" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="Email" placeholder="Email" autoComplete="off" ref="email" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                <input className="col-md-3 form-control" type="text" name="PhoneNum" placeholder="Phone Number" autoComplete="off" ref="phoneNum" onChange={this.SearchClick.bind(this)} />
                            </div>

                            <div className="col-md-2 form-group">
                                {/* <input className="col-md-2 form-control" type="text" name="joblevel" placeholder="Job Level" autoComplete="off" ref="jobLevel" onChange={this.SearchClick.bind(this)} /> */}
                             <Select className="col-md-2 form-control" value={this.state.jobLevel} 
                             options={ [{value:'L1', label:'L1'}, {value:'L1-L3', label:'L1-L3'}, {value:'L1-L2-L3', label:'L1-L2-L3'}]} onChange={this.jobLevelChanged.bind(this)} />
                            </div>

                            <div className="col-md-1 form-group">
                                {/* <input className="col-md-1 form-control" type="text" name="clientType" placeholder="Voice Grade" autoComplete="off" ref="voiceGrade" onChange={this.SearchClick.bind(this)} /> */}
                                <Select className="col-md-2 form-control" value={this.state.voiceGrade} 
                             options={ [{value:'A', label:'A'}, {value:'B', label:'B'}, {value:'C', label:'C'}, {value:'D', label:'D'}]} onChange={this.voiceGradeChanged.bind(this)} />
                            </div>

                            <div className="col-xs-1 form-group">
                            <input type="button" className="btn btn-default" value="Clear" onClick={this.clear.bind(this)} />
                            </div>
                        </form>
                        :
                        <div />
                }


                {
                    !this.state.IsDataAvailable ? < div className="loader visible" ></div >
                        :
                        <div style={{ marginTop: '1%' }}>
                            <BootstrapTable striped hover remote={true} pagination={true}
                                data={this.state.DoctorsList}
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
                                <TableHeaderColumn dataField="IdigitalAuthorId" isKey={true} dataAlign="left" dataSort={true} width="14" > Auth Id</TableHeaderColumn>
                                <TableHeaderColumn dataField="Name" dataAlign="left" dataSort={true} width="35" >Name</TableHeaderColumn>
                                <TableHeaderColumn dataField="Client" dataAlign="left" dataSort={true} width="35" >Client</TableHeaderColumn>
                                <TableHeaderColumn dataField="Email" dataAlign="left" dataSort={true} width="37" >Email </TableHeaderColumn>
                                <TableHeaderColumn dataField="PrimaryPhone" dataAlign="left" dataSort={true} width="19" >Phone</TableHeaderColumn>
                                <TableHeaderColumn dataField="JobLevel" dataAlign="left" dataSort={true} width="15" >Job Level</TableHeaderColumn>
                                <TableHeaderColumn dataField="VoiceGrade" dataAlign="center" dataSort={true} width="12" >Voice Grade</TableHeaderColumn>
                                <TableHeaderColumn columnClassName="edit" dataField="Edit" dataAlign="center" width="18" dataFormat={this.editDataFormatter.bind(this)} ></TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                }

            </div>
        )
    }

    jobLevelChanged(val) {
        this.setState({ jobLevel: val }, ()=>{
                this.SearchClick();
        });
    }

    voiceGradeChanged(val){
        this.setState({voiceGrade: val}, ()=>{
              this.SearchClick();
        })
    }

    

    clear()
    {
        this.refs.name.value= "";
        this.refs.clientName.value="";
        this.refs.email.value="";
        this.refs.phoneNum.value="";
        this.state.jobLevel=null;
        this.state.voiceGrade=null;
        
          this.setState({
            name: this.refs.name.value,
            client: this.refs.clientName.value,
            email: this.refs.email.value,
            phoneNum: this.refs.phoneNum.value,
            jobLevel: this.state.jobLevel,
            voiceGrade: this.state.voiceGrade
        }, () => {
            this.getDoctorsList(this.state.currentPage, this.state.sizePerPage);
        })

    }

    SearchClick() {
        this.setState({
            name: this.refs.name.value,
            client: this.refs.clientName.value,
            email: this.refs.email.value,
            phoneNum: this.refs.phoneNum.value,
            jobLevel: this.state.jobLevel.value,
            voiceGrade: this.state.voiceGrade.value
        }, () => {
            this.getDoctorsList(this.state.currentPage, this.state.sizePerPage);
        })
    }

    editDataFormatter(cell, row) {
        return (
            <i className='glyphicon glyphicon-pencil' style={{ fontSize: '18px' }} onClick={() => this.props.history.push("/Doctor/" + row["Id"])} ></i>
        )
    }

    onSortChange(sortCol, sortDir) {
        sortDir = this.state.sortCol === sortCol && this.state.sortDir === "asc" ? "desc" : "asc";
        this.setState({
            sortCol: sortCol,
            sortDir: sortDir
        }, () => {
            this.getDoctorsList(this.state.currentPage, this.state.sizePerPage);
        });
    }

    onPageChange(page, sizePerPage) {
        this.getDoctorsList(page, sizePerPage);
    }

    onSizePerPageList(sizePerPage) {
        this.getDoctorsList(this.state.currentPage, sizePerPage);
    }
}

export default DoctorsList;