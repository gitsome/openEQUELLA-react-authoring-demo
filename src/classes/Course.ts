import Attachment from './Attachment';
// const example = {
//   "uuid": "7f56aaf8-858f-43cd-b09f-05949e90278d",
//   "version": 1,
//   "name": "demo test 101",
//   "links": {
//     "view": "https://demo.unicon.net/openequella/demo/items/7f56aaf8-858f-43cd-b09f-05949e90278d/1/",
//     "self": "https://demo.unicon.net/openequella/demo/api/item/7f56aaf8-858f-43cd-b09f-05949e90278d/1/"
//   }
// };

export default class Course {
  public uuid: string = '';
  public version: number = 1;
  public description?: string = '';
  public name: string = '';
  public links: {[key: string]: string} = {};
  public metadata?: string = '';
  public attachments?: Attachment[] = [];
}