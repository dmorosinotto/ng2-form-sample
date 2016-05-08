import { Injectable }   from '@angular/core';
import { ControlGroup, FormBuilder, Validators } from '@angular/common';
import { CtrlBase } from './ctrl-base';

@Injectable()
export class BuildFormService {
  constructor(private fb: FormBuilder) { }

  toControlGroup(ctrls: CtrlBase<any>[] ): ControlGroup {
    let group: any = {};

    ctrls.forEach(ctrl => {
      group[ctrl.key] = ctrl.required ? [ctrl.value || '', Validators.required] : [];
    });
    return this.fb.group(group);
  }
}
