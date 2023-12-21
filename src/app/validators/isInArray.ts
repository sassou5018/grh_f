import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validate if form value is in array passed in param
 * @param array Array of values
 * @returns null if value exists in array and error: NotInArray if not
 */
export function isInArray(array: any[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minLength = array.includes(control.value);
      return minLength ? { NotInArray: { value: control.value } } : null;
    };
  }