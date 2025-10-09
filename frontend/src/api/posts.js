import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "http://localhost:8000/posts";

export const getUserPosts = async (userId) => {
  const response = await fetch(BACKEND_DOMAIN + "/single/" + userId, {
    headers: getTokenHeader(),
  });
  const parsed = await response.json();
  console.log("parsed response from get user posts: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.posts;
};

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

export const editPost = async (postId, caption) => {
  const response = await fetch(BACKEND_DOMAIN + `/${postId}`, {
    headers: { "Content-Type": "application/json", ...getTokenHeader() },
    method: "PUT",
    body: JSON.stringify({ caption }),
  });

  const parsed = await response.json();
  console.log("parsed response from edit post: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.editedPost;
};

export const deletePost = async (postId) => {
  const response = await fetch(BACKEND_DOMAIN + `/${postId}`, {
    headers: getTokenHeader(),
    method: "DELETE",
  });

  const parsed = await response.json();
  console.log("parsed response from delete post: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};
