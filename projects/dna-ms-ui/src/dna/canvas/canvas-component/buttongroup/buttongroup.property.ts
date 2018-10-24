/**
 * Created by dattaram on 28/2/18.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'button-group-property',
  template: `
            <ng-container *ngIf="componentInstance && !componentInstance.showButtonProperties">
              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.properties.name"
                                 name="componentInstance.properties.name"
                                 place-holder="enter Name"
                                 icon-feedback="true" (onBlur)="propertyValidation()">
              </amexio-text-input>
              <amexio-dropdown [(ngModel)]="componentInstance.properties.size"
                               [place-holder]="'Size'"
                               [field-label]="'Button Size'"
                               [data]="sizeData"
                               [display-field]="'type'"
                               [value-field]="'value'">
              </amexio-dropdown>
              <br>
              <amexio-button [label]="'Add'"
                             [type]="'primary'"  [size]="'small'" (onClick)="addButton()">
              </amexio-button>
              <amexio-button [label]="'Remove'"
                             [type]="'primary'"  [size]="'small'" (onClick)="remove()">
              </amexio-button>
            </ng-container>
            <ng-container *ngIf="componentInstance.showButtonProperties">
              <amexio-text-input field-label="Name" [(ngModel)]="componentInstance.buttonPropertyObject.name"
                                 (onBlur)="propertyValidation()"
                                 name="componentInstance.buttonPropertyObject.name"
                                 place-holder="enter name">
              </amexio-text-input>
              <amexio-text-input field-label="Label" [(ngModel)]="componentInstance.buttonPropertyObject.label"
                                 name="componentInstance.buttonPropertyObject.label"
                                 place-holder="enter label">
              </amexio-text-input>
              <amexio-text-input field-label="Tooltip" [(ngModel)]="componentInstance.buttonPropertyObject.tooltip"
                                 name="componentInstance.properties.tooltip"
                                 place-holder="enter tooltip">
              </amexio-text-input>
              <amexio-dropdown [(ngModel)]="componentInstance.buttonPropertyObject.type"
                               [place-holder]="'Choose Type'"
                               [field-label]="'Button Type'"
                               [data]="typeData"
                               [display-field]="'type'"
                               [value-field]="'value'">
              </amexio-dropdown>
              <amexio-checkbox [field-label]="'Disabled'"
                               [(ngModel)]="componentInstance.buttonPropertyObject.disabled">
              </amexio-checkbox>
              <amexio-button [block]="true" label="Attach Icon" size="medium" type="theme-color" (onClick)="onIconOpenWindow()"></amexio-button>
              <br>
              <amexio-button [label]="'Remove'"
                             [type]="'theme-color'"  [size]="'medium'" (onClick)="removeButton()">
              </amexio-button>
            </ng-container>
    
    <ng-container *ngIf="iconWindow">
      <canvas-icon-search [componentInstance]="componentInstance" [selectedIcon]="componentInstance.buttonPropertyObject.icon" [iconWindow]="iconWindow"  (getSelectedIcon)="getSelectedIcon($event)"></canvas-icon-search>
    </ng-container>
  `
})
export class ButtonGroupPropertyComponent implements OnInit {
  componentInstance: any;
  localSizeData: any[];
  typeData: any;
  iconWindow: boolean;
  sizeData: any;
  constructor() {
    this.typeData = [
      {
        type: 'Default',
        value: 'default'
      },
      {
        type: 'Theme-Color',
        value: 'theme-color'
      },
      {
        type: 'Theme-Backgroundcolor',
        value: 'theme-backgroundcolor'
      },
      {
        type: 'Green',
        value: 'green'
      },
      {
        type: 'Red',
        value: 'red'
      },
      {
        type: 'Yellow',
        value: 'yellow'
      }
    ];
    this.sizeData = [
      {
        type: 'Default',
        value: 'default'
      },
      {
        type: 'Large',
        value: 'large'
      },
      {
        type: 'Small',
        value: 'small'
      },
      {
        type: 'XSmall',
        value: 'xsmall'
      }
    ];
  }

  ngOnInit() {}

  propertyValidation() {
    if (
      this.componentInstance.properties.name.split(' ').length == 1 &&
      this.componentInstance.properties.name != ''
    ) {
      if (this.checkButtonChildButtonValidation()) {
        this.componentInstance.properties.isComponentValid = true;
      }
    } else {
      this.componentInstance.properties.isComponentValid = false;
    }
  }

  addButton() {
    this.componentInstance.createComponentConfig();
    this.checkButtonChildButtonValidation();
  }

  remove() {
    if (this.componentInstance.children.length > 1) {
      this.componentInstance.children.pop();
      this.componentInstance.createLocalData();
    }
  }

  removeButton() {
    this.componentInstance.children.forEach((item: any, index: any) => {
      if (
        item.instance.properties === this.componentInstance.buttonPropertyObject
      ) {
        this.componentInstance.children.splice(index, 1);
      }
    });
    this.componentInstance.createLocalData();
  }

  checkButtonChildButtonValidation() {
    let status = true;
    this.componentInstance.children.forEach((item: any) => {
      if (
        item.instance.properties.name.split(' ').length == 1 &&
        item.instance.properties.name !== ''
      ) {
        item.instance.properties.isComponentValid = true;
      } else {
        status = false;
        item.instance.properties.isComponentValid = false;
      }
    });
    if (status) {
      this.componentInstance.properties.isComponentValid = true;
    } else {
      this.componentInstance.properties.isComponentValid = false;
    }
    return status;
  }

  onIconOpenWindow() {
    this.iconWindow = !this.iconWindow;
  }

  getSelectedIcon(icon: any) {
    this.componentInstance.buttonPropertyObject.icon = icon;
    this.componentInstance.buttonPropertyObject.iconClass = icon;
    this.onIconOpenWindow();
  }
}
