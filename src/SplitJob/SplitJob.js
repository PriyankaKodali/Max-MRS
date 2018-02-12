import React, { Component } from 'react';
import $ from 'jquery';
import './SplitJob.css';
import Select from 'react-select';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';


var validate = require('validate.js');


class SplitJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            splitJob: false,
            NoOfSplits: 1,
            Employee: {},
            Employees: [],
            selectLevel: 1,
            selectedLevel: {},
            uiItems: []

        }
    }

    componentDidMount() {
        setUnTouched(document);
        $('[data-toggle="popover"]').popover();
    }

    componentDidUpdate() {
        $('[data-toggle="popover"]').popover();
    }

    createUi() {
        let uiItems = [];
        if (this.state.NoOfSplits > 1) {
            for (let i = 0; i < this.state.NoOfSplits; i++) {
                this.state.splitJob = true;
                uiItems.push(
                    <div key={i} className="jobsplit">
                        <div className="col-xs-12" >
                            <div className="col-md-2">
                                <label>Job Number</label>
                                <input className="form-control" type="text" ref="jobNum" />
                            </div>

                            <div className="col-md-2">
                                <label>No. of Pages</label>
                                <input className="form-control" name="noofpages" type="text" ref="noOfpages" />
                            </div>

                            <div className="col-md-2">
                                <label>MRA</label>
                                <Select className="form-control" name="empname" ref="empname" placeholder="Select Employee" value={this.state.Employee} options={this.state.Employees} />
                            </div>

                            {/* {this.Employee()} */}

                            {/* <div className="col-md-2">
                                <label>Job Level</label>
                                <select className="form-control" ref="level" onChange={this.LevelChange.bind(this)} >
                                    <option value="1"> L1</option>
                                    <option value="2"> L1-L3</option>
                                    <option value="3"> L1-L2-L3</option>
                                </select>
                            </div> */}
                        </div>
                    </div>
                )
            }
            return uiItems || null;
        }

        else {
            return null;
        }

    }


    // LevelChange() {
    //     this.setState({ selectLevel: this.refs.level.value });
    //     this.Employee();
    // }


    // Employee() {
    //     let uiEmp = [];

    //     for (let i = 0; i < this.state.selectLevel; i++) {
    //         uiEmp.push(
    //             <div className="form-group col-md-2">
    //                 <label > Employee</label>
    //                 <Select className="form-control" name="empname" ref="empname" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
    //             </div>
    //         )
    //     }
    //     if (uiEmp.length >= 0) {
    //         return uiEmp;
    //     }
    //     else {
    //         return null;
    //     }
    // }

    render() {
        return (
            <div >
                <div className="headercon">
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
                        <label>No. of pages </label>
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

                    <div className="col-md-2">
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

            </div>
        );
    }

    handleSubmit() {
        //  this.setError("noofsplits", null)
        var number = document.getElementById("noofsplits").value;
        this.setState({ splitJob:true, NoOfSplits: number })
        this.createUi();
    }
}

export default SplitJob;


     // this.setState({ splitJob: true, noofsplits: this.refs.noofsplits.value });

            // <div style={{ marginTop: '10%' }}>
            //     <div className="col-xs-12" >
            //         <div className="col-md-3">
            //             <label>Job Number</label>
            //             <input className="form-control" type="text" ref="jobNum" />
            //         </div>

            //         <div className="col-md-3">
            //             <label>No. of Pages</label>
            //             <input className="form-control" type="text" ref="noOfpages" />
            //         </div>

            //         <div className="col-md-3">
            //             <label>Job Level</label>
            //             <select className="form-control">
            //                 <option value="1"> L1</option>
            //                 <option value="2"> L1-L3</option>
            //                 <option value="3"> L1-L2-L3</option>
            //             </select>
            //         </div>
            //     </div>
            //     <div className="col-xs-12">
            //         <button className="btn btn-success btnSave" > Save </button>
            //     </div>
            // </div>
