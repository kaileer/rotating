import request from './request'


export const homeList = (params) => {
    return request({
        url: '/home/homeThreadList',
        method: 'post',
        params
    })
}

export const tableApi = (params) => {
    return request({
        url: '/car/HandleBusHouseld/carList',
        method: 'post',
        params
    })
}
