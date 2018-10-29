<template>
  <div class="">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name"  style="width:240px"></Input>
      </FormItem>
      <FormItem label="电话" prop="phone">
          <Input v-model="formValidate.phone"  style="width:240px"></Input>
      </FormItem>
      <FormItem label="职业" prop="profression">
          <Input v-model="formValidate.profression" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="想要说点什么..." style="width:240px"></Input>
      </FormItem>
      <FormItem label="图片" >
        <Upload action="/userinfo/upload"  
          :on-success="successUpload"
          :on-remove="removeUpload"
          >
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
      <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">留言</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formValidate: {
          name: '',
          phone: '',
          profression: '',
          img: ''
        }
      }
    },
    methods: {
      handleSubmit (name) {
            this.editPage()
      },
      // 图片上传成功
      successUpload(response, file, fileList){
        this.formValidate.img = file
      },
      removeUpload(file, fileList){
        this.axios({
          method: 'post',
          url: '/userinfo/removeImg',
          data: file
        }).then((res)=>{
          
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      editPage() {
        this.axios({
          method: 'post',
          url: '/userinfo/editUserInfo',
          data: this.formValidate
        }).then((res)=>{
          this.$Message.success('Success!');
          this.$router.push('/')
        })
      }
    },
    created () {
    }
  }
</script>

<style scoped>
</style>
