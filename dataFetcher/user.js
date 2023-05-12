import apiClient from "@/utils/apiClient";
import { toast } from "react-hot-toast";

export const loginFn = async (values) => {
  try {
    const res = await apiClient.post("users/login", values);
    if (res.data._id) {
      toast.success("Successfully Logged in");
      localStorage.setItem("authToken", res.data.token);
      return res.data;
    }
  } catch (error) {
    localStorage.removeItem("authToken");
    console.log(error);
  }
};

export const verify = async () => {
  try {
    const res = await apiClient.get("users/me");
    if (res.status === 401) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error.response.data.msg);
  }
};
