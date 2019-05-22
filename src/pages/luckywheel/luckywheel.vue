<template>
    <div id="app">
        <div class="container">
            <div class="lucky-wheel">
                <div class="wheel-main">
                    <div class="wheel-pointer-box">
                        <div class="wheel-pointer" @click="rotateHandle()" :style="{transform:rotateAnglePointer,transition:rotateTransitionPointer}"></div>
                    </div>
                    <div class="wheel-bg" :style="{transform:rotateAngle,transition:rotateTransition}">
                        <div class="prize-list">
                            <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                                <!-- <div class="prize-pic">
                                <img :src="item.icon">
                            </div> -->
                                <!-- <div class="prize-count" v-if="item.count">
                                {{item.count}}
                            </div> -->
                                <div class="prize-type">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 下注 -->
            <div class="bet-size">
                <dl>
                    <dt><img src="@/assets/img/jinbi.png" alt="">金币<em>{{gold}}</em></dt>
                    <dd>可抽<em>5</em>次</dd>
                </dl>
                <ul>
                    <li>下注</li>
                    <li><i @click="handleMinus"><img src="@/assets/img/minus.png" alt=""></i>{{jetton}}<i @click="handleAdd"><img src="@/assets/img/add.png" alt=""></i></li>
                    <li @click="handleTwoHundred">+200</li>
                    <li @click="handleAll">全压</li>
                </ul>
            </div>
            <!-- 公告 -->
            <div class="notice">
                <ul :class="{'notice-amt':animate==true}">
                    <li v-for='item in items'>
                        {{item.name}}一路向东翻了<em>1.8倍</em>获得<em>345金币</em>
                    </li>
                </ul>
            </div>
            <div class="lottery-txt">
                <!--最新中奖消息-->
                <h1 class="tit-1"></h1>
                <ul>
                    <li><span>13583383 ...</span><span>抽中四等奖</span><span>1金币</span><span class="time">5&nbsp;分钟前</span></li>
                    <li><span>囧爷</span><span>抽中四等奖</span><span>1金币</span><span class="time">59&nbsp;分钟前</span></li>
                    <li><span>快乐方向 ...</span><span>抽中四等奖</span><span>1金币</span><span class="time">1&nbsp;小时前</span></li>
                    <li><span>王行路运 ...</span><span>抽中四等奖</span><span>1金币</span><span class="time">1&nbsp;小时前</span></li>
                    <li><span>小妮子 ...</span><span>抽中二等奖</span><span>50元配件优惠券 ...</span><span class="time">1&nbsp;小时前</span></li>
                </ul>
                <!--最新中奖消息-->
                <!--规则说明-->
                <h1 class="tit-2"></h1>
                <div class="div-txt">
                    <p>1、该活动仅限三一卡车APP注册人员参加。</p>
                    <p>2、每人每天有1次免费抽奖机会，后每次抽奖需要消耗100积分。</p>
                    <p>3、每个用户有10次抽奖机会。</p>
                    <p>4、实物奖励最迟在次月的15前完成发放，虚拟奖励系统及时发放。</p>
                    <p>5、配件优惠券单笔订单仅限使用1张，若交易失败，则自动退回。</p>
                    <p>6、优惠券无法转赠他人，仅限本账号使用。</p>
                    <p>7、本活动最终解释权归三一重卡所有。</p>
                </div>
                <!--规则说明-->
            </div>
            <div class="toast" v-show="toastControl">
                <div class="toast-container">
                    <img src="@/assets/img/congratulation.png" class="toast-picture">
                    <!-- <div class="close" @click="close_toast()"></div> -->
                    <div class="toast-title">
                        {{toast_title}}
                    </div>
                    <div class="toast-btn" @click="close_toast">确定</div>
                </div>
            </div>
            <div class="toast-mask" v-show="toastControl"></div>
        </div>
    </div>
