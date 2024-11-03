import toast from "react-hot-toast";
import { getAttributeFromToken } from "../lib/utils";
import BaseService from "./BaseService";
import { SUCCESS } from "./Constants";
import { Content } from "./ContentService";

export const ACCOUNT_SERVICE_ENDPOINT = "/account";
export const ACCOUNT_SERVICE_ENDPOINT_MY_POSTS = "/account/{}/posts";

export interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  name: string;
  dateOfBirth: Date | null;
  lastUpdatedOn?: Date;
  createdOn?: Date;
}

export interface Following {
  userA: string;
  userB: string;
}

const root: string = "/account";

export default class AccountService extends BaseService {
  //#region GET

  static async getAccountById(id: string): Promise<User | null> {
    try {
      const response = this.getResponse(await this.DB.get(`${root}/${id}`));

      if (response.status === SUCCESS) {
        return response.data;
      } else {
        toast.error("Account not found");
      }
    } catch (e) {
      console.log(e);
      toast.error("[E] Account not found");
    }

    return null;
  }

  static async findUsers(param: string): Promise<User[]> {
    try {
      const response = this.getResponse(
        await this.DB.get(`/account/search/${param}`)
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
      const response = await this.DB.put(root, newAccount);
      return response.data;
    } catch (e) {
      return this.getErrorMessage(e);
    }
  }
  //#endregion

  //#region POST
  static async followUser(username: string) {
    try {
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
