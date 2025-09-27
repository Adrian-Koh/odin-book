import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "http://localhost:8000/posts";

export const getPosts = async () => {
  const response = await fetch(BACKEND_DOMAIN, {
    headers: getTokenHeader(),
  });
  const parsed = await response.json();
  console.log("parsed response from get posts: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.posts;
};

export const togglePostLike = async (postId, like) => {
  const link = BACKEND_DOMAIN + "/" + postId + "/like";
  const method = like ? "POST" : "DELETE";
  const response = await fetch(link, {
    headers: getTokenHeader(),
    method: method,
  });
  const parsed = await response.json();
  console.log(
    "parsed response from toggle post like: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};

export const submitNewPost = async (caption, file = null) => {
  const formData = new FormData();
  formData.append("caption", caption);
  formData.append("file", file);

  const response = await fetch(BACKEND_DOMAIN, {
    headers: getTokenHeader(),
    method: "POST",
    body: formData,
  });

  const parsed = await response.json();
  console.log("parsed response from submit post: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};
