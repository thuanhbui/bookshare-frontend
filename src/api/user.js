import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  login: ({ userInfo }) => {
    const _axios = axios.create();

    return _axios({
      method: "post",
      url: `${API_BASE_URL}/login`,
      data: userInfo,
    }).then((data) => {
      return data;
    });
  },
  getBookShelf: ({ userInfo, catalogId, search }) => {
    const _axios = axios.create();

    return _axios({
      method: "get",
      url: `${API_BASE_URL}/books/ofUser?userId=${userInfo.userid}&catalogId=${catalogId}&search=${search}`,
    }).then((data) => {
      console.log(data);
      return data;
    });
  },
  getAllCatalog: () => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/catalogs/all`,
    }).then((data) => {
      return data;
    });
  },
};
