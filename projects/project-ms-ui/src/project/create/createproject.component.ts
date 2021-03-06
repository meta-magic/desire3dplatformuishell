import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'platform-commons';
import { NotificationService } from 'platform-commons';
import { MessagingService } from 'platform-commons';
import { LoaderService } from 'platform-commons';
import { Router, ActivatedRoute } from '@angular/router';
import {CookieService} from "ngx-cookie-service";
@Component({
  selector: 'project-create',
  template: `
  <amexio-row>
    <amexio-column [size]="3">
   <amexio-card  [header]="false" [footer]="true" [footer-align]="'right'"  [body-height]="80">
    <amexio-body [padding]="'0px'">
     <amexio-listbox [enable-checkbox]="false"
                [header]="'Projects'"
                [search-placeholder]="'Search'"
                [data]="projectList"
                [filter]="true"
                [data-reader]="'response'"
                [display-field]="'projectName'"
                [border]="'none'"
                (onRowClick)="onProjectSelect($event)">
</amexio-listbox>
</amexio-body>
<amexio-action>
 <amexio-button
    [label]="'New'"
    [type]="'secondary'"
    [tooltip]="'New'"
    [size]="'default'"
    [icon]="'fa fa-plus fa-lg'"
    (onClick)="openProjectUi()">
    </amexio-button>
</amexio-action>
</amexio-card>
    </amexio-column>
  <amexio-column [size]="9">
  <ng-container *ngIf="showCard">
   <div class="loadingnav" *ngIf="loaderService.isLoading"></div>
 <amexio-form [form-name]="'validateForm'"  [body-height]="80" [header]="true" [show-error]="true" [footer-align]="'right'">

    <amexio-form-header>
             Project Creation
    </amexio-form-header>
<amexio-form-body>
                           <amexio-row>
        <amexio-column [size]="6">
          <amexio-text-input  [(ngModel)]="projectCreationModel.projectName" [field-label]="'Name'" name ="projectCreationModel.projectName"
                            [place-holder]="'Enter Name'"
                            [enable-popover]="true"
                            [min-length]="3" [max-length]="128"
                             [min-error-msg]="'Minimun 3  characters project name required'"
                             [max-error-msg]="'Maximun 128 characters  project name allowed'"
                            [allow-blank]="false"
                            error-msg="Please enter project name"
                            [icon-feedback]="true"
                            [disabled]="disblefields">
          </amexio-text-input>
        </amexio-column>
        <amexio-column [size]="6">
          <amexio-textarea-input [field-label]="'Description'" name ="projectCreationModel.projectDescription"
                          [place-holder]="'Enter Description'"
                          [icon-feedback]="true"
                           [allow-blank]="false"
                            error-msg="Please enter  project description"
                            [enable-popover]="true"
                           [rows]="'2'"
                           [columns]="'1'"
                          [disabled]="disblefields"
                          [(ngModel)]="projectCreationModel.projectDescription">
          </amexio-textarea-input>
        </amexio-column>
<ng-container *ngIf="!portDisableFlag">
         <amexio-column [size]="12">

         Server Port:{{serverPort}}
        </amexio-column>
                </ng-container>
                <amexio-column [size]="12">
         <amexio-label >Material themes</amexio-label>
         </amexio-column>
       </amexio-row>
        <amexio-row>
                <amexio-column [size]="4" *ngFor="let col of materialthemes">
                <div class="proj-ui">
 <amexio-card [header]="true"
                [footer]="false"
                [show]="true"
                [header-align]="'left'">
            <amexio-header>
            <div *ngIf="showThemeFlag">
            <amexio-radio-group
                name ="projectCreationModel.themeUUID"
                [display-field]="'themesName'"
                [allow-blank]="true"
                [value-field]="'themeUUID'"
                [data]="getThemes(col)"
                [default-value]="projectCreationModel.themeUUID"
                (onSelection)="setTheme(col)" style="display: inline;">
           </amexio-radio-group>
                      </div>
                    </amexio-header>
                    <amexio-body>
                            <amexio-image [path]="'assets/images/theme-icons/'+col.themesIcon"></amexio-image> <br/>
                    </amexio-body>
                </amexio-card>
                </div>
  </amexio-column>
            </amexio-row>

 </amexio-form-body>
   <amexio-form-action>
    <ng-container *ngIf="!showUpadteBtn">
     <amexio-button
    [label]="'Cancel'"
    [type]="'secondary'"
    [tooltip]="'Cancel'"
    [size]="'default'"
    [icon]="'fa fa-close'"
    (onClick)="cancelProject()">
    </amexio-button>
    </ng-container>
     <ng-container *ngIf="showUpadteBtn">
    <amexio-button
    [label]="'Update'"
    [loading]="asyncFlag"
    [type]="'primary'"
    [tooltip]="'Update'"
    [disabled]="disableUpdateBtn"
    [size]="'default'"
    [icon]="'fa fa-save'"
    (onClick)="onUpdate()">
    </amexio-button>
     </ng-container>
          <ng-container *ngIf="!showUpadteBtn">
    <amexio-button
    [label]="'Save'"
    [loading]="asyncFlag"
    [type]="'primary'"
    [tooltip]="'Save'"
    [size]="'default'"
    [icon]="'fa fa-save'"
    [disabled]="false"
    [form-bind]="'validateForm'"
    (onClick)="ValidateAndSave()">
    </amexio-button>
    </ng-container>
</amexio-form-action>

 </amexio-form>

  </ng-container>
   <ng-container *ngIf="!showCard">
                <amexio-card [header]="true"
                [footer]="false"
                [show]="true"
                [footer-align]="'right'"
                [body-height]="80">
                    <amexio-header>
                     Help Document
                    </amexio-header>
                    <amexio-body>
                    </amexio-body>
                </amexio-card>
                </ng-container>
  </amexio-column>
  <!--<amexio-dialogue [show-dialogue]="confirmdialogue"
               [title]="'Confirm'"
               [message]="'Do you want to view created project status?'"
               [message-type]="'confirm'"
               [type]="'confirm'"
               (actionStatus)="checkStatus($event)"
               (close)="confirmdialogue = !confirmdialogue">
</amexio-dialogue>-->

<project-notification></project-notification>
   
</amexio-row>

  `
})
export class CreateProjectComponent implements OnInit {
  projectCreationModel: ProjectCreationModel;
  asyncFlag: boolean = false;
  serverPort: any;
  newTokenid: string;
  msgData: any = [];
  // projectUUID: string;
  validationMsgArray: any = [];
  // isValidateForm: boolean = false;
  portDisableFlag: boolean = true;
  themes: any;
  amexioThemes: any;
  materialthemes: any;
  projectList: any;
  showCard: boolean = false;
  projectId: string;
  disblefields: boolean = false;
  showUpadteBtn: boolean = false;
  disableUpdateBtn: boolean;
  confirmdialogue: boolean;
  themeID: any;
  showThemeFlag: boolean = true;
  isLoading: boolean = false;
  migrationStatusDialogue = false;
  constructor(
    private http: HttpClient,
    private ls: LocalStorageService,
    private cookieService: CookieService,
    public loaderService: LoaderService,
    private msgService: MessagingService,
    public _notificationService: NotificationService,
    private route: ActivatedRoute,
    private _route: Router,
    private _cdf: ChangeDetectorRef
  ) {
    this.projectCreationModel = new ProjectCreationModel();
    this.themes = [];
    this.amexioThemes = [];
    this.materialthemes = [];
    this.getThemeData();
    this.getProjectList();
  }

