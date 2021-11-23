import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  getInfo: ({ bookId, userInfo }) => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/${bookId}?userId=${userInfo?.userid}`,
    }).then((data) => {
      return data;
    });
  },
  getAllUser: () => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/users/all`,
    }).then((data) => {
      return data;
    });
  },
  deleteUser: ({userId}) => {
    const _axios = axios.create();
    return _axios({
      method: "delete",
      url: `${API_BASE_URL}/users/${userId}`,
      data: {},
    }).then((data) => {
      return data;
    });
  }
};
