export default class Module {
  public type: string = '';
  public uuid: string = '';
  public description?: string = '';
  public preview?: boolean = false;
  public restricted?: boolean = false;
  public itemUuid: string = '';
  public itemVersion: number = 0;
  public resourceType: string = 'p';
  public resourcePath:string = '';
  public links: {[key: string]: string} = {};
}