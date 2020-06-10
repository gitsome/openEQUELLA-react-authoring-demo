import { API_ROOT, IS_DEV, returnFakeData } from './utils';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toXML } from 'jstoxml';
import parser from 'fast-xml-parser'

import { appStateStore } from '../globalState/useAppState';

import Course from '../classes/Course';
import Module from '../classes/Module';
import Page from '../classes/Page';

import sampleMarkdown from '../sampleMarkdown.json';

const {
  coursesCollectionId,
  moduleCollectionId,
  pageCollectionId
} = appStateStore.get();

const ITEM_LOCATION_REGEX = /\/([A-Za-z\-0-9]{1,})\/([0-9]{1,})\/$/;

const fakeCourses: Course[] = [
  {
    "uuid":"7f56aaf8-858f-43cd-b09f-05949e90278d",
    "version":1,
    "name":"Introduction to Statistics",
    "links":{"view":"https://demo.unicon.net/openequella/demo/items/7f56aaf8-858f-43cd-b09f-05949e90278d/1/","self":"https://demo.unicon.net/openequella/demo/api/item/7f56aaf8-858f-43cd-b09f-05949e90278d/1/"}
  },
  {
    "uuid":"5d6be03f-a2d6-41fb-bbc2-e5a060de0adf",
    "version":1,
    "name":"Gardening 101",
    "description":"Fundamentals of growing your food",
    "links":{"view":"https://demo.unicon.net/openequella/demo/items/5d6be03f-a2d6-41fb-bbc2-e5a060de0adf/1/","self":"https://demo.unicon.net/openequella/demo/api/item/5d6be03f-a2d6-41fb-bbc2-e5a060de0adf/1/"}
  }
];
const fakeModules: {[key: string]: Module[]} = {
  "5d6be03f-a2d6-41fb-bbc2-e5a060de0adf": [
    {
      "type": "linked-resource",
      "uuid": "f48a7f63-c279-48e5-9e87-512a6b46decc",
      "description": "Location",
      "preview": false,
      "restricted": false,
      "itemUuid": "4222a528-0174-4eec-886d-8316abe90bfe",
      "itemVersion": 0,
      "resourceType": "p",
      "resourcePath": "",
      "links": {
        "view": "https://demo.unicon.net/openequella/demo/items/7f56aaf8-858f-43cd-b09f-05949e90278d/1/?attachment.uuid=f48a7f63-c279-48e5-9e87-512a6b46decc",
        "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/7f56aaf8-858f-43cd-b09f-05949e90278d/1/f48a7f63-c279-48e5-9e87-512a6b46decc"
      }
    }
  ],
  "7f56aaf8-858f-43cd-b09f-05949e90278d": [
    {
      "type": "linked-resource",
      "uuid": "f48a7f63-c279-48e5-9e87-512a6b46decc",
      "description": "Location",
      "preview": false,
      "restricted": false,
      "itemUuid": "4222a528-0174-4eec-886d-8316abe90bfe",
      "itemVersion": 0,
      "resourceType": "p",
      "resourcePath": "",
      "links": {
        "view": "https://demo.unicon.net/openequella/demo/items/7f56aaf8-858f-43cd-b09f-05949e90278d/1/?attachment.uuid=f48a7f63-c279-48e5-9e87-512a6b46decc",
        "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/7f56aaf8-858f-43cd-b09f-05949e90278d/1/f48a7f63-c279-48e5-9e87-512a6b46decc"
      }
    },
    {
      "type": "linked-resource",
      "uuid": "f48a7f63-c229-48e5-9e87-512a6b46decc",
      "description": "Another Module",
      "preview": false,
      "restricted": false,
      "itemUuid": "4222a528-0174-4eec-886d-8316abe90bfe",
      "itemVersion": 0,
      "resourceType": "p",
      "resourcePath": "",
      "links": {
        "view": "https://demo.unicon.net/openequella/demo/items/7f56aaf8-858f-43cd-b09f-05949e90278d/1/?attachment.uuid=f48a7f63-c279-48e5-9e87-512a6b46decc",
        "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/7f56aaf8-858f-43cd-b09f-05949e90278d/1/f48a7f63-c279-48e5-9e87-512a6b46decc"
      }
    }
  ]
};
const fakeModulePages: {[key: string]: Page[]} = {
  "4222a528-0174-4eec-886d-8316abe90bfe": [
    {
      "type": "linked-resource",
      "uuid": "bcdba2e1-3927-4a5f-9a67-e139a5def535",
      "description": "Syllabus / Expectations",
      "preview": false,
      "restricted": false,
      "itemUuid": "eea9acab-d5f5-45a6-87e1-28cfa09e0da1",
      "itemVersion": 0,
      "resourceType": "p",
      "resourcePath": "",
      "links": {
        "view": "https://demo.unicon.net/openequella/demo/items/5a8837cb-9572-49a7-b2a2-60c6b6601572/1/?attachment.uuid=bcdba2e1-3927-4a5f-9a67-e139a5def535",
        "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/5a8837cb-9572-49a7-b2a2-60c6b6601572/1/bcdba2e1-3927-4a5f-9a67-e139a5def535"
      }
    },
    {
      "type": "linked-resource",
      "uuid": "bcdb2a2e1-3927-4a5f-9a67-e139a5def535",
      "description": "Introduction",
      "preview": false,
      "restricted": false,
      "itemUuid": "eea2acab-d5f5-45a6-87e1-28cfa09e0da1",
      "itemVersion": 0,
      "resourceType": "p",
      "resourcePath": "",
      "links": {
        "view": "https://demo.unicon.net/openequella/demo/items/5a8837cb-9572-49a7-b2a2-60c6b6601572/1/?attachment.uuid=bcdba2e1-3927-4a5f-9a67-e139a5def535",
        "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/5a8837cb-9572-49a7-b2a2-60c6b6601572/1/bcdba2e1-3927-4a5f-9a67-e139a5def535"
      }
    }
  ]
};
const fakePages: Page[] = [{
  "type": "linked-resource",
  "uuid": "bcdb2a2e1-3927-4a5f-9a67-e139a5def535",
  "description": "Introduction",
  "preview": false,
  "restricted": false,
  "itemUuid": "eea2acab-d5f5-45a6-87e1-28cfa09e0da1",
  "itemVersion": 0,
  "resourceType": "p",
  "resourcePath": "",
  "links": {
    "view": "https://demo.unicon.net/openequella/demo/items/5a8837cb-9572-49a7-b2a2-60c6b6601572/1/?attachment.uuid=bcdba2e1-3927-4a5f-9a67-e139a5def535",
    "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/5a8837cb-9572-49a7-b2a2-60c6b6601572/1/bcdba2e1-3927-4a5f-9a67-e139a5def535"
  },
  "metadata": sampleMarkdown.text,
  "attachments": [{
    "type": "url",
    "uuid": "013b5724-642e-46c8-b1ab-6c42a7d1aa13",
    "description": "Search for ideas!",
    "preview": false,
    "restricted": false,
    "url": "https://www.google.com/search?q=soil+management&ie=utf-8&oe=utf-8",
    "disabled": false,
    "links": {
      "view": "https://demo.unicon.net/openequella/demo/items/2ae534c9-04ff-415e-a2e7-69f583604949/1/?attachment.uuid=013b5724-642e-46c8-b1ab-6c42a7d1aa13",
      "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/2ae534c9-04ff-415e-a2e7-69f583604949/1/013b5724-642e-46c8-b1ab-6c42a7d1aa13"
    }
  },
  {
    "type": "file",
    "uuid": "f5bbe4cc-b154-4893-85d3-d8771519159a",
    "description": "ForestFruitBackground.jpg",
    "preview": false,
    "restricted": false,
    "thumbnail": "_THUMBS/ForestFruitBackground.jpg.jpeg",
    "filename": "ForestFruitBackground.jpg",
    "size": 320933,
    "md5": "dcb10ec2f60c178da63b4b6bdaf4f0e5",
    "conversion": false,
    "thumbFilename": "_THUMBS/ForestFruitBackground.jpg.jpeg",
    "links": {
      "view": "https://demo.unicon.net/openequella/demo/items/2ae534c9-04ff-415e-a2e7-69f583604949/1/?attachment.uuid=f5bbe4cc-b154-4893-85d3-d8771519159a",
      "thumbnail": "https://demo.unicon.net/openequella/demo/thumbs/2ae534c9-04ff-415e-a2e7-69f583604949/1/f5bbe4cc-b154-4893-85d3-d8771519159a"
    }
  }]
}];
const getFakeCourses = () => {
  return returnFakeData(fakeCourses);
};
const getFakeCourse = (courseId: string) => {
  return returnFakeData(fakeCourses.find((course) => course.uuid === courseId) || fakeCourses[0]);
};
const getFakeCourseModules = (courseId: string) => {
  return returnFakeData(fakeModules[courseId]);
};
const getFakeCourseModulePages = (moduleId: string) => {
  return returnFakeData(fakeModulePages[moduleId]);
};
const getFakeCourseModulePage = (pageId: string) => {
  return returnFakeData(fakePages[0]);
};