  ngOnInit() {}
  getThemes(col: any): any[] {
    let themearray: any = [];
    themearray.push(col);
    return themearray;
  }

  //GET PROJECT LIST OF LOGGED IN USER
  getProjectList() {
    this.validationMsgArray = [];
    let projectDataList: any;

    this.http.get('/api/project/project/findByProjectOwner').subscribe(
      response => {
        projectDataList = response;
      },
      error => {
        this.validationMsgArray = [];
        this.validationMsgArray.push('Unable to connect to server');
        this.createErrorData();
      },
      () => {
        if (projectDataList.success) {
          this.projectList = projectDataList;
        } else {
          this.validationMsgArray.push(projectDataList.errorMessage);
          // this.isValidateForm = true;
          this.createErrorData();
        }
      }
    );
  }

  openProjectUi() {
    this.showCard = true;
    this.portDisableFlag = true;
    this.disblefields = false;
    this.showUpadteBtn = false;
    this.projectCreationModel = new ProjectCreationModel();
  }

  onBlurCheck(rUrl: any) {
    if (rUrl != null && rUrl.isComponentValid) {
    } else {
      this.msgData = [];
      this.msgData.push('Repository URL is not valid ,Please check');
      this._notificationService.showWarningData(this.msgData);
    }
  }

  //GET PROJECT DETAILS OF SELECTED PROJECT IN READ ONLY FORM
  onProjectSelect(event: any) {
    this.loaderService.showLoader();
    this.validationMsgArray = [];
    let selectProject: any;
    this.themeID = '';
    this.showThemeFlag = false;
    // this.projectCreationModel = new ProjectCreationModel();
    const projectUUID = event.projectUUID;
    this.http
      .get('/api/project/project/selectProject?projectUUID=' + projectUUID)
      .subscribe(
        response => {
          selectProject = response;
        },
        err => {
          this.loaderService.hideLoader();
          this.validationMsgArray.push('Unable to connect to server');
          // this.isValidateForm = true;
          this.createErrorData();
        },
        () => {
          if (selectProject.success) {
            this.showCard = true;
            this.projectId = selectProject.response.projectUUID;
            this.projectCreationModel.projectName =
              selectProject.response.projectName;
            this.projectCreationModel.projectDescription =
              selectProject.response.projectDescription;
            this.projectCreationModel.themeUUID =
              selectProject.response.themeUUID;
            this.themeID = selectProject.response.themeUUID;
            this.showThemeFlag = true;
            this.serverPort = selectProject.response.serverPort;
            this.portDisableFlag = false;
            this.newTokenid = selectProject.response.newtokenId;
            this.cookieService.set('tokenid', this.newTokenid);
            this.msgService.sendMessage({
              projectId: this.projectId
            });
            this._cdf.detectChanges();
            this.showUpadteBtn = true;
            this.disableUpdateBtn = true;
            this.disblefields = true;
            this.loaderService.hideLoader();
          } else {
            this.loaderService.hideLoader();
            this.validationMsgArray.push(selectProject.errorMessage);
            this.createErrorData();
          }
        }
      );
  }

