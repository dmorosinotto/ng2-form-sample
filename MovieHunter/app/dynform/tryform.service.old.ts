import { Injectable }       from '@angular/core';
import { CtrlBase }         from './ctrl-base';
import { TextboxCtrl }      from './ctrl-textbox';
import { LookupCtrl }       from './ctrl-lookup';

@Injectable()
export class TryService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getCtrls() {
    let ctrls: CtrlBase<any>[] = [
      new LookupCtrl<string>({
        key: 'genere',
        label: 'Genere',
        options: [
          {value: 'M',  text: 'Man'},
          {value: 'W',  text: 'Woman'},
          {value: 'G',  text: 'Gay'},
          {value: 'T',  text: 'Transex'},
          {value: 'X',  text: 'XXX' }
        ],
        order: 3
      }),
      new TextboxCtrl({
        key: 'firstName',
        label: 'First name',
        value: 'Mr X',
        required: true,
        order: 1
      }),
      new TextboxCtrl<number>({
        key: 'age',
        label: 'Age',
        type: 'number',
        order: 2
      }),
      new TextboxCtrl({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        required: true,
        order: 4
      })
    ];
    return ctrls.sort((a, b) => a.order - b.order);
  }
}