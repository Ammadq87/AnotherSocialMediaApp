import { getAttributeFromToken } from "../lib/utils";
import BaseService from "./BaseService";
import { Content } from "./ContentService";
import {
  ACCOUNT_SERVICE_ENDPOINT,
  ACCOUNT_SERVICE_ENDPOINT_MY_POSTS,
} from "./Constants";

export interface PersonalProfile {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string | null;
  phoneNumber: string | null;
  dob: Date | null;
}

export default class AccountService extends BaseService {
  static async getBasicProfileInformation(): Promise<PersonalProfile | null> {
    try {
      const userID = getAttributeFromToken("userID");
      const response = await this.DB.get(
        `${ACCOUNT_SERVICE_ENDPOINT}/${userID}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getMyPosts(): Promise<Content[] | null> {
    try {
      const userID = getAttributeFromToken("userID");

      let URL = ACCOUNT_SERVICE_ENDPOINT_MY_POSTS;
      URL = URL.replace("{}", userID);
      const myPosts = await this.DB.get(URL);
      return myPosts.data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}
