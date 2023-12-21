import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


/**
 * Validate that string is longer than minimum length
 * @param min minimum length of string
 * @returns null if value is longer than minimum length and error: lessThanMin if not
 */
export function isMinLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const minLength = control.value.length >= min;
      return minLength ? { lessThanMin: { value: control.value } } : null;
    };
  }