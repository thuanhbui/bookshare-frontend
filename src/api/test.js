import { API_BASE_URL } from "./const"

const axios = require('axios');

export default {
    firstTest: () => {
        console.log("hccc");
        const _axios =  axios.create();
        return _axios({
            method: 'get',
            url: `${API_BASE_URL}/hello`,
        }).then((data) => {
            return data;
        }).catch((e) => {console.log(e);});
    },

}

