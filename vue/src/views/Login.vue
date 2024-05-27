<template>
    <div class="login-body">
      <div class="login-form">
        <h1 class="form-title">欢迎登录自习座位预定系统</h1>
        <div class="form">
          <el-form class="form-form" ref="form" :model="form" label-width="60px">
            <el-form-item label="用户名">
              <el-input id="username" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input id="password" type="password" v-model="form.passwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="register">注 册</el-button>
              <el-button id="onStudentSubmit" type="primary" @click="onStudentSubmit" :loading="isLogin">用户登录</el-button>
              <el-button id="onManagerSubmit" type="primary" @click="onManagerSubmit" :loading="isLogin">管理员登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- <el-dialog :visible.sync="this.loginSuccess">登录成功</el-dialog> -->
    </div>
  </template>
  
<script>
  import {Managerlogin,Studentlogin} from "../network/login";
  
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: '',
          passwd: '',
        },
        isLogin:false,
        loginSuccess:false
      }
    },
    methods: {
      onManagerSubmit() {
        this.isLogin = true
        Managerlogin(this.form).then(res =>{
          this.isLogin = false
          if (res.data.results.login_status == 1){
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.push('/admin');
          }else if (res.data.results.login_status != 1){
            this.$message.error(res.data.login_msg);
          }
        })
      },
      onStudentSubmit() {
        this.isLogin = true
        //this.$router.push('/userClassroom');
        Studentlogin(this.form).then(res =>{
          this.isLogin = false
          console.log(res)
          if (res.data.results.login_status == 1){
            this.loginSuccess = true
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            //console.log(res.data.results.data.idx)
            this.$router.push(`/user/${res.data.results.data.id}`);
          }else if (res.data.results.login_status != 1){
            this.$message.error(res.data.results.login_msg);
            this.loginSuccess = false
          }
        })
      },
      register() {
        this.$router.push("/register")
      }
    },
    created() {
  
    }
  }
  </script>
  
<style scoped>
  
  @keyframes bganimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  .login-body {
    background-image: linear-gradient(125deg, #E4FFCD, #6DD5FA, #2980B9, #E4FFCD);
    background-size: 400%;
    animation: bganimation 15s infinite;
    height: 100vh;
  }
  
  .captcha-code {
    width: 100px;
    height: 40px;
  }
  
  .captcha-f {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .captcha {
    width: 160px;
  }
  
  .form-form {
    width: 363px;
  }
  
  .form-title {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
  }
  
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-form {
    box-shadow: 4px 4px 15px #4b4949;
    padding: 10px;
    border-radius: 20px;
  }
  
  .login-form::before {
    filter: blur(1px);
  }
  
  .form {
    padding: 0 100px;
  }
  
  </style>