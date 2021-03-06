import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tab-code',
  template: `
  <div *ngIf="!sourceCode" class="loadingnav">

  -  </div>
  <amexio-label size="'small'">

              <ng-container *ngIf="sourceCode">
                <ng-container *ngIf="isCss">
                  <prism-block [code]="sourceCode" [language]="'css'"></prism-block>
                </ng-container>
                <ng-container *ngIf="isHtml">
                  <prism-block [code]="sourceCode" [language]="'html'"></prism-block>
                </ng-container>
                <ng-container *ngIf="isTypeScript">
                  <prism-block [code]="sourceCode" [language]="'typescript'"></prism-block>
                </ng-container>
                <ng-container *ngIf="isJson">
                  <prism-block [code]="sourceCode" [language]="'json'"></prism-block>
                </ng-container>
              </ng-container>
            </amexio-label>
`
})
export class TabcodeComponent implements OnInit {
  @Input() sourceCode: string;
  @Input() isHtml: boolean;
  @Input() isJson: boolean;
  @Input() isTypeScript: boolean;
  @Input() isCss: boolean;
  @Input() publicIpAddress: any;
  @Input() protocol: any;
  constructor(public http: HttpClient) {}
  ngOnInit() {}

  getIpAddress(): any {
    return this.http.post('/api/pipeline/Instance/getHostDetails', {});
  }
  getFileDataBtnClick(data: any, publicIpAddress: any, protocol: any) {
    this.publicIpAddress = publicIpAddress;
    this.protocol = protocol;
    //back end data comes on child click.
    if (!data.children) {
    /*  let appUrl = 'protocol://host:9870/projectExplorer/findSourceCode';
      if (this.publicIpAddress) {
        appUrl = appUrl.replace('host', this.publicIpAddress);
        appUrl = appUrl.replace('protocol', this.protocol);
      } else {
        appUrl = appUrl.replace('host', 'localhost');
        appUrl = appUrl.replace('protocol', this.protocol);
      }*/
      if (data.leaf) {
        let filedata: any;
        const sourcePathJSON: any = {};
        sourcePathJSON['sourcePath'] = data.sourcePath;
        this.http.post('/api/codepipeline/cps/fetchsourcecode', sourcePathJSON).subscribe(
          res => {
            filedata = res;
          },
          err => {
            console.log('Error occured');
          },
          () => {
            const responseData = JSON.parse(filedata.response);
            this.sourceCode = '';
            if (responseData.source) {
              this.sourceCode = responseData.source;
              this.resetFlag();

              if (responseData.fileType) {
                this.resetFlag();
                if (responseData.fileType == 'html') {
                  this.isHtml = true;
                  return;
                } else if (responseData.fileType == 'json') {
                  this.isJson = true;
                  return;
                } else if (responseData.fileType == 'ts') {
                  this.isTypeScript = true;
                  return;
                } else if (responseData.fileType == 'css') {
                  this.isCss = true;
                  return;
                } else {
                  this.isHtml = true;
                }
              }
            }
          }
        );
      }
    }
  }
  resetFlag() {
    this.isHtml = false;
    this.isTypeScript = false;
    this.isJson = false;
    this.isCss = false;
  }
}
