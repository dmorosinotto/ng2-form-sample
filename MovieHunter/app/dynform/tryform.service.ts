import { Injectable }       from '@angular/core';
import { CtrlBase }         from './ctrl-base';
import { TextboxCtrl }      from './ctrl-textbox';
import { LookupCtrl }       from './ctrl-lookup';

@Injectable()
export class TryService {
  // Todo: get from a remote source of question metadata
  // Todo: make asynchronous
  getCtrls() {
    console.time('configuration');
    let ctrls: CtrlBase<any>[] = [];
    ctrls.push(new TextboxCtrl({
      key: 'primo',
      label: 'primo',
      order: -9999,
      value: '',
      required: true
    }));
    const n = 100;
    const m = 50;
    for (let i = 0; i < n; i++) {
      let lookup = (i % 2 === 0);
      let ctrl = new CtrlBase<any>({
        key : 'fld' + i,
        label: 'Campo ' + i,
        order: i,
        required: true,
        value: 'val ' + (lookup ? i % m : i),
        controlType: (lookup) ? 'lookup' : 'textbox'
      });
      if (lookup) {
        let opts: any[] = [];
        for (let j = 0; j < m; j++) {
          opts.push({value: 'val ' + j, text: 'text ' + j});
        }
        (ctrl as LookupCtrl<any>).options = opts;
      }
      ctrls.push(ctrl);
    }
    ctrls.push(new TextboxCtrl({
      key: 'ultimo',
      label: 'ultimo',
      order: +9999,
      value: '',
      required: true
    }));
   /* 
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
    */
    console.timeEnd('configuration');
    return ctrls; // ctrls.sort((a, b) => a.order - b.order);
  }
}
