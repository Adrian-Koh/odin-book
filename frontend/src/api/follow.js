import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "http://localhost:8000/follow";

export const toggleFollowUser = async (userId, follow) => {
  const method = follow ? "POST" : "DELETE";
  const response = await fetch(BACKEND_DOMAIN + "/" + userId, {
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
