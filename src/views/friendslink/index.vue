<!-- 友情链接模块 -->
<template>
<div class="tFriendsBox tcommonBox">
    <div class="friendslink-title">小伙伴萌</div>
    <el-row>
        <el-col :span="12" class="tf-item" v-for="(item,index) in friendslink" :key="'f'+index">
            <a :href="item.url" target="_blank">
                <img :src="item.image"  :onerror="errorAvatar">
                <h4>{{item.name}}</h4>
                <p>{{item.description}}</p>
            </a>
        </el-col>
    </el-row>
</div>
</template>

<script>

import {mapState} from 'vuex'

//import axios from "axios";
import pic1 from '@/assets/img/friends/friend1.jpg'
import pic2 from '@/assets/img/friends/avatar.jpg'
import pic3 from '@/assets/img/friends/yck.jpg'
export default {
  name: 'Friendslink',
    data() { //选项 / 数据
        return {
            friendslink:[
              {
                image: pic1,
                url: 'https://hypocrisy354.github.io/',
                name: 'Hypocrisy',
                description: 'Hypocrisy\'s blog'
              },
              {
                image: pic2,
                url: 'https://eturial.github.io',
                name: 'Hexo',
                description: 'hexo博客'
              },
              {
                image: pic3,
                url: 'https://www.cnblogs.com/ranbom/\n',
                name: 'LeoRanbom',
                description: 'yu总np'
              },
              {
                image: '',
                url: 'http://www.baidu.com',
                name: '友4',
                description: '描述描述描述'
              },
              {
                image: '',
                url: 'http://www.baidu.com',
                name: '友5',
                description: '描述描述描述'
              }
            ]//友情链接
        }
    },
    computed: {
      ...mapState([
        'errorAvatar'
      ])
    },
    methods: { //事件处理器

    },
    components: { //定义组件

    },
    created() { //生命周期函数

    }
}
</script>

<style scoped>
.tFriendsBox{
  margin-bottom: 40px;
}
.tFriendsBox .friendslink-title{
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  padding: 30px 0;
}
.tFriendsBox .tf-item{
  transition: all 0.3s ease-out;
  border-radius: 5px;
  position: relative;
}
.tFriendsBox .tf-item:hover{
  background: rgba(230,244,250,.5);
}
.tFriendsBox .tf-item a{
  display: block;
  padding:0 10px 0 90px;
  height:90px;
}
.tFriendsBox .tf-item a img{
  width:60px;
  height:60px;
  border-radius: 50%;
  position: absolute;
  top:15px;
  left:15px;
  cursor: pointer;
  object-fit: cover;
}
.tFriendsBox .tf-item a h4{
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  padding-top:15px;
  font-weight: bold;
}
.tFriendsBox .tf-item a p{
  margin:10px 0;
  font-size: 12px;
  line-height: 24px;
  color:#999;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
