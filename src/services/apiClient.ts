// Third party Imports
import axios from "axios";

// Redux Imports
import { persistor } from "@/appStateStore/redux/store";

// Utils Imports
import { errorHandler } from "@/utils/CommonFunctions";

export const BASEURL = process.env.NEXT_PUBLIC_BASEURL as string;

const apiClient = axios.create({
  baseURL: `${BASEURL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  xsrfHeaderName: "X-CSRFToken",
  xsrfCookieName: "csrftoken",
});

// const refreshAccessTokenHandler = async () => {
//   if (window.location.pathname !== "/login") {
//     try {
//       const res = await axios.post(
//         `${BASEURL}/account/token/refresh/`,
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       persistor.purge();
//       localStorage.clear();
//       window.location.href = "/login";
//     }
//   }
// };

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    if (
      (err.response.status === 401 || err.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      //   const res = await refreshAccessTokenHandler();
      return apiClient(originalRequest);
    }
    errorHandler(err);
    return Promise.reject(err);
  }
);

export default apiClient;
