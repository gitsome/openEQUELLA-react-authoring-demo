export default class Attachment {
  public conversion?: boolean = false;
  public description: string = '';
  public filename?: string = '';
  public links?: {[key: string]: string} = {};
  public md5?: string = '';
  public preview: boolean = false;
  public restricted: boolean = false;
  public size?: number = 11335;
  public thumbFilename?: string = '';
  public thumbnail?: string = '';
  public type: string = '';
  public uuid: string = '';
  public itemUuid?: string = '';
  public url?: string = '';
  public disabled?: boolean = false;
  public resourcePath?: string = '';
  public resourceType?: string = 'p';
}