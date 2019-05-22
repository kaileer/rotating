import axios from 'axios'
import Qs from 'qs'

const service = axios.create({
    baseURL: process.env.VUE_APP_REQUESTURL,
    // baseURL: requestUrl,
    transformRequest: [function (data) {
        return Qs.stringify(data);
    }],
    /*paramsSerializer: function(params) {
        return Qs.stringify(params, {arrayFormat: 'indices'})
    }*/
})


service.interceptors.request.use(config => {
    config.headers['Accept'] = 'token';
    return config
},function(error){
    return Promise.reject(error)
})

service.interceptors.response.use(response => {
    return response.data;
}, function (error) {
    return Promise.reject(error)
})

export default service