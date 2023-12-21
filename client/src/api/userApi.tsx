import axios from "axios";

export const signinApi = (email: string, password: string) => {
  return axios.post(`http://localhost:5000/signin`, {
    email,
    password,
  });
  // .then((response) => {
  //   console.log(response.data);
  //   document.cookie = `authToken=${response.data.token}; path=/`;
  //   const expirationTime = new Date().getTime() + 1 * 100;
  //   document.cookie = `authTokenExpiration=${expirationTime}; path=/;`;
  //   return response.data;
  // })
  // .catch((error) => {
  //   console.log(error);
  // });
};

export const signupApi = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return axios.post(`http://localhost:5000/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
  // .then((response) => {
  //   console.log(response.data);
  //   setToastMessage(response.data);
  //   return response.data;
  // })
  // .catch((error) => {
  //   setToastMessage(error.response.data.error);
  //   console.log(error);
  // });
};
