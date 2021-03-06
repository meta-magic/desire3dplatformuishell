/**
 * Created by dattaram on 20/2/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';
import { EventHandlerService } from '../../canvas-service/event.service';
import { PropertyMap } from '../../canvas-component-map/properties.map';

@Component({
  selector: 'fieldset-component',
  template: `
    <div (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         (dragend)="componentDragEnter($event)"
         (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
         draggable="true" [ngClass]="{'componentStyle':isOver,'componentSelectStyle':isActive}"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
        <amexio-fieldset [title]="properties.title" [collapsible]="properties.collapsible">
          <div style="min-height: 100px">
            <ng-template #fieldset></ng-template>
          </div>
        </amexio-fieldset>
      </div>

      <span  *ngIf="showContextMenu" (click)="onDeleteClick()" class="dropdown"
      [ngStyle]="{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}">
          <ul class="dropdown-list">
            <li class="list-items">
              <span ><i class="fa fa-trash" style="padding-right: 5px;"></i> <b>Delete</b> </span>
            </li>
          </ul>
        </span>
    </div>
  `
})
export class CanvasFieldSetComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('fieldset', { read: ViewContainerRef })
  target: any;
  constructor(
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver,
    public _eventHndl: EventHandlerService
  ) {
    super();
    this.properties = new FieldSetProperties();
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
  ngOnDestroy(): void {}
  componentElementDraggedOver(event: any) {
    this.componentOverStyle = 'overEffect';
    event.preventDefault();
    event.stopPropagation();
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (this._eventHndl.componentClassKeyDragged == 'row') {
      this._dragDropEventService.rowDropComponentRef = null;
      this._dragDropEventService.rowDropComponentRef = this;
      this._dragDropEventService.rowAddDialogue = true;
    } else {
      this._dragDropEventService.componentElementDrop(this);
    }
  }

  onMouseEnter(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
  }

  onMouseOut(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
  }

  componentDragEnter(event: any) {
    event.stopPropagation();
    this.componentOverStyle = '';
  }

  loadContextMenu(event: any) {
    this.mouseLocation.left = event.clientX;
    this.mouseLocation.top = event.clientY;
    this.showContextMenu = true;
    event.preventDefault();
    event.stopPropagation();
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

  setSelfActive(event: any) {
    if (event != null) {
      event.stopPropagation();
      this.componentOverStyle = 'overEffect';
      this.showContextMenu = false;
      this._eventHndl.deleteComponentRef = null;
      this._eventHndl.deleteComponentRef = this.componentId;
      this._eventHndl.setAllComponentsInactive(this.componentId);
      this._eventHndl.loadComponentProperties(this.name);
    }
  }

  loadComponentProperties() {
    this._eventHndl.propertyViewRef.clear();
    const propertyFactory = this._componentFactoryResolver.resolveComponentFactory(
      PropertyMap.PROPERTY_MAP[this.name]
    );
    const propertyInstance = this._eventHndl.propertyViewRef.createComponent(
      propertyFactory
    );
    propertyInstance.instance.componentInstance = this._eventHndl.currentWidgetRef;
    propertyInstance.changeDetectorRef.detectChanges();
  }

  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }
}

export class FieldSetProperties {
  isComponentValid: boolean;
  title: string;
  collapsible: boolean;
  name: string;

  constructor() {
    this.name = 'fieldset_' + Math.floor(Math.random() * 90000) + 10000;
    this.isComponentValid = true;
    this.title = 'Fieldset';
    this.collapsible = false;
  }
}
