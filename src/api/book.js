import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  getInfo: (bookId) => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/${bookId}`,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  uploadBook: ({ formdata }) => {

    const _axios = axios.create();

    return _axios({
      method: "post",
      url: `${API_BASE_URL}/books?userId=1`,
      data: formdata,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
