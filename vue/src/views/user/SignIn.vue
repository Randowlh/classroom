<template>
    <div>
      <el-descriptions class="margin-top" title="个人信息" :column="2" :size="size" border>
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-promotion"></i>
            邮箱
          </template>
          {{email}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user-solid"></i>
            用户名
          </template>
          {{name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-star-on"></i>
            密码
          </template>
          *******
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-home"></i>
            是否违规
          </template>
          {{violate == '1' ? "是" : '否'}}
        </el-descriptions-item>
      </el-descriptions>

    <el-table :data="appointments" border>
      <el-table-column prop="c_name" label="自习室名称"></el-table-column>
      <el-table-column prop="s_name" label="座位名称"></el-table-column>
      <el-table-column prop="start_time" label="开始时间"></el-table-column>
      <el-table-column prop="end_time" label="结束时间"></el-table-column>
      <el-table-column label="倒计时">
        <template slot-scope="scope">
          <span>{{ getRemainingTime(scope.row) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="stopCountdown(scope.row)">签到</el-button> -->
          <el-button type="primary" size="small" :disabled="scope.row.is_check_in ? true : false" @click="signIn(scope.row)">签到</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
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
