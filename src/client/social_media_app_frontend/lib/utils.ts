import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export function getToken() {
  const token = Cookies.get("token");
  return String(token);
}

export function isAuthenticated() {
  const token = getToken();
  return token !== "undefined";
}

export function getAttributeFromToken(attr: string) {
  if (!isAuthenticated()) {
    return null;
  }

  const decodedToken = decodeToken();

  if (attr in decodedToken) {
    return (decodedToken as Record<string, any>)[attr];
  }

  return null;
}

export function decodeToken(token = getToken()) {
  const decodedJwt = jwtDecode(token);
  return decodedJwt;
}

export interface NavLinkElement {
  name: string;
  path: string;
  icon: IconDefinition;
}
