import axios from "axios";
import jwtDecode from "jwt-decode";


const refreshToken = async () => {
  try {
    const url = "http://localhost:4000/v1/refresh-token";
    const response = await axios.post(url, null, { withCredentials: true });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const createAxios = (currentUser, dispatch, token,loginSuccess) => {
  const newInstance = axios.create({});
  newInstance.interceptors.request.use(
    async (config) => {
      const decodeToken = jwtDecode(token);
      if (decodeToken.exp < new Date().getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...currentUser,
          access_token: data.access_token,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = `Bearer ${data.access_token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return newInstance
};
