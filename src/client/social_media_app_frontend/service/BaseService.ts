import axios, { AxiosError, AxiosResponse } from "axios";
import { SUCCESS, ERROR } from "./Constants";

export const BACKEND_ENDPOINT: string = "http://localhost:8080/api/v1";

export interface Response {
  data?: string | null | undefined;
  code: number | null | undefined;
  status: string | null | undefined;
}

export default class BaseService {
  static DB = axios.create({
    baseURL: `${BACKEND_ENDPOINT}/`,
    withCredentials: true,
  });

  static getResponse(res: AxiosResponse | AxiosError | any): Response {
    const response: Response = {
      code: res.status,
      status: this.getResponseStatus(res.status),
    };

    if ((res as AxiosError).isAxiosError) {
      response.data = res.response.data;
    } else {
      response.data = (res as AxiosResponse).data;
    }

    return response;
  }

  static getResponseStatus(status: number | undefined | null): string {
    const s = "" + status;

    if (status == undefined || status == null) {
      return ERROR;
    } else if (s.charAt(0) === "4" || s.charAt(0) === "5") {
      return ERROR;
    } else {
      return SUCCESS;
    }
  }

  static defaultError(err: any) {
    if (err instanceof AxiosError) return err;
    else if (err instanceof Error) return new AxiosError(err.message);
    return new AxiosError("An unkown error occured.");
  }

  static getErrorMessage(err: any) {
    if (axios.isAxiosError(err)) {
      return err.response?.data?.toString() || "An error occurred";
    } else {
      return "Unexpected error occurred";
    }
  }
}
