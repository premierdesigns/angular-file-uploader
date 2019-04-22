(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('angular-file-uploader', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['angular-file-uploader'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularFileUploaderService = (function () {
        function AngularFileUploaderService() {
        }
        AngularFileUploaderService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        AngularFileUploaderService.ctorParameters = function () { return []; };
        /** @nocollapse */ AngularFileUploaderService.ngInjectableDef = i0.defineInjectable({ factory: function AngularFileUploaderService_Factory() { return new AngularFileUploaderService(); }, token: AngularFileUploaderService, providedIn: "root" });
        return AngularFileUploaderService;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularFileUploaderComponent = (function () {
        function AngularFileUploaderComponent() {
            this.config = {};
            this.resetUpload = this.config['resetUpload'];
            this.ApiResponse = new i0.EventEmitter();
            this.idDate = +new Date();
            this.reg = /(?:\.([^.]+))?$/;
            this.selectedFiles = [];
            this.notAllowedList = [];
            this.Caption = [];
            this.singleFile = true;
            this.progressBarShow = false;
            this.uploadBtn = false;
            this.uploadMsg = false;
            this.afterUpload = false;
            this.uploadClick = true;
            // console.log("id: ",this.id);
            // console.log("idDate: ",this.idDate);
            // console.log(Math.random());
        }
        /**
         * @param {?} rst
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.ngOnChanges = /**
         * @param {?} rst
         * @return {?}
         */
            function (rst) {
                if (rst['config']) {
                    this.theme = this.config['theme'] || '';
                    this.id =
                        this.config['id'] ||
                            parseInt((this.idDate / 10000).toString().split('.')[1]) +
                                Math.floor(Math.random() * 20) * 10000;
                    this.hideProgressBar = this.config['hideProgressBar'] || false;
                    this.hideResetBtn = this.config['hideResetBtn'] || false;
                    this.hideSelectBtn = this.config['hideSelectBtn'] || false;
                    this.maxSize = this.config['maxSize'] || 20;
                    this.uploadAPI = this.config['uploadAPI']['url'];
                    this.formatsAllowed =
                        this.config['formatsAllowed'] || '.jpg,.png,.pdf,.docx,.txt,.gif,.jpeg';
                    this.multiple = this.config['multiple'] || false;
                    this.headers = this.config['uploadAPI']['headers'] || {};
                    this.responseType = this.config['uploadAPI']['responseType'] || {};
                    /** @type {?} */
                    var defaultReplaceTextsValues = {
                        selectFileBtn: this.multiple ? 'Select Files' : 'Select File',
                        resetBtn: 'Reset',
                        uploadBtn: 'Upload',
                        dragNDropBox: 'Drag N Drop',
                        attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
                        afterUploadMsg_success: 'Successfully Uploaded !',
                        afterUploadMsg_error: 'Upload Failed !'
                    };
                    this.replaceTexts = __assign({}, defaultReplaceTextsValues);
                    if (this.config['replaceTexts']) {
                        this.replaceTexts = __assign({}, defaultReplaceTextsValues, this.config['replaceTexts']);
                    }
                    // console.log("config: ", this.config);
                    // console.log(this.config["maxSize"]);
                    // console.log(this.headers);
                    // console.log("rst: ", rst);
                }
                if (rst['resetUpload']) {
                    if (rst['resetUpload'].currentValue === true) {
                        this.resetFileUpload();
                    }
                }
            };
        /**
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                // console.log("Id: ", this.id);
                this.resetUpload = false;
            };
        /**
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.resetFileUpload = /**
         * @return {?}
         */
            function () {
                this.selectedFiles = [];
                this.Caption = [];
                this.notAllowedList = [];
                this.uploadMsg = false;
                this.uploadBtn = false;
            };
        /**
         * @param {?} event
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.onChange = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                // console.log(this.maxSize + this.formatsAllowed + this.multiple);
                this.notAllowedList = [];
                // console.log("onchange hit");
                if (this.afterUpload || !this.multiple) {
                    this.selectedFiles = [];
                    this.Caption = [];
                    this.afterUpload = false;
                }
                // FORMATS ALLOWED LIST
                // console.log("FORMATS ALLOWED LIST= "+this.formatsAllowed);
                // NO OF FORMATS ALLOWED
                /** @type {?} */
                var formatsCount;
                formatsCount = this.formatsAllowed.match(new RegExp('\\.', 'g'));
                formatsCount = formatsCount.length;
                // console.log("NO OF FORMATS ALLOWED= "+formatsCount);
                // console.log("-------------------------------");
                // ITERATE SELECTED FILES
                /** @type {?} */
                var file;
                if (event.type === 'drop') {
                    file = event.dataTransfer.files;
                    // console.log("type: drop");
                }
                else {
                    file = event.target.files || event.srcElement.files;
                    // console.log("type: change");
                }
                // console.log(file);
                /** @type {?} */
                var currentFileExt;
                /** @type {?} */
                var ext;
                /** @type {?} */
                var frmtAllowed;
                for (var i = 0; i < file.length; i++) {
                    // CHECK FORMAT
                    // CURRENT FILE EXTENSION
                    currentFileExt = this.reg.exec(file[i].name);
                    currentFileExt = currentFileExt[1];
                    // console.log(file[i].name);
                    frmtAllowed = false;
                    // FORMAT ALLOWED LIST ITERATE
                    for (var j = formatsCount; j > 0; j--) {
                        ext = this.formatsAllowed.split('.')[j];
                        // console.log("FORMAT LIST ("+j+")= "+ext.split(",")[0]);
                        if (j === formatsCount) {
                            ext = this.formatsAllowed.split('.')[j] + ',';
                        } // check format
                        if (currentFileExt.toLowerCase() === ext.split(',')[0]) {
                            frmtAllowed = true;
                        }
                    }
                    if (frmtAllowed) {
                        // console.log("FORMAT ALLOWED");
                        // CHECK SIZE
                        if (file[i].size > this.maxSize * 1024000) {
                            // console.log("SIZE NOT ALLOWED ("+file[i].size+")");
                            this.notAllowedList.push({
                                fileName: file[i].name,
                                fileSize: this.convertSize(file[i].size),
                                errorMsg: 'Invalid size'
                            });
                            continue;
                        }
                        else {
                            // format allowed and size allowed then add file to selectedFile array
                            this.selectedFiles.push(file[i]);
                        }
                    }
                    else {
                        // console.log("FORMAT NOT ALLOWED");
                        this.notAllowedList.push({
                            fileName: file[i].name,
                            fileSize: this.convertSize(file[i].size),
                            errorMsg: 'Invalid format'
                        });
                        continue;
                    }
                }
                if (this.selectedFiles.length !== 0) {
                    this.uploadBtn = true;
                    if (this.theme === 'attachPin') {
                        this.uploadFiles();
                    }
                }
                else {
                    this.uploadBtn = false;
                }
                this.uploadMsg = false;
                this.uploadClick = true;
                this.percentComplete = 0;
                event.target.value = null;
            };
        /**
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.uploadFiles = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // console.log(this.selectedFiles);
                /** @type {?} */
                var i;
                this.progressBarShow = true;
                this.uploadClick = false;
                this.notAllowedList = [];
                /** @type {?} */
                var isError = false;
                /** @type {?} */
                var xhr = new XMLHttpRequest();
                /** @type {?} */
                var formData = new FormData();
                for (i = 0; i < this.selectedFiles.length; i++) {
                    if (this.Caption[i] === undefined) {
                        this.Caption[i] = 'file' + i;
                    }
                    // Add DATA TO BE SENT
                    formData.append(this.Caption[i], this.selectedFiles[i] /*, this.selectedFiles[i].name*/);
                    // console.log(this.selectedFiles[i]+"{"+this.Caption[i]+" (Caption)}");
                }
                if (i > 1) {
                    this.singleFile = false;
                }
                else {
                    this.singleFile = true;
                }
                xhr.onreadystatechange = function (evnt) {
                    // console.log('onready');
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200 && xhr.status !== 201) {
                            isError = true;
                            _this.progressBarShow = false;
                            _this.uploadBtn = false;
                            _this.uploadMsg = true;
                            _this.afterUpload = true;
                            _this.uploadMsgText = _this.replaceTexts.afterUploadMsg_error;
                            _this.uploadMsgClass = 'text-danger lead';
                            // console.log(this.uploadMsgText);
                            // console.log(evnt);
                        }
                        _this.ApiResponse.emit(xhr);
                    }
                };
                xhr.upload.onprogress = function (evnt) {
                    _this.uploadBtn = false; // button should be disabled by process uploading
                    if (evnt.lengthComputable) {
                        _this.percentComplete = Math.round((evnt.loaded / evnt.total) * 100);
                    }
                    // console.log("Progress..."/*+this.percentComplete+" %"*/);
                };
                xhr.onload = function (evnt) {
                    // console.log('onload');
                    // console.log(evnt);
                    _this.progressBarShow = false;
                    _this.uploadBtn = false;
                    _this.uploadMsg = true;
                    _this.afterUpload = true;
                    if (!isError) {
                        _this.uploadMsgText = _this.replaceTexts.afterUploadMsg_success;
                        _this.uploadMsgClass = 'text-success lead';
                        // console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
                    }
                };
                xhr.onerror = function (evnt) {
                    // console.log('onerror');
                    // console.log(evnt);
                };
                xhr.open('POST', this.uploadAPI, true);
                try {
                    for (var _a = __values(Object.keys(this.headers)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var key = _b.value;
                        // Object.keys will give an Array of keys
                        xhr.setRequestHeader(key, this.headers[key]);
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                if (this.responseType) {
                    xhr.responseType = this.responseType;
                }
                // let token = sessionStorage.getItem("token");
                // xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
                // xhr.setRequestHeader('Authorization', `Bearer ${token}`);
                xhr.send(formData);
                var e_1, _c;
            };
        /**
         * @param {?} i
         * @param {?} sf_na
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.removeFile = /**
         * @param {?} i
         * @param {?} sf_na
         * @return {?}
         */
            function (i, sf_na) {
                // console.log("remove file clicked " + i)
                if (sf_na === 'sf') {
                    this.selectedFiles.splice(i, 1);
                    this.Caption.splice(i, 1);
                }
                else {
                    this.notAllowedList.splice(i, 1);
                }
                if (this.selectedFiles.length === 0) {
                    this.uploadBtn = false;
                }
            };
        /**
         * @param {?} fileSize
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.convertSize = /**
         * @param {?} fileSize
         * @return {?}
         */
            function (fileSize) {
                // console.log(fileSize + " - "+ str);
                return fileSize < 1024000
                    ? (fileSize / 1024).toFixed(2) + ' KB'
                    : (fileSize / 1024000).toFixed(2) + ' MB';
            };
        /**
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.attachpinOnclick = /**
         * @return {?}
         */
            function () {
                // console.log("ID: ", this.id);
                ((document.getElementById('sel' + this.id))).click();
                // $("#"+"sel"+this.id).click();
            };
        /**
         * @param {?} event
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.drop = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.stopPropagation();
                event.preventDefault();
                // console.log("drop: ", event);
                // console.log("drop: ", event.dataTransfer.files);
                this.onChange(event);
            };
        /**
         * @param {?} event
         * @return {?}
         */
        AngularFileUploaderComponent.prototype.allowDrop = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                event.stopPropagation();
                event.preventDefault();
                event.dataTransfer.dropEffect = 'copy';
                // console.log("allowDrop: ",event)
            };
        AngularFileUploaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'angular-file-uploader',
                        template: "<div class=\"container\" *ngIf=\"(theme !== 'attachPin')\" id=\"default\">\n\n    <!-- Drag n Drop theme Starts -->\n    <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\" [ngClass]=\"(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'\" class=\"dragNDrop\">\n        <div style=\"position:relative;\">\n            <div id=\"div1\" class=\"div1 afu-dragndrop-box\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n                <p class=\"afu-dragndrop-text\">{{replaceTexts?.dragNDropBox}}</p>\n            </div>\n            <!-- <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span> -->\n        </div>\n    </div>\n    <!-- Drag n Drop theme Ends -->\n\n    <label for=\"sel{{id}}\" class=\"btn btn-primary btn-sm afu-select-btn\" *ngIf=\"!hideSelectBtn\">{{replaceTexts?.selectFileBtn}}</label>\n    <input type=\"file\" id=\"sel{{id}}\" style=\"display: none\" *ngIf=\"!hideSelectBtn\" (change)=\"onChange($event)\" title=\"Select file\"\n        name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\n    <button class=\"btn btn-info btn-sm resetBtn afu-reset-btn\" (click)=\"resetFileUpload()\" *ngIf=\"!hideResetBtn\">{{replaceTexts?.resetBtn}}</button>\n    <br *ngIf=\"!hideSelectBtn\">\n    <p class=\"constraints-info afu-constraints-info\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>\n    <!--Selected file list-->\n    <div class=\"row afu-valid-file\" *ngFor=\"let sf of selectedFiles;let i=index\" >\n        <p class=\"col-xs-3 textOverflow\"><span class=\"text-primary\">{{sf.name}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n        <!--  <input class=\"col-xs-3 progress caption\"  type=\"text\"  placeholder=\"Caption..\"  [(ngModel)]=\"Caption[i]\"  *ngIf=\"uploadClick\"/> -->\n        <div class=\"progress col-xs-3 padMarg afu-progress-bar\" *ngIf=\"singleFile && progressBarShow && !hideProgressBar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <a class=\"col-xs-1\" role=\"button\" (click)=\"removeFile(i,'sf')\" *ngIf=\"uploadClick\"><i class=\"fa fa-times\"></i></a>\n    </div>\n    <!--Invalid file list-->\n    <div class=\"row text-danger afu-invalid-file\" *ngFor=\"let na of notAllowedList;let j=index\">\n        <p class=\"col-xs-3 textOverflow\"><span>{{na['fileName']}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{na['fileSize']}})</strong></p>\n        <p class=\"col-xs-3 \">{{na['errorMsg']}}</p>\n        <a class=\"col-xs-1 delFileIcon\" role=\"button\" (click)=\"removeFile(j,'na')\" *ngIf=\"uploadClick\">&nbsp;<i class=\"fa fa-times\"></i></a>\n    </div>\n\n    <p *ngIf=\"uploadMsg\" class=\"{{uploadMsgClass}} + afu-upload-status\">{{uploadMsgText}}<p>\n    <div *ngIf=\"!singleFile && progressBarShow && !hideProgressBar\">\n        <div class=\"progress col-xs-4 padMarg afu-progress-bar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <br>\n        <br>\n    </div>\n    <button class=\"btn btn-success afu-upload-btn\" type=\"button\" (click)=\"uploadFiles()\" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>\n    <br>\n</div>\n\n<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->\n<div *ngIf=\"theme == 'attachPin'\" id=\"attachPin\">\n    <div style=\"position:relative;padding-left:6px\">\n        <a class='btn up_btn afu-attach-pin' (click)=\"attachpinOnclick()\">\n          {{replaceTexts?.attachPinBtn}}\n            <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            <!-- <p style=\"margin-top:10px\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->\n            <input type=\"file\" id=\"sel{{id}}\" (change)=\"onChange($event)\" style=\"display: none\" title=\"Select file\" name=\"files[]\" [accept]=formatsAllowed\n                [attr.multiple]=\"multiple ? '' : null\" />\n            <br>\n        </a>\n        &nbsp;\n        <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n    </div>\n</div>\n\n<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->\n<!-- <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\">\n  <div style=\"position:relative;padding-left:6px\">\n    <div id=\"div1\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n      <p>Drag N Drop</p>\n    </div>\n    <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n  </div>\n</div> -->\n",
                        styles: [".constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}"]
                    },] },
        ];
        AngularFileUploaderComponent.ctorParameters = function () { return []; };
        AngularFileUploaderComponent.propDecorators = {
            config: [{ type: i0.Input }],
            resetUpload: [{ type: i0.Input }],
            ApiResponse: [{ type: i0.Output }]
        };
        return AngularFileUploaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var AngularFileUploaderModule = (function () {
        function AngularFileUploaderModule() {
        }
        AngularFileUploaderModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [AngularFileUploaderComponent],
                        exports: [AngularFileUploaderComponent]
                    },] },
        ];
        return AngularFileUploaderModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.AngularFileUploaderService = AngularFileUploaderService;
    exports.AngularFileUploaderComponent = AngularFileUploaderComponent;
    exports.AngularFileUploaderModule = AngularFileUploaderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLnVtZC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vYW5ndWxhci1maWxlLXVwbG9hZGVyL2xpYi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuc2VydmljZS50cyIsbnVsbCwibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci9saWIvYW5ndWxhci1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlsZVVwbG9hZGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIGlmIChlLmluZGV4T2YocFtpXSkgPCAwKVxyXG4gICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xyXG4gICAgcmVzdWx0LmRlZmF1bHQgPSBtb2Q7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIEluamVjdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhbmd1bGFyLWZpbGUtdXBsb2FkZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiICpuZ0lmPVwiKHRoZW1lICE9PSAnYXR0YWNoUGluJylcIiBpZD1cImRlZmF1bHRcIj5cclxuXHJcbiAgICA8IS0tIERyYWcgbiBEcm9wIHRoZW1lIFN0YXJ0cyAtLT5cclxuICAgIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCIgW25nQ2xhc3NdPVwiKGhpZGVTZWxlY3RCdG4gJiYgaGlkZVJlc2V0QnRuKSA/IG51bGwgOiAnZHJhZ05Ecm9wQnRtUGFkJ1wiIGNsYXNzPVwiZHJhZ05Ecm9wXCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGl2MVwiIGNsYXNzPVwiZGl2MSBhZnUtZHJhZ25kcm9wLWJveFwiIChkcm9wKT1cImRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJhbGxvd0Ryb3AoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhZnUtZHJhZ25kcm9wLXRleHRcIj57e3JlcGxhY2VUZXh0cz8uZHJhZ05Ecm9wQm94fX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8IS0tIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj4gLS0+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS0gRHJhZyBuIERyb3AgdGhlbWUgRW5kcyAtLT5cclxuXHJcbiAgICA8bGFiZWwgZm9yPVwic2Vse3tpZH19XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGFmdS1zZWxlY3QtYnRuXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPnt7cmVwbGFjZVRleHRzPy5zZWxlY3RGaWxlQnRufX08L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJzZWx7e2lkfX1cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgdGl0bGU9XCJTZWxlY3QgZmlsZVwiXHJcbiAgICAgICAgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZCBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIGJ0bi1zbSByZXNldEJ0biBhZnUtcmVzZXQtYnRuXCIgKGNsaWNrKT1cInJlc2V0RmlsZVVwbG9hZCgpXCIgKm5nSWY9XCIhaGlkZVJlc2V0QnRuXCI+e3tyZXBsYWNlVGV4dHM/LnJlc2V0QnRufX08L2J1dHRvbj5cclxuICAgIDxiciAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCI+XHJcbiAgICA8cCBjbGFzcz1cImNvbnN0cmFpbnRzLWluZm8gYWZ1LWNvbnN0cmFpbnRzLWluZm9cIj4oe3tmb3JtYXRzQWxsb3dlZH19KSBTaXplIGxpbWl0LSB7eyhjb252ZXJ0U2l6ZShtYXhTaXplICoxMDI0MDAwKSl9fTwvcD5cclxuICAgIDwhLS1TZWxlY3RlZCBmaWxlIGxpc3QtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3cgYWZ1LXZhbGlkLWZpbGVcIiAqbmdGb3I9XCJsZXQgc2Ygb2Ygc2VsZWN0ZWRGaWxlcztsZXQgaT1pbmRleFwiID5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+e3tzZi5uYW1lfX08L3NwYW4+PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7Y29udmVydFNpemUoc2Yuc2l6ZSl9fSk8L3N0cm9uZz4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L3A+XHJcbiAgICAgICAgPCEtLSAgPGlucHV0IGNsYXNzPVwiY29sLXhzLTMgcHJvZ3Jlc3MgY2FwdGlvblwiICB0eXBlPVwidGV4dFwiICBwbGFjZWhvbGRlcj1cIkNhcHRpb24uLlwiICBbKG5nTW9kZWwpXT1cIkNhcHRpb25baV1cIiAgKm5nSWY9XCJ1cGxvYWRDbGlja1wiLz4gLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGNvbC14cy0zIHBhZE1hcmcgYWZ1LXByb2dyZXNzLWJhclwiICpuZ0lmPVwic2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGEgY2xhc3M9XCJjb2wteHMtMVwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShpLCdzZicpXCIgKm5nSWY9XCJ1cGxvYWRDbGlja1wiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tSW52YWxpZCBmaWxlIGxpc3QtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3cgdGV4dC1kYW5nZXIgYWZ1LWludmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBuYSBvZiBub3RBbGxvd2VkTGlzdDtsZXQgaj1pbmRleFwiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4+e3tuYVsnZmlsZU5hbWUnXX19PC9zcGFuPjwvcD5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHBhZE1hcmcgc2l6ZUNcIj48c3Ryb25nPih7e25hWydmaWxlU2l6ZSddfX0pPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgXCI+e3tuYVsnZXJyb3JNc2cnXX19PC9wPlxyXG4gICAgICAgIDxhIGNsYXNzPVwiY29sLXhzLTEgZGVsRmlsZUljb25cIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUZpbGUoaiwnbmEnKVwiICpuZ0lmPVwidXBsb2FkQ2xpY2tcIj4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxwICpuZ0lmPVwidXBsb2FkTXNnXCIgY2xhc3M9XCJ7e3VwbG9hZE1zZ0NsYXNzfX0gKyBhZnUtdXBsb2FkLXN0YXR1c1wiPnt7dXBsb2FkTXNnVGV4dH19PHA+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiIXNpbmdsZUZpbGUgJiYgcHJvZ3Jlc3NCYXJTaG93ICYmICFoaWRlUHJvZ3Jlc3NCYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTQgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdWNjZXNzXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6cGVyY2VudENvbXBsZXRlKyclJ31cIj57e3BlcmNlbnRDb21wbGV0ZX19JTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnI+XHJcbiAgICAgICAgPGJyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGFmdS11cGxvYWQtYnRuXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWRGaWxlcygpXCIgW2Rpc2FibGVkXT0hdXBsb2FkQnRuPnt7cmVwbGFjZVRleHRzPy51cGxvYWRCdG59fTwvYnV0dG9uPlxyXG4gICAgPGJyPlxyXG48L2Rpdj5cclxuXHJcbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQVRUQUNIIFBJTiBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxyXG48ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2F0dGFjaFBpbidcIiBpZD1cImF0dGFjaFBpblwiPlxyXG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDo2cHhcIj5cclxuICAgICAgICA8YSBjbGFzcz0nYnRuIHVwX2J0biBhZnUtYXR0YWNoLXBpbicgKGNsaWNrKT1cImF0dGFjaHBpbk9uY2xpY2soKVwiPlxyXG4gICAgICAgICAge3tyZXBsYWNlVGV4dHM/LmF0dGFjaFBpbkJ0bn19XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGFwZXJjbGlwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICA8IS0tIDxwIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4XCI+KHt7Zm9ybWF0c0FsbG93ZWR9fSkgU2l6ZSBsaW1pdC0ge3soY29udmVydFNpemUobWF4U2l6ZSAqIDEwMjQwMDApKX19PC9wPiAtLT5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJzZWx7e2lkfX1cIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB0aXRsZT1cIlNlbGVjdCBmaWxlXCIgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZFxyXG4gICAgICAgICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGUgPyAnJyA6IG51bGxcIiAvPlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgICZuYnNwO1xyXG4gICAgICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gRFJBRyBOIERST1AgVEhFTUUgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8tLT5cclxuPCEtLSA8ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2RyYWdORHJvcCdcIiBpZD1cImRyYWdORHJvcFwiPlxyXG4gIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6NnB4XCI+XHJcbiAgICA8ZGl2IGlkPVwiZGl2MVwiIChkcm9wKT1cImRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJhbGxvd0Ryb3AoJGV2ZW50KVwiPlxyXG4gICAgICA8cD5EcmFnIE4gRHJvcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj4gLS0+XHJcbmAgLFxyXG4gIHN0eWxlczogW2AuY29uc3RyYWludHMtaW5mb3ttYXJnaW4tdG9wOjEwcHg7Zm9udC1zdHlsZTppdGFsaWN9LnBhZE1hcmd7cGFkZGluZzowO21hcmdpbi1ib3R0b206MH0uY2FwdGlvbnttYXJnaW4tcmlnaHQ6NXB4fS50ZXh0T3ZlcmZsb3d7d2hpdGUtc3BhY2U6bm93cmFwO3BhZGRpbmctcmlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30udXBfYnRue2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MnB4IHNvbGlkICM1YzViNWI7Ym9yZGVyLXJhZGl1czoyMnB4fS5kZWxGaWxlSWNvbnt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojY2UwOTA5fS5kcmFnTkRyb3AgLmRpdjF7ZGlzcGxheTpib3JkZXItYm94O2JvcmRlcjoycHggZGFzaGVkICM1YzViNWI7aGVpZ2h0OjZyZW07d2lkdGg6MjByZW19LmRyYWdORHJvcCAuZGl2MT5we3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjojNWM1YjViO21hcmdpbi10b3A6MS40ZW19LmRyYWdORHJvcEJ0bVBhZHtwYWRkaW5nLWJvdHRvbToycmVtfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NjIwcHgpey5jYXB0aW9ue3BhZGRpbmc6MH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1MTBweCl7LnNpemVDe3dpZHRoOjI1JX19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDoyNjBweCl7LmNhcHRpb24sLnNpemVDe2ZvbnQtc2l6ZToxMHB4fX0ucmVzZXRCdG57bWFyZ2luLWxlZnQ6M3B4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgY29uZmlnOiBhbnkgPSB7fTtcclxuICBASW5wdXQoKVxyXG4gIHJlc2V0VXBsb2FkOiBib29sZWFuID0gdGhpcy5jb25maWdbJ3Jlc2V0VXBsb2FkJ107XHJcbiAgQE91dHB1dCgpXHJcbiAgQXBpUmVzcG9uc2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHRoZW1lOiBzdHJpbmc7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBoaWRlUHJvZ3Jlc3NCYXI6IGJvb2xlYW47XHJcbiAgbWF4U2l6ZTogbnVtYmVyO1xyXG4gIHVwbG9hZEFQSTogc3RyaW5nO1xyXG4gIGZvcm1hdHNBbGxvd2VkOiBzdHJpbmc7XHJcbiAgbXVsdGlwbGU6IGJvb2xlYW47XHJcbiAgaGVhZGVyczogYW55O1xyXG4gIHJlc3BvbnNlVHlwZTogYW55O1xyXG4gIGhpZGVSZXNldEJ0bjogYm9vbGVhbjtcclxuICBoaWRlU2VsZWN0QnRuOiBib29sZWFuO1xyXG5cclxuICBpZERhdGU6IG51bWJlciA9ICtuZXcgRGF0ZSgpO1xyXG4gIHJlZzogUmVnRXhwID0gLyg/OlxcLihbXi5dKykpPyQvO1xyXG4gIHNlbGVjdGVkRmlsZXM6IEFycmF5PGFueT4gPSBbXTtcclxuICBub3RBbGxvd2VkTGlzdDogQXJyYXk8T2JqZWN0PiA9IFtdO1xyXG4gIENhcHRpb246IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICBzaW5nbGVGaWxlID0gdHJ1ZTtcclxuICBwcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcclxuICB1cGxvYWRCdG4gPSBmYWxzZTtcclxuICB1cGxvYWRNc2cgPSBmYWxzZTtcclxuICBhZnRlclVwbG9hZCA9IGZhbHNlO1xyXG4gIHVwbG9hZENsaWNrID0gdHJ1ZTtcclxuICB1cGxvYWRNc2dUZXh0OiBzdHJpbmc7XHJcbiAgdXBsb2FkTXNnQ2xhc3M6IHN0cmluZztcclxuICBwZXJjZW50Q29tcGxldGU6IG51bWJlcjtcclxuICByZXBsYWNlVGV4dHM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJpZDogXCIsdGhpcy5pZCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImlkRGF0ZTogXCIsdGhpcy5pZERhdGUpO1xyXG4gICAgLy8gY29uc29sZS5sb2coTWF0aC5yYW5kb20oKSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhyc3Q6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChyc3RbJ2NvbmZpZyddKSB7XHJcbiAgICAgIHRoaXMudGhlbWUgPSB0aGlzLmNvbmZpZ1sndGhlbWUnXSB8fCAnJztcclxuICAgICAgdGhpcy5pZCA9XHJcbiAgICAgICAgdGhpcy5jb25maWdbJ2lkJ10gfHxcclxuICAgICAgICBwYXJzZUludCgodGhpcy5pZERhdGUgLyAxMDAwMCkudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdKSArXHJcbiAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCkgKiAxMDAwMDtcclxuICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbmZpZ1snaGlkZVByb2dyZXNzQmFyJ10gfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMuaGlkZVJlc2V0QnRuID0gdGhpcy5jb25maWdbJ2hpZGVSZXNldEJ0biddIHx8IGZhbHNlO1xyXG4gICAgICB0aGlzLmhpZGVTZWxlY3RCdG4gPSB0aGlzLmNvbmZpZ1snaGlkZVNlbGVjdEJ0biddIHx8IGZhbHNlO1xyXG4gICAgICB0aGlzLm1heFNpemUgPSB0aGlzLmNvbmZpZ1snbWF4U2l6ZSddIHx8IDIwO1xyXG4gICAgICB0aGlzLnVwbG9hZEFQSSA9IHRoaXMuY29uZmlnWyd1cGxvYWRBUEknXVsndXJsJ107XHJcbiAgICAgIHRoaXMuZm9ybWF0c0FsbG93ZWQgPVxyXG4gICAgICAgIHRoaXMuY29uZmlnWydmb3JtYXRzQWxsb3dlZCddIHx8ICcuanBnLC5wbmcsLnBkZiwuZG9jeCwudHh0LC5naWYsLmpwZWcnO1xyXG4gICAgICB0aGlzLm11bHRpcGxlID0gdGhpcy5jb25maWdbJ211bHRpcGxlJ10gfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuY29uZmlnWyd1cGxvYWRBUEknXVsnaGVhZGVycyddIHx8IHt9O1xyXG4gICAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHRoaXMuY29uZmlnWyd1cGxvYWRBUEknXVsncmVzcG9uc2VUeXBlJ10gfHwge307XHJcbiAgICAgIGNvbnN0IGRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXM6IFJlcGxhY2VUZXh0cyA9ICB7XHJcbiAgICAgICAgc2VsZWN0RmlsZUJ0bjogdGhpcy5tdWx0aXBsZSA/ICdTZWxlY3QgRmlsZXMnIDogJ1NlbGVjdCBGaWxlJyxcclxuICAgICAgICByZXNldEJ0bjogJ1Jlc2V0JyxcclxuICAgICAgICB1cGxvYWRCdG46ICdVcGxvYWQnLFxyXG4gICAgICAgIGRyYWdORHJvcEJveDogJ0RyYWcgTiBEcm9wJyxcclxuICAgICAgICBhdHRhY2hQaW5CdG46IHRoaXMubXVsdGlwbGUgPyAnQXR0YWNoIEZpbGVzLi4uJyA6ICdBdHRhY2ggRmlsZS4uLicsXHJcbiAgICAgICAgYWZ0ZXJVcGxvYWRNc2dfc3VjY2VzczogJ1N1Y2Nlc3NmdWxseSBVcGxvYWRlZCAhJyxcclxuICAgICAgICBhZnRlclVwbG9hZE1zZ19lcnJvcjogJ1VwbG9hZCBGYWlsZWQgISdcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7Li4uZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlc307XHJcbiAgICAgIGlmICh0aGlzLmNvbmZpZ1sncmVwbGFjZVRleHRzJ10pIHtcclxuICAgICAgICB0aGlzLnJlcGxhY2VUZXh0cyA9IHtcclxuICAgICAgICAgIC4uLmRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXMsXHJcbiAgICAgICAgICAuLi50aGlzLmNvbmZpZ1sncmVwbGFjZVRleHRzJ11cclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcImNvbmZpZzogXCIsIHRoaXMuY29uZmlnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5jb25maWdbXCJtYXhTaXplXCJdKTtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5oZWFkZXJzKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJyc3Q6IFwiLCByc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyc3RbJ3Jlc2V0VXBsb2FkJ10pIHtcclxuICAgICAgaWYgKHJzdFsncmVzZXRVcGxvYWQnXS5jdXJyZW50VmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnJlc2V0RmlsZVVwbG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiSWQ6IFwiLCB0aGlzLmlkKTtcclxuICAgIHRoaXMucmVzZXRVcGxvYWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHJlc2V0RmlsZVVwbG9hZCgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xyXG4gICAgdGhpcy5DYXB0aW9uID0gW107XHJcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XHJcbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xyXG4gICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIG9uQ2hhbmdlKGV2ZW50OiBhbnkpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubWF4U2l6ZSArIHRoaXMuZm9ybWF0c0FsbG93ZWQgKyB0aGlzLm11bHRpcGxlKTtcclxuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwib25jaGFuZ2UgaGl0XCIpO1xyXG4gICAgaWYgKHRoaXMuYWZ0ZXJVcGxvYWQgfHwgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XHJcbiAgICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xyXG4gICAgICB0aGlzLmFmdGVyVXBsb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvLyBGT1JNQVRTIEFMTE9XRUQgTElTVFxyXG4gICAgLy8gY29uc29sZS5sb2coXCJGT1JNQVRTIEFMTE9XRUQgTElTVD0gXCIrdGhpcy5mb3JtYXRzQWxsb3dlZCk7XHJcbiAgICAvLyBOTyBPRiBGT1JNQVRTIEFMTE9XRURcclxuICAgIGxldCBmb3JtYXRzQ291bnQ6IGFueTtcclxuICAgIGZvcm1hdHNDb3VudCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQubWF0Y2gobmV3IFJlZ0V4cCgnXFxcXC4nLCAnZycpKTtcclxuICAgIGZvcm1hdHNDb3VudCA9IGZvcm1hdHNDb3VudC5sZW5ndGg7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIk5PIE9GIEZPUk1BVFMgQUxMT1dFRD0gXCIrZm9ybWF0c0NvdW50KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuXHJcbiAgICAvLyBJVEVSQVRFIFNFTEVDVEVEIEZJTEVTXHJcbiAgICBsZXQgZmlsZTogRmlsZUxpc3Q7XHJcbiAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ2Ryb3AnKSB7XHJcbiAgICAgIGZpbGUgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwidHlwZTogZHJvcFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpbGUgPSBldmVudC50YXJnZXQuZmlsZXMgfHwgZXZlbnQuc3JjRWxlbWVudC5maWxlcztcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJ0eXBlOiBjaGFuZ2VcIik7XHJcbiAgICB9XHJcbiAgICAvLyBjb25zb2xlLmxvZyhmaWxlKTtcclxuICAgIGxldCBjdXJyZW50RmlsZUV4dDogYW55O1xyXG4gICAgbGV0IGV4dDogYW55O1xyXG4gICAgbGV0IGZybXRBbGxvd2VkOiBib29sZWFuO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIC8vIENIRUNLIEZPUk1BVFxyXG4gICAgICAvLyBDVVJSRU5UIEZJTEUgRVhURU5TSU9OXHJcbiAgICAgIGN1cnJlbnRGaWxlRXh0ID0gdGhpcy5yZWcuZXhlYyhmaWxlW2ldLm5hbWUpO1xyXG4gICAgICBjdXJyZW50RmlsZUV4dCA9IGN1cnJlbnRGaWxlRXh0WzFdO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhmaWxlW2ldLm5hbWUpO1xyXG4gICAgICBmcm10QWxsb3dlZCA9IGZhbHNlO1xyXG4gICAgICAvLyBGT1JNQVQgQUxMT1dFRCBMSVNUIElURVJBVEVcclxuICAgICAgZm9yIChsZXQgaiA9IGZvcm1hdHNDb3VudDsgaiA+IDA7IGotLSkge1xyXG4gICAgICAgIGV4dCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQuc3BsaXQoJy4nKVtqXTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkZPUk1BVCBMSVNUIChcIitqK1wiKT0gXCIrZXh0LnNwbGl0KFwiLFwiKVswXSk7XHJcbiAgICAgICAgaWYgKGogPT09IGZvcm1hdHNDb3VudCkge1xyXG4gICAgICAgICAgZXh0ID0gdGhpcy5mb3JtYXRzQWxsb3dlZC5zcGxpdCgnLicpW2pdICsgJywnO1xyXG4gICAgICAgIH0gLy8gY2hlY2sgZm9ybWF0XHJcbiAgICAgICAgaWYgKGN1cnJlbnRGaWxlRXh0LnRvTG93ZXJDYXNlKCkgPT09IGV4dC5zcGxpdCgnLCcpWzBdKSB7XHJcbiAgICAgICAgICBmcm10QWxsb3dlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZnJtdEFsbG93ZWQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkZPUk1BVCBBTExPV0VEXCIpO1xyXG4gICAgICAgIC8vIENIRUNLIFNJWkVcclxuICAgICAgICBpZiAoZmlsZVtpXS5zaXplID4gdGhpcy5tYXhTaXplICogMTAyNDAwMCkge1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJTSVpFIE5PVCBBTExPV0VEIChcIitmaWxlW2ldLnNpemUrXCIpXCIpO1xyXG4gICAgICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGVbaV0ubmFtZSxcclxuICAgICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZVtpXS5zaXplKSxcclxuICAgICAgICAgICAgZXJyb3JNc2c6ICdJbnZhbGlkIHNpemUnXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBmb3JtYXQgYWxsb3dlZCBhbmQgc2l6ZSBhbGxvd2VkIHRoZW4gYWRkIGZpbGUgdG8gc2VsZWN0ZWRGaWxlIGFycmF5XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXMucHVzaChmaWxlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJGT1JNQVQgTk9UIEFMTE9XRURcIik7XHJcbiAgICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5wdXNoKHtcclxuICAgICAgICAgIGZpbGVOYW1lOiBmaWxlW2ldLm5hbWUsXHJcbiAgICAgICAgICBmaWxlU2l6ZTogdGhpcy5jb252ZXJ0U2l6ZShmaWxlW2ldLnNpemUpLFxyXG4gICAgICAgICAgZXJyb3JNc2c6ICdJbnZhbGlkIGZvcm1hdCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMudGhlbWUgPT09ICdhdHRhY2hQaW4nKSB7XHJcbiAgICAgICAgdGhpcy51cGxvYWRGaWxlcygpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy51cGxvYWRNc2cgPSBmYWxzZTtcclxuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSB0cnVlO1xyXG4gICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSAwO1xyXG4gICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHVwbG9hZEZpbGVzKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZEZpbGVzKTtcclxuICAgIGxldCBpOiBhbnk7XHJcbiAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IHRydWU7XHJcbiAgICB0aGlzLnVwbG9hZENsaWNrID0gZmFsc2U7XHJcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XHJcbiAgICBsZXQgaXNFcnJvciA9IGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLkNhcHRpb25baV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuQ2FwdGlvbltpXSA9ICdmaWxlJyArIGk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQWRkIERBVEEgVE8gQkUgU0VOVFxyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoXHJcbiAgICAgICAgdGhpcy5DYXB0aW9uW2ldLFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1tpXSAvKiwgdGhpcy5zZWxlY3RlZEZpbGVzW2ldLm5hbWUqL1xyXG4gICAgICApO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkRmlsZXNbaV0rXCJ7XCIrdGhpcy5DYXB0aW9uW2ldK1wiIChDYXB0aW9uKX1cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGkgPiAxKSB7XHJcbiAgICAgIHRoaXMuc2luZ2xlRmlsZSA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaW5nbGVGaWxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZXZudCA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvbnJlYWR5Jyk7XHJcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgJiYgeGhyLnN0YXR1cyAhPT0gMjAxKSB7XHJcbiAgICAgICAgICBpc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19lcnJvcjtcclxuICAgICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1kYW5nZXIgbGVhZCc7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnVwbG9hZE1zZ1RleHQpO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coZXZudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQXBpUmVzcG9uc2UuZW1pdCh4aHIpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGV2bnQgPT4ge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlOyAvLyBidXR0b24gc2hvdWxkIGJlIGRpc2FibGVkIGJ5IHByb2Nlc3MgdXBsb2FkaW5nXHJcbiAgICAgIGlmIChldm50Lmxlbmd0aENvbXB1dGFibGUpIHtcclxuICAgICAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IE1hdGgucm91bmQoKGV2bnQubG9hZGVkIC8gZXZudC50b3RhbCkgKiAxMDApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiUHJvZ3Jlc3MuLi5cIi8qK3RoaXMucGVyY2VudENvbXBsZXRlK1wiICVcIiovKTtcclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9ubG9hZCA9IGV2bnQgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnb25sb2FkJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGV2bnQpO1xyXG4gICAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XHJcbiAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xyXG4gICAgICBpZiAoIWlzRXJyb3IpIHtcclxuICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19zdWNjZXNzO1xyXG4gICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSAndGV4dC1zdWNjZXNzIGxlYWQnO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudXBsb2FkTXNnVGV4dCArIFwiIFwiICsgdGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCArIFwiIGZpbGVcIik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9uZXJyb3IgPSBldm50ID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ29uZXJyb3InKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coZXZudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5vcGVuKCdQT1NUJywgdGhpcy51cGxvYWRBUEksIHRydWUpO1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5oZWFkZXJzKSkge1xyXG4gICAgICAvLyBPYmplY3Qua2V5cyB3aWxsIGdpdmUgYW4gQXJyYXkgb2Yga2V5c1xyXG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIHRoaXMuaGVhZGVyc1trZXldKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnJlc3BvbnNlVHlwZSkge1xyXG4gICAgICB4aHIucmVzcG9uc2VUeXBlID0gdGhpcy5yZXNwb25zZVR5cGU7XHJcbiAgICB9XHJcbiAgICAvLyBsZXQgdG9rZW4gPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidG9rZW5cIik7XHJcbiAgICAvLyB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcclxuICAgIC8vIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3Rva2VufWApO1xyXG4gICAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRmlsZShpOiBhbnksIHNmX25hOiBhbnkpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwicmVtb3ZlIGZpbGUgY2xpY2tlZCBcIiArIGkpXHJcbiAgICBpZiAoc2ZfbmEgPT09ICdzZicpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLnNwbGljZShpLCAxKTtcclxuICAgICAgdGhpcy5DYXB0aW9uLnNwbGljZShpLCAxKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubm90QWxsb3dlZExpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb252ZXJ0U2l6ZShmaWxlU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhmaWxlU2l6ZSArIFwiIC0gXCIrIHN0cik7XHJcbiAgICByZXR1cm4gZmlsZVNpemUgPCAxMDI0MDAwXHJcbiAgICAgID8gKGZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArICcgS0InXHJcbiAgICAgIDogKGZpbGVTaXplIC8gMTAyNDAwMCkudG9GaXhlZCgyKSArICcgTUInO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNocGluT25jbGljaygpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiSUQ6IFwiLCB0aGlzLmlkKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWwnICsgdGhpcy5pZCkhLmNsaWNrKCk7XHJcbiAgICAvLyAkKFwiI1wiK1wic2VsXCIrdGhpcy5pZCkuY2xpY2soKTtcclxuICB9XHJcblxyXG4gIGRyb3AoZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJkcm9wOiBcIiwgZXZlbnQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJkcm9wOiBcIiwgZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKTtcclxuICAgIHRoaXMub25DaGFuZ2UoZXZlbnQpO1xyXG4gIH1cclxuICBhbGxvd0Ryb3AoZXZlbnQ6IGFueSkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImFsbG93RHJvcDogXCIsZXZlbnQpXHJcbiAgfVxyXG59XHJcblxyXG4vKiBpbnRlcmZhY2UgQ09ORklHIHtcclxuICB1cGxvYWRBUEk6IHN0cmluZztcclxuICBtdWx0aXBsZT86IGJvb2xlYW47XHJcbiAgZm9ybWF0c0FsbG93ZWQ/OiBzdHJpbmc7XHJcbiAgbWF4U2l6ZT86IG51bWJlcjtcclxuICBpZD86IG51bWJlcjtcclxuICByZXNldFVwbG9hZD86IGJvb2xlYW47XHJcbiAgdGhlbWU/OiBzdHJpbmc7XHJcbiAgaGlkZVByb2dyZXNzQmFyPzogYm9vbGVhbjtcclxuIH1cclxuICovXHJcblxyXG4gaW50ZXJmYWNlIFJlcGxhY2VUZXh0cyB7XHJcbiAgc2VsZWN0RmlsZUJ0bjogc3RyaW5nLFxyXG4gIHJlc2V0QnRuOiBzdHJpbmcsXHJcbiAgdXBsb2FkQnRuOiBzdHJpbmcsXHJcbiAgZHJhZ05Ecm9wQm94OiBzdHJpbmcsXHJcbiAgYXR0YWNoUGluQnRuOiBzdHJpbmcsXHJcbiAgYWZ0ZXJVcGxvYWRNc2dfc3VjY2Vzczogc3RyaW5nLFxyXG4gIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiBzdHJpbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0FuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlck1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJ0c2xpYl8xLl9fdmFsdWVzIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozt5Q0FKRDtLQVFDOztJQ1JEOzs7Ozs7Ozs7Ozs7OztBQWNBLElBZU8sSUFB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