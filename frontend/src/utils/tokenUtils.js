import { jwtDecode } from "jwt-decode";

const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }

  return { authorization: `Bearer ${token}` };
};

const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);

    return decoded.user;
  } catch {
    return null;
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
};

export { getTokenHeader, getUserFromToken, removeToken };
