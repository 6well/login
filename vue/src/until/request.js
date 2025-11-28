import axios from 'axios'
const request = axios.create({
    baseURL: 'http://localhost:9090',
    timeout: 5000
})
// 统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = JSON.parse(localStorage.getItem("honey-user") || '{}')
    config.headers['token'] = user.token//请求头
    return config
},error => {
    return Promise.reject(error)
});
//response 拦截器
request.interceptors.response.use(
    response => {
        let res = response.data;
        if (typeof res === 'string' && res.trim() !== '') {
            try {
                res = JSON.parse(res);
            } catch (e) {
                console.warn('响应数据不是有效的JSON:', res);
                // 保持原样，不解析
            }
        }
        return res;
    },
    error => {
        console.error('response error:' + error)
        return Promise.reject(error)
    }
)
export default request
