const BACKEND_DOMAIN = "https://odin-book-rgeb.onrender.com";

export const submitSignupEmail = async (email, password, name, file) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("name", name);
  formData.append("file", file);

  const response = await fetch(BACKEND_DOMAIN + `/users/signup`, {
    method: "POST",
    body: formData,
  });

  const parsed = await response.json();
  console.log("parsed response from email signup: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};

export const submitLoginEmail = async (email, password) => {
  const response = await fetch(BACKEND_DOMAIN + `/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const parsed = await response.json();
  console.log("parsed response from email login: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  localStorage.setItem("token", parsed.token);
};
