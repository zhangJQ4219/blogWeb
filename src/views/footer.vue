<template>
  <div class="footer">
      <div class="footerbody">
        <p class="footerinfo"><a href="#">联系留言</a> Copyright © 2004 Adobe Systems Incorporated. All rights reserved.</p>
        <a href="javascript:void(0)" class="footerlogin" @click="modal1 = true">后台登录</a>
        <Modal
            v-model="modal1"
            title="登录"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form ref="formLogin" :model="formLogin" :label-width="80">
              <FormItem label="姓名" prop="username">
                <Input v-model="formLogin.username"  style="width:240px"></Input>
              </FormItem>
              <FormItem label="密码" prop="password">
                <Input type="password" v-model="formLogin.password"  style="width:240px"></Input>
              </FormItem>
            </Form>
        </Modal>
      </div>
    </div>
</template>

<script>
import MD5 from 'js-md5'
  export default {
    data () {
      return {
        modal1: false,
        formLogin: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      toAdmin() {

      },
      ok() {
        this.axios({
          method: 'post',
          url: '/login',
          data: {
            username: this.formLogin.username,
            password: MD5(this.formLogin.password + 'login.com')
          }
        }).then((res)=>{
          if (res.data.code === 200) {
            sessionStorage.setItem('loginUser', this.formLogin.username)
            this.$refs['formLogin'].resetFields();
            this.$router.push('/admin')
          }
        })
        console.log(this.formLogin)
        this.$Message.info('Clicked ok');
      },
      cancel() {
          this.$Message.info('Clicked cancel');
      }
    },
    created () {
    }
  }
</script>

<style lang='scss' scoped>
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
