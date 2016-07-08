import { Component, OnInit, AfterViewInit, ViewChild }    from '@angular/core';
import { DynamicForm }  from './dynform.component';
import { TryService }   from './tryform.service';
@Component({
  selector: 'try-dynform',
  template: `
    <div>
      <h2>{{pageTitle}}</h2>
      <dyn-form [ctrls]="configuration"></dyn-form>
    </div>
  `,
  directives: [DynamicForm],
  providers:  [TryService]
})
export class TryDynamicFormComponent implements OnInit, AfterViewInit {
  configuration: any[];
  @ViewChild(DynamicForm) df: DynamicForm;
  public pageTitle: string = 'Try Dynamic Form';
  constructor(service: TryService) {
    console.log('\n----- DYNAMIC-FORM ----');
    this.configuration = service.getCtrls();
    console.time('render total');
  }

  ngOnInit() {
    console.time('render');
  }

  ngAfterViewInit() {
    console.log('controlli ', this.df.ctrls.length);
    this.df.frm.controls['primo'].valueChanges.subscribe(v => console.log('primo changed -> ' + v));
    this.df.frm.controls['ultimo'].valueChanges.subscribe(v => {
      console.log('ultimo changed -> ' + v);
      console.timeEnd('render total');
    });
    setTimeout(() => {
      let c: any;
      c = this.df.frm.controls['primo'];
      c.updateValue('primo');
      c = this.df.frm.controls['ultimo'];
      c.updateValue('ultimo');
    }, 0);
    console.timeEnd('render');
  };
}
