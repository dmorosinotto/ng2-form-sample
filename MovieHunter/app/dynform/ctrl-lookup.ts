import { CtrlBase, BaseConf } from './ctrl-base';
export interface LookupConf<T> extends BaseConf<T> {
    options?: ValText<T>[];
}
export type ValText<T> = {value: T, text: string};
export class LookupCtrl<T> extends CtrlBase<T> {
  controlType = 'lookup';
  options: ValText<T>[] = [];

  constructor(config: LookupConf<T> = {}) {
    super(config);
    this.options = config.options || [];
  }
}
