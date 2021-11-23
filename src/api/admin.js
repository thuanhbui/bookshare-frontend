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
};
