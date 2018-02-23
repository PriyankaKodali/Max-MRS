import React, { Component } from 'react';
import $ from 'jquery';
import './SplitJob.css';
import Select from 'react-select';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';
import { ApiUrl } from '../Config'

var validate = require('validate.js');


class SplitJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            splitJob: false,
            NoOfSplits: 1,
            Employee: '',
            Employees: [],
            selectLevel: 1,
            selectedLevel: {},
            uiItems: [],
            count: 0,
            startPage: 0,
            endPage: 0,
            result: 0,
            uiItemRefs: []
        }
    }

    componentWillMount() {
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetEmployees",
            type: "get",
            success: (data) => { this.setState({ Employees: data["employees"] }) }
        })
    }

    componentDidMount() {
        setUnTouched(document);
        $('[data-toggle="popover"]').popover();
    }

    componentDidUpdate() {
        $('[data-toggle="popover"]').popover();
    }

    createUi() {

        var uiItems = this.state.uiItems

        //this.state.uiItems = [];
        
        var totalpages = this.refs.noofpages.value;
        this.state.startPage = 1;
        this.state.result = 0;
        this.state.endPage = 0;
        var result = 0;
        var uiItemRefs = this.state.uiItemRefs;

        if (this.state.NoOfSplits > 1) {

            for (let i = 0; i < this.state.NoOfSplits; i++) {
                this.state.splitJob = true;
                if (i + 1 == this.state.NoOfSplits) {
                    this.state.startPage = this.state.endPage + 1;
                    this.state.endPage = this.refs.noofpages.value;
                }
                else {
                    this.state.startPage = this.state.result + this.state.startPage;
                    this.state.result = Math.round(this.refs.noofpages.value / this.state.NoOfSplits);
                    this.state.endPage = this.state.startPage + this.state.result - 1;
                }

                var count = "jobNum " + i;
                var jobNum = i + 1;

                uiItems.push(
                    <div className="col-xs-12" ref={(count) => uiItemRefs.push(count)} key={i} >

                        <div className="col-xs-2">
                            <label>Job Number</label>
                            <input className="form-control" name="noofpages" type="text" ref="noOfpages" value={this.refs.jobnumber.value + '_' + jobNum} />
                        </div>
                        {/* <div className="col-xs-2">
                            <label>Job Number</label> <br /> {this.refs.jobnumber.value + '_' + jobNum}
                        </div> */}
                        <div className="col-xs-1">
                            <label>Start Page</label>
                            <input className="form-control" name="noofpages" type="text" ref="noOfpages" defaultValue={this.state.startPage} />
                        </div>

                        <div className="col-xs-1">
                            <label>End Page</label>
                            <input className="form-control" name="noofpages" type="text" ref="noOfpages" defaultValue={this.state.endPage} />
                        </div>

                        {
                            this.refs.joblevel.value == "L1" ?
                                <div className="col-md-2">
                                    <label>MRA</label>
                                    <Select className="form-control" name="empname" ref="mra" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} onChange={this.EmployeeChanged.bind(this)} />
                                </div>
                                :

                                this.refs.joblevel.value == "L1-L3" ?
                                    <div key={i}>
                                        <div className="col-md-2">
                                            <label>MRA</label>
                                            <Select className="form-control" name="empname" ref="mra" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} onChange={this.EmployeeChanged.bind(this)} />
                                        </div>

                                        <div className="col-md-2">
                                            <label>AQA</label>
                                            <Select className="form-control" name="empname" ref="aqa" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} />
                                        </div>
                                    </div>
                                    :

                                    <div key={i}>
                                        <div className="col-md-2">
                                            <label>MRA</label>
                                            <Select className="form-control" name="empname" ref="mra" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} />
                                        </div>

                                        <div className="col-md-2">
                                            <label>AQA</label>
                                            <Select className="form-control" name="empname" ref="aqa" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} />
                                        </div>

                                        <div className="col-md-2">
                                            <label>QA</label>
                                            <Select className="form-control" name="empname" ref="qa" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} />
                                        </div>
                                    </div>
                        }
                    </div>
                )
            }
            return this.state.uiItems;
        }

        // else {
        //     let uiItems = [];
        //     this.state.splitJob = false;
        //     uiItems.push(
        //         <div>
        //         </div>
        //     )
        //     return uiItems;
        // }
    }


    EmployeeChanged(val) {
        this.setState({ Employee: val })
    }

    render() {
        return (
            <div className="container" style={{ fontSize: '12px', paddingLeft: '0px' }}>
                <div className="modalExample" id="myModal" data-show role="dialog"  >
                    <div className="modal-dialog" style={{ zIndex: '2000' }}>
                        <div className="modal-content">
                            <div className="modal-header formheader" >
                                <button type="button" className="close btnClose" data-dismiss="modal" id="closeModal" onClick={this.CloseClick.bind(this)}> &times; </button>
                                <h4 className="modal-title">Split Job</h4>
                            </div>

                            <div className="modal-body col-sm-12 mx-auto">

                                <div className="col-xs-2 form-group">
                                    <input type="text" id="name" className="form-control" name="JobNumber" ref="jobnumber" required />
                                    <label className="form-control-placeholder" for="name">Job Number</label>
                                </div>

                                <div className="col-xs-2 form-group">
                                    <input type="text" id="noofPages" className="form-control" name="noofPages" ref="noofpages" required />
                                    <label className="form-control-placeholder" for="noofPages">No.of Pages</label>
                                </div>

                                <div className="col-xs-2 form-group">
                                    <input type="text" id="client" className="form-control" name="client" ref="client" required />
                                    <label className="form-control-placeholder" for="client">Client</label>
                                </div>

                                <div className="col-xs-2 form-group">
                                    <input type="text" id="joblevel" className="form-control" name="joblevel" ref="joblevel" required />
                                    <label className="form-control-placeholder" for="joblevel">Job Level</label>
                                </div>

                                <div className="col-xs-1 form-group">
                                    <input type="text" id="tat" className="form-control" name="tat" ref="tat" required />
                                    <label className="form-control-placeholder" for="tat">TAT</label>
                                </div>

                                <div className="col-md-2 form-group">
                                    <input className="form-control" type="text" name="status" ref="status" required />
                                    <label for="status" className="form-control-placeholder">Status </label>
                                </div>

                                <div className="col-xs-1 form-group">
                                    <input className="form-control" type="text" name="noofsplits" ref="noofsplits" onChange={this.noOfSplitsChanged.bind(this)} required />
                                    <label for="noofsplits" className="form-control-placeholder">Splits</label>
                                </div>

                                {
                                    this.state.splitJob ?
                                        this.createUi()
                                        : <div />
                                }

                            </div>

                            <div className="col-md-12">
                                <button className="btn btn-success jobsplitbtn" type="submit" onClick={this.handleSubmit.bind(this)} > submit</button>
                            </div>

                            <div className="modal-footer">
                                {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }


    CloseClick() {
        $("#closeModal").click();
        this.props.history.push("/Coordinator")

    }

    noOfSplitsChanged() {

        var numberOfSplits = this.refs.noofsplits.value;
        var noOfPages = this.refs.noofpages.value;

        if (numberOfSplits > 1) {

            this.setState({ splitJob: true, NoOfSplits: this.refs.noofsplits.value }, () => {
                this.createUi();
            })
        }

        else {
            this.setState({ splitJob: false })
        }
    }


    handleSubmit() {
        var jobSplit = this.state.uiItems;
        var uiItemRefs = this.state.uiItemRefs;

        //  console.log(jobSplit);
        console.log($(this.state.uiItemRefs[0]).find('.form-control')[1].value);
        console.log($(this.state.uiItemRefs[0]).find('.form-control'));
        // jobSplit.map((ele, i) => {

        // })

    }
}

export default SplitJob;





























{/* <div >
    <div className="splitheadercon">
        <div className="row">
            <div className="col-md-12">
                <h3 className="col-md-12 formhead"> Split Job </h3>
            </div>
        </div>
    </div>
    <div className="col-xs-12">
        <div className="col-md-2">
            <label>Job Number </label>
            <input className="form-control" type="text" name="jobnumber" ref="jobnumber" />
        </div>
        <div className="col-md-2">
            <label>No.of pages </label>
            <input className="form-control" type="text" name="noofPages" ref="noofpages" />
        </div>

        <div className="col-md-2">
            <label>Client </label>
            <input className="form-control" type="text" name="client" ref="client" />
        </div>

        <div className="col-md-2">
            <label>Joblevel </label>
            <input className="form-control" type="text" name="joblevel" ref="joblevel" />
        </div>

        <div className="col-md-1">
            <label>TAT </label>
            <input className="form-control" type="text" name="tat" ref="tat" />
        </div>

        <div className="col-md-2">
            <label>Status </label>
            <input className="form-control" type="text" name="status" ref="status" />
        </div>

        <div className="col-md-1">
            <label>No. of splits </label>
            <input className="form-control" id="noofsplits" type="text" min="0" name="noofsplits" ref="noofsplits" onChange={this.handleSubmit.bind(this)} />

        </div>

        {
            this.state.splitJob ?
                this.createUi()
                : <div />
        }
        <div className="col-md-12">
            <button className="btn btn-success jobsplitbtn" type="submit"  > submit</button>
        </div>

    </div>

</div> */}