class CoursesApi {

  public static getCourses (): Promise<Course[]> {

    if (IS_DEV) { return getFakeCourses();}

    return axios.get(`${API_ROOT}/search?start=0&length=30&collections=${coursesCollectionId}&reverse=false&showall=false`,{}).then((response: any) => {
      console.log('courses:', response);
      return response.data.results;
    });
  }

  public static getItem (itemId: string): Promise<Course> {
    return axios.get(`${API_ROOT}/item/${itemId}/latest?info=all`,{}).then((response: any) => {
      return response.data;
    });
  }

  public static getCourse (courseId: string): Promise<Course> {

    if (IS_DEV) { return getFakeCourse(courseId); }

    return axios.get(`${API_ROOT}/item/${courseId}/latest?info=all`,{}).then((response: any) => {
      return response.data;
    });
  }

  public static getCourseModules (courseId: string): Promise<Module[]> {

    if (IS_DEV) { return getFakeCourseModules(courseId); }

    return axios.get(`${API_ROOT}/item/${courseId}/latest?info=all`,{}).then((response: any) => {
      return response.data.attachments;
    });
  }

  public static getCourseModule (moduleId: string): Promise<Module[]> {

    return axios.get(`${API_ROOT}/item/${moduleId}/latest?info=all`,{}).then((response: any) => {
      return response.data;
    });
  }

