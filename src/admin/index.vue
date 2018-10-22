<template>
    <div class="layout">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="pageEdit" theme="dark" width="auto" :class="menuitemClasses" @on-select="selectMenu">
                    <MenuItem name="pageEdit">
                        <Icon type="ios-navigate"></Icon>
                        <span>页面编辑</span>
                    </MenuItem>
                    <MenuItem name="blogEdit">
                        <Icon type="ios-search"></Icon>
                        <span>博客编辑</span>
                    </MenuItem>
                    <MenuItem name="userEdit">
                        <Icon type="ios-settings"></Icon>
                        <span>用户编辑</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                <Dropdown @on-click="loginSelect">
                  <a href="javascript:void(0)">
                      {{loginUser}}
                      <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                      <DropdownItem name="changePassword">修改密码</DropdownItem>
                      <DropdownItem name="outLogin">退出登录</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <router-link to="/"><img src="../assets/12.jpg" alt="" width="32" height="32"></router-link>
                </Header>
                <Content :style="{margin: '20px', background: '#fff'}">
                    <page-edit v-if="show === 'pageEdit'"></page-edit>
                    <blog-edit v-if="show === 'blogEdit'"></blog-edit>
                    <user-edit v-if="show === 'userEdit'"></user-edit>
                </Content>
            </Layout>
        </Layout>
        <Footer>Footer</Footer>
        <Modal
            v-model="dialogChange"
            title="修改密码">
            <Form ref="formChange" :model="formChange" :rules="rules" :label-width="80">
              <FormItem label="旧密码" prop="oldPassword">
                <Input type="password" v-model="formChange.oldPassword"  style="width:240px"></Input>
              </FormItem>
              <FormItem label="新密码" prop="newPassword">
                <Input type="password" v-model="formChange.newPassword"  style="width:240px"></Input>
              </FormItem>
              <FormItem label="确认密码" prop="password">
                <Input type="password" v-model="formChange.password"  style="width:240px"></Input>
              </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" size="large" @click="cancel">取消</Button>
                <Button type="primary" size="large" @click="ok">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import MD5 from 'js-md5'
import pageEdit from './pageEdit'
import blogEdit from './blogEdit'
import userEdit from './userEdit'
    export default {
        components: {
          'page-edit':pageEdit,
          'blog-edit':blogEdit,
          'user-edit':userEdit
        },
        data () {
            return {
                isCollapsed: false,
                dialogChange: false,
                show: 'pageEdit',
                formChange: {
                  oldPassword: '',
                  newPassword: '',
                  password: ''
                },
                loginUser: '用户名',
                rules: {
                  oldPassword: [
                    { required: true, message: '请输入旧密码', trigger: 'blur' }
                  ],
                  newPassword: [
                    { required: true, message: '请输入新密码', trigger: 'blur'}
                  ],
                  password: [
                    { 
                      required: true,
                      validator: (rule, value, callback) => {
                      if (value === '') {
                        callback(new Error('请确认密码'))
                      } else if (value !== this.formChange.newPassword) {
                        callback(new Error('与新密码不符，请重新输入'))
                      } else {
                        callback()
                      }
                    }, trigger: 'blur'}
                  ]
                }
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
          loginSelect(name) {
            if (name === 'changePassword'){
              this.dialogChange = true
            } else {
              sessionStorage.clear()
              this.$router.push('/')
            }
          },
          ok() {
            this.$refs['formChange'].validate((valid) => {
              if (valid) {
                this.axios({
                  method: 'post',
                  url: '/changePassword',
                  data: {
                    username: this.loginUser,
                    oldPassword: MD5(this.formChange.oldPassword + 'login.com'),
                    newPassword: MD5(this.formChange.newPassword + 'login.com')
                  }
                }).then((res)=>{
                  if (res.data.code === '200') {
                    this.$Message.success(res.data.msg);
                  } else {
                    this.$Message.warning(res.data.msg);
                  }
                  this.$refs['formChange'].resetFields();
                  this.dialogChange = false
                })
              }
            })           
          },
          cancel() {

          },
          selectMenu(name) {
            this.show = name
          },
          collapsedSider () {
              this.$refs.side1.toggleCollapse();
          }
        },
        created() {
          this.loginUser = sessionStorage.getItem('loginUser')
        }
    }
</script>

<style lang='scss' scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        min-height: 600px;
        height: 100%;
    }
    .ivu-layout-has-sider{
      height: calc( 100% - 70px );
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        img{
            float: right;
            margin: 15px;
            border-radius: 50px;
        }
        .ivu-dropdown{
            float: right;
            margin-right: 20px;
            a{
              color: #515a6e;
            }
        }
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>