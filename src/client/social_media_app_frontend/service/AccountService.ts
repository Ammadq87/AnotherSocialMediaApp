import { getAttributeFromToken } from "../lib/utils";
import BaseService from "./BaseService";
import { Content } from "./ContentService";
import {
  ACCOUNT_SERVICE_ENDPOINT,
  ACCOUNT_SERVICE_ENDPOINT_MY_POSTS,
} from "./Constants";

export interface User {
  userID: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string | null;
  phoneNumber: string | null;
  dob: Date | null;
}

export interface Following {
  userA: string;
  userB: string;
}

export default class AccountService extends BaseService {
  //#region GET
  static async findUsers(param: string): Promise<User[]> {
    try {
      const response = await this.DB.get(
        `${ACCOUNT_SERVICE_ENDPOINT}/${param}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
      return [];
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
  //#endregion

  //#region PUT
  static async updateAccount(newAccount: User): Promise<string> {
    try {
      const userID = getAttributeFromToken("userID");
      const response = await this.DB.put(
        ACCOUNT_SERVICE_ENDPOINT + `/${userID}`,
        newAccount
      );
      return response.data;
    } catch (e) {
      return this.getErrorMessage(e);
    }
  }
  //#endregion

  //#region POST
  static async addUser(username: string) {
    try {
      debugger;
      const payload: Following = {
        userA: getAttributeFromToken("userID"),
        userB: username,
      };

      const response = await this.DB.post(`/account/followUser`, payload);
      return response.data;
    } catch (e) {
      return this.getErrorMessage(e);
    }
  }

  //#endregion
}
