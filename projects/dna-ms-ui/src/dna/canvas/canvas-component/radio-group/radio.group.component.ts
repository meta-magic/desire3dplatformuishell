/**
 * Created by pratik on 23/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { DatasourceModel, Metadata} from '../../canvas-models/datasource.model';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'radio-group-component',
  template: `
    <div  (click)="setSelfActive($event)" [attr.id]="componentId"
          (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
          draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
          (dragover)="componentElementDraggedOver($event)" #txtField>

      <amexio-radio-group [field-label]="properties.fieldLabel"
                          [name] ="componentId"
                          [data-reader]="'response.data'"
                          [display-field]="'gender'"
                          [value-field]="'genderId'"
                          [horizontal]="properties.horizontal"
                          [data]="radioGroupData"
                          [default-value]="'1'"
                          [disabled]="properties.disabled">
      </amexio-radio-group>

    </div>

    <span  *ngIf="showContextMenu" (click)="onDeleteClick()" class="dropdown"
      [ngStyle]="{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}">
          <ul class="dropdown-list">
            <li class="list-items">
              <span ><i class="fa fa-trash" style="padding-right: 5px;"></i> <b>Delete</b> </span>
            </li>
          </ul>
        </span>
  `
})
export class RadioGroupcanvasComponent extends CanvasWidgetClass
  implements OnInit {
  radioGroupData: any;
  dataSource: RadioGroupDatasource;
  eventRelationship: EventRelationBaseModel;
  type: string = 'default';
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasModelBinding = true;
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.componentBehaviour.hasDataSource = true;
    this.properties = new RadioGroupProperties();
    this.dataSource = new RadioGroupDatasource();
    this.eventRelationship = new EventRelationBaseModel();
    this.radioGroupData = {
      response: {
        data: [
          {
            gender: 'Radio 1',
            genderId: '1'
          },
          {
            gender: 'Radio 2',
            genderId: '2'
          }
        ]
      }
    };
  }
  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
  }

  onMouseOver(event: any) {
    event.stopPropagation();
    this.isOver = true;
  }
  onMouseLeave(event: any) {
    event.stopPropagation();
    this.isOver = false;
  }
  @HostListener('document:click')
  onHover() {
    this.showContextMenu = false;
  }
  getContextMenuStyle() {
    return {
      position: 'fixed',
      display: this.showContextMenu ? 'block' : 'none',
      left: this.mouseLocation.left + 'px',
      top: this.mouseLocation.top + 'px',
      'box-shadow': '1px 1px 2px #000000',
      width: '15%'
    };
  }
  loadContextMenu(event: any) {
    this.mouseLocation.left = event.clientX;
    this.mouseLocation.top = event.clientY;
    this.showContextMenu = true;
    event.preventDefault();
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = this.componentId;
  }
  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }

  setSelfActive(event: any) {
    event.stopPropagation();
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class RadioGroupProperties implements FormsInterface {
  placeholder: string;
  disabled: boolean;
  errorMsg: string;
  hasLabel: boolean;
  horizontal: boolean;
  name: string;
  groupName: string;

  /*validation related attribute*/

  fieldLabel: string;
  allowBlank: boolean;
  isComponentValid: boolean;
  displayField: string;
  valueField: string;
  model: any;
  constructor() {
    this.model = new ModelClass();
    this.name = '';
    this.isComponentValid = false;
    this.fieldLabel = 'Radio';
    this.disabled = false;
    this.errorMsg = '';
    this.allowBlank = true;
    this.horizontal = true;
    this.groupName = 'group Name';
    this.displayField = '';
    this.valueField = '';
  }
}

export class RadioGroupDatasource extends DatasourceModel {
  dataReader: string;
  metadata: any;
  servicetype: any;
  localDataName: any;
  displayField: string;
  valueField: string;
  constructor() {
    super();
    this.metadata = new Metadata();
    this.dataReader = '';
    this.servicetype = '1';
    this.displayField = '';
    this.valueField = '';
    this.localDataName = null;
    this.remote.httpMethod = 1;
    this.remote.httpUrl = '';
    this.dataReader = '';
  }
}

