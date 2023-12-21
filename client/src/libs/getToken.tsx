import jwt from "jsonwebtoken";

//Get token from cookie
const getCookie = (name: string) => {
  if (typeof window !== "undefined") {
    const cookieValue = document?.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(name))
      ?.split("=")[1];

    return cookieValue || "";
  }
};
export const token = getCookie("authToken");

//Decode token to get userInfo
export const user = token ? jwt.decode(token) : undefined;

// export const isTokenExpired = () => {
//   const authTokenExpiration = user?.exp;

//   if (authTokenExpiration) {
//     const expirationTime = parseInt(authTokenExpiration);
//     const currentTime = new Date().getTime() / 1000; // Convert to seconds

//     return expirationTime < currentTime;
//   }

//   // If there's no expiration time, consider the token as expired
//   return true;
// };

// // Function to check and remove expired authToken
// export const checkAndRemoveAuthToken = () => {
//   if (isTokenExpired()) {
//     // Token has expired, remove authToken and authTokenExpiration cookies
//     document.cookie =
//       "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//     document.cookie =
//       "authTokenExpiration=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//   }
// };
