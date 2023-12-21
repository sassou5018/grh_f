import { AbstractControl, FormGroup } from "@angular/forms";

function isFormGroup(control: AbstractControl): control is FormGroup {
    return !!(<FormGroup>control).controls;
  }
  
 export default function collectErrors(control: AbstractControl): any | null {
    if (isFormGroup(control)) {
        return Object.entries(control.controls)
            .reduce(
                (acc, [key, childControl]) => {
                    const childErrors = collectErrors(childControl);
                    if (childErrors) {
                        acc = Object.assign({}, acc, { [key]: childErrors });
                    }
                    return acc;
                },
                null
            );
    } else {
        return control.errors;
    }
  }