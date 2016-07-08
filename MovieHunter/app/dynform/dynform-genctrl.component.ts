import { Component, Input } from '@angular/core';
import { ControlGroup }     from '@angular/common';
import { CtrlBase }     from './ctrl-base';
@Component({
  selector: 'df-genctrl',
  templateUrl: 'app/dynform/dynform-genctrl.component.html'
})
export class DynamicFormGenericCtrl {
  @Input() ctrl: CtrlBase<any>;
  @Input() form: ControlGroup;
  get isValid() {
    return this.form.controls[this.ctrl.key].valid;
  }
}