  public static getCourseModulePages (moduleId: string): Promise<Page[]> {

    if (IS_DEV) { return getFakeCourseModulePages(moduleId); }

    return axios.get(`${API_ROOT}/item/${moduleId}/latest?info=all`,{}).then((response: any) => {
      return response.data.attachments;
    });
  }

  public static getCourseModulePage (pageId: string): Promise<Page> {

    if (IS_DEV) { return getFakeCourseModulePage(pageId); }

    return axios.get(`${API_ROOT}/item/${pageId}/latest?info=all`,{}).then((response: any) => {
      return response.data;
    });
  }

  public static createCourse (name: string, description: string): Promise<any> {

    if (IS_DEV) {
      fakeCourses.push({
        "uuid":"7f56aaf8-858f-43cd-b09f-05949e102789",
        "version": 1,
        "name": name,
        "description": description,
        "links":{"view":"https://demo.unicon.net/openequella/demo/items/7f56aaf8-858f-43cd-b09f-05949e90278d/1/","self":"https://demo.unicon.net/openequella/demo/api/item/7f56aaf8-858f-43cd-b09f-05949e90278d/1/"}
      });
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 700);
      });
    }

    const metadata = toXML({xml: {metadata: {title: name, description}}});

    return axios.post(`${API_ROOT}/item`, {
      metadata: metadata,
      collection: {
        uuid: coursesCollectionId
      }
    });
  }

  public static async addItemAttachment (itemId: string, attachmentId: string, attachmentName: string = ''): Promise<any> {

    // get the current course attachments and metadata
    let { attachments, metadata } = await CoursesApi.getItem(itemId);
    const parsedMetaData = parser.parse(metadata || '<xml><metadata></metadata></xml>', {});

    // add the new attachment
    attachments = attachments || [];
    attachments.push({
      uuid: uuidv4(),
      type: 'linked-resource',
      description: attachmentName,
      itemUuid: attachmentId,
      preview: false,
      resourcePath: '',
      resourceType: 'p',
      restricted: false
    });

    // generate the new children meta data
    const children = attachments.map((attachment) => { return {child: attachment.uuid} });
    // ovewrite the existing children meta data
    parsedMetaData.xml.metadata.children = children;

    // We have to update both so the wizards in the oEQ UI understand the intended structure
    await axios.put(`${API_ROOT}/item/${itemId}/1`, {
      metadata: toXML(parsedMetaData),
      attachments: attachments
    });

    return true;
  }

  public static async removeItemAttachment (itemId: string, attachmentId: string): Promise<any> {

    // get the current course attachments and metadata
    let { attachments, metadata } = await CoursesApi.getItem(itemId);
    const parsedMetaData = parser.parse(metadata || '<xml><metadata></metadata></xml>', {});

    // add the new attachment
    attachments = attachments || [];
    attachments = attachments.filter((attachment) => {
      return attachment.itemUuid !== attachmentId;
    });

    // generate the new children meta data
    const children = attachments.map((attachment) => { return {child: attachment.uuid} });
    // ovewrite the existing children meta data
    parsedMetaData.xml.metadata.children = children;

    // We have to update both so the wizards in the oEQ UI understand the intended structure
    await axios.put(`${API_ROOT}/item/${itemId}/1`, {
      metadata: toXML(parsedMetaData),
      attachments: attachments
    });

    return true;
  }

  public static async createItemChild (itemId: string, name: string, description: string, newMetadata: {[key: string]: string} = {}, targetCollectionId: string) : Promise<any> {

    const metadataModel = {xml: {metadata: {title: name, description}}};
    // merge in the newMetaData
    Object.assign(metadataModel.xml.metadata, newMetadata);
    const metadata = toXML(metadataModel);

    // first create the module
    const createResults = await axios.post(`${API_ROOT}/item`, {
      metadata: metadata,
      collection: { uuid: targetCollectionId }
    });

    // next get the uuid for the new module
    const newItemRegexResults = ITEM_LOCATION_REGEX.exec(createResults.headers.location);
    if (newItemRegexResults === null) {
      throw new Error();
    }
    const newModuleId = newItemRegexResults[1];

    // add the module to the course
    await CoursesApi.addItemAttachment(itemId, newModuleId, name);
  }

  public static createCourseModule (courseId: string, name: string, description: string, metadata: {[key: string]: string} = {}): Promise<any> {
    return CoursesApi.createItemChild(courseId, name, description, metadata, moduleCollectionId);
  }

  public static createModulePage (moduleId: string, name: string, description: string, metadata: {[key: string]: string} = {}): Promise<any> {
    return CoursesApi.createItemChild(moduleId, name, description, metadata, pageCollectionId);
  }

  public static async deleteModule (moduleId: string, courseId: string): Promise<any> {
    await axios.delete(`${API_ROOT}/item/${moduleId}/1`, {data: {purge: true}});
    await CoursesApi.removeItemAttachment(courseId, moduleId);
    return true;
  }
}

export default CoursesApi;