import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "https://odin-book-rgeb.onrender.com/users";

export const getFollowingUsers = async () => {
  const response = await fetch(BACKEND_DOMAIN + "/following", {
    headers: getTokenHeader(),
  });
  const parsed = await response.json();
  console.log(
    "parsed response from get following users: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.users;
};

export const getAllUsers = async () => {
  const response = await fetch(BACKEND_DOMAIN, {
    headers: getTokenHeader(),
  });
  const parsed = await response.json();
  console.log("parsed response from get all users: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.users;
};

export const toggleFollowUser = async (userId, follow) => {
  const method = follow ? "POST" : "DELETE";
  const response = await fetch(BACKEND_DOMAIN + "/follow/" + userId, {
    headers: getTokenHeader(),
    method: method,
  });

  const parsed = await response.json();
  console.log(
    "parsed response from toggle follow user: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};
