import { API_BASE_URL } from "./const";

const axios = require("axios");

export default {
  login: ({ userInfo }) => {
    const _axios = axios.create();

    // let myHeaders = new Headers();
    
    // const session = "F29C511788BC4E04794EB6F9CEEAA78B";

    // console.log(session);

    // myHeaders.append("Cookie", `JSESSIONID=${session}`);

    return _axios({
      method: "post",
      // headers: myHeaders,
      url: `http://localhost:9001/j_spring_security_check`,
      data: userInfo,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
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
  getAllCatalog: () => {
    const _axios = axios.create();
    return _axios({
      method: "get",
      url: `${API_BASE_URL}/catalogs/all`,
    })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
