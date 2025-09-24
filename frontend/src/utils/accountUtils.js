const BACKEND_DOMAIN = "http://localhost:8000";

export const submitSignup = async (email, password, name, file) => {
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
  console.log("parsed response from signup: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }
};

export const submitLogin = async (email, password) => {
  const response = await fetch(BACKEND_DOMAIN + `/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const parsed = await response.json();
  console.log("parsed response from login: " + JSON.stringify(parsed));

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  localStorage.setItem("token", parsed.token);
};
