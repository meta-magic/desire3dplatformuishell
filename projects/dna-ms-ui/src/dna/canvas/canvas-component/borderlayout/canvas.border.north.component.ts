/**
 * Created by dattaram on 1/3/18.
 */
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { EventHandlerService } from '../../canvas-service/event.service';
import { DragDropEventService } from '../../canvas-service/dragdrop.event.service';
import { CanvasWidgetClass } from '../../canvas-models/canvas.widget.class';

@Component({
  selector: 'canvas-border-north',
  template: `
    <div class="rowstyle"
         (mouseover)="onMouseOver($event)" (mouseleave)="onMouseLeave($event)"
         [ngClass]="{'componentStyle':isOver,'componentSelectStyle':isActive}"
       (click)="setSelfActive($event)"
         (dragover)="componentElementDraggedOver($event)"
         (dragend)="componentDragEnter($event)"
         (contextmenu)="loadContextMenu($event)"
         (drop)="componentElementDropped($event)">
      <div (mouseenter)="onMouseEnter($event)" (dragenter)="componentDragEnter($event)" (mouseout)="onMouseOut($event)">
          <ng-template #northtarget></ng-template>
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
  `,
  styles: [
    `
    `
  ]
})
export class CanvasNorthBorderComponent extends CanvasWidgetClass
  implements OnInit, OnDestroy {
  componentOverStyle: any;
  showContextMenu: boolean;
  name = 'borderNorth';
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };
  @ViewChild('northtarget', { read: ViewContainerRef })
  target: any;
  constructor(
    public _eventHndl: EventHandlerService,
    public _dragDropEventService: DragDropEventService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.properties = new BorderNorthProperties();
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
  componentElementDraggedOver(event: any) {
    this.componentOverStyle = 'overEffect';
    event.preventDefault();
    event.stopPropagation();
  }

  componentElementDropped(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this._dragDropEventService.componentElementDrop(this);
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
      this.showContextMenu = false;
      this._eventHndl.setAllComponentsInactive(this.componentId);
    }
  }

  onDeleteClick() {
    this.showContextMenu = false;
    this._eventHndl.componentIdToDel = this.componentId;
    this._eventHndl.deleteComponent();
    this._eventHndl.addEditorNewState();
  }

  ngOnDestroy() {
    this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
    this.removeFromParent(this.parentComponentRef);
  }

  removeDuplicateOnRelocate(components: any[]) {
    components.forEach((compRef, index) => {
      if (compRef.componentId === this.componentId) {
        components.splice(index, 1);
        return;
      } else {
        if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
          this.removeDuplicateOnRelocate(compRef.children);
        }
      }
    });
  }

  removeFromParent(parentComponentRef: any) {
    if (parentComponentRef != null) {
      parentComponentRef.children.forEach((del: any, index: any) => {
        if (del.instance.componentId === this.componentId) {
          parentComponentRef.children.splice(index, 1);
        }
      });
    }
  }
}

export class BorderNorthProperties {
  isComponentValid: boolean;
  constructor() {
    this.isComponentValid = true;
  }
}
