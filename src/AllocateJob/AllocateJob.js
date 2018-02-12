import React, { Component } from 'react';
import $ from 'jquery';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './AllocateJob.css';

var moment = require('moment');

class AllocateJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobDate: '',
            Employee: {},
            Employees: [],
            selectLevel: 1,
            selectedLevel: {},
        }
    }

    render() {

        return (
            <div>
                <div style={{ marginTop: '60px' }}>

                    <div>

                        <div className="col-sm-3 form-group">
                            <label> Job Number</label>
                            <div className="form-group">
                                <input className="form-control" type="text" name="jobNum" />
                            </div>
                        </div>

                        <div className="col-sm-2 form-group">
                            <label> Number of Pages</label>
                            <div className="form-group">
                                <input className="form-control" type="text" name="no.ofpages" />
                            </div>
                        </div>

                        <div className="col-sm-2 form-group">
                            <label> Job Date</label>
                            <div className="form-group">
                                <input className="form-control" type="text" name="jobdate" ref="jobdate" />
                                {/* <DatePicker className="form-control col-md-3" name="jobDate" ref="jobDate" defaultValue={moment().format("MM/DD/YYYY")} selected={moment()} dateFormat="MM-DD-YYYY" onChange={(val) => this.setState({ jobDate: val })} /> */}
                            </div>
                        </div>

                        <div className="col-sm-2 form-group">
                            <label> Client </label>
                            <div className="form-group">
                                <input className="form-control" type="text" name="clientName" />
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 form-group">
                        <label>status </label>
                        <div className="form-group">
                            <input className="form-control" type="text" name="status" />
                        </div>
                    </div>

                    <div className="col-sm-3 form-group">
                        <label > Job level</label>
                        <div className="form-group">
                            {/* <input className="form-control" type="text" name="joblevel" /> */}
                            <select className="form-control" ref="level" onChange={this.LevelChange.bind(this)}>
                                <option value="1">L1</option>
                                <option value="2">L1-L3</option>
                                <option value="3">L1-L2-L3</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-sm-3 form-group">
                        <label>TAT </label>
                        <div className="form-group">
                            <input className="form-control" type="text" name="tattime" />
                        </div>
                    </div>

                    {this.Employee()}
                    {/* <div className="form-group">
                                <Select className="form-control" name="empname" ref="empname" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                            </div> */}
                    <div className="col-sm-3">
                        <button type="button" name="submit" className="btn btn-success subBtn"> Submit </button>
                    </div>
                </div>
            </div>
        )
    }

    Employee() {
        let uiItems = [];

        var level = this.state.selectLevel;

        if (level == "1") {
            uiItems.push(
                <div>
                    <div className="form-group col-md-2">
                        <label > MRA</label>
                        <Select className="form-control" name="mraName" ref="mraName" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                    </div>
                </div>
            )
        }
        else if (level == "2") {
            uiItems.push(
                <div>
                    <div className="form-group col-md-2">
                        <label > MRA</label>
                        <Select className="form-control" name="mraName" ref="mraName" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                    </div>
                    <div className="form-group col-md-2">
                        <label >QA </label>
                        <Select className="form-control" name="qaName" ref="qaName" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                    </div>

                </div>
            )

        }

        else {
            uiItems.push(
                <div>
                    <div className="form-group col-md-2">
                        <label > MRA</label>
                        <Select className="form-control" name="mraName" ref="mraName" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                    </div>

                    <div className="form-group col-md-2">
                        <label > AQA</label>
                        <Select className="form-control" name="aqaName" ref="aqaName" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                    </div>
                    <div className="form-group col-md-2">
                        <label >QA </label>
                        <Select className="form-control" name="qaName" ref="qaName" placeholder="Select employee" value={this.state.Employee} options={this.state.Employees} />
                    </div>
                </div>
            )
        }
        return uiItems || null;
    }

    LevelChange() {
        this.setState({ selectLevel: this.refs.level.value });
        this.Employee();
    }
}


export default AllocateJob;