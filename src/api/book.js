import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  getInfo: ({bookId, userInfo}) => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/${bookId}?userId=${userInfo?.userid ? userInfo?.userid : ""}`,
    }).then((data) => {
      return data;
    });
  },
  uploadBook: ({ formdata, userInfo }) => {
    const _axios = axios.create();

    return _axios({
      method: "post",
      url: `${API_BASE_URL}/books?userId=${userInfo.userid}`,
      data: formdata,
    }).then((data) => {
      return data;
    });
  },
  getHotBooksByCatalog: ({userInfo, catalogId, search }) => {
    // const _axios = axios.create();
    // return _axios({
    //   method: "get",
    //   url: `${API_BASE_URL}/books/top10/${catalogId}`,
    // }).then((data) => {
    //   return data;
    // });
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/ofUser?userId=${userInfo.userid}&catalogId=${catalogId}&search=${search}`,
    }).then((data) => {
      console.log(data.data);
      return data;
    });
  },
  deleteBook: ({ bookId }) => {
    const _axios = axios.create();
    return _axios({
      method: "delete",
      url: `${API_BASE_URL}/books/${bookId}`,
      data: {},
    }).then((data) => {
      return data;
    });
  },
  getNewReleaseBooks: () => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/new`,
    }).then((data) => {
      return data;
    });
  },
  toggleLike: ({userInfo, bookId}) => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/toggleLike?userId=${userInfo.userid}&bookId=${bookId}`,
    }).then((data) => {
      return data;
    });
  }
};
