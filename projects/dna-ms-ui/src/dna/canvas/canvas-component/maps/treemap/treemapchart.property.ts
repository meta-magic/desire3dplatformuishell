/**
 * Created by dattaram on 14/2/18.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'treemap-chart-property',
  template: `
 
   <ng-container *ngIf="componentInstance">
         <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                                     name="componentInstance.properties.name"
                                                     place-holder="enter name"
                                                     icon-feedback="true" (onBlur)="propertyValidation()">
                                  </amexio-text-input>
                                 
         <chart-properties [componentInstance]="componentInstance" treemap="true"></chart-properties>
    </ng-container>
    
  `
})
export class TreemapchartPropertyComponent implements OnInit {
  componentInstance: any;
  constructor() {}

  ngOnInit() {}

  propertyValidation() {
    this.componentInstance._eventHndl.componentValidation(
      this.componentInstance
    );
  }
}
