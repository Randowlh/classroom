<template>
  <div>
    <div class="body">
      <!--头部-->
      <div class="header">
        <div style="display:flex;flex: 60%;justify-content: center;cursor: pointer">
          <div @click="goIndex">主页</div>
          <!-- <div @click="goReply()" style="margin: 0 20px">留言面板</div> -->
        </div>

        <div style="display:flex;flex: 20%;align-items: center">
          <el-dropdown>
          <img class="header-img" :src="userInfo.headImg" alt="">
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item><span @click="goRecording()">预约记录</span></el-dropdown-item> -->
              <el-dropdown-item><span @click="logout">退出 </span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button v-if="!userInfo.username" @click="goLogin" id="login">登录</el-button>
          <el-button v-if="!userInfo.username" @click="goRegister" id="register">注册</el-button>
        </div>

      </div>
      <!--轮播图-->
      <div class="carousel">
        <img src="https://img.tukuppt.com/ad_preview/00/16/16/5e997012181ac.jpg!/fw/980" alt="">
        <div class="carousel-text">
          <div class="welcome-text">
            <h3 style="font-size: 40px">欢迎来到</h3>
          </div>
          <h1 style="font-size: 55px">自习座位预定系统</h1>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import {getNotices,getClass} from "../../network/index";
import {getUserInfo, logout} from "../../network/login";

export default {
  name: "Index",
  data() {
    return {
      noticeData: [],
      classData: [],
      userInfo: {}
    }
  },
  methods:{
    goLogin(){
      this.$router.push("/login")
    },
    logout(){
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
    goIndex(){
      this.$router.push("/")
    },
    goRegister(){
      this.$router.push("/register")
    }
    // goReply(){
    //   this.$router.push("/reply")
    // },
    // checkClassClick(id){
    //   this.$router.push({
    //     path: `/checkClass/${id}`
    //   })
    // },
    // toNotice(id){
    //   this.$router.push({
    //     path: `/noticeDetail/${id}`
    //   })
    // },goRecording(){
    //   this.$router.push({
    //     path: `/seatRecording`
    //   })
    // }
  },
  created() {
    // //获取公告
    // getNotices().then(res => {
    //   this.noticeData = res.data.records
    // })

    // //获取自习室
    // getClass().then(res => {
    //   this.classData = res.data.records
    // })

    // getUserInfo().then(res =>{
    //   this.userInfo = res.data
    // })
  }
}
</script>

<style scoped>

.header-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.a {
  text-decoration: none;
  color: white;
}

.footer {
  text-align: center;
  margin-top: 200px;
  background: #333333;
  line-height: 100px;
}

.notice-text {
  font-weight: 700;
  font-size: 30px;
  padding-left: 7px;
  border-left: 4px solid rgb(1, 237, 203);
}

.welcome-text {
  display: flex;

}

.body {
  padding: 0 10px;
}

.demo {
  border: 1px red solid;
}

.header {
  align-items: center;
  justify-content: space-between;
  height: 130px;
  display: flex;
}

.carousel {
  position: relative;
}

.carousel-text {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.carousel-text h3 {
  padding-bottom: 14px;
  border-bottom: 2px rgb(1, 237, 203) solid;
}

.carousel img {
  width: 100%;
  height: 700px;
}
</style>