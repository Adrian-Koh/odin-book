import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "http://localhost:8000/posts";

export const submitComment = async (postId, comment) => {
  const response = await fetch(BACKEND_DOMAIN + `/${postId}/comments`, {
    headers: { "Content-Type": "application/json", ...getTokenHeader() },
    method: "POST",
    body: JSON.stringify({ comment }),
  });

  const parsed = await response.json();
  console.log("parsed response from submit comment: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};

export const getPostComments = async (postId) => {
  const response = await fetch(BACKEND_DOMAIN + `/${postId}/comments`, {
    headers: getTokenHeader(),
  });

  const parsed = await response.json();
  console.log(
    "parsed response from get post comments: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed.comments;
};

export const editComment = async (postId, commentId, comment) => {
  const response = await fetch(
    BACKEND_DOMAIN + `/${postId}/comments/${commentId}`,
    {
      headers: { "Content-Type": "application/json", ...getTokenHeader() },
      method: "PUT",
      body: JSON.stringify({ comment }),
    }
  );

  const parsed = await response.json();
  console.log("parsed response from edit comment: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};

export const deleteComment = async (postId, commentId) => {
  const response = await fetch(
    BACKEND_DOMAIN + `/${postId}/comments/${commentId}`,
    {
      headers: getTokenHeader(),
      method: "DELETE",
    }
  );

  const parsed = await response.json();
  console.log("parsed response from delete comment: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};
