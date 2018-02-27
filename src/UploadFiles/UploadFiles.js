import React, { Component } from 'react';
import $ from 'jquery';
import './UploadFiles.css';
import { ApiUrl } from '.././Config';
import { ValidateForm, showErrorsForInput, setUnTouched, showErrors } from '../Validation';
import Select from 'react-select';
import { MyAjaxForAttachments, MyAjax } from '../MyAjax.js';
import { toast } from 'react-toastify';

window.jQuery = window.$ = require("jquery");
var bootstrap = require('bootstrap');


class UploadFiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Doctors: [],
            Doctor: null,
        }
    }

    componentWillMount() {
        $.ajax({
            url: ApiUrl + "/api/MasterData/GetDoctors",
            type: "get",
            success: (data) => { this.setState({ Doctors: data["doctors"] }) }
        })
    }

    componentDidMount() {

        $("#input-id").fileinput({
            theme: "fa",
            hideThumbnailContent: true,
            uploadUrl: "http://localhost:58528/api/Jobs/GetFilesFromClientEmp?doctorId=" + this.state.Doctor +
            "&userName=" + sessionStorage.getItem("userName"),
            uploadAsync: false,
            overwriteInitial: false,
            initialPreviewAsData: true,
            showCancel: false,
            showUpload: false,
            showRemove: false,
            allowedFileExtensions: ["pdf", "xsl", "txt", "doc", ".docx"]
        });
    }

    render() {
        return (
            <div style={{ marginTop: '60px' }}>

                <form id="filesUpload" onSubmit={this.uploadFile.bind(this)}>

                    <div className="col-xs-12">
                        <label>Doctor</label>
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span className="glyphicon glyphicon-user"></span>
                                </span>
                                <Select className="form-control" name="doctor" ref="doctor" placeholder="Select Doctor" value={this.state.Doctor} options={this.state.Doctors} onChange={this.onDoctorChanged.bind(this)} />
                            </div>
                        </div><br />
                        <div>
                            <div className="form-group">
                                <input className="file" id="input-id" type="file" ref="Upldfiles" data-preview-file-type="any" multiple />
                            </div>
                        </div> <br />

                        <div className="col-xs-12" >
                            <div className="loader loaderActivity btnSave" ></div>
                            <button type="submit" name="submit" className="btn btn-success btnSave"  > Upload </button>
                        </div>
                    </div>

                </form>
            </div>


        );
    }

    uploadFile() {

        var data = new FormData();

        var files = this.refs.Upldfiles.files;


        if (this.state.Doctor != null) {
            data.append("Doctor_Id", this.state.Doctor.value);
        }
        else {
            this.state.Doctor.value = '';
        }
        for (var i = 0; i < files.length; i++) {
            data.append(files[i].filename, files[i]);
        }

        data.append("UserName", sessionStorage.getItem("userName"));

        let url = "http://localhost:58528/api/Jobs/AddFilesFromClientEmp"

        try {
            MyAjaxForAttachments(
                url,
                (data) => {
                    toast("Files uploaded successfully!", {
                        type: toast.TYPE.SUCCESS
                    });
                    $("button[name='submit']").show();
                    this.props.history.push("/ClientEmployeeDashboard");
                    return true;
                },
                (error) => {
                    toast("An error occoured, please try again!", {
                        type: toast.TYPE.ERROR,
                        autoClose: false
                    });

                    $("button[name='submit']").show();
                    return false;
                },
                "POST",
                data
            );
        }
        catch (e) {
            toast("An error occoured, please try again!", {
                type: toast.TYPE.ERROR
            });

            $("button[name='submit']").show();
            return false;
        }

    }


    onDoctorChanged(val) {
        this.setState({ Doctor: val })
    }
}

export default UploadFiles;