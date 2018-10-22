<template>
  <div class="container">
    <div class="header-nav" :class="{'header-nav-color': headerColor,'header-nav-position': headerPosition}">
      <div class="nav" :class="{'nav-color': navColor}">
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
    <div class="header" :style="{height: getHeight, background: indexImg,}">
      <div class="header-item">
        <h6>{{page.textHeader}}</h6>
        <h1>{{page.textContent}}</h1>
        <p>{{page.textfooter}}</p>
        <button class="header-btn"  @click="blog">get started</button>
      </div>
    </div>
    <router-view></router-view>
    <!-- <div v-if="isFooter" class="footer">
      <div class="footerbody">
        <p class="footerinfo"><a href="#">联系留言</a> Copyright © 2004 Adobe Systems Incorporated. All rights reserved.</p>
        <a href="#" class="footerlogin">后台登录</a>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        getHeight: '100%',
        headerColor: false,
        headerPosition: true,
        navColor: true,
        isFooter: false,
        page: '',
        indexImg: ''
      }
    },
    mounted() {
      this.$nextTick(()=>{
        window.addEventListener('scroll', this.menu)
      })
    },
    methods: {
      back() {
        this.getHeight = '100%'
        this.isFooter = false
        this.$router.push('/')
      },
      blog() {
        this.getHeight = '400px'
        // this.isFooter = true
        this.$router.push('/blog')
      },
      about() {
        this.getHeight = '400px'
        // this.isFooter = true
        this.$router.push('/about')
      },
      menu() {
        if(document.documentElement.scrollTop > 200){
          this.headerColor = true
          this.navColor = false
          this.headerPosition = false
        }else {
          this.headerColor = false
          this.navColor = true
          this.headerPosition = true
        }
      },
      getPage() {
        this.axios({
          method: 'get',
          url: '/getPage'
        }).then((res) => {
          this.page = res.data.data
          this.indexImg = 'url(' + res.data.data.indexImg + ') center'
        })
      }
    },
    created () {
      this.getPage()
    }
  }
</script>

<style lang='scss' scoped>

.header{
    width: 100%;
    // background: url(../assets/car.jpg) center;
    background-size: cover !important;
    transition: all,0.5S linear 0s;
    overflow: hidden;
    .header-item{
      padding: 200px 0 0 60px;
      color: #fff;
      h6{
        font-size: 14px;
        font-weight: 400;
      }
      h1{
        font-size: 60px;
      }
      .header-btn{
        margin-top: 20px;
        background: #f8b600;
        line-height: 42px;
        padding-left: 30px;
        padding-right: 30px;
        border: none;
        color: #fff;
        display: inline-block;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s ease 0s;
        cursor: pointer;
        outline: none;
        &:hover{
          background: #222;
        }
      }
    }
}
.header-nav-color{
  background: rgba(0, 0, 0, 0.8);
  top: 0;
}
.header-nav-position{
  top: 90px;
}
.header-nav{
  position: fixed;
  left: 0;
  right: 0;
  transition: all 0.5s;
  z-index: 997;
  .nav-color{
    background: rgba(255, 255, 255, 0.15);
  }
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
.footer{
  width: 100%;
  background: #414141;
  color: #ddd;
  text-shadow: 0 -1px 0 #333;
  .footerbody{
    margin: 0 auto;
    width: 1010px;
    .footerinfo{
      display: inline-block;
      padding: 16px 0 14px;
      color: #aaa;
      a{
        color: #aaa;
        &:hover{
          text-decoration: underline;
        }
      }
    }
    .footerlogin{
      display: inline-block;
      padding: 16px 0 14px;
      color: #aaa;
      float: right;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
