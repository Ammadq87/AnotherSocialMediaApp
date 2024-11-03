import { getAttributeFromToken } from "../lib/utils";
import BaseService from "./BaseService";

export interface Content {
  id?: string;
  userId?: string;
  title?: string;
  message?: string;
  createdOn: Date;
  imageUrl?: string;
  likeCount?: number;
  commentCount?: number;
  shareCount?: number;
}

const CONTENT_SERVICE_URL: string = "/content";

export default class ContentService extends BaseService {
  static async createPost(caption: string) {
    const content: Content = {
      title: caption,
      createdOn: new Date(),
      userId: getAttributeFromToken("userID"),
    };

    try {
      const response = await this.DB.post(CONTENT_SERVICE_URL, content);
      return response;
    } catch (e) {
      return this.defaultError(e);
    }
  }
}
