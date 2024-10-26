import { getAttributeFromToken } from "../lib/utils";
import BaseService from "./BaseService";

export interface Content {
  caption: string;
  createdOn?: Date;
  postedBy: string;
}

const CONTENT_SERVICE_URL: string = "/content";

export default class ContentService extends BaseService {
  static async createPost(caption: string) {
    const content: Content = {
      caption: caption,
      createdOn: new Date(),
      postedBy: getAttributeFromToken("userID"),
    };

    try {
      const response = await this.DB.post(CONTENT_SERVICE_URL, content);
      return response;
    } catch (e) {
      return this.defaultError(e);
    }
  }
}
