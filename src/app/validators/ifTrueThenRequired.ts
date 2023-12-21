import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


/**
 * If Boolean introduced in param is True, then the field becomes required else it is not required
 * @param bool 
 * @returns required error if the field is empty and the boolean is true or null if the field is empty and the boolean is false
 */
export function ifTrueThenRequired(bool: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return bool ? { required: true } : null;
    };
  }