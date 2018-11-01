<template>
  <div class="blog-body">
    <div class="blog clearfloat">
      <div class="blog-aside">
        <div class="user">
          <div class="avatar">
            <a href="#" :style="{ 'background': backImg,'background-size': size}" >
              <span>ss</span>
            </a>
          </div>
          <div class="tops">
            <h1>xxxx</h1>
            <p>sss是uuuddd嘎嘎嘎嘎嘎ssssssss</p>
          </div>
          <div class="userinfo">
            <p>我是修改过的1</p>
            <p>我是是是是</p>
          </div>
        </div>
        <div class="newArt">
          <h2>最新发布</h2>
          <ul>
            <li>jjjjjjjjjjjjjj</li>
            <li>qqqqqqqqqqqqqq</li>
            <li>kkkkkkkkkkkkkk</li>
          </ul>
        </div>
        <div class="hotTags">
          <h2>热门标签</h2>
          <ul>
            <li><a href="">啊啊</a></li>
            <li><a href="">试试</a></li>
            <li><a href="">等等</a></li>
          </ul>
        </div>
      </div>
      <div class="blog-main">
        <div class="swiper">
          <el-carousel height="300px" :interval="2000">
            <!-- <el-carousel-item v-for="(item, index) in imgList" :key="index">
              <img :src="item.url" alt="" width="100%" height="100%">
            </el-carousel-item> -->
            <el-carousel-item>
              <img src="../../static/swiper1.jpg" alt="" width="100%" height="100%">
            </el-carousel-item>
            <el-carousel-item>
              <img src="../../static/swiper2.jpg" alt="" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="arts" v-for="(item, index) in artList" :key="index">
          <div class="art-img">
            <router-link :to="{ path: `blog/detail/${item._id}`}" :style="{background: 'url(' + item.img + ') center'}"></router-link>
          </div>
          <h2>
            <a href="javascript:void(0)" @click="toDetail(item._id)">{{item.title}}</a>
          </h2>
          <p class="note">{{item.abstract}}</p>
          <p>
            <span class="textfoot"><Icon type="md-person" /> {{item.user}}</span>
            <span class="textfoot"><Icon type="md-time" /> {{item.createtime}}</span>
            <span class="textfoot"><Icon type="md-eye" /> {{item.visited}}次浏览</span>
          </p>
        </div>
        <div class="page">
          <Page :total="100" show-elevator />
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import footer from './footer'
  export default {
    components: {
      'v-footer':footer
    },
    data () {
      return {
        artList: [],
        size: '160px 160px',
        backImg: '',
        titleImg: ''
      }
    },
    methods: {
      toDetail(id) {
        this.$router.push({path:`/blog/detail/${id}`})
      },
      getArtList() {
        this.axios({
          method: 'post',
          url: '/article/getList'
        }).then((res) => {
          // this.message = res.data.msg
          console.log(res.data )
          // res.data.data.forEach(item => {
          //   item.img = 'url(' + item + ') center'
          // });
          // this.titleImg = 'url(' + res.data.data.img + ') center'
          this.artList = res.data.data
        })
      },
      getUserInfo() {
        this.axios({
          method: 'get',
          url: '/userinfo/getUserInfo'
        }).then((res) => {
          // console.log(res.data.data.avatorImg )
          // this.$set(this, 'backImg', 'ss')
          this.backImg ='url(' + res.data.data.avatorImg + ')'
        })
      }
    },
    created () {
      this.getArtList()
      this.getUserInfo()
    }
  }
</script>

<style lang='scss' scoped>
.blog-body{
  background: #f1f1f1;
}
.blog{
  width: 1020px;
  // background-color: rgb(255, 255, 255);
  margin: 0 auto;
  .blog-aside{
    width: 270px;
    height: 100%;
    float: right;
    .user{
      margin-top: 20px;
      border: 1px solid #f1f1f1;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      background: #fff;
      .avatar{
        margin: 20px auto;
        width: 160px;
        height: 160px;
        border-radius: 160px;
        overflow: hidden;
        a{
          display: block;
          padding-top: 100px;
          // background: url(../assets/12.jpg) no-repeat;
          background-size: 160px 160px !important;
          &:hover span{
            margin-top: 0;
          }
          span{
            display: block;
            margin-top: 60px;
            padding-top: 8px;
            width: 160px;
            height: 55px;
            text-align: center;
            font-size: 16px;
            line-height: 20px;
            color: #fff;
            background: rgba(0,0,0,.5);
            transition: margin-top .2s ease-in-out;
          }
        }
      }
      .tops{
        background: #f16e50;
        padding: 20px 10px;
      }
      .userinfo{
        padding: 20px 10px;
      }
    }
    .newArt{
      margin-top: 20px;
      border: 1px solid #f1f1f1;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      background: #fff;
      h2{
        background: #f16e50;
        color: #fff;
        padding-left: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
      ul{
        padding: 20px 30px;
        overflow: hidden;
        list-style: none;
        li{
          color: #000;
          &:hover{
            color: aquamarine;
          }
        }
      }
    }
    .hotTags{
      margin: 20px 0;
      border: 1px solid #f1f1f1;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0,0,0,.1);
      background: #fff;
      h2{
        background: #f16e50;
        color: #fff;
        padding-left: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
      ul{
        padding: 20px 30px;
        overflow: hidden;
        list-style: none;
        li{
          float: left;
          a{
            padding: 2px 5px;
            margin-right: 5px;
            color: #454545;
            text-decoration: none;
            &:hover{
              background: #f16e50;
              color: #fff;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
  .blog-main{
    width: 730px;
    height: 100%;
    float: left;
    // background-color: grey;
    .swiper{
      margin: 20px 0;
      .el-carousel{
        border-radius: 5px;
      }
    }
    .arts{
      padding: 20px 20px 20px 0;
      border-left: solid 4px #f1f1f1;
      height: 160px;
      margin-bottom: 20px;
      &:hover{
        border-left: 4px solid green;
      }
      .art-img{
        float: left;
        margin:0 20px 0 20px;
        a{
          display: block;
          width: 220px;
          height: 150px;
          border-radius: 5px;
          // background: url(../assets/12.jpg) center;
        }
      }
      h2{
        a{
          text-decoration: none;
          color: #555;
          &:hover{
            color: #81c53f;
          }
        }
      }
      .note{
        color: #888;
        font-size: 14px;
        line-height: 24px;
      }
      .textfoot{
        margin-right: 20px;
        color: #999;
        // font-size: 16px;
      }
    }
    .page{
      text-align: center;
      margin-top: 40px;
      margin-bottom: 40px;
    }
  }
}
.clearfloat:after{
  display:block;
  clear:both;
  content:"";
  visibility:hidden;
  height:0
}
</style>
