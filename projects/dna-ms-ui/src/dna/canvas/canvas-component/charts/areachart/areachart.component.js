"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var datasource_model_1 = require("../../../canvas-models/datasource.model");
var chartlegend_1 = require("./../chartproperties/chartlegend");
var charttitle_1 = require("./../chartproperties/charttitle");
var chartbasic_1 = require("./../chartproperties/chartbasic");
/**
 * Created by sagar on 12/3/18.OnChanges
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../../canvas-models/canvas.widget.class");
var CanvasAreachartComponent = (function (_super) {
    __extends(CanvasAreachartComponent, _super);
    function CanvasAreachartComponent(_eventHndl, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.mouseLocation = { left: 0, top: 0 };
        _this.componentBehaviour.isBindingComponent = true;
        _this.areaChartData = [
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 400],
            ['2014', 1170, 460],
            ['2015', 660, 1120],
            ['2016', 1030, 540]
        ];
        _this.properties = new AreachartProperty();
        _this.dataSource = new AreachartDatasource();
        return _this;
    }
    CanvasAreachartComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasAreachartComponent.prototype.onHover = function () {
        this.showContextMenu = false;
    };
    CanvasAreachartComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasAreachartComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = this.componentId;
    };
    CanvasAreachartComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasAreachartComponent.prototype.setSelfActive = function (event) {
        event.stopPropagation();
        this._eventHndl.deleteComponentRef = null;
        this._eventHndl.deleteComponentRef = this.componentId;
        this._eventHndl.setAllComponentsInactive(this.componentId);
        this._eventHndl.loadComponentProperties(this.name);
    };
    CanvasAreachartComponent.prototype.componentElementDraggedOver = function (event) {
        event.preventDefault();
    };
    return CanvasAreachartComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.HostListener('document:click')
], CanvasAreachartComponent.prototype, "onHover");
CanvasAreachartComponent = __decorate([
    core_1.Component({
        selector: 'area-chart-input',
        template: "\n    <div class=\"componentStyle\"  (click)=\"setSelfActive($event)\" [attr.id]=\"componentId\"\n          draggable=\"true\" [ngClass]=\"{'invalidStyleClass': !properties.isComponentValid,'componentSelectStyle':isActive}\"\n          (dragstart)=\"_eventHndl.componentElementRelocateDragBegin($event,this)\"\n          (contextmenu)=\"loadContextMenu($event)\"\n    (dragover)=\"componentElementDraggedOver($event)\" #areachart>\n      <div>\n\n <amexio-chart-area [data]=\"areaChartData\"\n [height]=\"properties.chartBasic.height\"\n [width]=\"properties.chartBasic.width\" >\n<amexio-chart-title [title]=\"properties.chartTitle.title\"\n  [color]=\"properties.chartTitle.color\"\n  [font-name]=\"properties.chartTitle.fontName\"\n  [font-size]=\"properties.chartTitle.fontSize\"\n  [bold]=\"properties.chartTitle.bold\"\n  [italic]=\"properties.chartTitle.italic\"\n>\n</amexio-chart-title>\n\n<amexio-chart-legend [position]=\"properties.chartLegend.position\"\n  [max-lines]=\"properties.chartLegend.maxLines\"\n  [font-name]=\"properties.chartLegend.fontName\"\n  [font-size]=\"properties.chartLegend.fontSize\"\n  [color]=\"properties.chartLegend.color\"\n  [alignment]=\"properties.chartLegend.alignment\">\n</amexio-chart-legend>\n\n</amexio-chart-area>\n      </div>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n      [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n          <ul class=\"dropdown-list\">\n            <li class=\"list-items\">\n              <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n            </li>\n          </ul>\n        </span>\n  "
    })
], CanvasAreachartComponent);
exports.CanvasAreachartComponent = CanvasAreachartComponent;
var AreachartProperty = (function (_super) {
    __extends(AreachartProperty, _super);
    function AreachartProperty() {
        var _this = _super.call(this) || this;
        _this.chartBasic = new chartbasic_1.ChartBasic();
        _this.chartTitle = new charttitle_1.ChartTitle();
        _this.chartLegend = new chartlegend_1.ChartLegend();
        _this.isComponentValid = false;
        return _this;
    }
    return AreachartProperty;
}(canvas_widget_class_1.CanvasWidgetClass));
exports.AreachartProperty = AreachartProperty;
var AreachartDatasource = (function (_super) {
    __extends(AreachartDatasource, _super);
    function AreachartDatasource() {
        var _this = _super.call(this) || this;
        _this.metadata = new datasource_model_1.Metadata();
        _this.dataReader = '';
        _this.servicetype = '1';
        _this.displayField = '';
        _this.valueField = '';
        _this.localDataName = null;
        _this.remote.httpMethod = 1;
        _this.remote.httpUrl = '';
        return _this;
    }
    return AreachartDatasource;
}(datasource_model_1.DatasourceModel));
exports.AreachartDatasource = AreachartDatasource;
