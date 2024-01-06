import { baseURL } from "@/config/config";
import { token } from "@/libs/getToken";
import axios from "axios";


export const signinApi = (email: string, password: string) => {
  return axios.post(`${baseURL}signin`, {
    email,
    password,
  });
};

export const signupApi = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return axios.post(`${baseURL}signup`, {
    firstName,
    lastName,
    email,
    password,
  });
};

export const getUserInfo = () => {
  return axios.post(`${baseURL}getuserinfo`,{
    token: token,
  });
};
