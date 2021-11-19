import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  getBookShelf: () => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/ofUser?userId=1`,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
