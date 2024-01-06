import Cookies from "js-cookie";

// Function to set the JWT token as an HTTP-only cookie
export const setJWTTokenCookie = (token: string) => {
  // Set the cookie to expire in a reasonable timeframe
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 1 * 3600 * 1000);

  // Set the HTTP-only cookie
  Cookies.set("jwt_token", token, {
    expires: expirationDate,
    secure: true, // For secure (HTTPS) connections
    sameSite: "strict", // Adjust this as needed
    // httpOnly: true, // This makes the cookie HTTP-only
  });
};

export const getJWTToken = () => {
  return Cookies.get("jwt_token");
};
