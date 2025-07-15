export const users = [
  { username: "teacher", password: "12345", role: "teacher" },
  { username: "student", password: "12345", role: "student" }
];

export const loginUser = (username, password) => {
  return users.find(user => user.username === username && user.password === password);
};

export const saveUser = user => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};
