import { CtrlBase, BaseConf } from './ctrl-base';
export interface TextboxConf<T> extends BaseConf<T> {
    type?: string;
}
export class TextboxCtrl<T> extends CtrlBase<T> {
  controlType = 'textbox';
  type: string;

  constructor(config: TextboxConf<T> = {}) {
    super(config);
    this.type = config.type || 'text';
  }
}
