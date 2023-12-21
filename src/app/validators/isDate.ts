import { AbstractControl, ValidationErrors } from "@angular/forms";
import validator from "validator";

/**
 * Validate if the string is a date using validator.js
 */
export const isDate = (control: AbstractControl): ValidationErrors | null => {
    const isDate = validator.isDate(control.value);
    if(!isDate) console.log("Not a date", control.value)
    return !isDate ? { NotDate: { value: control.value } } : null;
};
