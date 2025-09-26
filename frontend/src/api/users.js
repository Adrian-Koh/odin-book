import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "http://localhost:8000/users";

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
