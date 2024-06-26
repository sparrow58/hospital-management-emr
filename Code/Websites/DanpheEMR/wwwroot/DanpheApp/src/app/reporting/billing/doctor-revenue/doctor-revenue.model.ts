import {
    NgForm,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    ReactiveFormsModule
} from '@angular/forms';
import * as moment from 'moment/moment';

export class RPT_BIL_DoctorRevenue {

    public Date: Date = null;
    public Doctor: string = "";
    public USG: number = 0;
    public USGCOUNT: number = 0;
    public ORTHOPROCEDURES: number = 0;
    public ORTHOPROCEDURESCOUNT: number = 0;
    public CT: number = 0;
    public CTCOUNT: number = 0;
    public OPD: number = 0;
    public OPDCOUNT: number = 0;
    public GSURG: number = 0;
    public GSURGCOUNT: number = 0;
    public GYNSURG: number = 0;
    public GYNSURGCOUNT: number = 0;
    public ENT: number = 0;
    public ENTCOUNT: number = 0;
    public DENTAL: number = 0;
    public DENTALCOUNT: number = 0;
    public OT: number = 0;
    public OTCOUNT: number = 0;
    public PerformerName: string = "";
    public fromDate: string = "";
    public toDate: string = "";
    public DoctorRevenueValidator: FormGroup = null;
    constructor() {

        var _formBuilder = new FormBuilder();
        this.DoctorRevenueValidator = _formBuilder.group({
            //'FromDate': ['', Validators.compose([Validators.required])],
            'fromDate': ['', Validators.compose([Validators.required, this.dateValidatorsForPast])],
            'toDate': ['', Validators.compose([Validators.required, this.dateValidator])],

        });
    }


    dateValidator(control: FormControl): { [key: string]: boolean } {
        var currDate = moment().format('YYYY-MM-DD HH:mm');
        if (control.value) { // gets empty string for invalid date such as 30th Feb or 31st Nov)
            if ((moment(control.value).diff(currDate) > 0)
                || (moment(currDate).diff(control.value, 'years') > 200)) //can select date upto 200 year past from today.
                return { 'wrongDate': true };
        }
        else
            return { 'wrongDate': true };
    }

    dateValidatorsForPast(control: FormControl): { [key: string]: boolean } {

        //get current date, month and time
        var currDate = moment().format('YYYY-MM-DD');
        if (control.value) {
            //if positive then selected date is of future else it of the past
            if ((moment(control.value).diff(currDate) > 0) ||
                (moment(control.value).diff(currDate, 'years') < -200)) // this will not allow the age diff more than 200 is past
                return { 'wrongDate': true };
        }


        else
            return { 'wrongDate': true };



    }


    public IsDirty(fieldName): boolean {
        if (fieldName == undefined)
            return this.DoctorRevenueValidator.dirty;
        else
            return this.DoctorRevenueValidator.controls[fieldName].dirty;
    }

    public IsValid():boolean{if(this.DoctorRevenueValidator.valid){return true;}else{return false;}} public IsValidCheck(fieldName, validator): boolean {
        if (fieldName == undefined)
            return this.DoctorRevenueValidator.valid;
        else
            return !(this.DoctorRevenueValidator.hasError(validator, fieldName));
    }
}
