import { getTokenHeader } from "../utils/tokenUtils";
const BACKEND_DOMAIN = "https://odin-book-rgeb.onrender.com/users/profile";

export const submitProfilePic = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(BACKEND_DOMAIN + "/pic", {
    headers: getTokenHeader(),
    method: "PUT",
    body: formData,
  });

  const parsed = await response.json();
  console.log(
    "parsed response from update profile pic: " + JSON.stringify(parsed)
  );

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  const token = parsed.token;
  localStorage.setItem("token", token);
};

export const submitName = async (name) => {
  const response = await fetch(BACKEND_DOMAIN + "/name", {
    headers: { "Content-Type": "application/json", ...getTokenHeader() },
    method: "PUT",
    body: JSON.stringify({ name }),
  });

  const parsed = await response.json();
  console.log("parsed response from update name: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  const token = parsed.token;
  localStorage.setItem("token", token);
};
