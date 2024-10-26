import { AxiosError, AxiosResponse } from "axios";
import BaseService from "./BaseService";

const AUTH_SERVICE_ENDPOINT: string = "/auth";

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  phoneNumber: string;
  username: string;
}

export default class AuthService extends BaseService {
  static async Logout(): Promise<AxiosResponse | AxiosError> {
    try {
      const response = await this.DB.post(AUTH_SERVICE_ENDPOINT + "/logout");
      return response;
    } catch (err) {
      return this.defaultError(err);
    }
  }

  static async Login(data: LoginBody): Promise<AxiosResponse | AxiosError> {
    try {
      const response = await this.DB.post(
        AUTH_SERVICE_ENDPOINT + "/login",
        data
      );
      return response;
    } catch (err) {
      return this.defaultError(err);
    }
  }

  static async Register(
    data: RegisterBody
  ): Promise<AxiosResponse | AxiosError> {
    try {
      const response = await this.DB.post(
        AUTH_SERVICE_ENDPOINT + "/register",
        data
      );
      return response;
    } catch (err) {
      return this.defaultError(err);
    }
  }
}
