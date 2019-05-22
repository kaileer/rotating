const shareTimeline= (opstion) => {
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        desc: opstion.dec, // 分享描述
        success() {
            opstion.success()
        },
        cancel() {
            opstion.error()
        }
    });
    wx.onMenuShareTimeline({
        title: opstion.title, // 分享标题
        link: opstion.link, // 分享链接
        imgUrl: opstion.imgUrl, // 分享图标
        desc: opstion.dec, // 分享描述
        success() {
            opstion.success()
        },
        cancel() {
            opstion.error()
        }
    })
}
export default (data,options) => {
    wx.config({
        debug: false, //如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    });
    shareTimeline(options);
}