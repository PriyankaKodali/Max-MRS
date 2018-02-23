import React , {Component} from 'react';
import $ from 'jquery';
import { ApiUrl } from '../Config';
import { showErrorsForInput, setUnTouched, ValidateForm } from '.././Validation';


class Job extends Component{
    render(){ 
        return(
             <div className="col-xs-12" >
                        <div className="col-xs-2">
                            <label>Job Number</label> <br />
                            {/* <input className="form-control" type="text" ref="jobNum" value={this.refs.jobnumber + '_'+ i+1} /> 
                             {this.refs.jobnumber.value + '_' + jobNum}*/}
                        </div>
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
                                    <div >
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

                                    <div>
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
}