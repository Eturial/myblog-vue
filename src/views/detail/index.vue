<!-- 文章详情模块 -->
<template xmlns:vue-markdown="http://www.w3.org/1999/xhtml">
<div class="detailBox tcommonBox">
  <span class="s-round-date">
    <span class="month">{{detailObj.createTime.substring(5,7) + "月"}}</span>
    <span class="day">{{detailObj.createTime.substring(8,11)}}</span>
  </span>
  <header>
    <h1 class="article-head-title">
      <a :href="'#/DetailShare?aid='+detailObj.tagId" target="_blank">
        {{detailObj.title}}
      </a>
    </h1>
    <h2>
      <i class="fa fa-fw fa-user"></i>发表于 <span>{{detailObj.createTime}}</span> •
      <i class="fa fa-fw fa-eye"></i>{{detailObj.views}} 次围观 •
      <i class="fa fa-fw fa-comments"></i>活捉 {{detailObj.comment}} 条 •
      <span class="rateBox">
        <i class="fa fa-fw fa-heart"></i>{{detailObj.thumbs}}点赞
      </span>
    </h2>
    <div class="ui label">
      <a :href="'#/Share?classId='+detailObj.tagId">{{detailObj.tagName}}</a>
    </div>
  </header>
  <div class="article-content" @click = change>
    <p v-html="md"></p>
  </div>
  <div class="dshareBox bdsharebuttonbox" data-tag="share_1">
    分享到:
    <a href="javascript:void(0);" class="ds-weibo fa fa-fw fa-weibo" data-cmd="tsina"></a>
    <a href="javascript:void(0);" class="ds-qq fa fa-fw fa-qq" data-cmd="tqq"></a>
    <a href="javascript:void(0);" class="ds-wechat fa fa-fw fa-wechat" data-cmd="weixin"></a>
    <div class="dlikeColBox">
      <div class="dlikeBox" @click="thumb()">
        <i :class="likeArt?'fa fa-fw fa-heart':'fa fa-fw fa-heart-o'"></i>喜欢 | {{this.likeCount}}
      </div>
    </div>
  </div>
  <div class="donate">
    <div class="donate-word">
      <span @click="pdonate=!pdonate">赞赏</span>
    </div>
    <el-row :class="pdonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
      <el-col :span="12" class="donate-item">
        <div class="donate-tip">
          <img :src="detailObj.wechat_image?detailObj.wechat_image: 'static/img/tou.jpg'" />
          <span>微信扫一扫，向我赞赏</span>
        </div>
      </el-col>
      <el-col :span="12" class="donate-item">
        <div class="donate-tip">
          <img :src="detailObj.alipay_image?detailObj.alipay_image:'static/img/tou.jpg'" />
          <span>支付宝扫一扫，向我赞赏</span>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
    import axios from 'axios';
    import markdown from 'marked';
// import {getArticleInfo,getArtLikeCollect,initDate} from '../utils/server.js'
export default {
name: 'Detail',
data () { //选项 / 数据
  return {
    aid:'',//文章ID
    pdonate: true,//打开赞赏控制,
    detailObj: {},//返回详情数据
    likeArt: false,//是否点赞
    likeCount: 0,//点赞数量
    collectCount: 500,//收藏数量
    collectArt: false,//是否收藏
    haslogin: false,//是否已经登录
    userId: '',//用户id
    create_time: '',
    content: '',
    md:''
  }
},
    computed: {
      markdown() {
          const md = new markdown();
          const result = md.render(this.content);
          return result;
      }
    },
mounted(){
    console.log(this.$route.params.id);
    axios({
        url : `http://localhost:14000/blog/getOneBlog?id=${this.$route.params.id}`,
        method : 'get',
    }).then((res)=>{
        this.detailObj = res.data;
        this.msg = this.detailObj.content;
        this.likeCount = this.detailObj.thumbs;
        console.log(this.detailObj);
    })

    axios({
        url : `http://localhost:14000/blog/updateView?id=${this.$route.params.id}`,
        method : 'post'
    })

},
methods: { //事件处理器
    thumb() {
        axios({
            url : `http://localhost:14000/blog/updateThumb?id=${this.$route.params.id}`,
            method : 'post'
        })
        this.likeArt = true;
        this.likeCount += 1;
    },
    change() {
        this.md = markdown(this.detailObj.content);
    }
},
  routeChange: function () {
    var that = this;
    that.aid = that.$route.query.aid == undefined ? 1 : parseInt(that.$route.query.aid);//获取传参的aid
    //判断用户是否存在
    if (localStorage.getItem('userInfo')) {
      that.haslogin = true;
      that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
      that.userId = that.userInfo.userId;
      // console.log(that.userInfo);
    } else {
      that.haslogin = false;
    }
//    获取详情接口
//     getArticleInfo(that.aid,that.userId,function(msg){
//         // console.log('文章详情',msg);
//         that.detailObj = msg;
//         that.likeCount = msg.like_count?msg.like_count:0;
//         that.collectCount = msg.collect_count?msg.collect_count:0;
//         that.likeArt = msg.user_like_start==0?false:true;
//         that.collectArt = msg.user_collect_start==0?false:true;
//         that.create_time = initDate(that.detailObj.create_time,'all');
//     })

  },

watch: {
  // 如果路由有变化，会再次执行该方法
  //  '$route':'routeChange'
},
components: { //定义组件

},
created () { //生命周期函数
  // var that = this;

  // this.routeChange();
},

}
</script>

