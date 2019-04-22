/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class AngularFileUploaderComponent {
    constructor() {
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
    ngOnChanges(rst) {
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
            const defaultReplaceTextsValues = {
                selectFileBtn: this.multiple ? 'Select Files' : 'Select File',
                resetBtn: 'Reset',
                uploadBtn: 'Upload',
                dragNDropBox: 'Drag N Drop',
                attachPinBtn: this.multiple ? 'Attach Files...' : 'Attach File...',
                afterUploadMsg_success: 'Successfully Uploaded !',
                afterUploadMsg_error: 'Upload Failed !'
            };
            this.replaceTexts = Object.assign({}, defaultReplaceTextsValues);
            if (this.config['replaceTexts']) {
                this.replaceTexts = Object.assign({}, defaultReplaceTextsValues, this.config['replaceTexts']);
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
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // console.log("Id: ", this.id);
        this.resetUpload = false;
    }
    /**
     * @return {?}
     */
    resetFileUpload() {
        this.selectedFiles = [];
        this.Caption = [];
        this.notAllowedList = [];
        this.uploadMsg = false;
        this.uploadBtn = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onChange(event) {
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
        let formatsCount;
        formatsCount = this.formatsAllowed.match(new RegExp('\\.', 'g'));
        formatsCount = formatsCount.length;
        // console.log("NO OF FORMATS ALLOWED= "+formatsCount);
        // console.log("-------------------------------");
        // ITERATE SELECTED FILES
        /** @type {?} */
        let file;
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
        let currentFileExt;
        /** @type {?} */
        let ext;
        /** @type {?} */
        let frmtAllowed;
        for (let i = 0; i < file.length; i++) {
            // CHECK FORMAT
            // CURRENT FILE EXTENSION
            currentFileExt = this.reg.exec(file[i].name);
            currentFileExt = currentFileExt[1];
            // console.log(file[i].name);
            frmtAllowed = false;
            // FORMAT ALLOWED LIST ITERATE
            for (let j = formatsCount; j > 0; j--) {
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
    }
    /**
     * @return {?}
     */
    uploadFiles() {
        // console.log(this.selectedFiles);
        /** @type {?} */
        let i;
        this.progressBarShow = true;
        this.uploadClick = false;
        this.notAllowedList = [];
        /** @type {?} */
        let isError = false;
        /** @type {?} */
        const xhr = new XMLHttpRequest();
        /** @type {?} */
        const formData = new FormData();
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
        xhr.onreadystatechange = evnt => {
            // console.log('onready');
            if (xhr.readyState === 4) {
                if (xhr.status !== 200 && xhr.status !== 201) {
                    isError = true;
                    this.progressBarShow = false;
                    this.uploadBtn = false;
                    this.uploadMsg = true;
                    this.afterUpload = true;
                    this.uploadMsgText = this.replaceTexts.afterUploadMsg_error;
                    this.uploadMsgClass = 'text-danger lead';
                    // console.log(this.uploadMsgText);
                    // console.log(evnt);
                }
                this.ApiResponse.emit(xhr);
            }
        };
        xhr.upload.onprogress = evnt => {
            this.uploadBtn = false; // button should be disabled by process uploading
            if (evnt.lengthComputable) {
                this.percentComplete = Math.round((evnt.loaded / evnt.total) * 100);
            }
            // console.log("Progress..."/*+this.percentComplete+" %"*/);
        };
        xhr.onload = evnt => {
            // console.log('onload');
            // console.log(evnt);
            this.progressBarShow = false;
            this.uploadBtn = false;
            this.uploadMsg = true;
            this.afterUpload = true;
            if (!isError) {
                this.uploadMsgText = this.replaceTexts.afterUploadMsg_success;
                this.uploadMsgClass = 'text-success lead';
                // console.log(this.uploadMsgText + " " + this.selectedFiles.length + " file");
            }
        };
        xhr.onerror = evnt => {
            // console.log('onerror');
            // console.log(evnt);
        };
        xhr.open('POST', this.uploadAPI, true);
        for (const key of Object.keys(this.headers)) {
            // Object.keys will give an Array of keys
            xhr.setRequestHeader(key, this.headers[key]);
        }
        if (this.responseType) {
            xhr.responseType = this.responseType;
        }
        // let token = sessionStorage.getItem("token");
        // xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        // xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
    }
    /**
     * @param {?} i
     * @param {?} sf_na
     * @return {?}
     */
    removeFile(i, sf_na) {
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
    }
    /**
     * @param {?} fileSize
     * @return {?}
     */
    convertSize(fileSize) {
        // console.log(fileSize + " - "+ str);
        return fileSize < 1024000
            ? (fileSize / 1024).toFixed(2) + ' KB'
            : (fileSize / 1024000).toFixed(2) + ' MB';
    }
    /**
     * @return {?}
     */
    attachpinOnclick() {
        // console.log("ID: ", this.id);
        (/** @type {?} */ (document.getElementById('sel' + this.id))).click();
        // $("#"+"sel"+this.id).click();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    drop(event) {
        event.stopPropagation();
        event.preventDefault();
        // console.log("drop: ", event);
        // console.log("drop: ", event.dataTransfer.files);
        this.onChange(event);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    allowDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
        // console.log("allowDrop: ",event)
    }
}
AngularFileUploaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'angular-file-uploader',
                template: `<div class="container" *ngIf="(theme !== 'attachPin')" id="default">

    <!-- Drag n Drop theme Starts -->
    <div *ngIf="theme == 'dragNDrop'" id="dragNDrop" [ngClass]="(hideSelectBtn && hideResetBtn) ? null : 'dragNDropBtmPad'" class="dragNDrop">
        <div style="position:relative;">
            <div id="div1" class="div1 afu-dragndrop-box" (drop)="drop($event)" (dragover)="allowDrop($event)">
                <p class="afu-dragndrop-text">{{replaceTexts?.dragNDropBox}}</p>
            </div>
            <!-- <span class='label label-info' id="upload-file-info{{id}}">{{selectedFiles[0]?.name}}</span> -->
        </div>
    </div>
    <!-- Drag n Drop theme Ends -->

    <label for="sel{{id}}" class="btn btn-primary btn-sm afu-select-btn" *ngIf="!hideSelectBtn">{{replaceTexts?.selectFileBtn}}</label>
    <input type="file" id="sel{{id}}" style="display: none" *ngIf="!hideSelectBtn" (change)="onChange($event)" title="Select file"
        name="files[]" [accept]=formatsAllowed [attr.multiple]="multiple ? '' : null" />
    <button class="btn btn-info btn-sm resetBtn afu-reset-btn" (click)="resetFileUpload()" *ngIf="!hideResetBtn">{{replaceTexts?.resetBtn}}</button>
    <br *ngIf="!hideSelectBtn">
    <p class="constraints-info afu-constraints-info">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize *1024000))}}</p>
    <!--Selected file list-->
    <div class="row afu-valid-file" *ngFor="let sf of selectedFiles;let i=index" >
        <p class="col-xs-3 textOverflow"><span class="text-primary">{{sf.name}}</span></p>
        <p class="col-xs-3 padMarg sizeC"><strong>({{convertSize(sf.size)}})</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <!--  <input class="col-xs-3 progress caption"  type="text"  placeholder="Caption.."  [(ngModel)]="Caption[i]"  *ngIf="uploadClick"/> -->
        <div class="progress col-xs-3 padMarg afu-progress-bar" *ngIf="singleFile && progressBarShow && !hideProgressBar">
            <span class="progress-bar progress-bar-success" role="progressbar" [ngStyle]="{'width':percentComplete+'%'}">{{percentComplete}}%</span>
        </div>
        <a class="col-xs-1" role="button" (click)="removeFile(i,'sf')" *ngIf="uploadClick"><i class="fa fa-times"></i></a>
    </div>
    <!--Invalid file list-->
    <div class="row text-danger afu-invalid-file" *ngFor="let na of notAllowedList;let j=index">
        <p class="col-xs-3 textOverflow"><span>{{na['fileName']}}</span></p>
        <p class="col-xs-3 padMarg sizeC"><strong>({{na['fileSize']}})</strong></p>
        <p class="col-xs-3 ">{{na['errorMsg']}}</p>
        <a class="col-xs-1 delFileIcon" role="button" (click)="removeFile(j,'na')" *ngIf="uploadClick">&nbsp;<i class="fa fa-times"></i></a>
    </div>

    <p *ngIf="uploadMsg" class="{{uploadMsgClass}} + afu-upload-status">{{uploadMsgText}}<p>
    <div *ngIf="!singleFile && progressBarShow && !hideProgressBar">
        <div class="progress col-xs-4 padMarg afu-progress-bar">
            <span class="progress-bar progress-bar-success" role="progressbar" [ngStyle]="{'width':percentComplete+'%'}">{{percentComplete}}%</span>
        </div>
        <br>
        <br>
    </div>
    <button class="btn btn-success afu-upload-btn" type="button" (click)="uploadFiles()" [disabled]=!uploadBtn>{{replaceTexts?.uploadBtn}}</button>
    <br>
</div>

<!--/////////////////////////// ATTACH PIN THEME  //////////////////////////////////////////////////////////-->
<div *ngIf="theme == 'attachPin'" id="attachPin">
    <div style="position:relative;padding-left:6px">
        <a class='btn up_btn afu-attach-pin' (click)="attachpinOnclick()">
          {{replaceTexts?.attachPinBtn}}
            <i class="fa fa-paperclip" aria-hidden="true"></i>
            <!-- <p style="margin-top:10px">({{formatsAllowed}}) Size limit- {{(convertSize(maxSize * 1024000))}}</p> -->
            <input type="file" id="sel{{id}}" (change)="onChange($event)" style="display: none" title="Select file" name="files[]" [accept]=formatsAllowed
                [attr.multiple]="multiple ? '' : null" />
            <br>
        </a>
        &nbsp;
        <span class='label label-info' id="upload-file-info{{id}}">{{selectedFiles[0]?.name}}</span>
    </div>
</div>

<!--/////////////////////////// DRAG N DROP THEME  //////////////////////////////////////////////////////////-->
<!-- <div *ngIf="theme == 'dragNDrop'" id="dragNDrop">
  <div style="position:relative;padding-left:6px">
    <div id="div1" (drop)="drop($event)" (dragover)="allowDrop($event)">
      <p>Drag N Drop</p>
    </div>
    <span class='label label-info' id="upload-file-info{{id}}">{{selectedFiles[0]?.name}}</span>
  </div>
</div> -->
`,
                styles: [`.constraints-info{margin-top:10px;font-style:italic}.padMarg{padding:0;margin-bottom:0}.caption{margin-right:5px}.textOverflow{white-space:nowrap;padding-right:0;overflow:hidden;text-overflow:ellipsis}.up_btn{color:#000;background-color:transparent;border:2px solid #5c5b5b;border-radius:22px}.delFileIcon{text-decoration:none;color:#ce0909}.dragNDrop .div1{display:border-box;border:2px dashed #5c5b5b;height:6rem;width:20rem}.dragNDrop .div1>p{text-align:center;font-weight:700;color:#5c5b5b;margin-top:1.4em}.dragNDropBtmPad{padding-bottom:2rem}@media screen and (max-width:620px){.caption{padding:0}}@media screen and (max-width:510px){.sizeC{width:25%}}@media screen and (max-width:260px){.caption,.sizeC{font-size:10px}}.resetBtn{margin-left:3px}`]
            },] },
];
AngularFileUploaderComponent.ctorParameters = () => [];
AngularFileUploaderComponent.propDecorators = {
    config: [{ type: Input }],
    resetUpload: [{ type: Input }],
    ApiResponse: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    AngularFileUploaderComponent.prototype.config;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.resetUpload;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.ApiResponse;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.theme;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.id;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.hideProgressBar;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.maxSize;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadAPI;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.formatsAllowed;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.multiple;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.headers;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.responseType;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.hideResetBtn;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.hideSelectBtn;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.idDate;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.reg;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.selectedFiles;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.notAllowedList;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.Caption;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.singleFile;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.progressBarShow;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadBtn;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadMsg;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.afterUpload;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadClick;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadMsgText;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.uploadMsgClass;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.percentComplete;
    /** @type {?} */
    AngularFileUploaderComponent.prototype.replaceTexts;
}
/**
 * @record
 */
function ReplaceTexts() { }
if (false) {
    /** @type {?} */
    ReplaceTexts.prototype.selectFileBtn;
    /** @type {?} */
    ReplaceTexts.prototype.resetBtn;
    /** @type {?} */
    ReplaceTexts.prototype.uploadBtn;
    /** @type {?} */
    ReplaceTexts.prototype.dragNDropBox;
    /** @type {?} */
    ReplaceTexts.prototype.attachPinBtn;
    /** @type {?} */
    ReplaceTexts.prototype.afterUploadMsg_success;
    /** @type {?} */
    ReplaceTexts.prototype.afterUploadMsg_error;
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1maWxlLXVwbG9hZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2FuZ3VsYXItZmlsZS11cGxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9hbmd1bGFyLWZpbGUtdXBsb2FkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUF1RCxNQUFNLGVBQWUsQ0FBQztBQWdGcEksTUFBTTtJQW9DSjtRQWxDQSxXQUFNLEdBQVEsRUFBRSxDQUFDO1FBRWpCLGdCQUFXLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVsRCxnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFjakMsV0FBTSxHQUFXLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM3QixRQUFHLEdBQVcsaUJBQWlCLENBQUM7UUFDaEMsa0JBQWEsR0FBZSxFQUFFLENBQUM7UUFDL0IsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBQ25DLFlBQU8sR0FBa0IsRUFBRSxDQUFDO1FBQzVCLGVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFDeEIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBT2pCLCtCQUErQjtRQUMvQix1Q0FBdUM7UUFDdkMsOEJBQThCO0lBQ2hDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLEdBQWtCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN4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QUFvQjs7SUFDcEIsbURBQW1COztJQUNuQixxREFBc0I7O0lBQ3RCLHNEQUF1Qjs7SUFDdkIsdURBQXdCOztJQUN4QixvREFBYTs7Ozs7QUE0U2QsMkJBUUE7OztJQVBDLHFDQUFzQjs7SUFDdEIsZ0NBQWlCOztJQUNqQixpQ0FBa0I7O0lBQ2xCLG9DQUFxQjs7SUFDckIsb0NBQXFCOztJQUNyQiw4Q0FBK0I7O0lBQy9CLDRDQUE2Qjs7QUFDOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgSW5qZWN0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FuZ3VsYXItZmlsZS11cGxvYWRlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgKm5nSWY9XCIodGhlbWUgIT09ICdhdHRhY2hQaW4nKVwiIGlkPVwiZGVmYXVsdFwiPlxyXG5cclxuICAgIDwhLS0gRHJhZyBuIERyb3AgdGhlbWUgU3RhcnRzIC0tPlxyXG4gICAgPGRpdiAqbmdJZj1cInRoZW1lID09ICdkcmFnTkRyb3AnXCIgaWQ9XCJkcmFnTkRyb3BcIiBbbmdDbGFzc109XCIoaGlkZVNlbGVjdEJ0biAmJiBoaWRlUmVzZXRCdG4pID8gbnVsbCA6ICdkcmFnTkRyb3BCdG1QYWQnXCIgY2xhc3M9XCJkcmFnTkRyb3BcIj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJkaXYxXCIgY2xhc3M9XCJkaXYxIGFmdS1kcmFnbmRyb3AtYm94XCIgKGRyb3ApPVwiZHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImFsbG93RHJvcCgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFmdS1kcmFnbmRyb3AtdGV4dFwiPnt7cmVwbGFjZVRleHRzPy5kcmFnTkRyb3BCb3h9fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPiAtLT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLSBEcmFnIG4gRHJvcCB0aGVtZSBFbmRzIC0tPlxyXG5cclxuICAgIDxsYWJlbCBmb3I9XCJzZWx7e2lkfX1cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBidG4tc20gYWZ1LXNlbGVjdC1idG5cIiAqbmdJZj1cIiFoaWRlU2VsZWN0QnRuXCI+e3tyZXBsYWNlVGV4dHM/LnNlbGVjdEZpbGVCdG59fTwvbGFiZWw+XHJcbiAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNlbHt7aWR9fVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIiAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIiB0aXRsZT1cIlNlbGVjdCBmaWxlXCJcclxuICAgICAgICBuYW1lPVwiZmlsZXNbXVwiIFthY2NlcHRdPWZvcm1hdHNBbGxvd2VkIFthdHRyLm11bHRpcGxlXT1cIm11bHRpcGxlID8gJycgOiBudWxsXCIgLz5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWluZm8gYnRuLXNtIHJlc2V0QnRuIGFmdS1yZXNldC1idG5cIiAoY2xpY2spPVwicmVzZXRGaWxlVXBsb2FkKClcIiAqbmdJZj1cIiFoaWRlUmVzZXRCdG5cIj57e3JlcGxhY2VUZXh0cz8ucmVzZXRCdG59fTwvYnV0dG9uPlxyXG4gICAgPGJyICpuZ0lmPVwiIWhpZGVTZWxlY3RCdG5cIj5cclxuICAgIDxwIGNsYXNzPVwiY29uc3RyYWludHMtaW5mbyBhZnUtY29uc3RyYWludHMtaW5mb1wiPih7e2Zvcm1hdHNBbGxvd2VkfX0pIFNpemUgbGltaXQtIHt7KGNvbnZlcnRTaXplKG1heFNpemUgKjEwMjQwMDApKX19PC9wPlxyXG4gICAgPCEtLVNlbGVjdGVkIGZpbGUgbGlzdC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyBhZnUtdmFsaWQtZmlsZVwiICpuZ0Zvcj1cImxldCBzZiBvZiBzZWxlY3RlZEZpbGVzO2xldCBpPWluZGV4XCIgPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgdGV4dE92ZXJmbG93XCI+PHNwYW4gY2xhc3M9XCJ0ZXh0LXByaW1hcnlcIj57e3NmLm5hbWV9fTwvc3Bhbj48L3A+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBwYWRNYXJnIHNpemVDXCI+PHN0cm9uZz4oe3tjb252ZXJ0U2l6ZShzZi5zaXplKX19KTwvc3Ryb25nPiZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOzwvcD5cclxuICAgICAgICA8IS0tICA8aW5wdXQgY2xhc3M9XCJjb2wteHMtMyBwcm9ncmVzcyBjYXB0aW9uXCIgIHR5cGU9XCJ0ZXh0XCIgIHBsYWNlaG9sZGVyPVwiQ2FwdGlvbi4uXCIgIFsobmdNb2RlbCldPVwiQ2FwdGlvbltpXVwiICAqbmdJZj1cInVwbG9hZENsaWNrXCIvPiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MgY29sLXhzLTMgcGFkTWFyZyBhZnUtcHJvZ3Jlc3MtYmFyXCIgKm5nSWY9XCJzaW5nbGVGaWxlICYmIHByb2dyZXNzQmFyU2hvdyAmJiAhaGlkZVByb2dyZXNzQmFyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZ3Jlc3MtYmFyIHByb2dyZXNzLWJhci1zdWNjZXNzXCIgcm9sZT1cInByb2dyZXNzYmFyXCIgW25nU3R5bGVdPVwieyd3aWR0aCc6cGVyY2VudENvbXBsZXRlKyclJ31cIj57e3BlcmNlbnRDb21wbGV0ZX19JTwvc3Bhbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8YSBjbGFzcz1cImNvbC14cy0xXCIgcm9sZT1cImJ1dHRvblwiIChjbGljayk9XCJyZW1vdmVGaWxlKGksJ3NmJylcIiAqbmdJZj1cInVwbG9hZENsaWNrXCI+PGkgY2xhc3M9XCJmYSBmYS10aW1lc1wiPjwvaT48L2E+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS1JbnZhbGlkIGZpbGUgbGlzdC0tPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyB0ZXh0LWRhbmdlciBhZnUtaW52YWxpZC1maWxlXCIgKm5nRm9yPVwibGV0IG5hIG9mIG5vdEFsbG93ZWRMaXN0O2xldCBqPWluZGV4XCI+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyB0ZXh0T3ZlcmZsb3dcIj48c3Bhbj57e25hWydmaWxlTmFtZSddfX08L3NwYW4+PC9wPlxyXG4gICAgICAgIDxwIGNsYXNzPVwiY29sLXhzLTMgcGFkTWFyZyBzaXplQ1wiPjxzdHJvbmc+KHt7bmFbJ2ZpbGVTaXplJ119fSk8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgPHAgY2xhc3M9XCJjb2wteHMtMyBcIj57e25hWydlcnJvck1zZyddfX08L3A+XHJcbiAgICAgICAgPGEgY2xhc3M9XCJjb2wteHMtMSBkZWxGaWxlSWNvblwiIHJvbGU9XCJidXR0b25cIiAoY2xpY2spPVwicmVtb3ZlRmlsZShqLCduYScpXCIgKm5nSWY9XCJ1cGxvYWRDbGlja1wiPiZuYnNwOzxpIGNsYXNzPVwiZmEgZmEtdGltZXNcIj48L2k+PC9hPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPHAgKm5nSWY9XCJ1cGxvYWRNc2dcIiBjbGFzcz1cInt7dXBsb2FkTXNnQ2xhc3N9fSArIGFmdS11cGxvYWQtc3RhdHVzXCI+e3t1cGxvYWRNc2dUZXh0fX08cD5cclxuICAgIDxkaXYgKm5nSWY9XCIhc2luZ2xlRmlsZSAmJiBwcm9ncmVzc0JhclNob3cgJiYgIWhpZGVQcm9ncmVzc0JhclwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcyBjb2wteHMtNCBwYWRNYXJnIGFmdS1wcm9ncmVzcy1iYXJcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXN1Y2Nlc3NcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIiBbbmdTdHlsZV09XCJ7J3dpZHRoJzpwZXJjZW50Q29tcGxldGUrJyUnfVwiPnt7cGVyY2VudENvbXBsZXRlfX0lPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxicj5cclxuICAgICAgICA8YnI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3MgYWZ1LXVwbG9hZC1idG5cIiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cInVwbG9hZEZpbGVzKClcIiBbZGlzYWJsZWRdPSF1cGxvYWRCdG4+e3tyZXBsYWNlVGV4dHM/LnVwbG9hZEJ0bn19PC9idXR0b24+XHJcbiAgICA8YnI+XHJcbjwvZGl2PlxyXG5cclxuPCEtLS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBBVFRBQ0ggUElOIFRIRU1FICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLS0+XHJcbjxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnYXR0YWNoUGluJ1wiIGlkPVwiYXR0YWNoUGluXCI+XHJcbiAgICA8ZGl2IHN0eWxlPVwicG9zaXRpb246cmVsYXRpdmU7cGFkZGluZy1sZWZ0OjZweFwiPlxyXG4gICAgICAgIDxhIGNsYXNzPSdidG4gdXBfYnRuIGFmdS1hdHRhY2gtcGluJyAoY2xpY2spPVwiYXR0YWNocGluT25jbGljaygpXCI+XHJcbiAgICAgICAgICB7e3JlcGxhY2VUZXh0cz8uYXR0YWNoUGluQnRufX1cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJmYSBmYS1wYXBlcmNsaXBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgIDwhLS0gPHAgc3R5bGU9XCJtYXJnaW4tdG9wOjEwcHhcIj4oe3tmb3JtYXRzQWxsb3dlZH19KSBTaXplIGxpbWl0LSB7eyhjb252ZXJ0U2l6ZShtYXhTaXplICogMTAyNDAwMCkpfX08L3A+IC0tPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInNlbHt7aWR9fVwiIChjaGFuZ2UpPVwib25DaGFuZ2UoJGV2ZW50KVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiIHRpdGxlPVwiU2VsZWN0IGZpbGVcIiBuYW1lPVwiZmlsZXNbXVwiIFthY2NlcHRdPWZvcm1hdHNBbGxvd2VkXHJcbiAgICAgICAgICAgICAgICBbYXR0ci5tdWx0aXBsZV09XCJtdWx0aXBsZSA/ICcnIDogbnVsbFwiIC8+XHJcbiAgICAgICAgICAgIDxicj5cclxuICAgICAgICA8L2E+XHJcbiAgICAgICAgJm5ic3A7XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9J2xhYmVsIGxhYmVsLWluZm8nIGlkPVwidXBsb2FkLWZpbGUtaW5mb3t7aWR9fVwiPnt7c2VsZWN0ZWRGaWxlc1swXT8ubmFtZX19PC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuPCEtLS8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBEUkFHIE4gRFJPUCBUSEVNRSAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy0tPlxyXG48IS0tIDxkaXYgKm5nSWY9XCJ0aGVtZSA9PSAnZHJhZ05Ecm9wJ1wiIGlkPVwiZHJhZ05Ecm9wXCI+XHJcbiAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO3BhZGRpbmctbGVmdDo2cHhcIj5cclxuICAgIDxkaXYgaWQ9XCJkaXYxXCIgKGRyb3ApPVwiZHJvcCgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cImFsbG93RHJvcCgkZXZlbnQpXCI+XHJcbiAgICAgIDxwPkRyYWcgTiBEcm9wPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8c3BhbiBjbGFzcz0nbGFiZWwgbGFiZWwtaW5mbycgaWQ9XCJ1cGxvYWQtZmlsZS1pbmZve3tpZH19XCI+e3tzZWxlY3RlZEZpbGVzWzBdPy5uYW1lfX08L3NwYW4+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PiAtLT5cclxuYCAsXHJcbiAgc3R5bGVzOiBbYC5jb25zdHJhaW50cy1pbmZve21hcmdpbi10b3A6MTBweDtmb250LXN0eWxlOml0YWxpY30ucGFkTWFyZ3twYWRkaW5nOjA7bWFyZ2luLWJvdHRvbTowfS5jYXB0aW9ue21hcmdpbi1yaWdodDo1cHh9LnRleHRPdmVyZmxvd3t3aGl0ZS1zcGFjZTpub3dyYXA7cGFkZGluZy1yaWdodDowO292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzfS51cF9idG57Y29sb3I6IzAwMDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjoycHggc29saWQgIzVjNWI1Yjtib3JkZXItcmFkaXVzOjIycHh9LmRlbEZpbGVJY29ue3RleHQtZGVjb3JhdGlvbjpub25lO2NvbG9yOiNjZTA5MDl9LmRyYWdORHJvcCAuZGl2MXtkaXNwbGF5OmJvcmRlci1ib3g7Ym9yZGVyOjJweCBkYXNoZWQgIzVjNWI1YjtoZWlnaHQ6NnJlbTt3aWR0aDoyMHJlbX0uZHJhZ05Ecm9wIC5kaXYxPnB7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiM1YzViNWI7bWFyZ2luLXRvcDoxLjRlbX0uZHJhZ05Ecm9wQnRtUGFke3BhZGRpbmctYm90dG9tOjJyZW19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDo2MjBweCl7LmNhcHRpb257cGFkZGluZzowfX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjUxMHB4KXsuc2l6ZUN7d2lkdGg6MjUlfX1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOjI2MHB4KXsuY2FwdGlvbiwuc2l6ZUN7Zm9udC1zaXplOjEwcHh9fS5yZXNldEJ0bnttYXJnaW4tbGVmdDozcHh9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaWxlVXBsb2FkZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KClcclxuICBjb25maWc6IGFueSA9IHt9O1xyXG4gIEBJbnB1dCgpXHJcbiAgcmVzZXRVcGxvYWQ6IGJvb2xlYW4gPSB0aGlzLmNvbmZpZ1sncmVzZXRVcGxvYWQnXTtcclxuICBAT3V0cHV0KClcclxuICBBcGlSZXNwb25zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgdGhlbWU6IHN0cmluZztcclxuICBpZDogbnVtYmVyO1xyXG4gIGhpZGVQcm9ncmVzc0JhcjogYm9vbGVhbjtcclxuICBtYXhTaXplOiBudW1iZXI7XHJcbiAgdXBsb2FkQVBJOiBzdHJpbmc7XHJcbiAgZm9ybWF0c0FsbG93ZWQ6IHN0cmluZztcclxuICBtdWx0aXBsZTogYm9vbGVhbjtcclxuICBoZWFkZXJzOiBhbnk7XHJcbiAgcmVzcG9uc2VUeXBlOiBhbnk7XHJcbiAgaGlkZVJlc2V0QnRuOiBib29sZWFuO1xyXG4gIGhpZGVTZWxlY3RCdG46IGJvb2xlYW47XHJcblxyXG4gIGlkRGF0ZTogbnVtYmVyID0gK25ldyBEYXRlKCk7XHJcbiAgcmVnOiBSZWdFeHAgPSAvKD86XFwuKFteLl0rKSk/JC87XHJcbiAgc2VsZWN0ZWRGaWxlczogQXJyYXk8YW55PiA9IFtdO1xyXG4gIG5vdEFsbG93ZWRMaXN0OiBBcnJheTxPYmplY3Q+ID0gW107XHJcbiAgQ2FwdGlvbjogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gIHNpbmdsZUZpbGUgPSB0cnVlO1xyXG4gIHByb2dyZXNzQmFyU2hvdyA9IGZhbHNlO1xyXG4gIHVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gIHVwbG9hZE1zZyA9IGZhbHNlO1xyXG4gIGFmdGVyVXBsb2FkID0gZmFsc2U7XHJcbiAgdXBsb2FkQ2xpY2sgPSB0cnVlO1xyXG4gIHVwbG9hZE1zZ1RleHQ6IHN0cmluZztcclxuICB1cGxvYWRNc2dDbGFzczogc3RyaW5nO1xyXG4gIHBlcmNlbnRDb21wbGV0ZTogbnVtYmVyO1xyXG4gIHJlcGxhY2VUZXh0cztcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImlkOiBcIix0aGlzLmlkKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiaWREYXRlOiBcIix0aGlzLmlkRGF0ZSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhNYXRoLnJhbmRvbSgpKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKHJzdDogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgaWYgKHJzdFsnY29uZmlnJ10pIHtcclxuICAgICAgdGhpcy50aGVtZSA9IHRoaXMuY29uZmlnWyd0aGVtZSddIHx8ICcnO1xyXG4gICAgICB0aGlzLmlkID1cclxuICAgICAgICB0aGlzLmNvbmZpZ1snaWQnXSB8fFxyXG4gICAgICAgIHBhcnNlSW50KCh0aGlzLmlkRGF0ZSAvIDEwMDAwKS50b1N0cmluZygpLnNwbGl0KCcuJylbMV0pICtcclxuICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwKSAqIDEwMDAwO1xyXG4gICAgICB0aGlzLmhpZGVQcm9ncmVzc0JhciA9IHRoaXMuY29uZmlnWydoaWRlUHJvZ3Jlc3NCYXInXSB8fCBmYWxzZTtcclxuICAgICAgdGhpcy5oaWRlUmVzZXRCdG4gPSB0aGlzLmNvbmZpZ1snaGlkZVJlc2V0QnRuJ10gfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMuaGlkZVNlbGVjdEJ0biA9IHRoaXMuY29uZmlnWydoaWRlU2VsZWN0QnRuJ10gfHwgZmFsc2U7XHJcbiAgICAgIHRoaXMubWF4U2l6ZSA9IHRoaXMuY29uZmlnWydtYXhTaXplJ10gfHwgMjA7XHJcbiAgICAgIHRoaXMudXBsb2FkQVBJID0gdGhpcy5jb25maWdbJ3VwbG9hZEFQSSddWyd1cmwnXTtcclxuICAgICAgdGhpcy5mb3JtYXRzQWxsb3dlZCA9XHJcbiAgICAgICAgdGhpcy5jb25maWdbJ2Zvcm1hdHNBbGxvd2VkJ10gfHwgJy5qcGcsLnBuZywucGRmLC5kb2N4LC50eHQsLmdpZiwuanBlZyc7XHJcbiAgICAgIHRoaXMubXVsdGlwbGUgPSB0aGlzLmNvbmZpZ1snbXVsdGlwbGUnXSB8fCBmYWxzZTtcclxuICAgICAgdGhpcy5oZWFkZXJzID0gdGhpcy5jb25maWdbJ3VwbG9hZEFQSSddWydoZWFkZXJzJ10gfHwge307XHJcbiAgICAgIHRoaXMucmVzcG9uc2VUeXBlID0gdGhpcy5jb25maWdbJ3VwbG9hZEFQSSddWydyZXNwb25zZVR5cGUnXSB8fCB7fTtcclxuICAgICAgY29uc3QgZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlczogUmVwbGFjZVRleHRzID0gIHtcclxuICAgICAgICBzZWxlY3RGaWxlQnRuOiB0aGlzLm11bHRpcGxlID8gJ1NlbGVjdCBGaWxlcycgOiAnU2VsZWN0IEZpbGUnLFxyXG4gICAgICAgIHJlc2V0QnRuOiAnUmVzZXQnLFxyXG4gICAgICAgIHVwbG9hZEJ0bjogJ1VwbG9hZCcsXHJcbiAgICAgICAgZHJhZ05Ecm9wQm94OiAnRHJhZyBOIERyb3AnLFxyXG4gICAgICAgIGF0dGFjaFBpbkJ0bjogdGhpcy5tdWx0aXBsZSA/ICdBdHRhY2ggRmlsZXMuLi4nIDogJ0F0dGFjaCBGaWxlLi4uJyxcclxuICAgICAgICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiAnU3VjY2Vzc2Z1bGx5IFVwbG9hZGVkICEnLFxyXG4gICAgICAgIGFmdGVyVXBsb2FkTXNnX2Vycm9yOiAnVXBsb2FkIEZhaWxlZCAhJ1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLnJlcGxhY2VUZXh0cyA9IHsuLi5kZWZhdWx0UmVwbGFjZVRleHRzVmFsdWVzfTtcclxuICAgICAgaWYgKHRoaXMuY29uZmlnWydyZXBsYWNlVGV4dHMnXSkge1xyXG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRzID0ge1xyXG4gICAgICAgICAgLi4uZGVmYXVsdFJlcGxhY2VUZXh0c1ZhbHVlcyxcclxuICAgICAgICAgIC4uLnRoaXMuY29uZmlnWydyZXBsYWNlVGV4dHMnXVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiY29uZmlnOiBcIiwgdGhpcy5jb25maWcpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmNvbmZpZ1tcIm1heFNpemVcIl0pO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmhlYWRlcnMpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcInJzdDogXCIsIHJzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJzdFsncmVzZXRVcGxvYWQnXSkge1xyXG4gICAgICBpZiAocnN0WydyZXNldFVwbG9hZCddLmN1cnJlbnRWYWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHRoaXMucmVzZXRGaWxlVXBsb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJJZDogXCIsIHRoaXMuaWQpO1xyXG4gICAgdGhpcy5yZXNldFVwbG9hZCA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmVzZXRGaWxlVXBsb2FkKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEZpbGVzID0gW107XHJcbiAgICB0aGlzLkNhcHRpb24gPSBbXTtcclxuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcclxuICAgIHRoaXMudXBsb2FkTXNnID0gZmFsc2U7XHJcbiAgICB0aGlzLnVwbG9hZEJ0biA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgb25DaGFuZ2UoZXZlbnQ6IGFueSkge1xyXG4gICAgLy8gY29uc29sZS5sb2codGhpcy5tYXhTaXplICsgdGhpcy5mb3JtYXRzQWxsb3dlZCArIHRoaXMubXVsdGlwbGUpO1xyXG4gICAgdGhpcy5ub3RBbGxvd2VkTGlzdCA9IFtdO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJvbmNoYW5nZSBoaXRcIik7XHJcbiAgICBpZiAodGhpcy5hZnRlclVwbG9hZCB8fCAhdGhpcy5tdWx0aXBsZSkge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMgPSBbXTtcclxuICAgICAgdGhpcy5DYXB0aW9uID0gW107XHJcbiAgICAgIHRoaXMuYWZ0ZXJVcGxvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIEZPUk1BVFMgQUxMT1dFRCBMSVNUXHJcbiAgICAvLyBjb25zb2xlLmxvZyhcIkZPUk1BVFMgQUxMT1dFRCBMSVNUPSBcIit0aGlzLmZvcm1hdHNBbGxvd2VkKTtcclxuICAgIC8vIE5PIE9GIEZPUk1BVFMgQUxMT1dFRFxyXG4gICAgbGV0IGZvcm1hdHNDb3VudDogYW55O1xyXG4gICAgZm9ybWF0c0NvdW50ID0gdGhpcy5mb3JtYXRzQWxsb3dlZC5tYXRjaChuZXcgUmVnRXhwKCdcXFxcLicsICdnJykpO1xyXG4gICAgZm9ybWF0c0NvdW50ID0gZm9ybWF0c0NvdW50Lmxlbmd0aDtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiTk8gT0YgRk9STUFUUyBBTExPV0VEPSBcIitmb3JtYXRzQ291bnQpO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG5cclxuICAgIC8vIElURVJBVEUgU0VMRUNURUQgRklMRVNcclxuICAgIGxldCBmaWxlOiBGaWxlTGlzdDtcclxuICAgIGlmIChldmVudC50eXBlID09PSAnZHJvcCcpIHtcclxuICAgICAgZmlsZSA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcztcclxuICAgICAgLy8gY29uc29sZS5sb2coXCJ0eXBlOiBkcm9wXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZmlsZSA9IGV2ZW50LnRhcmdldC5maWxlcyB8fCBldmVudC5zcmNFbGVtZW50LmZpbGVzO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhcInR5cGU6IGNoYW5nZVwiKTtcclxuICAgIH1cclxuICAgIC8vIGNvbnNvbGUubG9nKGZpbGUpO1xyXG4gICAgbGV0IGN1cnJlbnRGaWxlRXh0OiBhbnk7XHJcbiAgICBsZXQgZXh0OiBhbnk7XHJcbiAgICBsZXQgZnJtdEFsbG93ZWQ6IGJvb2xlYW47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgLy8gQ0hFQ0sgRk9STUFUXHJcbiAgICAgIC8vIENVUlJFTlQgRklMRSBFWFRFTlNJT05cclxuICAgICAgY3VycmVudEZpbGVFeHQgPSB0aGlzLnJlZy5leGVjKGZpbGVbaV0ubmFtZSk7XHJcbiAgICAgIGN1cnJlbnRGaWxlRXh0ID0gY3VycmVudEZpbGVFeHRbMV07XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGZpbGVbaV0ubmFtZSk7XHJcbiAgICAgIGZybXRBbGxvd2VkID0gZmFsc2U7XHJcbiAgICAgIC8vIEZPUk1BVCBBTExPV0VEIExJU1QgSVRFUkFURVxyXG4gICAgICBmb3IgKGxldCBqID0gZm9ybWF0c0NvdW50OyBqID4gMDsgai0tKSB7XHJcbiAgICAgICAgZXh0ID0gdGhpcy5mb3JtYXRzQWxsb3dlZC5zcGxpdCgnLicpW2pdO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9STUFUIExJU1QgKFwiK2orXCIpPSBcIitleHQuc3BsaXQoXCIsXCIpWzBdKTtcclxuICAgICAgICBpZiAoaiA9PT0gZm9ybWF0c0NvdW50KSB7XHJcbiAgICAgICAgICBleHQgPSB0aGlzLmZvcm1hdHNBbGxvd2VkLnNwbGl0KCcuJylbal0gKyAnLCc7XHJcbiAgICAgICAgfSAvLyBjaGVjayBmb3JtYXRcclxuICAgICAgICBpZiAoY3VycmVudEZpbGVFeHQudG9Mb3dlckNhc2UoKSA9PT0gZXh0LnNwbGl0KCcsJylbMF0pIHtcclxuICAgICAgICAgIGZybXRBbGxvd2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChmcm10QWxsb3dlZCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiRk9STUFUIEFMTE9XRURcIik7XHJcbiAgICAgICAgLy8gQ0hFQ0sgU0laRVxyXG4gICAgICAgIGlmIChmaWxlW2ldLnNpemUgPiB0aGlzLm1heFNpemUgKiAxMDI0MDAwKSB7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlNJWkUgTk9UIEFMTE9XRUQgKFwiK2ZpbGVbaV0uc2l6ZStcIilcIik7XHJcbiAgICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICBmaWxlTmFtZTogZmlsZVtpXS5uYW1lLFxyXG4gICAgICAgICAgICBmaWxlU2l6ZTogdGhpcy5jb252ZXJ0U2l6ZShmaWxlW2ldLnNpemUpLFxyXG4gICAgICAgICAgICBlcnJvck1zZzogJ0ludmFsaWQgc2l6ZSdcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIGZvcm1hdCBhbGxvd2VkIGFuZCBzaXplIGFsbG93ZWQgdGhlbiBhZGQgZmlsZSB0byBzZWxlY3RlZEZpbGUgYXJyYXlcclxuICAgICAgICAgIHRoaXMuc2VsZWN0ZWRGaWxlcy5wdXNoKGZpbGVbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkZPUk1BVCBOT1QgQUxMT1dFRFwiKTtcclxuICAgICAgICB0aGlzLm5vdEFsbG93ZWRMaXN0LnB1c2goe1xyXG4gICAgICAgICAgZmlsZU5hbWU6IGZpbGVbaV0ubmFtZSxcclxuICAgICAgICAgIGZpbGVTaXplOiB0aGlzLmNvbnZlcnRTaXplKGZpbGVbaV0uc2l6ZSksXHJcbiAgICAgICAgICBlcnJvck1zZzogJ0ludmFsaWQgZm9ybWF0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgdGhpcy51cGxvYWRCdG4gPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy50aGVtZSA9PT0gJ2F0dGFjaFBpbicpIHtcclxuICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLnVwbG9hZE1zZyA9IGZhbHNlO1xyXG4gICAgdGhpcy51cGxvYWRDbGljayA9IHRydWU7XHJcbiAgICB0aGlzLnBlcmNlbnRDb21wbGV0ZSA9IDA7XHJcbiAgICBldmVudC50YXJnZXQudmFsdWUgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdXBsb2FkRmlsZXMoKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnNlbGVjdGVkRmlsZXMpO1xyXG4gICAgbGV0IGk6IGFueTtcclxuICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gdHJ1ZTtcclxuICAgIHRoaXMudXBsb2FkQ2xpY2sgPSBmYWxzZTtcclxuICAgIHRoaXMubm90QWxsb3dlZExpc3QgPSBbXTtcclxuICAgIGxldCBpc0Vycm9yID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuQ2FwdGlvbltpXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5DYXB0aW9uW2ldID0gJ2ZpbGUnICsgaTtcclxuICAgICAgfVxyXG4gICAgICAvLyBBZGQgREFUQSBUTyBCRSBTRU5UXHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChcclxuICAgICAgICB0aGlzLkNhcHRpb25baV0sXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZpbGVzW2ldIC8qLCB0aGlzLnNlbGVjdGVkRmlsZXNbaV0ubmFtZSovXHJcbiAgICAgICk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRGaWxlc1tpXStcIntcIit0aGlzLkNhcHRpb25baV0rXCIgKENhcHRpb24pfVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaSA+IDEpIHtcclxuICAgICAgdGhpcy5zaW5nbGVGaWxlID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNpbmdsZUZpbGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBldm50ID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ29ucmVhZHknKTtcclxuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgIT09IDIwMCAmJiB4aHIuc3RhdHVzICE9PSAyMDEpIHtcclxuICAgICAgICAgIGlzRXJyb3IgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhclNob3cgPSBmYWxzZTtcclxuICAgICAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnVwbG9hZE1zZyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLmFmdGVyVXBsb2FkID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX2Vycm9yO1xyXG4gICAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9ICd0ZXh0LWRhbmdlciBsZWFkJztcclxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMudXBsb2FkTXNnVGV4dCk7XHJcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhldm50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5BcGlSZXNwb25zZS5lbWl0KHhocik7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZXZudCA9PiB7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7IC8vIGJ1dHRvbiBzaG91bGQgYmUgZGlzYWJsZWQgYnkgcHJvY2VzcyB1cGxvYWRpbmdcclxuICAgICAgaWYgKGV2bnQubGVuZ3RoQ29tcHV0YWJsZSkge1xyXG4gICAgICAgIHRoaXMucGVyY2VudENvbXBsZXRlID0gTWF0aC5yb3VuZCgoZXZudC5sb2FkZWQgLyBldm50LnRvdGFsKSAqIDEwMCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gY29uc29sZS5sb2coXCJQcm9ncmVzcy4uLlwiLyordGhpcy5wZXJjZW50Q29tcGxldGUrXCIgJVwiKi8pO1xyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub25sb2FkID0gZXZudCA9PiB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdvbmxvYWQnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coZXZudCk7XHJcbiAgICAgIHRoaXMucHJvZ3Jlc3NCYXJTaG93ID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudXBsb2FkQnRuID0gZmFsc2U7XHJcbiAgICAgIHRoaXMudXBsb2FkTXNnID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hZnRlclVwbG9hZCA9IHRydWU7XHJcbiAgICAgIGlmICghaXNFcnJvcikge1xyXG4gICAgICAgIHRoaXMudXBsb2FkTXNnVGV4dCA9IHRoaXMucmVwbGFjZVRleHRzLmFmdGVyVXBsb2FkTXNnX3N1Y2Nlc3M7XHJcbiAgICAgICAgdGhpcy51cGxvYWRNc2dDbGFzcyA9ICd0ZXh0LXN1Y2Nlc3MgbGVhZCc7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy51cGxvYWRNc2dUZXh0ICsgXCIgXCIgKyB0aGlzLnNlbGVjdGVkRmlsZXMubGVuZ3RoICsgXCIgZmlsZVwiKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub25lcnJvciA9IGV2bnQgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnb25lcnJvcicpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhldm50KTtcclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB0aGlzLnVwbG9hZEFQSSwgdHJ1ZSk7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmhlYWRlcnMpKSB7XHJcbiAgICAgIC8vIE9iamVjdC5rZXlzIHdpbGwgZ2l2ZSBhbiBBcnJheSBvZiBrZXlzXHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdGhpcy5oZWFkZXJzW2tleV0pO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMucmVzcG9uc2VUeXBlKSB7XHJcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLnJlc3BvbnNlVHlwZTtcclxuICAgIH1cclxuICAgIC8vIGxldCB0b2tlbiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ0b2tlblwiKTtcclxuICAgIC8vIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xyXG4gICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dG9rZW59YCk7XHJcbiAgICB4aHIuc2VuZChmb3JtRGF0YSk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVGaWxlKGk6IGFueSwgc2ZfbmE6IGFueSkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJyZW1vdmUgZmlsZSBjbGlja2VkIFwiICsgaSlcclxuICAgIGlmIChzZl9uYSA9PT0gJ3NmJykge1xyXG4gICAgICB0aGlzLnNlbGVjdGVkRmlsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICB0aGlzLkNhcHRpb24uc3BsaWNlKGksIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5ub3RBbGxvd2VkTGlzdC5zcGxpY2UoaSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRGaWxlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy51cGxvYWRCdG4gPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnZlcnRTaXplKGZpbGVTaXplOiBudW1iZXIpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGZpbGVTaXplICsgXCIgLSBcIisgc3RyKTtcclxuICAgIHJldHVybiBmaWxlU2l6ZSA8IDEwMjQwMDBcclxuICAgICAgPyAoZmlsZVNpemUgLyAxMDI0KS50b0ZpeGVkKDIpICsgJyBLQidcclxuICAgICAgOiAoZmlsZVNpemUgLyAxMDI0MDAwKS50b0ZpeGVkKDIpICsgJyBNQic7XHJcbiAgfVxyXG5cclxuICBhdHRhY2hwaW5PbmNsaWNrKCkge1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJJRDogXCIsIHRoaXMuaWQpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbCcgKyB0aGlzLmlkKSEuY2xpY2soKTtcclxuICAgIC8vICQoXCIjXCIrXCJzZWxcIit0aGlzLmlkKS5jbGljaygpO1xyXG4gIH1cclxuXHJcbiAgZHJvcChldmVudDogYW55KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImRyb3A6IFwiLCBldmVudCk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcImRyb3A6IFwiLCBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xyXG4gICAgdGhpcy5vbkNoYW5nZShldmVudCk7XHJcbiAgfVxyXG4gIGFsbG93RHJvcChldmVudDogYW55KSB7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdjb3B5JztcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiYWxsb3dEcm9wOiBcIixldmVudClcclxuICB9XHJcbn1cclxuXHJcbi8qIGludGVyZmFjZSBDT05GSUcge1xyXG4gIHVwbG9hZEFQSTogc3RyaW5nO1xyXG4gIG11bHRpcGxlPzogYm9vbGVhbjtcclxuICBmb3JtYXRzQWxsb3dlZD86IHN0cmluZztcclxuICBtYXhTaXplPzogbnVtYmVyO1xyXG4gIGlkPzogbnVtYmVyO1xyXG4gIHJlc2V0VXBsb2FkPzogYm9vbGVhbjtcclxuICB0aGVtZT86IHN0cmluZztcclxuICBoaWRlUHJvZ3Jlc3NCYXI/OiBib29sZWFuO1xyXG4gfVxyXG4gKi9cclxuXHJcbiBpbnRlcmZhY2UgUmVwbGFjZVRleHRzIHtcclxuICBzZWxlY3RGaWxlQnRuOiBzdHJpbmcsXHJcbiAgcmVzZXRCdG46IHN0cmluZyxcclxuICB1cGxvYWRCdG46IHN0cmluZyxcclxuICBkcmFnTkRyb3BCb3g6IHN0cmluZyxcclxuICBhdHRhY2hQaW5CdG46IHN0cmluZyxcclxuICBhZnRlclVwbG9hZE1zZ19zdWNjZXNzOiBzdHJpbmcsXHJcbiAgYWZ0ZXJVcGxvYWRNc2dfZXJyb3I6IHN0cmluZyxcclxufTtcclxuIl19