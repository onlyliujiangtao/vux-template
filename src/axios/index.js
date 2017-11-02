import axios from 'axios'

// axios 配置
axios.defaults.baseURL = 'http://58.22.60.181:8880';
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/'; // 你的接口地址
}

const doPost = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
                console.info(response.data);
            }, (err) => {
                console.error(err);
                let errMsg = {
                    state: 'fail',
                    msg: err.message
                };
                resolve(errMsg);
            })
            .catch((err) => {
                console.error(err);
                let errMsg = {
                    state: 'fail',
                    msg: err.message
                };
            });
    });
}

doPost('/memberList',{page:{pageNo:1,pageSize:2}})
doPost('/post', [123,2324,23432,423,423,423423,234])
doPost('/login')