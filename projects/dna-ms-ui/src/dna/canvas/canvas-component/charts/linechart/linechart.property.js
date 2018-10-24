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
var LinechartPropertyComponent = (function () {
    function LinechartPropertyComponent() {
    }
    LinechartPropertyComponent.prototype.ngOnInit = function () { };
    LinechartPropertyComponent.prototype.propertyValidation = function () {
        this.componentInstance._eventHndl.componentValidation(this.componentInstance);
    };
    return LinechartPropertyComponent;
}());
LinechartPropertyComponent = __decorate([
    core_1.Component({
        selector: 'line-chart-property',
        template: "    \n     <ng-container *ngIf=\"componentInstance\">\n                            <amexio-text-input field-label=\"Name\" [(ngModel)]=\"componentInstance.properties.name\"\n                            name=\"componentInstance.properties.name\"\n                            place-holder=\"name\"\n                            icon-feedback=\"true\" (onBlur)=\"propertyValidation()\">\n         </amexio-text-input>\n                              <chart-properties [componentInstance]=\"componentInstance\" legend=\"true\"></chart-properties>\n                              </ng-container>\n                           \n     <!-- <amexio-tab [icon]=\"componentInstance._eventHndl._sharedDataService.behaviourIcon\">\n        <ng-container *ngIf=\"componentInstance\">\n          <br><amexio-button [block]=\"true\" label=\"Datasource\" size=\"medium\" type=\"primary\" (onClick)=\"componentInstance._eventHndl.createDatasourceInstance(componentInstance)\"></amexio-button>\n        </ng-container>\n      </amexio-tab>\n  -->\n\n  "
    })
], LinechartPropertyComponent);
exports.LinechartPropertyComponent = LinechartPropertyComponent;
