import apiClient from "./apiClient";

const register = (data: Sig) => {
  return apiClient.post("/auth/v1/users/signup/", data);
};

const authServices = {
  register,
};

export default authServices;
