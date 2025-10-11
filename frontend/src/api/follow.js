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

export const toggleFollowRequest = async (userId, accept) => {
  const baseLink = BACKEND_DOMAIN + "/requests/";
  const link = accept ? baseLink + "accept/" + userId : baseLink + userId;
  const method = accept ? "POST" : "DELETE";
  const response = await fetch(link, {
    headers: getTokenHeader(),
    method: method,
  });

  const parsed = await response.json();
  console.log(
    "parsed response from toggle follow request: " + JSON.stringify(parsed)
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