<style lang="less">
  .article-head-title {
    padding: 20px 0 10px 0;
    font-size: 25px;
    font-weight: 700;
    text-align: center;
    line-height: 30px;
  }

.detailBox .article-content {
font-size: 15px;
white-space: normal;
word-wrap: break-word;
word-break: break-all;
overflow-x: hidden;
}
.detailBox .article-content p {
margin: 10px 0;
line-height: 24px;
word-wrap: break-word;
word-break: break-all;
overflow-x: hidden;
}
.detailBox .article-content pre {
word-wrap: break-word;
word-break: break-all;
overflow-x: hidden;
}
.detailBox .article-content img {
max-width: 100% !important;
height: auto !important;
overflow-x: hidden;
}
.detailBox .article-content a {
color: #df2050 !important;
}
.detailBox .article-content a:hover {
text-decoration: underline;
color: #f00 !important;
}
.detailBox .article-content i {
font-style: italic;
}
.detailBox .article-content strong {
font-weight: bold;
}
.detailBox .article-content ul {
list-style-type: disc !important;
list-style: disc !important;
padding-left: 40px !important;
li {
  list-style-type: disc !important;
  list-style: disc !important;
}
}
.detailBox .article-content h1,
.detailBox .article-content h2,
.detailBox .article-content h3 {
font-size: 200%;
font-weight: bold;
}
.detailBox .article-content h4,
.detailBox .article-content h5,
.detailBox .article-content h6 {
font-size: 150%;
font-weight: bold;
}
.detailBox .viewdetail {
margin: 10px 0;
line-height: 24px;
text-align: center;
}
/*分享图标*/
.dshareBox {
margin-top: 40px;
position: relative;
}
.dshareBox a {
position: relative;
display: inline-block;
width: 32px;
height: 32px;
font-size: 18px;
border-radius: 50%;
line-height: 32px;
text-align: center;
vertical-align: middle;
margin: 4px;
background: #fff;
transition: background 0.6s ease-out;
}
.dshareBox .ds-weibo {
border: 1px solid #ff763b;
color: #ff763b;
}
.dshareBox .ds-weibo:hover {
color: #fff;
background: #ff763b;
}
.dshareBox .ds-qq {
color: #56b6e7;
border: 1px solid #56b6e7;
}
.dshareBox .ds-qq:hover {
color: #fff;
background: #56b6e7;
}
.dshareBox .ds-wechat {
color: #7bc549;
border: 1px solid #7bc549;
}
.dshareBox .ds-wechat:hover {
color: #fff;
background: #7bc549;
}
.dshareBox .ds-wechat:hover .wechatShare {
opacity: 1;
visibility: visible;
}
.detailBox .bdshare-button-style0-32 a {
float: none;
background-image: none;
text-indent: inherit;
}
/*点赞 收藏*/
.dlikeColBox {
display: inline-block;
float: right;
}
.dlikeBox,
.dcollectBox {
display: inline-block;
padding: 0 10px;
height: 35px;
color: #e26d6d;
line-height: 35px;
border-radius: 35px;
border: 1px solid #e26d6d;
cursor: pointer;
}

/*赞赏*/
.donate-word {
margin: 40px 0;
text-align: center;
}
.donate-word span {
display: inline-block;
width: 80px;
height: 34px;
line-height: 34px;
color: #fff;
background: #e26d6d;
margin: 0 auto;
border-radius: 4px;
cursor: pointer;
}
.donate-body {
display: none;
}
.donate-body-show {
display: block;
}
.donate-item {
text-align: right;
}
.donate-item:last-child {
text-align: left;
}
.donate-item img {
width: 100%;
display: block;
height: auto;
}
.donate-item div {
display: inline-block;
width: 150px;
padding: 0 6px;
box-sizing: border-box;
text-align: center;
}
.donate-item div span {
display: inline-block;
width: 100%;
margin: 10px 0;
text-align: center;
}
.donate-body .donate-item:first-of-type div {
color: #44b549;
}
.donate-body .donate-item:nth-of-type(2) div {
color: #00a0e9;
}

.bd_weixin_popup {
position: fixed !important;
}
</style>