  //Set Theme
  setTheme(col: any) {
    this.projectCreationModel.themeUUID = col.themeUUID;
    if (this.themeID == this.projectCreationModel.themeUUID) {
      this.disableUpdateBtn = true;
    } else {
      this.disableUpdateBtn = false;
    }
  }

  //To close Window
  // okErrorBtnClick() {
  //   this.isValidateForm = false;
  //   this.validationMsgArray = [];
  // }

  //Reset Project Data
  cancelProject() {
    this.projectCreationModel = new ProjectCreationModel();
  }
  createInvalidCompErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Invalid Component', errorData);
  }

  createErrorData() {
    let errorData: any[] = [];
    let errorObj: any = {};
    errorObj['data'] = [];
    errorObj.data = this.validationMsgArray;
    errorData.push(errorObj);
    this._notificationService.showerrorData('Error Message', errorData);
  }

  onUpdate() {
    this.validationMsgArray = [];
    let response: any;
    this.asyncFlag = true;
    this.validationMsgArray = [];
    this.msgData = [];
    const requestJson = {
      projectUUID: this.projectId,
      themeUUID: this.projectCreationModel.themeUUID
    };
    this.http.post('/api/project/project/update', requestJson).subscribe(
      res => {
        response = res;
      },
      err => {
        this.validationMsgArray = [];
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.asyncFlag = false;
      },
      () => {
        if (response.success) {
          this.asyncFlag = false;
          this.themeID = this.projectCreationModel.themeUUID;
          this.uiCreatedEvent({ ui_created: true });
          this.msgData.push(response.successMessage);
          this._notificationService.showSuccessData(this.msgData);
        } else {
          if (response.errorMessage == null) {
            this.validationMsgArray.push(response.errors);
            this.createErrorData();
            this.asyncFlag = false;
          } else {
            this.validationMsgArray.push(response.errorMessage);
            this.createErrorData();
            this.asyncFlag = false;
          }
        }
      }
    );
  }

  //UI CREATED EVENT ADDED
  uiCreatedEvent(string: any) {
    window.postMessage(string, window.location.origin);
  }
  ValidateAndSave() {
    this.validationMsgArray = [];
    if (this.projectCreationModel.projectName == '') {
      this.validationMsgArray.push('Please enter project name');
    }
    if (this.projectCreationModel.projectDescription == '') {
      this.validationMsgArray.push('Please enter project description');
    }
    if (
      this.projectCreationModel.themeUUID == null ||
      this.projectCreationModel.themeUUID == ''
    ) {
      this.validationMsgArray.push('Please select theme');
    }
    if (this.validationMsgArray && this.validationMsgArray.length >= 1) {
      this.createInvalidCompErrorData();
      return;
    } else {
      this.saveProjectCreation();
    }
  }
  //Save Method to create Project
  saveProjectCreation() {
    let response: any;
    this.asyncFlag = true;
    this.msgData = [];
    this.validationMsgArray = [];
    this.loaderService.showLoader();
    const requestJson = {
      projectName: this.projectCreationModel.projectName,
      projectDescription: this.projectCreationModel.projectDescription,
      themeUUID: this.projectCreationModel.themeUUID
    };
    this.http.post('/api/project/project/save ', requestJson).subscribe(
      res => {
        response = res;
      },
      err => {
        this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.createErrorData();
        this.asyncFlag = false;
        this.loaderService.hideLoader();
      },
      () => {
        if (response.success) {
          this.ls.remove('platformInfo');
          const platformInfo = {
            desire3dversionid: 2,
            projectMigrated: true
          };
          this.ls.set('platformInfo', platformInfo);
          this.newTokenid = response.response.tokenid;
          this.projectId = response.response.projectUUID;
          this.cookieService.set('tokenid', this.newTokenid);
          this.asyncFlag = false;
          this.msgData.push(response.successMessage);
          this._notificationService.showSuccessData(this.msgData);
          this.loaderService.hideLoader();
          this.clearData();
          this.getProjectList();
          this.msgService.sendMessage({
            projectId: this.projectId,
            saveproject: true
          });
          // this.showtask();
        } else {
          this.validationMsgArray.push(response.errorMessage);
          this.createErrorData();
          this.asyncFlag = false;
          this.loaderService.hideLoader();
        }
      }
    );
  }
  // showtask() {
  //   this.confirmdialogue = !this.confirmdialogue;
  // }
  // checkStatus(data: any) {
  //   if (data === 'ok') {
  //     this.msgService.sendMessage({
  //       path: 'home/codepipeline/task-ui',
  //       title: 'Task Details'
  //     });
  //   }
  // }

  // findInstance() {
  //   this.validationMsgArray = [];
  //   let instanceresponse: any;
  //   this.http.post('/api/pipeline/Instance/getHostDetails', {}).subscribe(
  //     res => {
  //       instanceresponse = res;
  //     },
  //     err => {
  //       this.validationMsgArray.push(
  //         'Unable to connect to server, please try after sometime.'
  //       );
  //       // this.isValidateForm = true;
  //       this.createErrorData();
  //     },
  //     () => {
  //       if (instanceresponse.success) {
  //         this.openProjectUi();
  //       } else {
  //         this.validationMsgArray.push(
  //           'Unable to connect to server, please try after sometime.'
  //         );
  //         // this.isValidateForm = true;
  //         this.createErrorData();
  //       }
  //     }
  //   );
  // }

  clearData() {
    this.projectCreationModel = new ProjectCreationModel();
  }

  // To Fetch Theme Data from DB
  getThemeData() {
    let response: any;
    this.http.get('/api/project/themes/findAll').subscribe(
      res => {
        response = res;
      },
      err => {
        // this.validationMsgArray.push('Unable to connect to server');
        // this.isValidateForm = true;
        this.asyncFlag = false;
      },
      () => {
        if (response.success) {
          this.themes = response.response;
          this.iterateData(this.themes);
        } else if (!response.success && response.errors) {
          this.validationMsgArray.push(response.errorMessage);
          this.createErrorData();
        }
      }
    );
  }

  iterateData(themes: any) {
    themes.forEach((obj: any) => {
      if (obj.themeType == '1') {
        const obj1 = {
          themeUUID: obj.themeUUID,
          themesName: obj.themesName,
          themesDescription: obj.themesDescription,
          themesIcon: obj.themesIcon,
          themeType: obj.themeType
        };
        this.amexioThemes.push(obj1);
      } else {
        const obj2 = {
          themeUUID: obj.themeUUID,
          themesName: obj.themesName,
          themesDescription: obj.themesDescription,
          themesIcon: obj.themesIcon,
          themeType: obj.themeType
        };
        this.materialthemes.push(obj2);
      }
    });
  }
}
export class ProjectCreationModel {
  projectName: string;
  projectDescription: string;
  themeUUID: any;

  constructor() {
    this.projectDescription = '';
    this.projectName = '';
    this.themeUUID = '6FF7B738-EE02-4367-9168-FD5327E3FCBB';
  }
}
