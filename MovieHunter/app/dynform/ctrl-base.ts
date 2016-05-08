export interface BaseConf<T> {
  value?: T;
  key?: string;
  label?: string;
  required?: boolean;
  order?: number;
  controlType?: string;
}

export class CtrlBase<T>{
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  constructor(config: BaseConf<T> = {}) {
    this.value = config.value;
    this.key = config.key || '';
    this.label = config.label || '';
    this.required = !!config.required;
    this.order = config.order === undefined ? 1 : config.order;
    this.controlType = config.controlType || '';
  }
}
