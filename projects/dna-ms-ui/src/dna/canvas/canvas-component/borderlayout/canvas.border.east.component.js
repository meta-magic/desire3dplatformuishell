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
/**
 * Created by dattaram on 1/3/18.
 */
var core_1 = require("@angular/core");
var canvas_widget_class_1 = require("../../canvas-models/canvas.widget.class");
var CanvasEastBorderComponent = (function (_super) {
    __extends(CanvasEastBorderComponent, _super);
    function CanvasEastBorderComponent(_eventHndl, _dragDropEventService, _componentFactoryResolver) {
        var _this = _super.call(this) || this;
        _this._eventHndl = _eventHndl;
        _this._dragDropEventService = _dragDropEventService;
        _this._componentFactoryResolver = _componentFactoryResolver;
        _this.name = 'borderEast';
        _this.mouseLocation = { left: 0, top: 0 };
        _this.properties = new BorderEastProperties();
        return _this;
    }
    CanvasEastBorderComponent.prototype.ngOnInit = function () {
        this.componentId =
            +Math.floor(Math.random() * 90000) + 10000 + '_' + this.name;
    };
    CanvasEastBorderComponent.prototype.onMouseOver = function (event) {
        event.stopPropagation();
        this.isOver = true;
    };
    CanvasEastBorderComponent.prototype.onMouseLeave = function (event) {
        event.stopPropagation();
        this.isOver = false;
    };
    CanvasEastBorderComponent.prototype.componentElementDraggedOver = function (event) {
        this.componentOverStyle = 'overEffect';
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasEastBorderComponent.prototype.componentElementDropped = function (event) {
        event.preventDefault();
        event.stopPropagation();
        this._dragDropEventService.componentElementDrop(this);
    };
    CanvasEastBorderComponent.prototype.onMouseEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasEastBorderComponent.prototype.onMouseOut = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasEastBorderComponent.prototype.componentDragEnter = function (event) {
        event.stopPropagation();
        this.componentOverStyle = '';
    };
    CanvasEastBorderComponent.prototype.loadContextMenu = function (event) {
        this.mouseLocation.left = event.clientX;
        this.mouseLocation.top = event.clientY;
        this.showContextMenu = true;
        event.preventDefault();
        event.stopPropagation();
    };
    CanvasEastBorderComponent.prototype.getContextMenuStyle = function () {
        return {
            position: 'fixed',
            display: this.showContextMenu ? 'block' : 'none',
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px',
            'box-shadow': '1px 1px 2px #000000',
            width: '15%'
        };
    };
    CanvasEastBorderComponent.prototype.setSelfActive = function (event) {
        if (event != null) {
            event.stopPropagation();
            this.componentOverStyle = 'overEffect';
            this.showContextMenu = false;
            this._eventHndl.deleteComponentRef = null;
            this._eventHndl.deleteComponentRef = this.componentId;
            this._eventHndl.setAllComponentsInactive(this.componentId);
            this._eventHndl.loadComponentProperties(this.name);
        }
    };
    CanvasEastBorderComponent.prototype.onDeleteClick = function () {
        this.showContextMenu = false;
        this._eventHndl.componentIdToDel = this.componentId;
        this._eventHndl.deleteComponent();
        this._eventHndl.addEditorNewState();
    };
    CanvasEastBorderComponent.prototype.ngOnDestroy = function () {
        this.removeDuplicateOnRelocate(this._eventHndl.viewRefs);
        this.removeFromParent(this.parentComponentRef);
    };
    CanvasEastBorderComponent.prototype.removeDuplicateOnRelocate = function (components) {
        var _this = this;
        components.forEach(function (compRef, index) {
            if (compRef.componentId === _this.componentId) {
                components.splice(index, 1);
                return;
            }
            else {
                if (compRef.hasOwnProperty('children') && compRef.children.length > 0) {
                    _this.removeDuplicateOnRelocate(compRef.children);
                }
            }
        });
    };
    CanvasEastBorderComponent.prototype.removeFromParent = function (parentComponentRef) {
        var _this = this;
        if (parentComponentRef != null) {
            parentComponentRef.children.forEach(function (del, index) {
                if (del.instance.componentId === _this.componentId) {
                    parentComponentRef.children.splice(index, 1);
                }
            });
        }
    };
    return CanvasEastBorderComponent;
}(canvas_widget_class_1.CanvasWidgetClass));
__decorate([
    core_1.ViewChild('bordereast', { read: core_1.ViewContainerRef })
], CanvasEastBorderComponent.prototype, "target");
CanvasEastBorderComponent = __decorate([
    core_1.Component({
        selector: 'canvas-border-east',
        template: "\n  <div class=\"rowstyle\"\n       (mouseover)=\"onMouseOver($event)\" (mouseleave)=\"onMouseLeave($event)\"\n       [ngClass]=\"{'componentStyle':isOver,'componentSelectStyle':isActive}\"\n    (click)=\"setSelfActive($event)\"\n        (dragover)=\"componentElementDraggedOver($event)\"\n        (dragend)=\"componentDragEnter($event)\"\n        (contextmenu)=\"loadContextMenu($event)\"\n        (drop)=\"componentElementDropped($event)\">\n    <div (mouseenter)=\"onMouseEnter($event)\" (dragenter)=\"componentDragEnter($event)\" (mouseout)=\"onMouseOut($event)\">\n\n        <ng-template #bordereast></ng-template>\n    </div>\n    <span  *ngIf=\"showContextMenu\" (click)=\"onDeleteClick()\" class=\"dropdown\"\n    [ngStyle]=\"{left: this.mouseLocation.left + 'px',top: this.mouseLocation.top + 'px',position:'fixed','box-shadow': '1px 1px 2px #000000',width: '15%'}\">\n        <ul class=\"dropdown-list\">\n          <li class=\"list-items\">\n            <span ><i class=\"fa fa-trash\" style=\"padding-right: 5px;\"></i> <b>Delete</b> </span>\n          </li>\n        </ul>\n      </span>\n  </div>\n  "
    })
], CanvasEastBorderComponent);
exports.CanvasEastBorderComponent = CanvasEastBorderComponent;
var BorderEastProperties = (function () {
    function BorderEastProperties() {
        this.isComponentValid = true;
    }
    return BorderEastProperties;
}());
exports.BorderEastProperties = BorderEastProperties;
