import axios, { AxiosError } from "axios";

export const BACKEND_ENDPOINT: string = "http://localhost:8080/api/v1";

export default class BaseService {
  static DB = axios.create({
    baseURL: `${BACKEND_ENDPOINT}/`,
    withCredentials: true,
  });

  static defaultError(err: any) {
    if (err instanceof AxiosError) return err;
    else if (err instanceof Error) return new AxiosError(err.message);
    return new AxiosError("An unkown error occured.");
  }
}
