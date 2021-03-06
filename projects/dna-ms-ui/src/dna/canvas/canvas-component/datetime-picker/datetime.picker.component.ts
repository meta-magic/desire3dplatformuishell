/**
 * Created by pratik on 23/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import {
  FormsInterface,
  ModelClass
} from '../../canvas-models/forms.properties';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../canvas-component-map/properties.map';
import { EventHandlerService } from '../../canvas-service/event.service';
import { EventRelationBaseModel } from '../../event-relationship/models/event.basemodel';

@Component({
  selector: 'datetime-picker-component',
  template: `
   <div (click)="setSelfActive($event)" [attr.id]="componentId"
        (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
        draggable="true" [ngClass]="{'componentStyle':isOver,'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
        (contextmenu)="loadContextMenu($event)"
         (dragover)="componentElementDraggedOver($event)" #txtField>
     <amexio-date-time-picker
       [field-label]="properties.fieldLabel"
       [time-picker]="properties.timepicker"
       [read-only]="properties.readonly"
       [date-picker]="true">
     </amexio-date-time-picker>
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
export class DateTimePickerCanvasComponent extends CanvasWidgetClass
  implements OnInit {
  showContextMenu: boolean;
  eventRelationship: EventRelationBaseModel;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.hasModelBinding = true;
    this.componentBehaviour.hasRelationship = true;
    this.componentBehaviour.isBindingComponent = true;
    this.properties = new DatepickerProperties();
    this.eventRelationship = new EventRelationBaseModel();
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
  onWindowClick() {
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
    this.showContextMenu = false;
    this._eventHndl.deleteComponentRef = null;
    this._eventHndl.deleteComponentRef = this.componentId;
    this._eventHndl.setAllComponentsInactive(this.componentId);
    this._eventHndl.loadComponentProperties(this.name);
  }

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class DatepickerProperties implements FormsInterface {
  readonly: boolean;
  errorMsg: string;
  name: string;

  /*validation related attribute*/

  fieldLabel: string;
  timepicker: boolean;

  /*style related attribute*/
  isComponentValid: boolean;
  model: any;
  constructor() {
    this.model = new ModelClass();
    this.name = '';
    this.isComponentValid = false;
    this.fieldLabel = 'Date Time';
    this.readonly = false;
    this.errorMsg = '';
    this.timepicker = false;
  }
}
