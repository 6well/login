<template>
  <div>
    <el-container>
      <el-header>
        <h1 style = "font-size: 50px;margin-left: 505px;margin-top: 80px">欢迎进入注册界面</h1>
      </el-header>
      <el-main>
        <el-card style = "width: 400px;margin-top: 100px;margin-left: 500px">
          <el-form :model = "user" label-width="80px" :rules="rules" ref="registerRef">
            <el-form-item label = "username">
              <el-input placeholder = "请输入账号" v-model="user.username" clearable prefix-icon = "el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label = "password">
              <el-input v-model = "user.password" show-password placeholder="请输入密码" prefix-icon = "el-icon-key"></el-input>
            </el-form-item>
            <el-form-item prop = "confirmPassword">
              <div style = "display: flex">
                <el-input show-password placeholder="请确认密码" style = "flex: 1" v-model = "user.confirmPassword"></el-input>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="info" style="width: 100%" @click="register">注 册</el-button>
            </el-form-item>
            <div style="display: flex;margin-left: 80px">
              <div style="flex: 1">已经有账号？请<span style="color: #6e77f2; cursor:pointer" @click="$router.push('/login')">登录</span></div>
            </div>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import request from "@/until/request";
export default {
  name: "Register",
  data(){
    const validatePassword = (rule, confirmPassword, callback) => {
      if(confirmPassword === ''){
        callback(new Error('请确认密码'))
      }else if (confirmPassword !== this.user.password){
        callback(new Error('密码输入不同'))
      }else{
        callback()
      }
    }
    return{
      user:{
        username:'',
        password:'',
        confirmPassword:''
      },
      rules:{
        username:[
          {
            required: true,message: '请输入账号',trigger: 'blur'
          },
        ],
        password:[
          {
            required: true,message: '请输入密码',trigger: 'blur'
          },
        ],
        confirmPassword:[
          {
          validator:validatePassword,trigger: 'blur'
          },
        ]
      }
    }
  },
  mounted() {
    request.get()
  },
  methods:{
    register() {
      this.$refs['registerRef'].validate((valid) => {
        if(valid) {
          this.$request.post('/register',this.user).then(res =>{
            if(res.code === '200') {
              this.$router.push('/login')
              this.$message.success('注册成功')
            }else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}

</script>
