<template>
  <div>
    <el-container>
      <el-header>
        <h1 style = "font-size: 50px;margin-left: 600px;margin-top: 80px">欢迎加入</h1>
      </el-header>
      <el-main>
        <el-card style = "width: 400px;margin-top: 100px;margin-left: 500px">
          <el-form :model = "user" label-width="80px" :rules="rules" ref="loginRef">
            <el-form-item label = "username">
              <el-input placeholder = "请输入账号" v-model="user.username" clearable prefix-icon = "el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label = "password">
              <el-input v-model = "user.password" show-password placeholder="请输入密码" prefix-icon = "el-icon-key"></el-input>
            </el-form-item>
            <el-form-item prop = "code">
              <div style = "display: flex">
                <el-input  placeholder="请输入验证码" style = "flex: 1" v-model = "user.code"></el-input>
                <div style = "flex: 1; height: 40px">
                  <valid-code @update:value = "getCode" />
                </div>
              </div>

            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
            <el-form-item>
              <div style = "flex: 1">还没有账号？请<span style = "color: #0f9876; cursor: pointer" @click="$router.push('/register')">注册</span></div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import request from "@/until/request";
import ValidCode from "@/components/ValidCode.vue";

export default {
  name: 'Homebrew',
  components:{
    ValidCode
  },
  data(){
    //验证码校验
    const validateCode = (rule, value, callback) => {
      if(value === ''){
        callback(new Error('请输入密码'))
      }else if (value.toLowerCase() !== this.code){
        callback(new Error('验证码错误'))
      }else{
        callback()
      }
    }
    return{
      code:'',//验证码传递
      user:{
        code:'',//用户输入得验证码
        username:'',
        password:''
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
        code:[
          {validator:validateCode,trigger: 'blur'}
        ],
      }
    }
  },
  mounted() {
    request.get()
  },
  methods:{
    getCode(code) {
      this.code = code.toLowerCase()
    },
    login() {
      this.$refs['loginRef'].validate((valid) => {
        if(valid) {
          this.$request.post('/login',this.user).then(res =>{
            if(res.code === '200') {
              console.log('登录成功，token:', res.data);
              localStorage.setItem('token', res.data.token);
              localStorage.setItem('userInfo', JSON.stringify(res.data));
              this.$router.push('/home')
              this.$message.success('登录成功')
              localStorage.setItem("honey-user",JSON.stringify(res.data))//存储用户数据
            }else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    register(){

    }
  }
}

</script>
