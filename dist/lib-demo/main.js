(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/angular-file-uploader/fesm5/angular-file-uploader.js":
/*!*******************************************************************!*\
  !*** ./dist/angular-file-uploader/fesm5/angular-file-uploader.js ***!
  \*******************************************************************/
/*! exports provided: AngularFileUploaderService, AngularFileUploaderComponent, AngularFileUploaderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularFileUploaderService", function() { return AngularFileUploaderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularFileUploaderComponent", function() { return AngularFileUploaderComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularFileUploaderModule", function() { return AngularFileUploaderModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");




/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderService = /** @class */ (function () {
    function AngularFileUploaderService() {
    }
    AngularFileUploaderService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                    providedIn: 'root'
                },] },
    ];
    AngularFileUploaderService.ctorParameters = function () { return []; };
    /** @nocollapse */ AngularFileUploaderService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function AngularFileUploaderService_Factory() { return new AngularFileUploaderService(); }, token: AngularFileUploaderService, providedIn: "root" });
    return AngularFileUploaderService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var AngularFileUploaderComponent = /** @class */ (function () {
    function AngularFileUploaderComponent() {
        this.config = {};
        this.resetUpload = this.config["resetUpload"];
        this.ApiResponse = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
        //console.log("id: ",this.id);
        //console.log("idDate: ",this.idDate);
        //console.log(Math.random());
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
        if (rst["config"]) {
            this.theme = this.config["theme"] || "";
            this.id =
                this.config["id"] ||
                    parseInt((this.idDate / 10000).toString().split(".")[1]) +
                        Math.floor(Math.random() * 20) * 10000;
            this.hideProgressBar = this.config["hideProgressBar"] || false;
            this.hideResetBtn = this.config["hideResetBtn"] || false;
            this.hideSelectBtn = this.config["hideSelectBtn"] || false;
            this.maxSize = this.config["maxSize"] || 20;
            this.uploadAPI = this.config["uploadAPI"]["url"];
            this.formatsAllowed =
                this.config["formatsAllowed"] || ".jpg,.png,.pdf,.docx,.txt,.gif,.jpeg";
            this.multiple = this.config["multiple"] || false;
            this.headers = this.config["uploadAPI"]["headers"] || {};
            this.responseType = this.config["uploadAPI"]["responseType"] || {};
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
            this.replaceTexts = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, defaultReplaceTextsValues);
            if (this.config["replaceTexts"]) {
                this.replaceTexts = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__assign"])({}, defaultReplaceTextsValues, this.config['replaceTexts']);
            }
            //console.log("config: ", this.config);
            //console.log(this.config["maxSize"]);
            //console.log(this.headers);
            //console.log("rst: ", rst);
        }
        if (rst["resetUpload"]) {
            if (rst["resetUpload"].currentValue === true) {
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
        //console.log("Id: ", this.id);
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
        //console.log(this.maxSize + this.formatsAllowed + this.multiple);
        this.notAllowedList = [];
        //console.log("onchange hit");
        if (this.afterUpload || !this.multiple) {
            this.selectedFiles = [];
            this.Caption = [];
            this.afterUpload = false;
        }
        //FORMATS ALLOWED LIST
        //console.log("FORMATS ALLOWED LIST= "+this.formatsAllowed);
        //NO OF FORMATS ALLOWED
        /** @type {?} */
        var formatsCount;
        formatsCount = this.formatsAllowed.match(new RegExp("\\.", "g"));
        formatsCount = formatsCount.length;
        //console.log("NO OF FORMATS ALLOWED= "+formatsCount);
        //console.log("-------------------------------");
        //ITERATE SELECTED FILES
        /** @type {?} */
        var file;
        if (event.type == "drop") {
            file = event.dataTransfer.files;
            //console.log("type: drop");
        }
        else {
            file = event.target.files || event.srcElement.files;
            //console.log("type: change");
        }
        //console.log(file);
        /** @type {?} */
        var currentFileExt;
        /** @type {?} */
        var ext;
        /** @type {?} */
        var frmtAllowed;
        for (var i = 0; i < file.length; i++) {
            //CHECK FORMAT
            //CURRENT FILE EXTENSION
            currentFileExt = this.reg.exec(file[i].name);
            currentFileExt = currentFileExt[1];
            //console.log(file[i].name);
            frmtAllowed = false;
            //FORMAT ALLOWED LIST ITERATE
            for (var j = formatsCount; j > 0; j--) {
                ext = this.formatsAllowed.split(".")[j];
                //console.log("FORMAT LIST ("+j+")= "+ext.split(",")[0]);
                if (j == formatsCount) {
                    ext = this.formatsAllowed.split(".")[j] + ",";
                } //check format
                if (currentFileExt.toLowerCase() == ext.split(",")[0]) {
                    frmtAllowed = true;
                }
            }
            if (frmtAllowed) {
                //console.log("FORMAT ALLOWED");
                //CHECK SIZE
                if (file[i].size > this.maxSize * 1024000) {
                    //console.log("SIZE NOT ALLOWED ("+file[i].size+")");
                    this.notAllowedList.push({
                        fileName: file[i].name,
                        fileSize: this.convertSize(file[i].size),
                        errorMsg: "Invalid size"
                    });
                    continue;
                }
                else {
                    //format allowed and size allowed then add file to selectedFile array
                    this.selectedFiles.push(file[i]);
                }
            }
            else {
                //console.log("FORMAT NOT ALLOWED");
                this.notAllowedList.push({
                    fileName: file[i].name,
                    fileSize: this.convertSize(file[i].size),
                    errorMsg: "Invalid format"
                });
                continue;
            }
        }
        if (this.selectedFiles.length !== 0) {
            this.uploadBtn = true;
            if (this.theme == "attachPin")
                this.uploadFiles();
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
        //console.log(this.selectedFiles);
        var _this = this;
        //console.log(this.selectedFiles);
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
            if (this.Caption[i] == undefined)
                this.Caption[i] = "file" + i;
            //Add DATA TO BE SENT
            formData.append(this.Caption[i], this.selectedFiles[i] /*, this.selectedFiles[i].name*/);
            //console.log(this.selectedFiles[i]+"{"+this.Caption[i]+" (Caption)}");
        }
        if (i > 1) {
            this.singleFile = false;
        }
        else {
            this.singleFile = true;
        }
        xhr.onreadystatechange = function (evnt) {
            //console.log("onready");
            if (xhr.readyState === 4) {
                if (xhr.status !== 200 && xhr.status !== 201) {
                    isError = true;
                    _this.progressBarShow = false;
                    _this.uploadBtn = false;
                    _this.uploadMsg = true;
                    _this.afterUpload = true;
                    _this.uploadMsgText = _this.replaceTexts.afterUploadMsg_error;
                    _this.uploadMsgClass = "text-danger lead";
                    //console.log(this.uploadMsgText);
                    //console.log(evnt);
                }
                _this.ApiResponse.emit(xhr);
            }
        };
        xhr.upload.onprogress = function (evnt) {
            _this.uploadBtn = false; // button should be disabled by process uploading
            if (evnt.lengthComputable) {
                _this.percentComplete = Math.round((evnt.loaded / evnt.total) * 100);
            }
            //console.log("Progress..."/*+this.percentComplete+" %"*/);
        };
        xhr.onload = function (evnt) {
            //console.log("onload");
            //console.log(evnt);
            _this.progressBarShow = false;
            _this.uploadBtn = false;
            _this.uploadMsg = true;
            _this.afterUpload = true;
            if (!isError) {
                _this.uploadMsgText = _this.replaceTexts.afterUploadMsg_success;
                _this.uploadMsgClass = "text-success lead";
                //console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
            }
        };
        xhr.onerror = function (evnt) {
            //console.log("onerror");
            //console.log(evnt);
        };
        xhr.open("POST", this.uploadAPI, true);
        try {
            for (var _a = Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__values"])(Object.keys(this.headers)), _b = _a.next(); !_b.done; _b = _a.next()) {
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
        //let token = sessionStorage.getItem("token");
        //xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        //xhr.setRequestHeader('Authorization', `Bearer ${token}`);
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
        //console.log("remove file clicked " + i)
        if (sf_na == "sf") {
            this.selectedFiles.splice(i, 1);
            this.Caption.splice(i, 1);
        }
        else {
            this.notAllowedList.splice(i, 1);
        }
        if (this.selectedFiles.length == 0) {
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
        //console.log(fileSize + " - "+ str);
        return fileSize < 1024000
            ? (fileSize / 1024).toFixed(2) + " KB"
            : (fileSize / 1024000).toFixed(2) + " MB";
    };
    /**
     * @return {?}
     */
    AngularFileUploaderComponent.prototype.attachpinOnclick = /**
     * @return {?}
     */
    function () {
        //console.log("ID: ", this.id);
        (/** @type {?} */ (document.getElementById("sel" + this.id))).click();
        //$("#"+"sel"+this.id).click();
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
        //console.log("drop: ", event);
        //console.log("drop: ", event.dataTransfer.files);
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
        event.dataTransfer.dropEffect = "copy";
        //console.log("allowDrop: ",event)
    };
    AngularFileUploaderComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: "angular-file-uploader",
                    template: "<div class=\"container\" *ngIf=\"(theme !== 'attachPin')\" id=\"default\">\n\n    <!-- Drag n Drop theme Starts -->\n    <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\" [ngClass]=\"(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'\" class=\"dragNDrop\">\n        <div style=\"position:relative;\">\n            <div id=\"div1\" class=\"div1 afu-dragndrop-box\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n                <p class=\"afu-dragndrop-text\">{{replaceTexts?.dragNDropBox}}</p>\n            </div>\n            <!-- <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span> -->\n        </div>\n    </div>\n    <!-- Drag n Drop theme Ends -->\n\n    <label for=\"sel{{id}}\" class=\"btn btn-primary btn-sm afu-select-btn\" *ngIf=\"!hideSelectBtn\">{{replaceTexts?.selectFileBtn}}</label>\n    <input type=\"file\" id=\"sel{{id}}\" style=\"display: none\" *ngIf=\"!hideSelectBtn\" (change)=\"onChange($event)\" title=\"Select file\"\n        name=\"files[]\" [accept]=formatsAllowed [attr.multiple]=\"multiple ? '' : null\" />\n    <button class=\"btn btn-info btn-sm resetBtn afu-reset-btn\" (click)=\"resetFileUpload()\" *ngIf=\"!hideResetBtn\">{{replaceTexts?.resetBtn}}</button>\n    <br *ngIf=\"!hideSelectBtn\">\n    <p class=\"constraints-info afu-constraints-info\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>\n    <!--Selected file list-->\n    <div class=\"row afu-valid-file\" *ngFor=\"let sf of selectedFiles;let i=index\" >\n        <p class=\"col-xs-3 textOverflow\"><span class=\"text-primary\">{{sf.name}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>\n        <!--  <input class=\"col-xs-3 progress caption\"  type=\"text\"  placeholder=\"Caption..\"  [(ngModel)]=\"Caption[i]\"  *ngIf=\"uploadClick\"/> -->\n        <div class=\"progress col-xs-3 padMarg afu-progress-bar\" *ngIf=\"singleFile && progressBarShow && !hideProgressBar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <a class=\"col-xs-1\" role=\"button\" (click)=\"removeFile(i,'sf')\" *ngIf=\"uploadClick\"><i class=\"fa fa-times\"></i></a>\n    </div>\n    <!--Invalid file list-->\n    <div class=\"row text-danger afu-invalid-file\" *ngFor=\"let na of notAllowedList;let j=index\">\n        <p class=\"col-xs-3 textOverflow\"><span>{{na['fileName']}}</span></p>\n        <p class=\"col-xs-3 padMarg sizeC\"><strong>({{na['fileSize']}})</strong></p>\n        <p class=\"col-xs-3 \">{{na['errorMsg']}}</p>\n        <a class=\"col-xs-1 delFileIcon\" role=\"button\" (click)=\"removeFile(j,'na')\" *ngIf=\"uploadClick\">&nbsp;<i class=\"fa fa-times\"></i></a>\n    </div>\n\n    <p *ngIf=\"uploadMsg\" class=\"{{uploadMsgClass}} + afu-upload-status\">{{uploadMsgText}}<p>\n    <div *ngIf=\"!singleFile && progressBarShow && !hideProgressBar\">\n        <div class=\"progress col-xs-4 padMarg afu-progress-bar\">\n            <span class=\"progress-bar progress-bar-success\" role=\"progressbar\" [ngStyle]=\"{'width':percentComplete+'%'}\">{{percentComplete}}%</span>\n        </div>\n        <br>\n        <br>\n    </div>\n    <button class=\"btn btn-success afu-upload-btn\" type=\"button\" (click)=\"uploadFiles()\" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>\n    <br>\n</div>\n\n<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->\n<div *ngIf=\"theme == 'attachPin'\" id=\"attachPin\">\n    <div style=\"position:relative;padding-left:6px\">\n        <a class='btn up_btn afu-attach-pin' (click)=\"attachpinOnclick()\">\n          {{replaceTexts?.attachPinBtn}}\n            <i class=\"fa fa-paperclip\" aria-hidden=\"true\"></i>\n            <!-- <p style=\"margin-top:10px\">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->\n            <input type=\"file\" id=\"sel{{id}}\" (change)=\"onChange($event)\" style=\"display: none\" title=\"Select file\" name=\"files[]\" [accept]=formatsAllowed\n                [attr.multiple]=\"multiple ? '' : null\" />\n            <br>\n        </a>\n        &nbsp;\n        <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n    </div>\n</div>\n\n<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->\n<!-- <div *ngIf=\"theme == 'dragNDrop'\" id=\"dragNDrop\">\n  <div style=\"position:relative;padding-left:6px\">\n    <div id=\"div1\" (drop)=\"drop($event)\" (dragover)=\"allowDrop($event)\">\n      <p>Drag N Drop</p>\n    </div>\n    <span class='label label-info' id=\"upload-file-info{{id}}\">{{selectedFiles[0]?.name}}</span>\n  </div>\n</div> -->\n",
                    styles: [".constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}"]
                },] },
    ];
    AngularFileUploaderComponent.ctorParameters = function () { return []; };
    AngularFileUploaderComponent.propDecorators = {
        config: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        resetUpload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
        ApiResponse: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5zZXJ2aWNlLnRzIiwibmc6Ly9hbmd1bGFyLWZpbGUtdXBsb2FkZXIvbGliL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci9saWIvYW5ndWxhci1maWxlLXVwbG9hZGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlsZVVwbG9hZGVyU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBJbmplY3QsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFuZ3VsYXItZmlsZS11cGxvYWRlclwiLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiICpuZ0lmPVwiKHRoZW1lICE9PSAnYXR0YWNoUGluJylcIiBpZD1cImRlZmF1bHRcIj5cclxuXHJcbiAgICA8IS0tIERyYWcgbiBEcm9wIHRoZW1lIFN0YXJ0cyAtLT5cclxuICAgIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCIgW25nQ2xhc3NdPVwiKGhpZGVTZWxlY3RCdG4gJiYgaGlkZVJlc2V0QnRuKSA/IG51bGwgOiAnZHJhZ05Ecm9wQnRtUGFkJ1wiIGNsYXNzPVwiZHJhZ05Ecm9wXCI+XHJcbiAgICAgICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPlxyXG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGl2MVwiIGNsYXNzPVwiZGl2MSBhZnUtZHJhZ25kcm9wLWJveFwiIChkcm9wKT1cImRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJhbGxvd0Ryb3AoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhZnUtZHJhZ25kcm9wLXRleHRcIj57e3JlcGxhY2VUZXh0cz8uZHJhZ05Ecm9wQm94fX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8IS0tIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj4gLS0+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS0gRHJhZyBuIERyb3AgdGhlbWUgRW5kcyAtLT5cclxuXHJcbiAgICA8bGFiZWwgZm9yPVwic2Vse3tpZH19XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGFmdS1zZWxlY3QtYnRuXCIgKm5nSWY9XCIhaGlkZVNlbGVjdEJ0blwiPnt7cmVwbGFjZVRleHRzPy5zZWxlY3RGaWxlQnRufX08L2xhYmVsPlxyXG4gICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJzZWx7e2lkfX1cIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCIgKGNoYW5nZSk9XCJvbkNoYW5nZSgkZXZlbnQpXCIgdGl0bGU9XCJTZWxlY3QgZmlsZVwiXHJcbiAgICAgICAgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZCBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvIGJ0bi1zbSByZXNldEJ0biBhZnUtcmVzZXQtYnRuXCIgKGNsaWNrKT1cInJlc2V0RmlsZVVwbG9hZCgpXCIgKm5nSWY9XCIhaGlkZVJlc2V0QnRuXCI+e3tyZXBsYWNlVGV4dHM/LnJlc2V0QnRufX08L2J1dHRvbj5cclxuICAgIDxiciAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCI+XHJcbiAgICA8cCBjbGFzcz1cImNvbnN0cmFpbnRzLWluZm8gYWZ1LWNvbnN0cmFpbnRzLWluZm9cIj4oe3tmb3JtYXRzQWxsb3dlZH19KSBTaXplIGxpbWl0LSB7eyhjb252ZXJ0U2l6ZShtYXhTaXplICoxMDI0MDAwKSl9fTwvcD5cclxuICAgIDwhLS1TZWxlY3RlZCBmaWxlIGxpc3QtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3cgYWZ1LXZhbGlkLWZpbGVcIiAqbmdGb3I9XCJsZXQgc2Ygb2Ygc2VsZWN0ZWRGaWxlcztsZXQgaT1pbmRleFwiID5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHRleHRPdmVyZmxvd1wiPjxzcGFuIGNsYXNzPVwidGV4dC1wcmltYXJ5XCI+e3tzZi5uYW1lfX08L3NwYW4+PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7Y29udmVydFNpemUoc2Yuc2l6ZSl9fSk8L3N0cm9uZz4mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDs8L3A+XHJcbiAgICAgICAgPCEtLSAgPGlucHV0IGNsYXNzPVwiY29sLXhzLTMgcHJvZ3Jlc3MgY2FwdGlvblwiICB0eXBlPVwidGV4dFwiICBwbGFjZWhvbGRlcj1cIkNhcHRpb24uLlwiICBbKG5nTW9kZWwpXT1cIkNhcHRpb25baV1cIiAgKm5nSWY9XCJ1cGxvYWRDbGlja1wiLz4gLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInByb2dyZXNzIGNvbC14cy0zIHBhZE1hcmcgYWZ1LXByb2dyZXNzLWJhclwiICpuZ0lmPVwic2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2dyZXNzLWJhciBwcm9ncmVzcy1iYXItc3VjY2Vzc1wiIHJvbGU9XCJwcm9ncmVzc2JhclwiIFtuZ1N0eWxlXT1cInsnd2lkdGgnOnBlcmNlbnRDb21wbGV0ZSsnJSd9XCI+e3twZXJjZW50Q29tcGxldGV9fSU8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGEgY2xhc3M9XCJjb2wteHMtMVwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShpLCdzZicpXCIgKm5nSWY9XCJ1cGxvYWRDbGlja1wiPjxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tSW52YWxpZCBmaWxlIGxpc3QtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3cgdGV4dC1kYW5nZXIgYWZ1LWludmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBuYSBvZiBub3RBbGxvd2VkTGlzdDtsZXQgaj1pbmRleFwiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4+e3tuYVsnZmlsZU5hbWUnXX19PC9zcGFuPjwvcD5cclxuICAgICAgICA8cCBjbGFzcz1cImNvbC14cy0zIHBhZE1hcmcgc2l6ZUNcIj48c3Ryb25nPih7e25hWydmaWxlU2l6ZSddfX0pPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgXCI+e3tuYVsnZXJyb3JNc2cnXX19PC9wPlxyXG4gICAgICAgIDxhIGNsYXNzPVwiY29sLXhzLTEgZGVsRmlsZUljb25cIiByb2xlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInJlbW92ZUZpbGUoaiwnbmEnKVwiICpuZ0lmPVwidXBsb2FkQ2xpY2tcIj4mbmJzcDs8aSBjbGFzcz1cImZhIGZhLXRpbWVzXCI+PC9pPjwvYT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxwICpuZ0lmPVwidXBsb2FkTXNnXCIgY2xhc3M9XCJ7e3VwbG9hZE1zZ0NsYXNzfX0gKyBhZnUtdXBsb2FkLXN0YXR1c1wiPnt7dXBsb2FkTXNnVGV4dH19PHA+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiIXNpbmdsZUZpbGUgJiYgcHJvZ3Jlc3NCYXJTaG93ICYmICFoaWRlUHJvZ3Jlc3NCYXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTQgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdWNjZXNzXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6cGVyY2VudENvbXBsZXRlKyclJ31cIj57e3BlcmNlbnRDb21wbGV0ZX19JTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YnI+XHJcbiAgICAgICAgPGJyPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGFmdS11cGxvYWQtYnRuXCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ1cGxvYWRGaWxlcygpXCIgW2Rpc2FibGVkXT0hdXBsb2FkQnRuPnt7cmVwbGFjZVRleHRzPy51cGxvYWRCdG59fTwvYnV0dG9uPlxyXG4gICAgPGJyPlxyXG48L2Rpdj5cclxuXHJcbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQVRUQUNIIFBJTiBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxyXG48ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2F0dGFjaFBpbidcIiBpZD1cImF0dGFjaFBpblwiPlxyXG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDo2cHhcIj5cclxuICAgICAgICA8YSBjbGFzcz0nYnRuIHVwX2J0biBhZnUtYXR0YWNoLXBpbicgKGNsaWNrKT1cImF0dGFjaHBpbk9uY2xpY2soKVwiPlxyXG4gICAgICAgICAge3tyZXBsYWNlVGV4dHM/LmF0dGFjaFBpbkJ0bn19XHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtcGFwZXJjbGlwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICA8IS0tIDxwIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4XCI+KHt7Zm9ybWF0c0FsbG93ZWR9fSkgU2l6ZSBsaW1pdC0ge3soY29udmVydFNpemUobWF4U2l6ZSAqIDEwMjQwMDApKX19PC9wPiAtLT5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgaWQ9XCJzZWx7e2lkfX1cIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmVcIiB0aXRsZT1cIlNlbGVjdCBmaWxlXCIgbmFtZT1cImZpbGVzW11cIiBbYWNjZXB0XT1mb3JtYXRzQWxsb3dlZFxyXG4gICAgICAgICAgICAgICAgW2F0dHIubXVsdGlwbGVdPVwibXVsdGlwbGUgPyAnJyA6IG51bGxcIiAvPlxyXG4gICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICAgICZuYnNwO1xyXG4gICAgICAgIDxzcGFuIGNsYXNzPSdsYWJlbCBsYWJlbC1pbmZvJyBpZD1cInVwbG9hZC1maWxlLWluZm97e2lkfX1cIj57e3NlbGVjdGVkRmlsZXNbMF0/Lm5hbWV9fTwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuXHJcbjwhLS0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gRFJBRyBOIERST1AgVEhFTUUgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8tLT5cclxuPCEtLSA8ZGl2ICpuZ0lmPVwidGhlbWUgPT0gJ2RyYWdORHJvcCdcIiBpZD1cImRyYWdORHJvcFwiPlxyXG4gIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nLWxlZnQ6NnB4XCI+XHJcbiAgICA8ZGl2IGlkPVwiZGl2MVwiIChkcm9wKT1cImRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJhbGxvd0Ryb3AoJGV2ZW50KVwiPlxyXG4gICAgICA8cD5EcmFnIE4gRHJvcDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj4gLS0+XHJcbmAgLFxyXG4gIHN0eWxlczogW2AuY29uc3RyYWludHMtaW5mb3ttYXJnaW4tdG9wOjEwcHg7Zm9udC1zdHlsZTppdGFsaWN9LnBhZE1hcmd7cGFkZGluZzowO21hcmdpbi1ib3R0b206MH0uY2FwdGlvbnttYXJnaW4tcmlnaHQ6NXB4fS50ZXh0T3ZlcmZsb3d7d2hpdGUtc3BhY2U6bm93cmFwO3BhZGRpbmctcmlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47dGV4dC1vdmVyZmxvdzplbGxpcHNpc30udXBfYnRue2NvbG9yOiMwMDA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MnB4IHNvbGlkICM1YzViNWI7Ym9yZGVyLXJhZGl1czoyMnB4fS5kZWxGaWxlSWNvbnt0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojY2UwOTA5fS5kcmFnTkRyb3AgLmRpdjF7ZGlzcGxheTpib3JkZXItYm94O2JvcmRlcjoycHggZGFzaGVkICM1YzViNWI7aGVpZ2h0OjZyZW07d2lkdGg6MjByZW19LmRyYWdORHJvcCAuZGl2MT5we3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjojNWM1YjViO21hcmdpbi10b3A6MS40ZW19LmRyYWdORHJvcEJ0bVBhZHtwYWRkaW5nLWJvdHRvbToycmVtfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6NjIwcHgpey5jYXB0aW9ue3BhZGRpbmc6MH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo1MTBweCl7LnNpemVDe3dpZHRoOjI1JX19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDoyNjBweCl7LmNhcHRpb24sLnNpemVDe2ZvbnQtc2l6ZToxMHB4fX0ucmVzZXRCdG57bWFyZ2luLWxlZnQ6M3B4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpXHJcbiAgY29uZmlnOiBhbnkgPSB7fTtcclxuICBASW5wdXQoKVxyXG4gIHJlc2V0VXBsb2FkOiBib29sZWFuID0gdGhpcy5jb25maWdbXCJyZXNldFVwbG9hZFwiXTtcclxuICBAT3V0cHV0KClcclxuICBBcGlSZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgdGhlbWU6IHN0cmluZztcclxuICBpZDogbnVtYmVyO1xyXG4gIGhpZGVQcm9ncmVzc0JhcjogYm9vbGVhbjtcclxuICBtYXhTaXplOiBudW1iZXI7XHJcbiAgdXBsb2FkQVBJOiBzdHJpbmc7XHJcbiAgZm9ybWF0c0FsbG93ZWQ6IHN0cmluZztcclxuICBtdWx0aXBsZTogYm9vbGVhbjtcclxuICBoZWFkZXJzOiBhbnk7XHJcbiAgcmVzcG9uc2VUeXBlOiBhbnk7XHJcbiAgaGlkZVJlc2V0QnRuOiBib29sZWFuO1xyXG4gIGhpZGVTZWxlY3RCdG46IGJvb2xlYW47XHJcblxyXG4gIGlkRGF0ZTogbnVtYmVyID0gK25ldyBEYXRlKCk7XHJcbiAgcmVnOiBSZWdFeHAgPSAvKD86XFwuKFteLl0rKSk/JC87XHJcbiAgc2VsZWN0ZWRGaWxlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gIG5vdEFsbG93ZWRMaXN0OiBBcnJheTxPYmplY3Q+ID0gW107XHJcbiAgQ2FwdGlvbjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHNpbmdsZUZpbGUgPSB0cnVlO1xyXG4gIHByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xyXG4gIHVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gIHVwbG9hZE1zZyA9IGZhbHNlO1xyXG4gIGFmdGVyVXBsb2FkID0gZmFsc2U7XHJcbiAgdXBsb2FkQ2xpY2sgPSB0cnVlO1xyXG4gIHVwbG9hZE1zZ1RleHQ6IHN0cmluZztcclxuICB1cGxvYWRNc2dDbGFzczogc3RyaW5nO1xyXG4gIHBlcmNlbnRDb21wbGV0ZTogbnVtYmVyO1xyXG4gIHJlcGxhY2VUZXh0cztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiaWQ6IFwiLHRoaXMuaWQpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImlkRGF0ZTogXCIsdGhpcy5pZERhdGUpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhNYXRoLnJhbmRvbSgpKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKHJzdDogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKHJzdFtcImNvbmZpZ1wiXSkge1xyXG4gICAgICB0aGlzLnRoZW1lID0gdGhpcy5jb25maWdbXCJ0aGVtZVwiXSB8fCBcIlwiO1xyXG4gICAgICB0aGlzLmlkID1cclxuICAgICAgICB0aGlzLmNvbmZpZ1tcImlkXCJdIHx8XHJcbiAgICAgICAgcGFyc2VJbnQoKHRoaXMuaWREYXRlIC8gMTAwMDApLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpWzFdKSArXHJcbiAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMCkgKiAxMDAwMDtcclxuICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3NCYXIgPSB0aGlzLmNvbmZpZ1tcImhpZGVQcm9ncmVzc0JhclwiXSB8fCBmYWxzZTtcclxuICAgICAgdGhpcy5oaWRlUmVzZXRCdG4gPSB0aGlzLmNvbmZpZ1tcImhpZGVSZXNldEJ0blwiXSB8fCBmYWxzZTtcclxuICAgICAgdGhpcy5oaWRlU2VsZWN0QnRuID0gdGhpcy5jb25maWdbXCJoaWRlU2VsZWN0QnRuXCJdIHx8IGZhbHNlO1xyXG4gICAgICB0aGlzLm1heFNpemUgPSB0aGlzLmNvbmZpZ1tcIm1heFNpemVcIl0gfHwgMjA7XHJcbiAgICAgIHRoaXMudXBsb2FkQVBJID0gdGhpcy5jb25maWdbXCJ1cGxvYWRBUElcIl1bXCJ1cmxcIl07XHJcbiAgICAgIHRoaXMuZm9ybWF0c0FsbG93ZWQgPVxyXG4gICAgICAgIHRoaXMuY29uZmlnW1wiZm9ybWF0c0FsbG93ZWRcIl0gfHwgXCIuanBnLC5wbmcsLnBkZiwuZG9jeCwudHh0LC5naWYsLmpwZWdcIjtcclxuICAgICAgdGhpcy5tdWx0aXBsZSA9IHRoaXMuY29uZmlnW1wibXVsdGlwbGVcIl0gfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMuaGVhZGVycyA9IHRoaXMuY29uZmlnW1widXBsb2FkQVBJXCJdW1wiaGVhZGVyc1wiXSB8fCB7fTtcclxuICAgICAgdGhpcy5yZXNwb25zZVR5cGUgPSB0aGlzLmNvbmZpZ1tcInVwbG9hZEFQSVwiXVtcInJlc3BvbnNlVHlwZVwiXSB8fCB7fTtcclxuICAgICAgbGV0IGRlZmF1bHRSZXBsYWNlVGV4dHNWYWx1ZXM6IFJlcGxhY2VUZXh0cyA9ICB7XHJcbiAgICAgICAgc2VsZWN0RmlsZUJ0bjogdGhpcy5tdWx0aXBsZSA/ICdTZWxlY3QgRmlsZXMnIDogJ1NlbGVjdCBGaWxlJyxcclxuICAgICAgICByZXNldEJ0bjogJ1Jlc2V0JyxcclxuICAgICAgICB1cGxvYWRCdG46ICdVcGxvYWQnLFxyXG4gICAgICAgIGRyYWdORHJvcEJveDogJ0RyYWcgTiBEcm9wJyxcclxuICAgICAgICBhdHRhY2hQaW5CdG46IHRoaXMubXVsdGlwbGUgPyAnQXR0YWNoIEZpbGVzLi4uJyA6ICdBdHRhY2ggRmlsZS4uLicsXHJcbiAgICAgICAgYWZ0ZXJVcGxvYWRNc2dfc3VjY2VzczogJ1N1Y2Nlc3NmdWxseSBVcGxvYWRlZCAhJyxcclxuICAgICAgICBhZnRlclVwbG9hZE1zZ19lcnJvcjogJ1VwbG9hZCBGYWlsZWQgISdcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7Li4uZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlc307XHJcbiAgICAgIGlmKHRoaXMuY29uZmlnW1wicmVwbGFjZVRleHRzXCJdKSB7XHJcbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dHMgPSB7XHJcbiAgICAgICAgICAuLi5kZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzLFxyXG4gICAgICAgICAgLi4udGhpcy5jb25maWdbJ3JlcGxhY2VUZXh0cyddXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvL2NvbnNvbGUubG9nKFwiY29uZmlnOiBcIiwgdGhpcy5jb25maWcpO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuY29uZmlnW1wibWF4U2l6ZVwiXSk7XHJcbiAgICAgIC8vY29uc29sZS5sb2codGhpcy5oZWFkZXJzKTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhcInJzdDogXCIsIHJzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJzdFtcInJlc2V0VXBsb2FkXCJdKSB7XHJcbiAgICAgIGlmIChyc3RbXCJyZXNldFVwbG9hZFwiXS5jdXJyZW50VmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgICB0aGlzLnJlc2V0RmlsZVVwbG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJJZDogXCIsIHRoaXMuaWQpO1xyXG4gICAgdGhpcy5yZXNldFVwbG9hZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRGaWxlVXBsb2FkKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XHJcbiAgICB0aGlzLkNhcHRpb24gPSBbXTtcclxuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcclxuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XHJcbiAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgLy9jb25zb2xlLmxvZyh0aGlzLm1heFNpemUgKyB0aGlzLmZvcm1hdHNBbGxvd2VkICsgdGhpcy5tdWx0aXBsZSk7XHJcbiAgICB0aGlzLm5vdEFsbG93ZWRMaXN0ID0gW107XHJcbiAgICAvL2NvbnNvbGUubG9nKFwib25jaGFuZ2UgaGl0XCIpO1xyXG4gICAgaWYgKHRoaXMuYWZ0ZXJVcGxvYWQgfHwgIXRoaXMubXVsdGlwbGUpIHtcclxuICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XHJcbiAgICAgIHRoaXMuQ2FwdGlvbiA9IFtdO1xyXG4gICAgICB0aGlzLmFmdGVyVXBsb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvL0ZPUk1BVFMgQUxMT1dFRCBMSVNUXHJcbiAgICAvL2NvbnNvbGUubG9nKFwiRk9STUFUUyBBTExPV0VEIExJU1Q9IFwiK3RoaXMuZm9ybWF0c0FsbG93ZWQpO1xyXG4gICAgLy9OTyBPRiBGT1JNQVRTIEFMTE9XRURcclxuICAgIGxldCBmb3JtYXRzQ291bnQ6IGFueTtcclxuICAgIGZvcm1hdHNDb3VudCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQubWF0Y2gobmV3IFJlZ0V4cChcIlxcXFwuXCIsIFwiZ1wiKSk7XHJcbiAgICBmb3JtYXRzQ291bnQgPSBmb3JtYXRzQ291bnQubGVuZ3RoO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcIk5PIE9GIEZPUk1BVFMgQUxMT1dFRD0gXCIrZm9ybWF0c0NvdW50KTtcclxuICAgIC8vY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG5cclxuICAgIC8vSVRFUkFURSBTRUxFQ1RFRCBGSUxFU1xyXG4gICAgbGV0IGZpbGU6IEZpbGVMaXN0O1xyXG4gICAgaWYgKGV2ZW50LnR5cGUgPT0gXCJkcm9wXCIpIHtcclxuICAgICAgZmlsZSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcclxuICAgICAgLy9jb25zb2xlLmxvZyhcInR5cGU6IGRyb3BcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBmaWxlID0gZXZlbnQudGFyZ2V0LmZpbGVzIHx8IGV2ZW50LnNyY0VsZW1lbnQuZmlsZXM7XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJ0eXBlOiBjaGFuZ2VcIik7XHJcbiAgICB9XHJcbiAgICAvL2NvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgbGV0IGN1cnJlbnRGaWxlRXh0OiBhbnk7XHJcbiAgICBsZXQgZXh0OiBhbnk7XHJcbiAgICBsZXQgZnJtdEFsbG93ZWQ6IGJvb2xlYW47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgLy9DSEVDSyBGT1JNQVRcclxuICAgICAgLy9DVVJSRU5UIEZJTEUgRVhURU5TSU9OXHJcbiAgICAgIGN1cnJlbnRGaWxlRXh0ID0gdGhpcy5yZWcuZXhlYyhmaWxlW2ldLm5hbWUpO1xyXG4gICAgICBjdXJyZW50RmlsZUV4dCA9IGN1cnJlbnRGaWxlRXh0WzFdO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGZpbGVbaV0ubmFtZSk7XHJcbiAgICAgIGZybXRBbGxvd2VkID0gZmFsc2U7XHJcbiAgICAgIC8vRk9STUFUIEFMTE9XRUQgTElTVCBJVEVSQVRFXHJcbiAgICAgIGZvciAobGV0IGogPSBmb3JtYXRzQ291bnQ7IGogPiAwOyBqLS0pIHtcclxuICAgICAgICBleHQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLnNwbGl0KFwiLlwiKVtqXTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiRk9STUFUIExJU1QgKFwiK2orXCIpPSBcIitleHQuc3BsaXQoXCIsXCIpWzBdKTtcclxuICAgICAgICBpZiAoaiA9PSBmb3JtYXRzQ291bnQpIHtcclxuICAgICAgICAgIGV4dCA9IHRoaXMuZm9ybWF0c0FsbG93ZWQuc3BsaXQoXCIuXCIpW2pdICsgXCIsXCI7XHJcbiAgICAgICAgfSAvL2NoZWNrIGZvcm1hdFxyXG4gICAgICAgIGlmIChjdXJyZW50RmlsZUV4dC50b0xvd2VyQ2FzZSgpID09IGV4dC5zcGxpdChcIixcIilbMF0pIHtcclxuICAgICAgICAgIGZybXRBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmcm10QWxsb3dlZCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJGT1JNQVQgQUxMT1dFRFwiKTtcclxuICAgICAgICAvL0NIRUNLIFNJWkVcclxuICAgICAgICBpZiAoZmlsZVtpXS5zaXplID4gdGhpcy5tYXhTaXplICogMTAyNDAwMCkge1xyXG4gICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlNJWkUgTk9UIEFMTE9XRUQgKFwiK2ZpbGVbaV0uc2l6ZStcIilcIik7XHJcbiAgICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBmaWxlTmFtZTogZmlsZVtpXS5uYW1lLFxyXG4gICAgICAgICAgICBmaWxlU2l6ZTogdGhpcy5jb252ZXJ0U2l6ZShmaWxlW2ldLnNpemUpLFxyXG4gICAgICAgICAgICBlcnJvck1zZzogXCJJbnZhbGlkIHNpemVcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9mb3JtYXQgYWxsb3dlZCBhbmQgc2l6ZSBhbGxvd2VkIHRoZW4gYWRkIGZpbGUgdG8gc2VsZWN0ZWRGaWxlIGFycmF5XHJcbiAgICAgICAgICB0aGlzLnNlbGVjdGVkRmlsZXMucHVzaChmaWxlW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkZPUk1BVCBOT1QgQUxMT1dFRFwiKTtcclxuICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xyXG4gICAgICAgICAgZmlsZU5hbWU6IGZpbGVbaV0ubmFtZSxcclxuICAgICAgICAgIGZpbGVTaXplOiB0aGlzLmNvbnZlcnRTaXplKGZpbGVbaV0uc2l6ZSksXHJcbiAgICAgICAgICBlcnJvck1zZzogXCJJbnZhbGlkIGZvcm1hdFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IHRydWU7XHJcbiAgICAgIGlmICh0aGlzLnRoZW1lID09IFwiYXR0YWNoUGluXCIpIHRoaXMudXBsb2FkRmlsZXMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xyXG4gICAgdGhpcy51cGxvYWRDbGljayA9IHRydWU7XHJcbiAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IDA7XHJcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdXBsb2FkRmlsZXMoKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRGaWxlcyk7XHJcblxyXG4gICAgbGV0IGk6IGFueTtcclxuICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gdHJ1ZTtcclxuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSBmYWxzZTtcclxuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcclxuICAgIGxldCBpc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5DYXB0aW9uW2ldID09IHVuZGVmaW5lZClcclxuICAgICAgICB0aGlzLkNhcHRpb25baV0gPSBcImZpbGVcIiArIGk7XHJcbiAgICAgIC8vQWRkIERBVEEgVE8gQkUgU0VOVFxyXG4gICAgICBmb3JtRGF0YS5hcHBlbmQoXHJcbiAgICAgICAgdGhpcy5DYXB0aW9uW2ldLFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlc1tpXSAvKiwgdGhpcy5zZWxlY3RlZEZpbGVzW2ldLm5hbWUqL1xyXG4gICAgICApO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRGaWxlc1tpXStcIntcIit0aGlzLkNhcHRpb25baV0rXCIgKENhcHRpb24pfVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaSA+IDEpIHtcclxuICAgICAgdGhpcy5zaW5nbGVGaWxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNpbmdsZUZpbGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBldm50ID0+IHtcclxuICAgICAgLy9jb25zb2xlLmxvZyhcIm9ucmVhZHlcIik7XHJcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDAgJiYgeGhyLnN0YXR1cyAhPT0gMjAxKSB7XHJcbiAgICAgICAgICBpc0Vycm9yID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRNc2cgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZE1zZ1RleHQgPSB0aGlzLnJlcGxhY2VUZXh0cy5hZnRlclVwbG9hZE1zZ19lcnJvcjtcclxuICAgICAgICAgIHRoaXMudXBsb2FkTXNnQ2xhc3MgPSBcInRleHQtZGFuZ2VyIGxlYWRcIjtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2codGhpcy51cGxvYWRNc2dUZXh0KTtcclxuICAgICAgICAgIC8vY29uc29sZS5sb2coZXZudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQXBpUmVzcG9uc2UuZW1pdCh4aHIpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGV2bnQgPT4ge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlOyAvLyBidXR0b24gc2hvdWxkIGJlIGRpc2FibGVkIGJ5IHByb2Nlc3MgdXBsb2FkaW5nXHJcbiAgICAgIGlmIChldm50Lmxlbmd0aENvbXB1dGFibGUpIHtcclxuICAgICAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IE1hdGgucm91bmQoKGV2bnQubG9hZGVkIC8gZXZudC50b3RhbCkgKiAxMDApO1xyXG4gICAgICB9XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJQcm9ncmVzcy4uLlwiLyordGhpcy5wZXJjZW50Q29tcGxldGUrXCIgJVwiKi8pO1xyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub25sb2FkID0gZXZudCA9PiB7XHJcbiAgICAgIC8vY29uc29sZS5sb2coXCJvbmxvYWRcIik7XHJcbiAgICAgIC8vY29uc29sZS5sb2coZXZudCk7XHJcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudXBsb2FkTXNnID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XHJcbiAgICAgIGlmICghaXNFcnJvcikge1xyXG4gICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9IFwidGV4dC1zdWNjZXNzIGxlYWRcIjtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMudXBsb2FkTXNnVGV4dCArIFwiIFwiICsgdGhpcy5zZWxlY3RlZEZpbGVzLmxlbmd0aCArIFwiIGZpbGVcIik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9uZXJyb3IgPSBldm50ID0+IHtcclxuICAgICAgLy9jb25zb2xlLmxvZyhcIm9uZXJyb3JcIik7XHJcbiAgICAgIC8vY29uc29sZS5sb2coZXZudCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5vcGVuKFwiUE9TVFwiLCB0aGlzLnVwbG9hZEFQSSwgdHJ1ZSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpKSB7XHJcbiAgICAgIC8vIE9iamVjdC5rZXlzIHdpbGwgZ2l2ZSBhbiBBcnJheSBvZiBrZXlzXHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdGhpcy5oZWFkZXJzW2tleV0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcclxuICAgIH1cclxuICAgIC8vbGV0IHRva2VuID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInRva2VuXCIpO1xyXG4gICAgLy94aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcclxuICAgIC8veGhyLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dG9rZW59YCk7XHJcbiAgICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWxlKGk6IGFueSwgc2ZfbmE6IGFueSkge1xyXG4gICAgLy9jb25zb2xlLmxvZyhcInJlbW92ZSBmaWxlIGNsaWNrZWQgXCIgKyBpKVxyXG4gICAgaWYgKHNmX25hID09IFwic2ZcIikge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB0aGlzLkNhcHRpb24uc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29udmVydFNpemUoZmlsZVNpemU6IG51bWJlcikge1xyXG4gICAgLy9jb25zb2xlLmxvZyhmaWxlU2l6ZSArIFwiIC0gXCIrIHN0cik7XHJcbiAgICByZXR1cm4gZmlsZVNpemUgPCAxMDI0MDAwXHJcbiAgICAgID8gKGZpbGVTaXplIC8gMTAyNCkudG9GaXhlZCgyKSArIFwiIEtCXCJcclxuICAgICAgOiAoZmlsZVNpemUgLyAxMDI0MDAwKS50b0ZpeGVkKDIpICsgXCIgTUJcIjtcclxuICB9XHJcblxyXG4gIGF0dGFjaHBpbk9uY2xpY2soKSB7XHJcbiAgICAvL2NvbnNvbGUubG9nKFwiSUQ6IFwiLCB0aGlzLmlkKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsXCIgKyB0aGlzLmlkKSEuY2xpY2soKTtcclxuICAgIC8vJChcIiNcIitcInNlbFwiK3RoaXMuaWQpLmNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICBkcm9wKGV2ZW50OiBhbnkpIHtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vY29uc29sZS5sb2coXCJkcm9wOiBcIiwgZXZlbnQpO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImRyb3A6IFwiLCBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShldmVudCk7XHJcbiAgfVxyXG4gIGFsbG93RHJvcChldmVudDogYW55KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwiY29weVwiO1xyXG4gICAgLy9jb25zb2xlLmxvZyhcImFsbG93RHJvcDogXCIsZXZlbnQpXHJcbiAgfVxyXG59XHJcblxyXG4vKiBpbnRlcmZhY2UgQ09ORklHIHtcclxuICB1cGxvYWRBUEk6IHN0cmluZztcclxuICBtdWx0aXBsZT86IGJvb2xlYW47XHJcbiAgZm9ybWF0c0FsbG93ZWQ/OiBzdHJpbmc7XHJcbiAgbWF4U2l6ZT86IG51bWJlcjtcclxuICBpZD86IG51bWJlcjtcclxuICByZXNldFVwbG9hZD86IGJvb2xlYW47XHJcbiAgdGhlbWU/OiBzdHJpbmc7XHJcbiAgaGlkZVByb2dyZXNzQmFyPzogYm9vbGVhbjtcclxuIH1cclxuICovXHJcblxyXG4gaW50ZXJmYWNlIFJlcGxhY2VUZXh0cyB7XHJcbiAgc2VsZWN0RmlsZUJ0bjogc3RyaW5nLFxyXG4gIHJlc2V0QnRuOiBzdHJpbmcsXHJcbiAgdXBsb2FkQnRuOiBzdHJpbmcsXHJcbiAgZHJhZ05Ecm9wQm94OiBzdHJpbmcsXHJcbiAgYXR0YWNoUGluQnRuOiBzdHJpbmcsXHJcbiAgYWZ0ZXJVcGxvYWRNc2dfc3VjY2Vzczogc3RyaW5nLFxyXG4gIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiBzdHJpbmcsXHJcbn07XHJcbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnQgfSBmcm9tICcuL2FuZ3VsYXItZmlsZS11cGxvYWRlci5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW0FuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnRdLFxyXG4gIGV4cG9ydHM6IFtBbmd1bGFyRmlsZVVwbG9hZGVyQ29tcG9uZW50XVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhckZpbGVVcGxvYWRlck1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7SUFPRTtLQUFpQjs7Z0JBTGxCLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7cUNBSkQ7Q0FRQzs7Ozs7OztJQzRHQztRQWxDQSxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBRWpCLGdCQUFXLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVsRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFjakMsV0FBTSxHQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixRQUFHLEdBQVcsaUJBQWlCLENBQUM7UUFDaEMsa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFDL0IsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBQ25DLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBQzVCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsSUFBSSxDQUFDOzs7O0tBVWxCOzs7OztJQUVELGtEQUFXOzs7O0lBQVgsVUFBWSxHQUFrQjtRQUM1QixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxFQUFFO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO29CQUNqQixRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3RELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxLQUFLLENBQUM7WUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUssQ0FBQztZQUN6RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxDQUFDO1lBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxjQUFjO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksc0NBQXNDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssQ0FBQztZQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7O2dCQUMvRCx5QkFBeUIsR0FBa0I7Z0JBQzdDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsR0FBRyxhQUFhO2dCQUM3RCxRQUFRLEVBQUUsT0FBTztnQkFDakIsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFlBQVksRUFBRSxhQUFhO2dCQUMzQixZQUFZLEVBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsR0FBRyxnQkFBZ0I7Z0JBQ2xFLHNCQUFzQixFQUFFLHlCQUF5QjtnQkFDakQsb0JBQW9CLEVBQUUsaUJBQWlCO2FBQ3hDO1lBQ0QsSUFBSSxDQUFDLFlBQVksZ0JBQU8seUJBQXlCLENBQUMsQ0FBQztZQUNuRCxJQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLGdCQUNaLHlCQUF5QixFQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUMvQixDQUFBO2FBQ0Y7Ozs7O1NBTUY7UUFFRCxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN0QixJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7YUFDeEI7U0FDRjtLQUNGOzs7O0lBRUQsK0NBQVE7OztJQUFSOztRQUVFLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0tBQzFCOzs7O0lBRUQsc0RBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7S0FDeEI7Ozs7O0lBRUQsK0NBQVE7Ozs7SUFBUixVQUFTLEtBQVU7O1FBRWpCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOztRQUV6QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzFCOzs7OztZQUlHLFlBQWlCO1FBQ3JCLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRSxZQUFZLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQzs7Ozs7WUFLL0IsSUFBYztRQUNsQixJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFO1lBQ3hCLElBQUksR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQzs7U0FFakM7YUFBTTtZQUNMLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQzs7U0FFckQ7OztZQUVHLGNBQW1COztZQUNuQixHQUFROztZQUNSLFdBQW9CO1FBQ3hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzs7WUFHcEMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxjQUFjLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDOztZQUVuQyxXQUFXLEdBQUcsS0FBSyxDQUFDOztZQUVwQixLQUFLLElBQUksQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O2dCQUV4QyxJQUFJLENBQUMsSUFBSSxZQUFZLEVBQUU7b0JBQ3JCLEdBQUcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQy9DO2dCQUNELElBQUksY0FBYyxDQUFDLFdBQVcsRUFBRSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3JELFdBQVcsR0FBRyxJQUFJLENBQUM7aUJBQ3BCO2FBQ0Y7WUFFRCxJQUFJLFdBQVcsRUFBRTs7O2dCQUdmLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBRTs7b0JBRXpDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO3dCQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7d0JBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQ3hDLFFBQVEsRUFBRSxjQUFjO3FCQUN6QixDQUFDLENBQUM7b0JBQ0gsU0FBUztpQkFDVjtxQkFBTTs7b0JBRUwsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xDO2FBQ0Y7aUJBQU07O2dCQUVMLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO29CQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3hDLFFBQVEsRUFBRSxnQkFBZ0I7aUJBQzNCLENBQUMsQ0FBQztnQkFDSCxTQUFTO2FBQ1Y7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxXQUFXO2dCQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN6QixLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDM0I7Ozs7SUFFRCxrREFBVzs7O0lBQVg7O1FBQUEsaUJBc0ZDOzs7WUFuRkssQ0FBTTtRQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDOztZQUNyQixPQUFPLEdBQUcsS0FBSzs7WUFFZixHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUU7O1lBQzFCLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRTtRQUU3QixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzlDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTO2dCQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7O1lBRS9CLFFBQVEsQ0FBQyxNQUFNLENBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxrQ0FDdEIsQ0FBQzs7U0FFSDtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNULElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUVELEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxVQUFBLElBQUk7O1lBRTNCLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7b0JBQzVDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO29CQUN2QixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7b0JBQ3hCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztvQkFDNUQsS0FBSSxDQUFDLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQzs7O2lCQUcxQztnQkFDRCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNGLENBQUM7UUFFRixHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFBLElBQUk7WUFDMUIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLEtBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNyRTs7U0FFRixDQUFDO1FBRUYsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFBLElBQUk7OztZQUdmLEtBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDO2dCQUM5RCxLQUFJLENBQUMsY0FBYyxHQUFHLG1CQUFtQixDQUFDOzthQUUzQztTQUNGLENBQUM7UUFFRixHQUFHLENBQUMsT0FBTyxHQUFHLFVBQUEsSUFBSTs7O1NBR2pCLENBQUM7UUFFRixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDOztZQUN2QyxLQUFrQixJQUFBLEtBQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsZ0JBQUE7Z0JBQXRDLElBQU0sR0FBRyxXQUFBOztnQkFFWixHQUFHLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM5Qzs7Ozs7Ozs7O1FBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUN0Qzs7OztRQUlELEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0tBQ3BCOzs7Ozs7SUFFRCxpREFBVTs7Ozs7SUFBVixVQUFXLENBQU0sRUFBRSxLQUFVOztRQUUzQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDeEI7S0FDRjs7Ozs7SUFFRCxrREFBVzs7OztJQUFYLFVBQVksUUFBZ0I7O1FBRTFCLE9BQU8sUUFBUSxHQUFHLE9BQU87Y0FDckIsQ0FBQyxRQUFRLEdBQUcsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLO2NBQ3BDLENBQUMsUUFBUSxHQUFHLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0tBQzdDOzs7O0lBRUQsdURBQWdCOzs7SUFBaEI7O1FBRUUsbUJBQUEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUssRUFBRSxDQUFDOztLQUVuRDs7Ozs7SUFFRCwyQ0FBSTs7OztJQUFKLFVBQUssS0FBVTtRQUNiLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7OztRQUd2QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3RCOzs7OztJQUNELGdEQUFTOzs7O0lBQVQsVUFBVSxLQUFVO1FBQ2xCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDOztLQUV4Qzs7Z0JBNVlGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUUsdXpKQTBFWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxrdkJBQWt2QixDQUFDO2lCQUM3dkI7Ozs7eUJBRUUsS0FBSzs4QkFFTCxLQUFLOzhCQUVMLE1BQU07O0lBeVRULG1DQUFDO0NBQUE7Ozs7OztBQzlZRDtJQUlBO0tBTzBDOztnQkFQekMsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUM1QyxPQUFPLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDeEM7O0lBQ3dDLGdDQUFDO0NBQUE7Ozs7Ozs7Ozs7Ozs7OyJ9

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/afu-lab/afu-lab.component.css":
/*!***********************************************!*\
  !*** ./src/app/afu-lab/afu-lab.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/afu-lab/afu-lab.component.html":
/*!************************************************!*\
  !*** ./src/app/afu-lab/afu-lab.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  afu-lab works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/afu-lab/afu-lab.component.ts":
/*!**********************************************!*\
  !*** ./src/app/afu-lab/afu-lab.component.ts ***!
  \**********************************************/
/*! exports provided: AfuLabComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AfuLabComponent", function() { return AfuLabComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AfuLabComponent = /** @class */ (function () {
    function AfuLabComponent() {
    }
    AfuLabComponent.prototype.ngOnInit = function () {
    };
    AfuLabComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ld-afu-lab',
            template: __webpack_require__(/*! ./afu-lab.component.html */ "./src/app/afu-lab/afu-lab.component.html"),
            styles: [__webpack_require__(/*! ./afu-lab.component.css */ "./src/app/afu-lab/afu-lab.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AfuLabComponent);
    return AfuLabComponent;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url('https://fonts.googleapis.com/css?family=Lato');\r\n\r\n\r\n.afu-container{\r\n    background-color: #BABABA;\r\n    margin-top: 3vh;\r\n    border: 4px solid rgb(139, 136, 136);\r\n    border-radius: 6px;\r\n}\r\n\r\n\r\n.title{\r\n    text-align: center;\r\n    font-family: 'Lato', sans-serif;\r\n}\r\n\r\n\r\n.border{\r\n    border: 2px solid rgb(140, 145, 142);\r\n    border-radius: 6px;\r\n    padding: 10px;\r\n    margin: 10px;\r\n}\r\n\r\n\r\n.resetBtn{\r\n    padding: 10px;\r\n    margin: 10px;\r\n}\r\n\r\n\r\n.ffLato {\r\n    font-family: 'Lato', sans-serif;\r\n}\r\n\r\n\r\n.bottom-info p {\r\n    font-size: 1.5rem;\r\n}\r\n\r\n\r\n/* @font-face { font-family: supermercado;\r\n             src: url('https://fonts.googleapis.com/css?family=Supermercado+One'); } */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container afu-container\">\r\n\r\n  <h3 class=\"title\">angular-file-uploader</h3>\r\n\r\n  <div class=\"border\">\r\n    <h4>Example-1 (Default Theme)</h4>\r\n    <angular-file-uploader #afu1 [resetUpload]=resetUpload1 [config]=\"afuConfig1\" class=\"afuc\">\r\n    </angular-file-uploader>\r\n  </div>\r\n  <br>\r\n  <br>\r\n  <div class=\"border\">\r\n    <h4>Example-2 (Theme - dragNDrop)</h4>\r\n    <angular-file-uploader #afu3 [config]=\"afuConfig3\" [resetUpload]=resetUpload3 (ApiResponse)=\"DocUpload($event)\">\r\n    </angular-file-uploader>\r\n  </div>\r\n  <br>\r\n  <br>\r\n  <div class=\"border\">\r\n    <h4>Example-3 (Theme - attachPin)</h4>\r\n    <angular-file-uploader #afu2 [config]=\"afuConfig2\" [resetUpload]=resetUpload2 (ApiResponse)=\"DocUpload($event)\">\r\n    </angular-file-uploader>\r\n  </div>\r\n\r\n  <!--  <br>\r\n  <br> -->\r\n  <!-- <button class=\"btn btn-info resetBtn\" (click)=\"resetfu(1)\">Reset 1</button>\r\n  <button class=\"btn btn-info resetBtn\" (click)=\"resetfu(2)\">Reset 2</button> -->\r\n\r\n</div>\r\n\r\n\r\n<div class=\"container afu-container bottom-info\">\r\n  <div class=\"border\">\r\n    <h3 class=\"ffLato\">Get Your Freelance Work Done Here !</h3>\r\n    <p class=\"ffLato\">Contact me at: <a href=\"mailto:kzrfaisal@gmail.com\">kzrfaisal@gmail.com</a></p>\r\n    <p>Skilled In: Angular, ReactJs, Ionic, React Native, NodeJs, MongoDB etc.</p>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { AngularFileUploaderComponent } from "angular-file-uploader";
var AppComponent = /** @class */ (function () {
    /*
    afuConfig2 = {
      theme: "hjkhkh",
      hideProgressBar: "true",
      maxSize: "1",
      uploadAPI: {
        url: "https://evening-anchorage-3159.herokuapp.com/api",
        headers: {
         "Content-Type" : "text/plain;charset=UTF-8",
         "Authorization" : `Bearer ${this.token}`
        }
      },
      formatsAllowed: ".jpg,.png",
      multiple: "false"
    };
    */
    // @ViewChild("afu1") private afuref1: AngularFileUploaderComponent;
    // @ViewChild("afu2") private afuref2: AngularFileUploaderComponent;
    // @ViewChild("afu3") private afuref3: AngularFileUploaderComponent;
    function AppComponent() {
        this.token = "lkdjlfjld";
        this.afuConfig1 = {
            multiple: true,
            uploadAPI: {
                url: "https://slack.com/api/files.upload"
            }
        };
        this.afuConfig2 = {
            theme: "attachPin",
            hideProgressBar: "true",
            hideResetBtn: "true",
            maxSize: "1",
            uploadAPI: {
                url: "https://slack.com/api/files.upload",
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            },
            formatsAllowed: ".jpg,.png",
            multiple: "true"
        };
        this.afuConfig3 = {
            theme: "dragNDrop",
            hideProgressBar: true,
            hideResetBtn: true,
            hideSelectBtn: true,
            maxSize: "1",
            uploadAPI: {
                url: "https://slack.com/api/files.upload"
            },
            formatsAllowed: ".jpg,.png",
            multiple: true
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        /* Notification.requestPermission(function(params) {
          var n = new Notification('HTML5 Notifications API', {
            body: "It's working woohoooooooooooooo...!",
            icon:'https://www.wikihow.com/images/4/4b/Right-Click-on-a-Mouse-That-Does-Not-Have-Right-Click-Step-5.jpg'
          });
        }) */
    };
    AppComponent.prototype.DocUpload = function (env) {
        console.log(env);
    };
    AppComponent.prototype.resetfu = function (id) {
        //this.rfu.resetFileUpload(id);
        //id == 1 ? this.afuref1.resetFileUpload() : this.afuref2.resetFileUpload();
        this["afuref" + id].resetFileUpload();
        //this.resetUpload1 = true;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ld-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_file_uploader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-file-uploader */ "./dist/angular-file-uploader/fesm5/angular-file-uploader.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _afu_lab_afu_lab_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./afu-lab/afu-lab.component */ "./src/app/afu-lab/afu-lab.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// To use angular-file-uploader from node-modules remove paths from tsconfig.json in root.
/*
"paths": {
      "angular-file-uploader": [
        "dist/angular-file-uploader"
      ],
      "angular-file-uploader/*": [
        "dist/angular-file-uploader/*"
      ]
    }
*/


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _afu_lab_afu_lab_component__WEBPACK_IMPORTED_MODULE_4__["AfuLabComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                angular_file_uploader__WEBPACK_IMPORTED_MODULE_2__["AngularFileUploaderModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Dev\angular-file-uploader\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map