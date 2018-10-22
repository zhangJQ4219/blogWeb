<template>
  <div class="blog-detail">
    <div class="header-nav">
      <div class="nav">
        <div class="">
          <img class="nav-img" src="../assets/logo.png" alt="">
          <ul class="nav-menu">
            <li><button class="header-btn" @click="back">首页</button></li>
            <li><button class="header-btn" @click="blog">博客</button></li>
            <li><button class="header-btn" @click="about">关于</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="blog clearfloat">
      <div class="blog-aside">
        <div class="user">
          <div class="tops">
            <h1>xxxx</h1>
            <p>ssssssssssssssssssssssssss</p>
          </div>
          <div class="userinfo">
            <p>我是是是是</p>
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
        <div class="content">
          <div class="header">
            <h1 class="note">{{blogDetail.title}}</h1>
            <p>
              <span class="textfoot"><Icon type="md-person" /> {{blogDetail.user}}</span>
              <span class="textfoot"><Icon type="md-time" /> {{blogDetail.createtime}}</span>
              <span class="textfoot"><Icon type="md-eye" /> {{blogDetail.visited}}次浏览</span>
            </p>
          </div>
          <div class="abstract">
            <h4>摘要:</h4></span>{{blogDetail.abstract}}
          </div>
          <div class="text" >
            <VueEditor v-if="1===2">
            </VueEditor>
            <div class="ql-container ql-snow">
              <div class="ql-editor" v-html="blogDetail.content">
            </div>
            </div>
          </div>
        </div>
        <div class="comment">
          <div class="header">
            <h2>评论区</h2>
          </div>
          <div class="com">
              <Input v-model="comment" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="想要说点什么..." style="width:690px"></Input>
              <Button type="primary" @click="discuss()" class="btn">留言</Button>
          </div>
          <div class="user-com">
            <h3>共<span>{{amount}}</span>条评论</h3>
            <hr style="height:1px;border:none;border-top:1px solid #dadada;" />
            <div v-for="(item, index) in blogDetail.comment" :key="index">
              <hr v-if="index !== 0" style="height:1px;border:none;border-top:1px solid #dadada;" />
              <a href="" style="float:left;"><img src="../assets/12.jpg" alt="" class="img"></a>
              <div class="com-content">
                <a href="">{{item.comUser}}</a>
                <div>{{item.userContent}}</div>
                <div class="reply"><span>{{item.comTime}}</span><a href="">回复</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import "../style/editor1.css";
import "../style/editor.css";
import footer from './footer'
  export default {
    components: {
      'v-footer':footer
    },
    data () {
      return {
        blogDetail: '',
        comment: '',
        amount: 0
      }
    },
    methods: {
      back() {
        this.$router.push('/')
      },
      blog() {
        this.$router.push('/blog')
      },
      about() {
        this.$router.push('/about')
      },
      discuss() {
        this.axios({
          method: 'post',
          url: '/article/discuss',
          data: {
            articleId: this.$route.params.id,
            comUser: sessionStorage.getItem('loginUser') || '游客',
            userContent: this.comment
          }
        }).then((res) => {
          this.comment = ''
          this.getArtDetail()
        })
      },
      getArtDetail() {
        let id = this.$route.params.id
        this.axios({
          method: 'post',
          url: '/article/getArtDetail',
          data: {
            id: id
          }
        }).then((res) => {
          this.blogDetail = res.data.data
          this.amount = this.blogDetail.comment.length
        })
      }
    },
    created () {
      this.getArtDetail()
      document.documentElement.scrollTop = 0
    }
  }
</script>

<style lang='scss' scoped>
.blog-detail{
  background: #f1f1f1;
}
.header-nav{
  // position: fixed;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 997;
  .nav{
    margin: 0 auto;
    width: 1000px;
    height: 60px;
    .nav-img{
      float: left;
      margin: 14px 0 0 20px;
    }
    .nav-menu{
      float: right;
      list-style: none;
      li{
        float: left;
        line-height: 60px;
        margin-right: 20px;
        .header-btn{
          background: rgba(0, 0, 0, 0);
          line-height: 60px;
          padding-left: 20px;
          padding-right: 20px;
          border: none;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          outline: none;
      }
      }
    }
  }
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
    .content{
      background-color: #fff;
      .header{
        padding: 20px;
        background-color: #F7F7F7;
        .note{
          color: #888;
        }
        .textfoot{
          margin-right: 20px;
          color: #999;
          // font-size: 16px;
        }
      }
      .abstract{
        margin: 20px;
        background-color: #F4FFEF;
        border: 1px solid #D6E9C6;
        padding: 20px;
        h4{
          display: inline;
        }
      }
      .text{
        margin: 20px;
        .ql-container.ql-snow {
            border: none;
        }
      }
    }
    .comment{
      padding: 10px 20px 20px 20px;
      background: #fff;
      .header{
        margin-bottom: 10px; 
      }
      .com{
        .btn{
          // float: right;
          margin-left: 633px;
          margin-top: 10px; 
        }
      }
      .user-com{
        a{
          // float: left;
          margin-top: 10px;
          display: inline-block;
          .img{
            // margin-top: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50px;
          }
        }
        .com-content{
          width: 635px;
          height: 100px;
          margin-left: 10px;
          display: inline-block;
          .reply{
            float: right;
            a{
              margin-left: 10px;
            }
          }
        }
      }
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
