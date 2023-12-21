import { AbstractControl, ValidationErrors } from "@angular/forms";
import validator from "validator";

/**
 * Validate if the string is alphabetic using validator.js 
 */
export const isAlphabetic = (control: AbstractControl): ValidationErrors | null => {
    const isAlphabetic = validator.isAlpha(control.value.replace(/\s/g, ''));
    return !isAlphabetic ? { notalphabetic: true } : null;
};
