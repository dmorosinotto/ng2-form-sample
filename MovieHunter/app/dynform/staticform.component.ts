import { Component, OnInit, AfterViewInit }    from '@angular/core';
import { ControlGroup, Control, Validators }              from '@angular/common';

const n = 100;
const l = 50;
const m = 50;

function statichtml() {
  console.time('statichtml');
  let s: string[] = [];
  s.push(`<div>
          <h2>{{pageTitle}}</h2>
          <form class="form-horizontal" #frm="ngForm"  (ngSubmit)="onSubmit(frm)">
            <fieldset>
                 <div class="form-group" [ngClass]="{'has-error': primoControl.touched && !primoControl.valid }">
                    <label class="col-md-2 control-label" for="primo">PRIMO</label>

                    <div class="col-md-8">
                        <input class="form-control" 
                                id="primo" 
                                type="text" 
                                [(ngModel)] = "load.primo"
                                ngControl="primo" />
                        <span class="help-block" *ngIf="primoControl.touched && primoControl.errors">
                            <span *ngIf="primoControl.errors.required">
                                Please enter primo.
                            </span>
                        </span>
                    </div>
                </div>
  `);
  for (let i = 0; i < (n - l); i++) {
  s.push(`            
                <div class="form-group" [ngClass]="{'has-error': txt${i}.touched && !txt${i}.valid }">
                    <label class="col-md-2 control-label" for="fld${i}">Campo ${i}</label>

                    <div class="col-md-8">
                        <input class="form-control" 
                                id="fld${i}" 
                                type="text"
                                required
  `);
  s.push(`                              [(ngModel)] = "load.fld${i}" `);
  s.push(`          
                                ngControl="fld${i}"
                                #txt${i}="ngForm" />
                        <span class="help-block" *ngIf="txt${i}.touched && txt${i}.errors">
                            <span *ngIf="txt${i}.errors.required">
                                Please enter fld${i}.
                            </span>
                        </span>
                    </div>
                </div>
`);
};
for (let i = (n - l); i < n; i++) {
  s.push(`
                <div class="form-group" [ngClass]="{'has-error': cmb${i}.touched && !cmb${i}.valid }">
                    <label class="col-md-2 control-label" for="fld${i}">Campo ${i}</label>

                    <div class="col-md-8">
                        <select class="form-control" 
                                id="fld${i}" 
                                required 
  `);
  s.push(`                              [(ngModel)] = "load.fld${i}" `);
  s.push(`                              
                                ngControl="fld${i}"
                                #cmb${i}="ngForm">
                           <option *ngFor="let opt of opts" [value]="opt.value">{{opt.text}}</option>
                        </select>
                        <span class="help-block" *ngIf="cmb${i}.touched && cmb${i}.errors">
                            <span *ngIf="cmb${i}.errors.required">
                                Please select fld${i}.
                            </span>
                        </span>    
                    </div>
                </div>
  `);
  };
  s.push(`                
                <div class="form-group" [ngClass]="{'has-error': ultimoControl.touched && !ultimoControl.valid }">
                    <label class="col-md-2 control-label" for="ultimo">ULTIMO</label>

                    <div class="col-md-8">
                        <input class="form-control" 
                                id="ultimo" 
                                type="text" 
                                [(ngModel)] = "load.ultimo"
                                ngControl="ultimo" />
                        <span class="help-block" *ngIf="ultimoControl.touched && ultimoControl.errors">
                            <span *ngIf="ultimoControl.errors.required">
                                Please enter ultimo.
                            </span>
                        </span>
                    </div>
                </div>
                
                <div class="form-group">
                    <div class="col-md-4 col-md-offset-2">
                        <span>
                            <button class="btn btn-primary"
                                    type="submit"
                                    style="width:80px;margin-right:10px"
                                    [disabled]='!frm.valid'>
                                Save
                            </button>
                        </span>
                    </div>
                </div>
            </fieldset>
        </form>
        <div *ngIf="data" class="form-row">
          <b>Saved the following data:</b>
          <pre>{{json}}</pre>
        </div>
        </div>`);
  console.timeEnd('statichtml');
  return s.join('\n');
}

@Component({
  selector: 'static-form',
  template: statichtml()
})
export class StaticFormComponent implements OnInit, AfterViewInit {
  public pageTitle: string = 'Try Static Form';
  data: any; json: string;
  load: any; opts: any[];
  primoControl: Control;
  ultimoControl: Control;
  constructor() {
    console.log('\n----- STATIC-FORM ----');
    this.load = {};
    for (let i = 0; i < n; i++) {
      this.load['fld' + i] = 'val' + (i < (n - l) ? i : ((i - l) % m));
    };
    this.opts = [];
    for (let j = 0; j < m; j++) {
      this.opts.push({value: 'val' + j, text: 'text ' + j});
    };
    this.primoControl = new Control('', Validators.required);
    this.ultimoControl = new Control('', Validators.required);
    console.time('render total');
  }

  ngOnInit() {
    console.time('render');
  }

  ngAfterViewInit() {
    this.primoControl.valueChanges.subscribe(v => console.log('primo changed -> ' + v));
    this.ultimoControl.valueChanges.subscribe(v => {
      console.log('ultimo changed -> ' + v);
      console.timeEnd('render total');
    });
    setTimeout(() => {
      this.load.primo = 'primo';
      this.primoControl.updateValue('primo');
      this.load.ultimo = 'ultimo';
      this.ultimoControl.updateValue('ultimo');
    }, 0);
    console.timeEnd('render');
  };

  onSubmit(frm: ControlGroup) {
    this.data = frm.value;
    this.json = JSON.stringify(this.data, null, 4);
  }
}
