<template>
  <div>
    <div class="shareTitle">
      <!--<div class="ui label">-->
        <!--<a>{{className}}</a>-->
      <!--</div>-->
      <ul class="archive-class-all">
        <li v-for="item in classList" :key="item.tagId">
          <a :href="'category/'+item.tagId">{{item.tagName}}</a>
        </li>
      </ul>
    </div>
    <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in articleList" :key="'article'+index">
      <span class="s-round-date">
        <span class="month">{{item.createTime.substring(5,7) + "月"}}</span>
        <span class="day">{{item.createTime.substring(8,11)}}</span>
      </span>
      <header class="article-head">
        <h1 class="article-head-title">
          <a :href="'#/DetailShare?aid='+item.tagId" target="_blank">
            {{item.title}}
          </a>
          <!--<router-link :to="{path:'/detail/', {params:{id : item.blogId}}">{{item.title}}</router-link>-->
        </h1>
        <h2 class="article-head-count">
          <i class="fa fa-fw fa-user"></i>发表于
          <i class="fa fa-fw fa-clock-o"></i><span>{{item.createTime}}</span> •
          <i class="fa fa-fw fa-eye"></i>{{item.views}} 次围观 •
          <i class="fa fa-fw fa-comments"></i>活捉 {{item.comment}} 条 •
          <span class="rateBox">
            <i class="fa fa-fw fa-heart"></i>{{item.thumbs}}点赞 •
          </span>
        </h2>
        <div class="ui label">
          <a :href="'#/Share?classId='+item.tagId">{{item.tagName}}</a>
        </div>
      </header>
      <div class="article-content">
        <div class="article-description" >
          {{item.description}}
        </div>
        <br/>
        <div class="article-img">
          <img :src="item.firstPicture" alt="" class="maxW">
        </div>
      </div>
      <div class="viewdetail">
        <!--<span class="tcolors-bg" v-on="onClick(item.blogId)" target="_blank">-->
        <!--<i class="el-icon-d-arrow-right">阅读全文</i>-->
        <!--</span>-->
        <a class="tcolors-bg" :href="'/detail/'+item.blogId" target="_blank">
          <i class="el-icon-d-arrow-right">阅读全文</i>
        </a>
      </div>
    </el-col>
  </div>
</template>

<script>
    import axios from 'axios';
//import Article from '@/components/article/index'
export default {
  name: '',
  data () {
    return {
//      classId: 1,
//      className: '分享镜',
//      tagId: 2,
        articleList:[],
        classList: []
    }
  },
    mounted(){
      console.log(this);
        axios({
            url: `http://localhost:14000/blog/getTagBlog?id=${this.$route.params.id}`,
            method: 'get',
        }).then((res) => {
            console.log(res);
            this.articleList = res.data;
            console.log(this.articleList);
        })
        axios({
            url : 'http://localhost:14000/tag/getAllTag',
            method : 'get',
        }).then((res)=>{
            this.classList = res.data;
            console.log(this.classList);
        })
    },
  components: {
//    Article
  },
  methods: {

  },
  created () { }
}
</script>

<style scoped lang="less">
/*分享标题*/
.shareTitle {
  margin-bottom: 40px;
  position: relative;
  border-radius: 5px;
  background: #fff;
  padding: 15px;
}
.shareclassTwo {
  width: 100%;
}
.shareclassTwo li {
  display: inline-block;
}
.shareclassTwo li a {
  display: inline-block;
  padding: 3px 7px;
  margin: 5px 10px;
  color: #bbbbbb;
  border-radius: 4px;
  background: #ffffff;
  border: 1px solid #bbbbbb;
  transition: transform 0.2s linear;
  -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover {
  transform: translate(0, -3px);
  -webkit-transform: translate(0, -3px);
}
.shareclassTwo li a.active {
  background: #fff;
  border: 1px solid #64609e;
  color: #64609e;
}
.archive-class-all {
  padding: 0 10px;
  /*margin-bottom: 40px;*/
  li {
    display: inline-block;
    padding-right: 20px;
    a {
      color: #ab3300;
      &:hover {
        color: #ff4d00;
      }
    }
    span {
      color: #bbb;
    }
  }
}
</style>