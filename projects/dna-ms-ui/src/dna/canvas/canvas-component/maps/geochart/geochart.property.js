"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by dattaram on 14/2/18.
 */
var core_1 = require("@angular/core");
var GeochartPropertyComponent = (function () {
    function GeochartPropertyComponent() {
    }
    GeochartPropertyComponent.prototype.ngOnInit = function () { };
    GeochartPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return GeochartPropertyComponent;
}());
GeochartPropertyComponent = __decorate([
    core_1.Component({
        selector: 'geo-chart-property',
        template: "    \n            <ng-container *ngIf=\"componentInstance\">\n              <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                                 name=\"componentInstance.properties.name\"\n                                 place-holder=\"enter name\"\n                                 icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n              </amexio-text-input>\n              <chart-properties [componentInstance]=\"componentInstance\" ></chart-properties>\n            </ng-container>\n\n  "
    })
], GeochartPropertyComponent);
exports.GeochartPropertyComponent = GeochartPropertyComponent;
