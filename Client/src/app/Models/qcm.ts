export class Qcm {
  // tslint:disable-next-line:variable-name
  _id: string='';
  question: string='';
  wrong: Array<string>=[];
  right: Array<string>=[];
  lesson: string='';

  constructor() {
    this.right = new Array<string>();
    this.wrong = new Array<string>();
  }
}
