<template>
<div class="about-body">
  <div class="about clearfloat">
    <div class="about-aside">
      <div class="about-menu">
        <Menu active-name="1" width="270px" @on-select="select">
          <MenuItem name="1">
            <Icon type="md-contacts" />
            关于我
          </MenuItem>
          <MenuItem name="2">
            <Icon type="md-chatbubbles" />
            给我留言
          </MenuItem>
        </Menu>
      </div>
    </div>
    <div class="about-main">
      <div class="about-content aboutuser" v-if="aboutormsg">
        <h2>关于我</h2>
        <img src="../assets/12.jpg" alt="">
        <p>DMap 是一个专注于位置相关大数据的数据可视化平台。TalkingData 的数据资产乃至大数据行业的数据大部分都是给予位置的数据，DMap 以给予位置的大数据的地理分析为核心，兼顾图表分析等传统数据可视化手段，并在此基础上构建数据报告、大屏应用的能力，可以满足数据分析师和数据科学家的数据分析及可视化需求，并能够在不久的将来以 JS-SDK 的形式提高相似应用的开发效率。</p>
      </div>
      <div class="about-content msg" v-else>
        <h2>给我留言</h2>
        <div class="about-form">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名" style="width:240px"></Input>
            </FormItem>
            <FormItem label="E-mail" prop="mail">
                <Input v-model="formValidate.mail" placeholder="请输入邮箱" style="width:240px"></Input>
            </FormItem>
            <FormItem label="Desc" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="想要说点什么..." style="width:240px"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">留言</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
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
        aboutormsg: true,
        formValidate: {
          name: '',
          mail: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '您还没有写点什么呦', trigger: 'blur' },
            { type: 'string', min: 20, message: '请输入至少20个字', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      select(name) {
        if(name === '1'){
          this.aboutormsg = true
        } else {
          this.aboutormsg = false
        }
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    },
    created () {
    }
  }
</script>

<style lang='scss' scoped>
.about-body{
  background: #e5e5e5;
}
.about{
  width: 1000px;
  margin: 0 auto;
  // background: rgb(214, 212, 212);
  .about-aside{
    width: 270px;
    height: 100%;
    float: left;
    .about-menu{
      margin-top: 20px;
    }
  }
  .about-main{
    width: 730px;
    height: 100%;
    float: right;
    .about-content{
      margin: 20px 0 200px 20px;
      background: rgb(255, 255, 255);
      padding: 20px;
      h2{
        border-bottom: 1px solid #e5e5e5;
      }
      img{
        margin: 20px;
      }
      .about-form{
        margin-top: 20px;
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
