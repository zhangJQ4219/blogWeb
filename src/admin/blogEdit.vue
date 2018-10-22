<template>
  <div class="container">
    <Form ref="formArticle" :model="formArticle" :rules="rules" :label-width="80">
      <FormItem label="标题" prop="title">
        <Input v-model="formArticle.title"  style="width:240px"></Input>
      </FormItem>
      <FormItem label="摘要" prop="abstract">
        <Input v-model="formArticle.abstract"  style="width:240px"></Input>
      </FormItem>
      <FormItem label="标签" prop="tags">
        <CheckboxGroup v-model="formArticle.tags">
          <Checkbox label="HTML"></Checkbox>
          <Checkbox label="JavaScript"></Checkbox>
          <Checkbox label="Java"></Checkbox>
          <Checkbox label="Python"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="图片">
        <Upload action="/article/upload"  
          :on-success="successUpload"
          :on-remove="removeUpload"
          >
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
      </FormItem>
      <FormItem label="正文" prop="content">
        <VueEditor style="width: 80%"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="formArticle.content">
        </VueEditor>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit()">发布</Button>
        <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formArticle: {
          title: '',
          abstract: '',
          tags: [],
          content: '',
          img: ''
        },
        rules: {
          title: [
            { required: true, message: '请填写标题', trigger: 'blur' }
          ],
          abstract: [
            { required: true, message: '请填写摘要', trigger: 'blur'}
          ],
          content: [
            { required: true, message: '请填写文章内容', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      successUpload(response, file, fileList){
        console.log(file)
        this.formArticle.img = file.response.data
      },
      removeUpload(file, fileList){
        this.axios({
          method: 'post',
          url: '/article/removeImg',
          data: file
        }).then((res)=>{
          
        })
      },
      handleSubmit() {
        this.$refs['formArticle'].validate((valid) => {
          if (valid) {
            this.axios({
              method: 'post',
              url: '/article/create',
              data: this.formArticle
            }).then((res)=>{
              if (res.data.code === '200') {
                this.$Message.success(res.data.msg);
                this.$refs['formArticle'].resetFields();
              } else {
                this.$Message.warning(res.data.msg);
              }
            })
          }
        })
      },
      handleReset () {
        this.$refs['formArticle'].resetFields();
      },
      handleImageAdded:function(file,Editor,cursorLocation,resetUploader){
        var formData = new FormData();
        formData.append('file', file)

        this.axios({
          url: '/article/upload',
          method: 'POST',
          data: formData
        })
        .then((result) => {
          let url = result.data.data // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
          resetUploader();
        })
        .catch((err) => {
          console.log(err);
        })
      }
    },
    created () {

    }
  }
</script>

<style  scoped>
.ivu-form-label-right{
  padding: 20px 0 ;
}
</style>