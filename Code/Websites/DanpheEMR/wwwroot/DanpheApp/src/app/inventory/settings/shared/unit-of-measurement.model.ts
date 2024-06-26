﻿import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';

export class UnitOfMeasurementModel {
    public UOMId: number = 0;
    public UOMName: string = "";
    public Description: string = "";
    public CreatedBy: number = 0;
    public CreatedOn: string = "";
    public IsActive: boolean = true;

    public UnitOfMeasurementValidator: FormGroup = null;

    constructor() {
        var _formBuilder = new FormBuilder();
        this.UnitOfMeasurementValidator = _formBuilder.group({
            'UOMName': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
        });
    }

    public IsDirty(fieldName): boolean {
        if (fieldName == undefined)
            return this.UnitOfMeasurementValidator.dirty;
        else
            return this.UnitOfMeasurementValidator.controls[fieldName].dirty;
    }

    public IsValid(): boolean { if (this.UnitOfMeasurementValidator.valid) { return true; } else { return false; } } public IsValidCheck(fieldName, validator): boolean {
        if (fieldName == undefined) {
            return this.UnitOfMeasurementValidator.valid;
        }
        else
            return !(this.UnitOfMeasurementValidator.hasError(validator, fieldName));
    }
}