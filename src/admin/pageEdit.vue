<template>
  <div class="">
    <Form ref="formValidate" :model="formValidate" :label-width="80">
      <FormItem label="首页引言" prop="textHeader">
          <Input v-model="formValidate.textHeader"  style="width:240px"></Input>
      </FormItem>
      <FormItem label="首页标题" prop="textContent">
          <Input v-model="formValidate.textContent"  style="width:240px"></Input>
      </FormItem>
      <FormItem label="首页正文" prop="textfooter">
          <Input v-model="formValidate.textfooter" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="想要说点什么..." style="width:240px"></Input>
      </FormItem>
      <FormItem label="图片" >
        <Upload action="/upload"  
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
          textHeader: '',
          textContent: '',
          textfooter: '',
          img: ''
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            console.log(this.formValidate)
            this.editPage()
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      // 图片上传成功
      successUpload(response, file, fileList){
        this.formValidate.img = file
      },
      removeUpload(file, fileList){
        this.axios({
          method: 'post',
          url: '/removeImg',
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
          url: '/editPage',
          data: this.formValidate
        }).then((res)=>{
          
        })
      }
    },
    created () {
    }
  }
</script>

<style scoped>
</style>
