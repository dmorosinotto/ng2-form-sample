import { Component }    from '@angular/core';
import { DynamicForm }  from './dynform.component';
import { TryService }   from './tryform.service';
@Component({
  selector: 'try-dynform',
  template: `
    <div>
      <h2>{{pageTiyle}}</h2>
      <dyn-form [ctrls]="configuration"></dyn-form>
    </div>
  `,
  directives: [DynamicForm],
  providers:  [TryService]
})
export class TryDynamicFormComponent {
  configuration: any[];
  public pageTitle: string = 'Try Dynamic Form';
  constructor(service: TryService) {
    this.configuration = service.getCtrls();
  }
}
