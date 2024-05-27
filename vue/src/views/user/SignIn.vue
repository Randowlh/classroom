<template>
  <div class="user-home">
    <el-descriptions class="user-info" title="个人信息" :column="2" :size="size" border>
      <template slot="extra">
        <el-button type="primary" size="small">操作</el-button>
      </template>
      <el-descriptions-item label="邮箱"><i class="el-icon-s-promotion"></i> {{ email }}</el-descriptions-item>
      <el-descriptions-item label="用户名"><i class="el-icon-user-solid"></i> {{ name }}</el-descriptions-item>
      <el-descriptions-item label="密码"><i class="el-icon-star-on"></i> *******</el-descriptions-item>
      <el-descriptions-item label="是否违规"><i class="el-icon-s-home"></i> {{ violate == '1' ? "是" : '否' }}</el-descriptions-item>
    </el-descriptions>

    <el-table :data="appointments" class="appointments-table" border>
      <el-table-column prop="c_name" label="自习室名称"></el-table-column>
      <el-table-column prop="s_name" label="座位名称"></el-table-column>
      <el-table-column prop="start_time" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" label="结束时间"></el-table-column>
      <el-table-column label="倒计时">
        <template v-slot="scope">
          <span>{{ getRemainingTime(scope.row) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="small" :disabled="scope.row.is_check_in" @click="signIn(scope.row)">签到</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="cancelSignIn(scope.row)">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { getUserInfoById, cancelByPid, singInByPid } from '../../network/index';
export default {
  data() {
    return {
      size: 'medium',
      uid: 0,
      name: '',
      email: '',
      password: '',
      violate: '',
      appointments: [
        // {
        //   roomName: '自习室 A',
        //   seatId: 1,
        //   startTime: '2023-05-22 17:00',
        //   endTime: '2023-05-22 20:00',
        //   countdownIntervalId: null,
        //   remainingTime: null,
        // },
      ],
      canSignIn: false
    };
  },
  mounted() {
    getUserInfoById(this.$route.params.id).then(res => {
        console.log(this.$route.params.id)
        console.log(res)
        this.uid = res.data.results.id
        this.name = res.data.results.name
        this.email = res.data.results.email
        this.appointments = res.data.results.pre_list
        this.violate = res.data.results.violate
        //console.log(this.appointments)
        this.startCountdown();
    })
  },
  methods: {
    calculateDistance(lat1, lon1, lat2, lon2) {
      const earthRadius = 6371000; // 地球半径（单位：米）

      const degToRad = (deg) => deg * (Math.PI / 180);
      const deltaLat = degToRad(lat2 - lat1);
      const deltaLon = degToRad(lon2 - lon1);

      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;

      return distance;
    },
    cancelSignIn(pre_item) {
        cancelByPid(pre_item.pid).then(res => {
            if (res.data.results.isCancel) {
                alert('取消成功！')
                //删除当前行
                // const index = this.appointments.indexOf(pre_item)
                // if (index != -1) {
                //     this.appointments.splice(index, 1);
                // }
                getUserInfoById(this.$route.params.id).then(res => {
                    console.log(this.$route.params.id)
                    console.log(res)
                    this.uid = res.data.results.id
                    this.name = res.data.results.name
                    this.email = res.data.results.email
                    this.appointments = res.data.results.pre_list
                    //console.log(this.appointments)
                    //this.startCountdown();
                })
            } 
            else {
                alert('取消失败！')
            }
        })
    },
    signIn(pre_item) {
      // if (navigator.geolocation) {
      //   navigator.geolocation.getCurrentPosition(
      //     position => this.successCallback(position, pre_item),
      //     this.errorCallback
      //   );
      // } else {
      //   alert('浏览器不支持地理位置定位');
      // }
      if (true) {
        //发送签到请求
        console.log(pre_item);
        singInByPid(pre_item.pid).then(res => {
            if (res.data.results.isSignUp) {
                alert('签到成功')
                getUserInfoById(this.$route.params.id).then(res => {
                    console.log(this.$route.params.id)
                    console.log(res)
                    this.uid = res.data.results.id
                    this.name = res.data.results.name
                    this.email = res.data.results.email
                    this.appointments = res.data.results.pre_list
                    //console.log(this.appointments)
                    //this.startCountdown();
                })                
            } else {
                alert('签到失败')
            }
        })
      } else {
        alert('不在签到范围内！');
      }

    },
    successCallback(position, pre_item) {
      // 获取用户当前位置的经纬度
      const target_latitude = 31.3347;
      const target_longitude = 121.4165;

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude)
      // 判断是否满足签到条件，例如判断经纬度范围等
      let dis = this.calculateDistance(latitude, longitude, target_latitude, target_longitude);
      console.log(dis);
      if (dis != 0) {
        this.canSignIn = true;
      } else {
        this.canSignIn = false;
      }

      if (this.canSignIn) {
        //发送签到请求
        console.log(pre_item);
        singInByPid(pre_item.pid).then(res => {
            if (res.data.results.isSignUp) {
                alert('签到成功')
                getUserInfoById(this.$route.params.id).then(res => {
                    console.log(this.$route.params.id)
                    console.log(res)
                    this.uid = res.data.results.id
                    this.name = res.data.results.name
                    this.email = res.data.results.email
                    this.appointments = res.data.results.pre_list
                    //console.log(this.appointments)
                    //this.startCountdown();
                })                
            } else {
                alert('签到失败')
            }
        })
      } else {
        alert('不在签到范围内！');
      }
    },
    errorCallback(error) {
      // 处理获取位置失败的情况
      switch (error.code) {
        case error.PERMISSION_DENIED:
          alert('用户拒绝地理位置定位请求');
          break;
        case error.POSITION_UNAVAILABLE:
          alert('无法获取当前位置信息');
          break;
        case error.TIMEOUT:
          alert('获取位置信息超时');
          break;
        case error.UNKNOWN_ERROR:
          alert('发生未知错误');
          break;
      }
    },
    startCountdown() {
      this.appointments.forEach((appointment) => {
        const updateTime = () => {
          const startTime = new Date(appointment.start_time).getTime();
          const currentTime = new Date().getTime();
          const remainingTime = startTime - currentTime;
        //   console.log(appointment.start_time)
          appointment.remainingTime = remainingTime > 0 ? remainingTime : 0;

          if (remainingTime <= 0) {
            clearInterval(appointment.countdownIntervalId);
            appointment.remainingTime = 0;
          }
        };

        updateTime(); // Update immediately

        if (!appointment.countdownIntervalId) {
          appointment.countdownIntervalId = setInterval(updateTime, 1000); // Update countdown every 1 second (1000 milliseconds)
        }
      });
    },
    stopCountdown(appointment) {
      clearInterval(appointment.countdownIntervalId);
      appointment.countdownIntervalId = null;
      appointment.remainingTime = 0;
    },
    getRemainingTime(appointment) {
      if (appointment.remainingTime !== null) {
        const hours = Math.floor(appointment.remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((appointment.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((appointment.remainingTime % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
      return '';
    },
  },
  beforeDestroy() {
    if (this.appointments != null) {
        this.appointments.forEach((appointment) => {
        clearInterval(appointment.countdownIntervalId);
        });
    }
  },
};
</script>

<style scoped>
.user-home {
  padding: 20px;
  background: linear-gradient(to bottom, #f0f9ff, #cbebff); /* 确保背景渐变一致 */
  min-height: 100vh;
  font-family: 'Roboto', sans-serif; /* 统一字体 */
}

.user-info {
  margin-bottom: 30px;
}

.el-descriptions-item {
  font-size: 16px; /* 统一字体大小 */
}

.el-icon {
  margin-right: 10px;
  color: #108ee9; /* 统一图标颜色 */
}

.appointments-table th {
  background-color: #2c3e50; /* 统一表头背景色 */
  color: white;
}

.appointments-table td {
  background-color: #ffffff;
  color: #333; /* 统一表格文字颜色 */
}

.el-button {
  margin-top: 5px;
  border-radius: 4px; /* 统一按钮圆角 */
}

.el-button[type="primary"] {
  background-color: #108ee9;
  border-color: #108ee9; /* 统一按钮主色调 */
}

.el-button[type="primary"]:hover {
  background-color: #0077b5;
  border-color: #0077b5; /* 统一按钮悬停颜色 */
}
</style>