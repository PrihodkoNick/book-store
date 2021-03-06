import api from "./index";

export const getUser = async () => {
  return await api.get("/api/auth");
};

export const registerUser = async (body) => {
  return await api.post("/api/users", body);
};

export const loginUser = async (body) => {
  return await api.post("/api/auth", body);
};

export const editUser = async (body) => {
  return await api.patch("/api/users", body);
};
