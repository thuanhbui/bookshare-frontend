import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  getAllCatalog: () => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/catalogs/all`,
    })
      .then((data) => {
        return data;
      })
  },
};
