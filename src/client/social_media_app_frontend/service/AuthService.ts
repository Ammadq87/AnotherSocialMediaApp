import { AxiosError, AxiosResponse } from "axios";
import BaseService from "./BaseService";
import toast from "react-hot-toast";
import { Response } from "./BaseService";

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
  dob: any;
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

  static async Login(data: LoginBody) {
    try {
      await this.DB.post(AUTH_SERVICE_ENDPOINT + "/login", data);
      window.location.href = "/feed";
    } catch (err) {
      const response: Response = this.getResponse(err);
      toast.error(response.data || "Login Error");
    }
  }

  static async Register(data: RegisterBody) {
    try {
      await this.DB.post(AUTH_SERVICE_ENDPOINT + "/register", data);
      window.location.href = "/feed";
    } catch (err) {
      const response: Response = this.getResponse(err);
      toast.error(response.data || "Registration Error");
    }
  }
}
