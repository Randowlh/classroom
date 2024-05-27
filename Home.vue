<template>
    <div class="user_home_body">
      <el-container>
        <el-aside width="200px" class="aside">
          <h3 style="color:rgb(155, 228, 255)">自习室座位预定系统</h3>
          <el-menu
              default-active="1"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <el-menu-item index="1" @click="getClassroom()" style="text-align: left;">
              <i class="el-icon-menu"></i>
              <span slot="title">自习室信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="goSignIn()" style="text-align: left;">
              <i class="el-icon-setting"></i>
              <span slot="title">签到</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="background-color: rgb(255, 255, 255);">
            <el-menu active-text-color="default" class="el-menu" mode="horizontal" style="background-color: rgb(255, 255, 255);">
              <el-submenu index="3">
                <template slot="title"><img class="header-img"
                                            src="https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoM6WDpQlUMDAxqvq3iaXsx9OlqFKAcWZ7w5hbLb5fKqvcWYPCxTtydelytE6740jicEFAP3iaCAU6Ag/132"
                                            alt="头像加载失败">
                </template>
                <el-menu-item index="3-1" @click="goPage('/userInfo/:id')">查看个人信息</el-menu-item>
                <el-menu-item index="3-2" @click="goPage('/')">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-header>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>自习室座位预定系统</el-footer>
        </el-container>
      </el-container>
  
    </div>
  </template>
  
<script>
  import {logout} from "../../../network/login";
  
  export default {
    name: "Home",
    data() {
      return {
        uid: 0
      }
    },
    methods: {
      goPage(path) {
        this.$router.push(path)
      },
      logout() {
        logout().then(res => {
          if (res.code === 2000){
            this.$message({
              message: '退出成功',
              type: 'success'
            });
            this.$router.push("/login")
          }
        })
      },
      getClassroom() {
        this.$router.push(`/userClassroom/${this.uid}`)
      },
      goSignIn() {
        this.$router.push(`/userSignIn/${this.uid}`)
      }
    },
    created() {
        const uid = this.$route.params.id
        this.uid = uid
        console.log(uid)
    }
  }
  </script>
  
<style scoped>
  .el-menu{
    background: #c4c4c4;
  }
  .header-img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  
  
  .el-header {
    background: #c4c4c4;
    display: flex;
    justify-content: flex-end;
    padding-right: 40px;
    align-items: center;
    height: 100%;
  }
  
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    padding: 0;
  }
  
  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    height: 100vh;
  }
  
  .el-main {
    color: #333;
  }
  
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container{
    height: 100vh;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  </style>