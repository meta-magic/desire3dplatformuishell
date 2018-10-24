import { DatasourceModel, Metadata } from '../../../canvas-models/datasource.model';
import { ChartLegend } from './../chartproperties/chartlegend';
import { ChartTitle } from './../chartproperties/charttitle';
import { ChartBasic } from './../chartproperties/chartbasic';

/**
 * Created by sagar on 12/3/18.OnChanges
 */
import {
  Component,
  ComponentFactoryResolver,
  HostListener,
  OnInit
} from '@angular/core';
import { EventHandlerService } from '../../../canvas-service/event.service';
import { CanvasWidgetClass } from '../../../canvas-models/canvas.widget.class';
import { PropertyMap } from '../../../canvas-component-map/properties.map';
import { FormsInterface } from '../../../canvas-models/forms.properties';

@Component({
  selector: 'column-chart-input',
  template: `
    <div  (click)="setSelfActive($event)" [attr.id]="componentId"
          draggable="true" [ngClass]="{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}"
          (dragstart)="_eventHndl.componentElementRelocateDragBegin($event,this)"
          (contextmenu)="loadContextMenu($event)"
    (dragover)="componentElementDraggedOver($event)" #columnchart>
      <div>

 <amexio-chart-column [data]="columnChartData"
 [height]="properties.chartBasic.height"
 [width]="properties.chartBasic.width"
 >
<amexio-chart-title [title]="properties.chartTitle.title"
  [color]="properties.chartTitle.color"
  [font-name]="properties.chartTitle.fontName"
  [font-size]="properties.chartTitle.fontSize"
  [bold]="properties.chartTitle.bold"
  [italic]="properties.chartTitle.italic"
>
</amexio-chart-title>

<amexio-chart-legend [position]="properties.chartLegend.position"
  [max-lines]="properties.chartLegend.maxLines"
  [font-name]="properties.chartLegend.fontName"
  [font-size]="properties.chartLegend.fontSize"
  [color]="properties.chartLegend.color"
  [alignment]="properties.chartLegend.alignment">
</amexio-chart-legend>

</amexio-chart-column>
      </div>
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
export class CanvasColumnchartComponent extends CanvasWidgetClass
  implements OnInit {
  overStyle: any;
  columnChartData: any;
  showContextMenu: boolean;
  mouseLocation: { left: number; top: number } = { left: 0, top: 0 };

  constructor(
    public _eventHndl: EventHandlerService,
    public _componentFactoryResolver: ComponentFactoryResolver
  ) {
    super();
    this.componentBehaviour.isBindingComponent = true;
    this.columnChartData = [
      [
        { datatype: 'timeofday', label: 'Time of Day' },
        { datatype: 'number', label: 'Motivation Level' }
      ],
      [{ v: [8, 0, 0], f: '8 am' }, 1],
      [{ v: [9, 0, 0], f: '9 am' }, 2],
      [{ v: [10, 0, 0], f: '10 am' }, 3],
      [{ v: [11, 0, 0], f: '11 am' }, 4],
      [{ v: [12, 0, 0], f: '12 pm' }, 5],
      [{ v: [13, 0, 0], f: '1 pm' }, 6],
      [{ v: [14, 0, 0], f: '2 pm' }, 7],
      [{ v: [15, 0, 0], f: '3 pm' }, 8],
      [{ v: [16, 0, 0], f: '4 pm' }, 9],
      [{ v: [17, 0, 0], f: '5 pm' }, 10]
    ];
    this.properties = new ColumnchartProperty();
    this.dataSource = new ColumnchartDatasource();
  }
  ngOnInit() {
    this.componentId =
      +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
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

  componentElementDraggedOver(event: any) {
    event.preventDefault();
  }
}

export class ColumnchartProperty extends CanvasWidgetClass
  implements FormsInterface {
  chartBasic: ChartBasic;
  chartTitle: ChartTitle;
  chartLegend: ChartLegend;
  isComponentValid: boolean;
  constructor() {
    super();
    this.chartBasic = new ChartBasic();
    this.chartTitle = new ChartTitle();
    this.chartLegend = new ChartLegend();
    this.isComponentValid = false;
  }
}

export class ColumnchartDatasource extends DatasourceModel {
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
  }
}
