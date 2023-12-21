import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ifTrueThenRequired(bool: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return bool ? { required: true } : null;
    };
  }