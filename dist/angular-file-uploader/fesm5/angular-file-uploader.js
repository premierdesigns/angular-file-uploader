import { Injectable, NgModule, defineInjectable, EventEmitter, Component, Input, Output } from '@angular/core';
import { __assign, __values } from 'tslib';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderService = /** @class */ (function () {
    function AngularFileUploaderService() {
    }
    AngularFileUploaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    AngularFileUploaderService.ctorParameters = function () { return []; };
    /** @nocollapse */ AngularFileUploaderService.ngInjectableDef = defineInjectable({ factory: function AngularFileUploaderService_Factory() { return new AngularFileUploaderService(); }, token: AngularFileUploaderService, providedIn: "root" });
    return AngularFileUploaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderComponent = /** @class */ (function () {
    function AngularFileUploaderComponent() {
        this.config = {};
        this.resetUpload = this.config['resetUpload'];
        this.ApiResponse = new EventEmitter();
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
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
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
        (/** @type {?} */ (document.getElementById('sel' + this.id))).click();
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
        { type: Component, args: [{
                    selector: 'angular-file-uploader',
                    template: "<div class=\"container\" *ngIf=\"(theme !== 'attachPin')\" id=\"default\">\n\n    <!-- Drag n Drop theme Starts -->\n    <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\" [ngClass]=\"(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'\" class=\"dragNDrop\">\n        <div style=\"position:relative;\">\n            <div id=\"div1\" class=\"div1 afu-dragndrop-box\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n                <p class=\"afu-dragndrop-text\">{{replaceTexts?.dragNDropBox}}</p>\n            </div>\n            <!-- <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span> -->\n        </div>\n    </div>\n    <!-- Drag n Drop theme Ends -->\n\n    <label for=\"sel{{id}}\" class=\"btn btn-primary btn-sm afu-select-btn\" *ngIf=\"!hideSelectBtn\">{{replaceTexts?.selectFileBtn}}</label>\n    <input type=\"file\" id=\"sel{{id}}\" style=\"display: none\" *ngIf=\"!hideSelectBtn\" (change)=\"onChange($event)\" title=\"Select file\"\n        name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\n    <button class=\"btn btn-info btn-sm resetBtn afu-reset-btn\" (click)=\"resetFileUpload()\" *ngIf=\"!hideResetBtn\">{{replaceTexts?.resetBtn}}</button>\n    <br *ngIf=\"!hideSelectBtn\">\n    <p class=\"constraints-info afu-constraints-info\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>\n    <!--Selected file list-->\n    <div class=\"row afu-valid-file\" *ngFor=\"let sf of selectedFiles;let i=index\" >\n        <p class=\"col-xs-3 textOverflow\"><span class=\"text-primary\">{{sf.name}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n        <!--  <input class=\"col-xs-3 progress caption\"  type=\"text\"  placeholder=\"Caption..\"  [(ngModel)]=\"Caption[i]\"  *ngIf=\"uploadClick\"/> -->\n        <div class=\"progress col-xs-3 padMarg afu-progress-bar\" *ngIf=\"singleFile && progressBarShow && !hideProgressBar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <a class=\"col-xs-1\" role=\"button\" (click)=\"removeFile(i,'sf')\" *ngIf=\"uploadClick\"><i class=\"fa fa-times\"></i></a>\n    </div>\n    <!--Invalid file list-->\n    <div class=\"row text-danger afu-invalid-file\" *ngFor=\"let na of notAllowedList;let j=index\">\n        <p class=\"col-xs-3 textOverflow\"><span>{{na['fileName']}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{na['fileSize']}})</strong></p>\n        <p class=\"col-xs-3 \">{{na['errorMsg']}}</p>\n        <a class=\"col-xs-1 delFileIcon\" role=\"button\" (click)=\"removeFile(j,'na')\" *ngIf=\"uploadClick\">&nbsp;<i class=\"fa fa-times\"></i></a>\n    </div>\n\n    <p *ngIf=\"uploadMsg\" class=\"{{uploadMsgClass}} + afu-upload-status\">{{uploadMsgText}}<p>\n    <div *ngIf=\"!singleFile && progressBarShow && !hideProgressBar\">\n        <div class=\"progress col-xs-4 padMarg afu-progress-bar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <br>\n        <br>\n    </div>\n    <button class=\"btn btn-success afu-upload-btn\" type=\"button\" (click)=\"uploadFiles()\" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>\n    <br>\n</div>\n\n<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->\n<div *ngIf=\"theme == 'attachPin'\" id=\"attachPin\">\n    <div style=\"position:relative;padding-left:6px\">\n        <a class='btn up_btn afu-attach-pin' (click)=\"attachpinOnclick()\">\n          {{replaceTexts?.attachPinBtn}}\n            <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            <!-- <p style=\"margin-top:10px\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->\n            <input type=\"file\" id=\"sel{{id}}\" (change)=\"onChange($event)\" style=\"display: none\" title=\"Select file\" name=\"files[]\" [accept]=formatsAllowed\n                [attr.multiple]=\"multiple ? '' : null\" />\n            <br>\n        </a>\n        &nbsp;\n        <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n    </div>\n</div>\n\n<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->\n<!-- <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\">\n  <div style=\"position:relative;padding-left:6px\">\n    <div id=\"div1\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n      <p>Drag N Drop</p>\n    </div>\n    <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n  </div>\n</div> -->\n",
                    styles: [".constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}"]
                },] },
    ];
    AngularFileUploaderComponent.ctorParameters = function () { return []; };
    AngularFileUploaderComponent.propDecorators = {
        config: [{ type: Input }],
        resetUpload: [{ type: Input }],
        ApiResponse: [{ type: Output }]
    };
    return AngularFileUploaderComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderModule = /** @class */ (function () {
    function AngularFileUploaderModule() {
    }
    AngularFileUploaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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

export { AngularFileUploaderService, AngularFileUploaderComponent, AngularFileUploaderModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci9saWIvYW5ndWxhci1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlsZVVwbG9hZGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBJbmplY3QsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYW5ndWxhci1maWxlLXVwbG9hZGVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb250YWluZXJcIiAqbmdJZj1cIih0aGVtZSAhPT0gJ2F0dGFjaFBpbicpXCIgaWQ9XCJkZWZhdWx0XCI+XHJcblxyXG4gICAgPCEtLSBEcmFnIG4gRHJvcCB0aGVtZSBTdGFydHMgLS0+XHJcbiAgICA8ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2RyYWdORHJvcCdcIiBpZD1cImRyYWdORHJvcFwiIFtuZ0NsYXNzXT1cIihoaWRlU2VsZWN0QnRuICYmIGhpZGVSZXNldEJ0bikgPyBudWxsIDogJ2RyYWdORHJvcEJ0bVBhZCdcIiBjbGFzcz1cImRyYWdORHJvcFwiPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtcIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImRpdjFcIiBjbGFzcz1cImRpdjEgYWZ1LWRyYWduZHJvcC1ib3hcIiAoZHJvcCk9XCJkcm9wKCRldmVudClcIiAoZHJhZ292ZXIpPVwiYWxsb3dEcm9wKCRldmVudClcIj5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYWZ1LWRyYWduZHJvcC10ZXh0XCI+e3tyZXBsYWNlVGV4dHM/LmRyYWdORHJvcEJveH19PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPCEtLSA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+IC0tPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tIERyYWcgbiBEcm9wIHRoZW1lIEVuZHMgLS0+XHJcblxyXG4gICAgPGxhYmVsIGZvcj1cInNlbHt7aWR9fVwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBhZnUtc2VsZWN0LWJ0blwiICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIj57e3JlcGxhY2VUZXh0cz8uc2VsZWN0RmlsZUJ0bn19PC9sYWJlbD5cclxuICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2Vse3tpZH19XCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIHRpdGxlPVwiU2VsZWN0IGZpbGVcIlxyXG4gICAgICAgIG5hbWU9XCJmaWxlc1tdXCIgW2FjY2VwdF09Zm9ybWF0c0FsbG93ZWQgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGUgPyAnJyA6IG51bGxcIiAvPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4taW5mbyBidG4tc20gcmVzZXRCdG4gYWZ1LXJlc2V0LWJ0blwiIChjbGljayk9XCJyZXNldEZpbGVVcGxvYWQoKVwiICpuZ0lmPVwiIWhpZGVSZXNldEJ0blwiPnt7cmVwbGFjZVRleHRzPy5yZXNldEJ0bn19PC9idXR0b24+XHJcbiAgICA8YnIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPlxyXG4gICAgPHAgY2xhc3M9XCJjb25zdHJhaW50cy1pbmZvIGFmdS1jb25zdHJhaW50cy1pbmZvXCI+KHt7Zm9ybWF0c0FsbG93ZWR9fSkgU2l6ZSBsaW1pdC0ge3soY29udmVydFNpemUobWF4U2l6ZSAqMTAyNDAwMCkpfX08L3A+XHJcbiAgICA8IS0tU2VsZWN0ZWQgZmlsZSBsaXN0LS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IGFmdS12YWxpZC1maWxlXCIgKm5nRm9yPVwibGV0IHNmIG9mIHNlbGVjdGVkRmlsZXM7bGV0IGk9aW5kZXhcIiA+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyB0ZXh0T3ZlcmZsb3dcIj48c3BhbiBjbGFzcz1cInRleHQtcHJpbWFyeVwiPnt7c2YubmFtZX19PC9zcGFuPjwvcD5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHBhZE1hcmcgc2l6ZUNcIj48c3Ryb25nPih7e2NvbnZlcnRTaXplKHNmLnNpemUpfX0pPC9zdHJvbmc+Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7PC9wPlxyXG4gICAgICAgIDwhLS0gIDxpbnB1dCBjbGFzcz1cImNvbC14cy0zIHByb2dyZXNzIGNhcHRpb25cIiAgdHlwZT1cInRleHRcIiAgcGxhY2Vob2xkZXI9XCJDYXB0aW9uLi5cIiAgWyhuZ01vZGVsKV09XCJDYXB0aW9uW2ldXCIgICpuZ0lmPVwidXBsb2FkQ2xpY2tcIi8+IC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBjb2wteHMtMyBwYWRNYXJnIGFmdS1wcm9ncmVzcy1iYXJcIiAqbmdJZj1cInNpbmdsZUZpbGUgJiYgcHJvZ3Jlc3NCYXJTaG93ICYmICFoaWRlUHJvZ3Jlc3NCYXJcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3NcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzpwZXJjZW50Q29tcGxldGUrJyUnfVwiPnt7cGVyY2VudENvbXBsZXRlfX0lPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxhIGNsYXNzPVwiY29sLXhzLTFcIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUZpbGUoaSwnc2YnKVwiICpuZ0lmPVwidXBsb2FkQ2xpY2tcIj48aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLUludmFsaWQgZmlsZSBsaXN0LS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHRleHQtZGFuZ2VyIGFmdS1pbnZhbGlkLWZpbGVcIiAqbmdGb3I9XCJsZXQgbmEgb2Ygbm90QWxsb3dlZExpc3Q7bGV0IGo9aW5kZXhcIj5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuPnt7bmFbJ2ZpbGVOYW1lJ119fTwvc3Bhbj48L3A+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBwYWRNYXJnIHNpemVDXCI+PHN0cm9uZz4oe3tuYVsnZmlsZVNpemUnXX19KTwvc3Ryb25nPjwvcD5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIFwiPnt7bmFbJ2Vycm9yTXNnJ119fTwvcD5cclxuICAgICAgICA8YSBjbGFzcz1cImNvbC14cy0xIGRlbEZpbGVJY29uXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVGaWxlKGosJ25hJylcIiAqbmdJZj1cInVwbG9hZENsaWNrXCI+Jm5ic3A7PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8cCAqbmdJZj1cInVwbG9hZE1zZ1wiIGNsYXNzPVwie3t1cGxvYWRNc2dDbGFzc319ICsgYWZ1LXVwbG9hZC1zdGF0dXNcIj57e3VwbG9hZE1zZ1RleHR9fTxwPlxyXG4gICAgPGRpdiAqbmdJZj1cIiFzaW5nbGVGaWxlICYmIHByb2dyZXNzQmFyU2hvdyAmJiAhaGlkZVByb2dyZXNzQmFyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGNvbC14cy00IHBhZE1hcmcgYWZ1LXByb2dyZXNzLWJhclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJyPlxyXG4gICAgICAgIDxicj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2VzcyBhZnUtdXBsb2FkLWJ0blwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidXBsb2FkRmlsZXMoKVwiIFtkaXNhYmxlZF09IXVwbG9hZEJ0bj57e3JlcGxhY2VUZXh0cz8udXBsb2FkQnRufX08L2J1dHRvbj5cclxuICAgIDxicj5cclxuPC9kaXY+XHJcblxyXG48IS0tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFUVEFDSCBQSU4gVEhFTUUgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8tLT5cclxuPGRpdiAqbmdJZj1cInRoZW1lID09ICdhdHRhY2hQaW4nXCIgaWQ9XCJhdHRhY2hQaW5cIj5cclxuICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6NnB4XCI+XHJcbiAgICAgICAgPGEgY2xhc3M9J2J0biB1cF9idG4gYWZ1LWF0dGFjaC1waW4nIChjbGljayk9XCJhdHRhY2hwaW5PbmNsaWNrKClcIj5cclxuICAgICAgICAgIHt7cmVwbGFjZVRleHRzPy5hdHRhY2hQaW5CdG59fVxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXBhcGVyY2xpcFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgPCEtLSA8cCBzdHlsZT1cIm1hcmdpbi10b3A6MTBweFwiPih7e2Zvcm1hdHNBbGxvd2VkfX0pIFNpemUgbGltaXQtIHt7KGNvbnZlcnRTaXplKG1heFNpemUgKiAxMDI0MDAwKSl9fTwvcD4gLS0+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGlkPVwic2Vse3tpZH19XCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCIgdGl0bGU9XCJTZWxlY3QgZmlsZVwiIG5hbWU9XCJmaWxlc1tdXCIgW2FjY2VwdF09Zm9ybWF0c0FsbG93ZWRcclxuICAgICAgICAgICAgICAgIFthdHRyLm11bHRpcGxlXT1cIm11bHRpcGxlID8gJycgOiBudWxsXCIgLz5cclxuICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgICAmbmJzcDtcclxuICAgICAgICA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG48IS0tLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIERSQUcgTiBEUk9QIFRIRU1FICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLS0+XHJcbjwhLS0gPGRpdiAqbmdJZj1cInRoZW1lID09ICdkcmFnTkRyb3AnXCIgaWQ9XCJkcmFnTkRyb3BcIj5cclxuICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjZweFwiPlxyXG4gICAgPGRpdiBpZD1cImRpdjFcIiAoZHJvcCk9XCJkcm9wKCRldmVudClcIiAoZHJhZ292ZXIpPVwiYWxsb3dEcm9wKCRldmVudClcIj5cclxuICAgICAgPHA+RHJhZyBOIERyb3A8L3A+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+IC0tPlxyXG5gICxcclxuICBzdHlsZXM6IFtgLmNvbnN0cmFpbnRzLWluZm97bWFyZ2luLXRvcDoxMHB4O2ZvbnQtc3R5bGU6aXRhbGljfS5wYWRNYXJne3BhZGRpbmc6MDttYXJnaW4tYm90dG9tOjB9LmNhcHRpb257bWFyZ2luLXJpZ2h0OjVweH0udGV4dE92ZXJmbG93e3doaXRlLXNwYWNlOm5vd3JhcDtwYWRkaW5nLXJpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXN9LnVwX2J0bntjb2xvcjojMDAwO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyOjJweCBzb2xpZCAjNWM1YjViO2JvcmRlci1yYWRpdXM6MjJweH0uZGVsRmlsZUljb257dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6I2NlMDkwOX0uZHJhZ05Ecm9wIC5kaXYxe2Rpc3BsYXk6Ym9yZGVyLWJveDtib3JkZXI6MnB4IGRhc2hlZCAjNWM1YjViO2hlaWdodDo2cmVtO3dpZHRoOjIwcmVtfS5kcmFnTkRyb3AgLmRpdjE+cHt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDo3MDA7Y29sb3I6IzVjNWI1YjttYXJnaW4tdG9wOjEuNGVtfS5kcmFnTkRyb3BCdG1QYWR7cGFkZGluZy1ib3R0b206MnJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjYyMHB4KXsuY2FwdGlvbntwYWRkaW5nOjB9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NTEwcHgpey5zaXplQ3t3aWR0aDoyNSV9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MjYwcHgpey5jYXB0aW9uLC5zaXplQ3tmb250LXNpemU6MTBweH19LnJlc2V0QnRue21hcmdpbi1sZWZ0OjNweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKVxyXG4gIGNvbmZpZzogYW55ID0ge307XHJcbiAgQElucHV0KClcclxuICByZXNldFVwbG9hZDogYm9vbGVhbiA9IHRoaXMuY29uZmlnWydyZXNldFVwbG9hZCddO1xyXG4gIEBPdXRwdXQoKVxyXG4gIEFwaVJlc3BvbnNlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICB0aGVtZTogc3RyaW5nO1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgaGlkZVByb2dyZXNzQmFyOiBib29sZWFuO1xyXG4gIG1heFNpemU6IG51bWJlcjtcclxuICB1cGxvYWRBUEk6IHN0cmluZztcclxuICBmb3JtYXRzQWxsb3dlZDogc3RyaW5nO1xyXG4gIG11bHRpcGxlOiBib29sZWFuO1xyXG4gIGhlYWRlcnM6IGFueTtcclxuICByZXNwb25zZVR5cGU6IGFueTtcclxuICBoaWRlUmVzZXRCdG46IGJvb2xlYW47XHJcbiAgaGlkZVNlbGVjdEJ0bjogYm9vbGVhbjtcclxuXHJcbiAgaWREYXRlOiBudW1iZXIgPSArbmV3IERhdGUoKTtcclxuICByZWc6IFJlZ0V4cCA9IC8oPzpcXC4oW14uXSspKT8kLztcclxuICBzZWxlY3RlZEZpbGVzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgbm90QWxsb3dlZExpc3Q6IEFycmF5PE9iamVjdD4gPSBbXTtcclxuICBDYXB0aW9uOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgc2luZ2xlRmlsZSA9IHRydWU7XHJcbiAgcHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XHJcbiAgdXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgdXBsb2FkTXNnID0gZmFsc2U7XHJcbiAgYWZ0ZXJVcGxvYWQgPSBmYWxzZTtcclxuICB1cGxvYWRDbGljayA9IHRydWU7XHJcbiAgdXBsb2FkTXNnVGV4dDogc3RyaW5nO1xyXG4gIHVwbG9hZE1zZ0NsYXNzOiBzdHJpbmc7XHJcbiAgcGVyY2VudENvbXBsZXRlOiBudW1iZXI7XHJcbiAgcmVwbGFjZVRleHRzO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiaWQ6IFwiLHRoaXMuaWQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJpZERhdGU6IFwiLHRoaXMuaWREYXRlKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKE1hdGgucmFuZG9tKCkpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMocnN0OiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAocnN0Wydjb25maWcnXSkge1xyXG4gICAgICB0aGlzLnRoZW1lID0gdGhpcy5jb25maWdbJ3RoZW1lJ10gfHwgJyc7XHJcbiAgICAgIHRoaXMuaWQgPVxyXG4gICAgICAgIHRoaXMuY29uZmlnWydpZCddIHx8XHJcbiAgICAgICAgcGFyc2VJbnQoKHRoaXMuaWREYXRlIC8gMTAwMDApLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSkgK1xyXG4gICAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjApICogMTAwMDA7XHJcbiAgICAgIHRoaXMuaGlkZVByb2dyZXNzQmFyID0gdGhpcy5jb25maWdbJ2hpZGVQcm9ncmVzc0JhciddIHx8IGZhbHNlO1xyXG4gICAgICB0aGlzLmhpZGVSZXNldEJ0biA9IHRoaXMuY29uZmlnWydoaWRlUmVzZXRCdG4nXSB8fCBmYWxzZTtcclxuICAgICAgdGhpcy5oaWRlU2VsZWN0QnRuID0gdGhpcy5jb25maWdbJ2hpZGVTZWxlY3RCdG4nXSB8fCBmYWxzZTtcclxuICAgICAgdGhpcy5tYXhTaXplID0gdGhpcy5jb25maWdbJ21heFNpemUnXSB8fCAyMDtcclxuICAgICAgdGhpcy51cGxvYWRBUEkgPSB0aGlzLmNvbmZpZ1sndXBsb2FkQVBJJ11bJ3VybCddO1xyXG4gICAgICB0aGlzLmZvcm1hdHNBbGxvd2VkID1cclxuICAgICAgICB0aGlzLmNvbmZpZ1snZm9ybWF0c0FsbG93ZWQnXSB8fCAnLmpwZywucG5nLC5wZGYsLmRvY3gsLnR4dCwuZ2lmLC5qcGVnJztcclxuICAgICAgdGhpcy5tdWx0aXBsZSA9IHRoaXMuY29uZmlnWydtdWx0aXBsZSddIHx8IGZhbHNlO1xyXG4gICAgICB0aGlzLmhlYWRlcnMgPSB0aGlzLmNvbmZpZ1sndXBsb2FkQVBJJ11bJ2hlYWRlcnMnXSB8fCB7fTtcclxuICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSB0aGlzLmNvbmZpZ1sndXBsb2FkQVBJJ11bJ3Jlc3BvbnNlVHlwZSddIHx8IHt9O1xyXG4gICAgICBjb25zdCBkZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzOiBSZXBsYWNlVGV4dHMgPSAge1xyXG4gICAgICAgIHNlbGVjdEZpbGVCdG46IHRoaXMubXVsdGlwbGUgPyAnU2VsZWN0IEZpbGVzJyA6ICdTZWxlY3QgRmlsZScsXHJcbiAgICAgICAgcmVzZXRCdG46ICdSZXNldCcsXHJcbiAgICAgICAgdXBsb2FkQnRuOiAnVXBsb2FkJyxcclxuICAgICAgICBkcmFnTkRyb3BCb3g6ICdEcmFnIE4gRHJvcCcsXHJcbiAgICAgICAgYXR0YWNoUGluQnRuOiB0aGlzLm11bHRpcGxlID8gJ0F0dGFjaCBGaWxlcy4uLicgOiAnQXR0YWNoIEZpbGUuLi4nLFxyXG4gICAgICAgIGFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M6ICdTdWNjZXNzZnVsbHkgVXBsb2FkZWQgIScsXHJcbiAgICAgICAgYWZ0ZXJVcGxvYWRNc2dfZXJyb3I6ICdVcGxvYWQgRmFpbGVkICEnXHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMucmVwbGFjZVRleHRzID0gey4uLmRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXN9O1xyXG4gICAgICBpZiAodGhpcy5jb25maWdbJ3JlcGxhY2VUZXh0cyddKSB7XHJcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzLFxyXG4gICAgICAgICAgLi4udGhpcy5jb25maWdbJ3JlcGxhY2VUZXh0cyddXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gY29uc29sZS5sb2coXCJjb25maWc6IFwiLCB0aGlzLmNvbmZpZyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29uZmlnW1wibWF4U2l6ZVwiXSk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuaGVhZGVycyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwicnN0OiBcIiwgcnN0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocnN0WydyZXNldFVwbG9hZCddKSB7XHJcbiAgICAgIGlmIChyc3RbJ3Jlc2V0VXBsb2FkJ10uY3VycmVudFZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldEZpbGVVcGxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIklkOiBcIiwgdGhpcy5pZCk7XHJcbiAgICB0aGlzLnJlc2V0VXBsb2FkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXNldEZpbGVVcGxvYWQoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcclxuICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xyXG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xyXG4gICAgdGhpcy51cGxvYWRNc2cgPSBmYWxzZTtcclxuICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBvbkNoYW5nZShldmVudDogYW55KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm1heFNpemUgKyB0aGlzLmZvcm1hdHNBbGxvd2VkICsgdGhpcy5tdWx0aXBsZSk7XHJcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIm9uY2hhbmdlIGhpdFwiKTtcclxuICAgIGlmICh0aGlzLmFmdGVyVXBsb2FkIHx8ICF0aGlzLm11bHRpcGxlKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcyA9IFtdO1xyXG4gICAgICB0aGlzLkNhcHRpb24gPSBbXTtcclxuICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gRk9STUFUUyBBTExPV0VEIExJU1RcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiRk9STUFUUyBBTExPV0VEIExJU1Q9IFwiK3RoaXMuZm9ybWF0c0FsbG93ZWQpO1xyXG4gICAgLy8gTk8gT0YgRk9STUFUUyBBTExPV0VEXHJcbiAgICBsZXQgZm9ybWF0c0NvdW50OiBhbnk7XHJcbiAgICBmb3JtYXRzQ291bnQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLm1hdGNoKG5ldyBSZWdFeHAoJ1xcXFwuJywgJ2cnKSk7XHJcbiAgICBmb3JtYXRzQ291bnQgPSBmb3JtYXRzQ291bnQubGVuZ3RoO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJOTyBPRiBGT1JNQVRTIEFMTE9XRUQ9IFwiK2Zvcm1hdHNDb3VudCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XHJcblxyXG4gICAgLy8gSVRFUkFURSBTRUxFQ1RFRCBGSUxFU1xyXG4gICAgbGV0IGZpbGU6IEZpbGVMaXN0O1xyXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdkcm9wJykge1xyXG4gICAgICBmaWxlID0gZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcInR5cGU6IGRyb3BcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzIHx8IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwidHlwZTogY2hhbmdlXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gY29uc29sZS5sb2coZmlsZSk7XHJcbiAgICBsZXQgY3VycmVudEZpbGVFeHQ6IGFueTtcclxuICAgIGxldCBleHQ6IGFueTtcclxuICAgIGxldCBmcm10QWxsb3dlZDogYm9vbGVhbjtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAvLyBDSEVDSyBGT1JNQVRcclxuICAgICAgLy8gQ1VSUkVOVCBGSUxFIEVYVEVOU0lPTlxyXG4gICAgICBjdXJyZW50RmlsZUV4dCA9IHRoaXMucmVnLmV4ZWMoZmlsZVtpXS5uYW1lKTtcclxuICAgICAgY3VycmVudEZpbGVFeHQgPSBjdXJyZW50RmlsZUV4dFsxXTtcclxuICAgICAgLy8gY29uc29sZS5sb2coZmlsZVtpXS5uYW1lKTtcclxuICAgICAgZnJtdEFsbG93ZWQgPSBmYWxzZTtcclxuICAgICAgLy8gRk9STUFUIEFMTE9XRUQgTElTVCBJVEVSQVRFXHJcbiAgICAgIGZvciAobGV0IGogPSBmb3JtYXRzQ291bnQ7IGogPiAwOyBqLS0pIHtcclxuICAgICAgICBleHQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLnNwbGl0KCcuJylbal07XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJGT1JNQVQgTElTVCAoXCIraitcIik9IFwiK2V4dC5zcGxpdChcIixcIilbMF0pO1xyXG4gICAgICAgIGlmIChqID09PSBmb3JtYXRzQ291bnQpIHtcclxuICAgICAgICAgIGV4dCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQuc3BsaXQoJy4nKVtqXSArICcsJztcclxuICAgICAgICB9IC8vIGNoZWNrIGZvcm1hdFxyXG4gICAgICAgIGlmIChjdXJyZW50RmlsZUV4dC50b0xvd2VyQ2FzZSgpID09PSBleHQuc3BsaXQoJywnKVswXSkge1xyXG4gICAgICAgICAgZnJtdEFsbG93ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGZybXRBbGxvd2VkKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJGT1JNQVQgQUxMT1dFRFwiKTtcclxuICAgICAgICAvLyBDSEVDSyBTSVpFXHJcbiAgICAgICAgaWYgKGZpbGVbaV0uc2l6ZSA+IHRoaXMubWF4U2l6ZSAqIDEwMjQwMDApIHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiU0laRSBOT1QgQUxMT1dFRCAoXCIrZmlsZVtpXS5zaXplK1wiKVwiKTtcclxuICAgICAgICAgIHRoaXMubm90QWxsb3dlZExpc3QucHVzaCh7XHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlW2ldLm5hbWUsXHJcbiAgICAgICAgICAgIGZpbGVTaXplOiB0aGlzLmNvbnZlcnRTaXplKGZpbGVbaV0uc2l6ZSksXHJcbiAgICAgICAgICAgIGVycm9yTXNnOiAnSW52YWxpZCBzaXplJ1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gZm9ybWF0IGFsbG93ZWQgYW5kIHNpemUgYWxsb3dlZCB0aGVuIGFkZCBmaWxlIHRvIHNlbGVjdGVkRmlsZSBhcnJheVxyXG4gICAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzLnB1c2goZmlsZVtpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9STUFUIE5PVCBBTExPV0VEXCIpO1xyXG4gICAgICAgIHRoaXMubm90QWxsb3dlZExpc3QucHVzaCh7XHJcbiAgICAgICAgICBmaWxlTmFtZTogZmlsZVtpXS5uYW1lLFxyXG4gICAgICAgICAgZmlsZVNpemU6IHRoaXMuY29udmVydFNpemUoZmlsZVtpXS5zaXplKSxcclxuICAgICAgICAgIGVycm9yTXNnOiAnSW52YWxpZCBmb3JtYXQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLnRoZW1lID09PSAnYXR0YWNoUGluJykge1xyXG4gICAgICAgIHRoaXMudXBsb2FkRmlsZXMoKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XHJcbiAgICB0aGlzLnVwbG9hZENsaWNrID0gdHJ1ZTtcclxuICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gMDtcclxuICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IG51bGw7XHJcbiAgfVxyXG5cclxuICB1cGxvYWRGaWxlcygpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRGaWxlcyk7XHJcbiAgICBsZXQgaTogYW55O1xyXG4gICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSB0cnVlO1xyXG4gICAgdGhpcy51cGxvYWRDbGljayA9IGZhbHNlO1xyXG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xyXG4gICAgbGV0IGlzRXJyb3IgPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5DYXB0aW9uW2ldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLkNhcHRpb25baV0gPSAnZmlsZScgKyBpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIEFkZCBEQVRBIFRPIEJFIFNFTlRcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKFxyXG4gICAgICAgIHRoaXMuQ2FwdGlvbltpXSxcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXNbaV0gLyosIHRoaXMuc2VsZWN0ZWRGaWxlc1tpXS5uYW1lKi9cclxuICAgICAgKTtcclxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5zZWxlY3RlZEZpbGVzW2ldK1wie1wiK3RoaXMuQ2FwdGlvbltpXStcIiAoQ2FwdGlvbil9XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpID4gMSkge1xyXG4gICAgICB0aGlzLnNpbmdsZUZpbGUgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2luZ2xlRmlsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGV2bnQgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnb25yZWFkeScpO1xyXG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwICYmIHhoci5zdGF0dXMgIT09IDIwMSkge1xyXG4gICAgICAgICAgaXNFcnJvciA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMudXBsb2FkTXNnID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRNc2dUZXh0ID0gdGhpcy5yZXBsYWNlVGV4dHMuYWZ0ZXJVcGxvYWRNc2dfZXJyb3I7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZE1zZ0NsYXNzID0gJ3RleHQtZGFuZ2VyIGxlYWQnO1xyXG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy51cGxvYWRNc2dUZXh0KTtcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGV2bnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkFwaVJlc3BvbnNlLmVtaXQoeGhyKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIudXBsb2FkLm9ucHJvZ3Jlc3MgPSBldm50ID0+IHtcclxuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTsgLy8gYnV0dG9uIHNob3VsZCBiZSBkaXNhYmxlZCBieSBwcm9jZXNzIHVwbG9hZGluZ1xyXG4gICAgICBpZiAoZXZudC5sZW5ndGhDb21wdXRhYmxlKSB7XHJcbiAgICAgICAgdGhpcy5wZXJjZW50Q29tcGxldGUgPSBNYXRoLnJvdW5kKChldm50LmxvYWRlZCAvIGV2bnQudG90YWwpICogMTAwKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcIlByb2dyZXNzLi4uXCIvKit0aGlzLnBlcmNlbnRDb21wbGV0ZStcIiAlXCIqLyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5vbmxvYWQgPSBldm50ID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ29ubG9hZCcpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhldm50KTtcclxuICAgICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcclxuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcclxuICAgICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFmdGVyVXBsb2FkID0gdHJ1ZTtcclxuICAgICAgaWYgKCFpc0Vycm9yKSB7XHJcbiAgICAgICAgdGhpcy51cGxvYWRNc2dUZXh0ID0gdGhpcy5yZXBsYWNlVGV4dHMuYWZ0ZXJVcGxvYWRNc2dfc3VjY2VzcztcclxuICAgICAgICB0aGlzLnVwbG9hZE1zZ0NsYXNzID0gJ3RleHQtc3VjY2VzcyBsZWFkJztcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnVwbG9hZE1zZ1RleHQgKyBcIiBcIiArIHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggKyBcIiBmaWxlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5vbmVycm9yID0gZXZudCA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvbmVycm9yJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGV2bnQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub3BlbignUE9TVCcsIHRoaXMudXBsb2FkQVBJLCB0cnVlKTtcclxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuaGVhZGVycykpIHtcclxuICAgICAgLy8gT2JqZWN0LmtleXMgd2lsbCBnaXZlIGFuIEFycmF5IG9mIGtleXNcclxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCB0aGlzLmhlYWRlcnNba2V5XSk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5yZXNwb25zZVR5cGUpIHtcclxuICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMucmVzcG9uc2VUeXBlO1xyXG4gICAgfVxyXG4gICAgLy8gbGV0IHRva2VuID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xyXG4gICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XHJcbiAgICAvLyB4aHIuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGBCZWFyZXIgJHt0b2tlbn1gKTtcclxuICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZUZpbGUoaTogYW55LCBzZl9uYTogYW55KSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInJlbW92ZSBmaWxlIGNsaWNrZWQgXCIgKyBpKVxyXG4gICAgaWYgKHNmX25hID09PSAnc2YnKSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIHRoaXMuQ2FwdGlvbi5zcGxpY2UoaSwgMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29udmVydFNpemUoZmlsZVNpemU6IG51bWJlcikge1xyXG4gICAgLy8gY29uc29sZS5sb2coZmlsZVNpemUgKyBcIiAtIFwiKyBzdHIpO1xyXG4gICAgcmV0dXJuIGZpbGVTaXplIDwgMTAyNDAwMFxyXG4gICAgICA/IChmaWxlU2l6ZSAvIDEwMjQpLnRvRml4ZWQoMikgKyAnIEtCJ1xyXG4gICAgICA6IChmaWxlU2l6ZSAvIDEwMjQwMDApLnRvRml4ZWQoMikgKyAnIE1CJztcclxuICB9XHJcblxyXG4gIGF0dGFjaHBpbk9uY2xpY2soKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIklEOiBcIiwgdGhpcy5pZCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsJyArIHRoaXMuaWQpIS5jbGljaygpO1xyXG4gICAgLy8gJChcIiNcIitcInNlbFwiK3RoaXMuaWQpLmNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICBkcm9wKGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZHJvcDogXCIsIGV2ZW50KTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiZHJvcDogXCIsIGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyk7XHJcbiAgICB0aGlzLm9uQ2hhbmdlKGV2ZW50KTtcclxuICB9XHJcbiAgYWxsb3dEcm9wKGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJhbGxvd0Ryb3A6IFwiLGV2ZW50KVxyXG4gIH1cclxufVxyXG5cclxuLyogaW50ZXJmYWNlIENPTkZJRyB7XHJcbiAgdXBsb2FkQVBJOiBzdHJpbmc7XHJcbiAgbXVsdGlwbGU/OiBib29sZWFuO1xyXG4gIGZvcm1hdHNBbGxvd2VkPzogc3RyaW5nO1xyXG4gIG1heFNpemU/OiBudW1iZXI7XHJcbiAgaWQ/OiBudW1iZXI7XHJcbiAgcmVzZXRVcGxvYWQ/OiBib29sZWFuO1xyXG4gIHRoZW1lPzogc3RyaW5nO1xyXG4gIGhpZGVQcm9ncmVzc0Jhcj86IGJvb2xlYW47XHJcbiB9XHJcbiAqL1xyXG5cclxuIGludGVyZmFjZSBSZXBsYWNlVGV4dHMge1xyXG4gIHNlbGVjdEZpbGVCdG46IHN0cmluZyxcclxuICByZXNldEJ0bjogc3RyaW5nLFxyXG4gIHVwbG9hZEJ0bjogc3RyaW5nLFxyXG4gIGRyYWdORHJvcEJveDogc3RyaW5nLFxyXG4gIGF0dGFjaFBpbkJ0bjogc3RyaW5nLFxyXG4gIGFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M6IHN0cmluZyxcclxuICBhZnRlclVwbG9hZE1zZ19lcnJvcjogc3RyaW5nLFxyXG59O1xyXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50XSxcclxuICBleHBvcnRzOiBbQW5ndWxhckZpbGVVcGxvYWRlckNvbXBvbmVudF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJNb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJ0c2xpYl8xLl9fdmFsdWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0lBT0U7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O3FDQUpEO0NBUUM7Ozs7Ozs7SUM0R0M7UUFsQ0EsV0FBTSxHQUFRLEVBQUUsQ0FBQztRQUVqQixnQkFBVyxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFbEQsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBY2pDLFdBQU0sR0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDN0IsUUFBRyxHQUFXLGlCQUFpQixDQUFDO1FBQ2hDLGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBQy9CLG1CQUFjLEdBQWtCLEVBQUUsQ0FBQztRQUNuQyxZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQUM1QixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixnQkFBVyxHQUFHLElBQUksQ0FBQzs7OztLQVVsQjs7Ozs7SUFFRCxrREFBVzs7OztJQUFYLFVBQVksR0FBa0I7UUFDNUIsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4QyxJQUFJLENBQUMsRUFBRTtnQkFDTCxJ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