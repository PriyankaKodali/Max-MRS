import React, { Component } from 'react';
import $ from 'jquery';
import './UploadFiles.css';
import { ApiUrl } from '.././Config';


window.jQuery = window.$ = require("jquery");
var bootstrap = require('bootstrap');


class UploadFiles extends Component {


    componentDidMount() {
        $("#input-id").fileinput({
            theme: "fa",
            hideThumbnailContent: true,
            //// previewFileType: 'any'
            uploadUrl: ApiUrl +"/api/Client/GetFilesFromClientEmp",
            uploadAsync: false,
            overwriteInitial: false,
            initialPreviewAsData: true
        });
    }

    render() {
        return (
            <div style={{ marginTop: '60px' }}>
                <div className="file-loading">
                    <input id="input-id" type="file" ref="Upldfiles" class="file" data-preview-file-type="any" multiple />
                </div>

                <div>
                    <button type="button" name="submit" className="btn btn-md btn-success uploadBtn" onClick={this.UploadFiles.bind(this)} > Submit </button>

                </div>
            </div>
        );
    }

    UploadFiles(){

          var data = new FormData();
        var file=this.refs.Upfiles.files;
          if (file.length !=0) {
            if ($.inArray(this.refs.Upfiles.value.split('.').pop().toLowerCase(), ["doc", "docx", "pdf", "txt"]) == -1) {
               return;
            }
            data.append("UploadedFiles", file[0]);
        }

    }
}

export default UploadFiles;