</template>
<script>
import wxShare from '@/assets/js/share.js'
export default {
    data() {
        return {
            easejoy_bean: 0, //金豆
            lottery_ticket: 0, //抽奖次数
            prize_list: [{
                    icon: '', // 奖品图片
                    count: 10, // 奖品数量
                    name: "x3", // 奖品名称
                    isPrize: 1 // 该奖项是否为奖品
                },
                {
                    icon: '',
                    count: 5,
                    name: "x1.3",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x0.9",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 5,
                    name: "x1.5",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x0.6",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x1.1",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 0,
                    name: "x2",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x1.4",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x0.8",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x1.1",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 0,
                    name: "x0.5",
                    isPrize: 1
                },
                {
                    icon: '',
                    count: 10,
                    name: "x1.2",
                    isPrize: 1
                }
            ], //奖品列表
            toastControl: true, //抽奖结果弹出框控制器
            hasPrize: false, //是否中奖
            startRotatingDegree: 0, //初始旋转角度
            rotateAngle: 0, //将要旋转的角度
            startRotating_degree_Dinter: 0, //指针初始旋转角度
            rotateAnglePointer: 0, //指针将要旋转的度数
            rotateTransition: "transform 6s ease-in-out", //初始化选中的过度属性控制
            rotateTransitionPointer: "transform 12s ease-in-out", //初始化指针过度属性控制
            clickFlag: true, //是否可以旋转抽奖
            index: 0,
            animate:false,
            items:[
              {name:"马云"},
              {name:"雷军"},
              {name:"王勤"}
            ],
            gold:65456,
            jetton: 0
        };
    },
    created() {
        this.initPrizeList();
        setInterval(this.noticeScroll,1000)
    },
    mounted(){
        wxShare()
        /*
        options = {
            title:'',
            title:'',
            title:'',
        }
        ajax({
            
        })
        .done((data)=>{
            wxShareInit(data,options)
        })
        */
    },
    computed: {
        toast_title() {
            return this.hasPrize ?
                "恭喜您，获得" + this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name :
                "未中奖";
        }
    },
    methods: {
        noticeScroll(){
            this.animate=true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
            setTimeout(()=>{
               this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
               this.items.shift();               //删除数组的第一个元素
               this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
            },500)
        },
        //此方法为处理奖品数据
        initPrizeList(list) {},
        rotateHandle() {
            this.index = 1 //指定每次旋转到的奖品下标
            this.rotating();
        },
        rotating() {
            if (!this.clickFlag) return;
            var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
            var duringTime = 5; // 默认为1s
            var random = Math.floor(Math.random() * 7);
            var resultIndex = this.index; // 最终要旋转到哪一块，对应prize_list的下标
            var resultAngle = [30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]; //最终会旋转到下标的位置所需要的度数
            var randCircle = 6; // 附加多转几圈，2-3
            this.clickFlag = false; // 旋转结束前，不允许再次触发
            if (type == 0) {
                // 转动盘子
                var rotateAngle =
                    this.startRotatingDegree +
                    randCircle * 360 +
                    resultAngle[resultIndex] -
                    this.startRotatingDegree % 360;
                this.startRotatingDegree = rotateAngle;
                this.rotateAngle = "rotate(" + rotateAngle + "deg)";
                // // //转动指针
                // this.rotateAnglePointer = "rotate("+this.startRotating_degree_Dinter + 360*randCircle+"deg)";
                // this.startRotating_degree_Dinter =360*randCircle;
                var that = this;
                // 旋转结束后，允许再次触发
                setTimeout(function() {
                    that.clickFlag = true;
                    that.game_over();
                }, duringTime * 1000 + 1500); // 延时，保证转盘转完
            } else {
                //
            }
        },
        game_over() {
            this.toastControl = true;
            this.hasPrize = this.prize_list[this.index].isPrize
        },
        //关闭弹窗
        close_toast() {
            this.toastControl = false;
        },
        handleAdd(){
            this.jetton++
        },
        handleTwoHundred(){
            this.jetton+=200
        },
        handleMinus(){
            this.jetton--
        },
        handleAll(){
            this.jetton=this.gold
        }
    }
};
</script>
<style lang="scss" scoped>
.bet-size{
    width: 552px;
    margin:0 auto;
    font-size:24px;
    dl{
        padding: 0 10px;
        height: 34px;
        line-height: 34px;
        color: #424242;
        font-weight: bold;

        dt{
            float: left;
            img{
                width: 34px;
                float: left;
                margin-right: 10px;
            }
        }
        dd{
            float: right;
        }
        em{
            font-style: normal;
            color:#FE2A00;
        }
    }
    ul{
        width: 100%;
        margin-top: 10px;
        height: 80px;
        font-weight: 500;
        background: #FF8400;
        box-sizing: border-box;
        padding-top: 10px;
        border-radius:10px;
        overflow: hidden;
        li{
            float: left;
            color: #323232;
            line-height: 58px;
            i{
                font-style: normal;
                width: 50px;
                height: 50px;
                line-height: 50px;
                border-radius: 25px;
                overflow: hidden;
                background: #FF473A;
                text-align: center;
                color:#fff;
                font-size: 36px;
                &:nth-child(1){
                    float: left;
                }
                &:nth-child(2){
                    float: right;
                }
                img{
                    width: 100%;
                    float: left;
                }
            }
            &:nth-child(1){
                padding: 0 12px;
                font-size: 24px;
                width: 48px;
            }
            &:nth-child(2){
                width: 209px;
                height: 58px;
                text-align: center;
                line-height: 58px;
                padding: 4px 5px;
                box-sizing: border-box;
                background: #FFC841;
                border-radius:29px;
                font-size:30px;
            }
            &:nth-child(3),&:nth-child(4){
                text-align: center;
                margin-left: 20px;
                width: 110px;
                height: 58px;
                line-height: 58px;
                border-radius: 29px;
                color: #fff;
                background: #FF473A;
            }
        }
    }
}
.lottery-txt {
    background: #ffde5a;
    margin: 0 16px;
    padding: 20px 0;
    color: #333;
    ul {
        padding: 6px 40px 30px 40px;
        border-bottom: 16px solid #770f11;
        li {
            height: 60px;
            line-height: 60px;
            overflow: hidden;
            position: relative;
            font-size: 28px;
            display: flex;
            span {
                display: block;
                height: 60px;
                overflow: hidden;
                &:nth-child(1){
                    color: #ff0100;
                }
                &:nth-child(2){
                    padding: 0 10px;
                    min-width: 64px;
                }
                &:nth-child(3){
                    color: #ff0100;
                }
                &:nth-child(4){
                    text-align: right;
                }
            }
        }
    }
    .tit-1 {
        background: url(https://bbs.31truck.com/source/plugin/ygteam_lottery/static/tit_1.png) no-repeat;
        height: 112px;
        width: 260px;
        background-size: 260px 112px;
        margin: 0 24px;
    }
    .tit-2 {
        background: url(https://bbs.31truck.com/source/plugin/ygteam_lottery/static/tit_2.png) no-repeat;
        margin-top: 20px;
        height: 112px;
        width: 260px;
        background-size: 260px 112px;
        margin: 24px 24px 0 24px;
    }
    .div-txt {
        font-size: 28px;
        padding: 6px 40px 20px 40px;
        p {
            padding: 6px 0;
        }
    }
} 

.notice{
    width: 720px;
    height: 40px;
    overflow: hidden;
    padding-left: 95px;
    position: relative;
    background: #2e2810;
    color: #ebebeb;
    font-size: 18px;
    margin:0 auto;
    &:before {
        content: "";
        display: block;
        background: url(https://bbs.31truck.com/source/plugin/ygteam_lottery/static/gg_icon.png) no-repeat;
        background-size: 26px;
        height: 26px;
        width: 26px;
        position: absolute;
        top: 7px;
        left: 55px;
    }
    .notice-amt{
        transition: all 0.5s;
        margin-top: -40px;
    }
    li{
        list-style: none;
        line-height: 40px;
        height: 40px;
        em{
            color: #fb3810;
            font-style: normal;
        }
    }
}

.container {
    width: 100%;
    background:#770f11 url(../../assets/img/bg.jpg) no-repeat top center/100% auto;
    padding-bottom: 55px;
}

.lucky-wheel {
    width: 100%;
    padding-top: 258px;
}

.wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.wheel-bg {
    width: 611px;
    height: 611px;
    background: url(../../assets/img/draw_wheel.png) no-repeat center;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
    position: relative;
}

.wheel-pointer-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    width: 547px;
    height: 547px;
}

.wheel-pointer {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 307px;
    height: 409px;
    transform: translate(-50%, -50%);
    background: url(../../assets/img/draw_btn.png) no-repeat center;
    background-size: 100%;
}

.wheel-bg div {
    text-align: center;
}

.prize-list {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 2;
    margin-left: -50.91px;
    transform-origin: center bottom;
}
.prize-list .prize-item:nth-child(1) {
    transform: rotate(0deg);
    font-size: 36px;
    color: #ff0c00;
}
.prize-list .prize-item:nth-child(2) {
    transform: rotate(30deg);
}

.prize-list .prize-item:nth-child(3) {
    transform: rotate(60deg);
}

.prize-list .prize-item:nth-child(4) {
    transform: rotate(90deg);
}

.prize-list .prize-item:nth-child(5) {
    transform: rotate(120deg);
}

.prize-list .prize-item:nth-child(6) {
    transform: rotate(150deg);
}

.prize-list .prize-item:nth-child(7) {
    transform: rotate(180deg);
}

.prize-list .prize-item:nth-child(8) {
    transform: rotate(210deg);
}

.prize-list .prize-item:nth-child(9) {
    transform: rotate(240deg);
}
.prize-list .prize-item:nth-child(10) {
    transform: rotate(270deg);
}

.prize-list .prize-item:nth-child(11) {
    transform: rotate(300deg);
}

.prize-list .prize-item:nth-child(12) {
    transform: rotate(330deg);
}
.prize-list .prize-item:nth-child(7n){
    color: #ff0c00;
}
.prize-list .prize-item:nth-child(2n){
    color: #ff6f68;
}

.prize-item {
    width: 101.83px;
    height: 305.5px;
    color: #828282;
    font-weight: bold;
}

.prize-pic img {
    width: 100px;
    height: 100px;
    margin-top: 30px;
}

.prize-count {
    font-size: 18px;
}

.prize-type {
    font-size: 24px;
    padding-top: 50px;
}

.toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    width: 100%;
    height: 100%;
}

.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 480px;
    height: 452px;
    background:rgba(255,255,255,1);
    border-radius: 10px;
    background-color: rgb(252, 244, 224);
    .toast-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .toast-picture {
        position: absolute;
        top: -76px;
        left: 40px;
        width: 412px;
        height: 146px;
    }
    .toast-title {
        font-size: 30px;
        color: #111111;
        padding-top: 245px;
        padding-bottom: 50px;
        text-align: center;
    }
    .toast-btn {
        width:242px;
        height:60px;
        line-height:60px;
        font-size: 30px;
        margin: 0 auto;
        color:#fff;
        text-align: center;
        background:rgba(255,71,58,1);
        border-radius:30px;
    }
}

</style>