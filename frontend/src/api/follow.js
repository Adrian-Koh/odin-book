import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "http://localhost:8000/follow";

export const toggleFollowUser = async (userId, follow) => {
  const method = follow ? "POST" : "DELETE";
  const link = follow
    ? BACKEND_DOMAIN + "/requests/" + userId
    : BACKEND_DOMAIN + "/" + userId;
  const response = await fetch(link, {
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

export const acceptFollowRequest = async (userId) => {
  const response = await fetch(BACKEND_DOMAIN + "/requests/accept/" + userId, {
    headers: getTokenHeader(),
    method: "POST",
  });

  const parsed = await response.json();
  console.log(
    "parsed response from accept follow request: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};

export const getFollowRequests = async () => {
  const response = await fetch(BACKEND_DOMAIN + "/requests", {
    headers: getTokenHeader(),
  });

  const parsed = await response.json();
  console.log(
    "parsed response from get follow request: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return { received: parsed.received, sent: parsed.sent };
};
