import { Component, Input, OnInit }  from '@angular/core';
import { ControlGroup }              from '@angular/common';
import { CtrlBase }                  from './ctrl-base';
import { BuildFormService }          from './buildform.service';
import { DynamicFormGenericCtrl }    from './dynform-genctrl.component';
@Component({
  selector: 'dyn-form',
  templateUrl: 'app/dynform/dynform.component.html',
  directives: [DynamicFormGenericCtrl],
  providers:  [BuildFormService]
})
export class DynamicForm implements OnInit {
  @Input() ctrls: CtrlBase<any>[] = [];
  public frm: ControlGroup;
  json = '';
  data: any;
  constructor(private bld: BuildFormService) {  }
  ngOnInit() {
    this.frm = this.bld.toControlGroup(this.ctrls);
  }
  onSubmit() {
    this.data = this.frm.value;
    this.json = JSON.stringify(this.data, null, 4);
  }
}
