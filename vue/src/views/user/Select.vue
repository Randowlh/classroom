<template>
    <div>
        <div v-for="i in parseInt(seatData.length/12 + 1)" :key="i">
            <el-row :gutter="20">
                <el-col v-for="(item, index) in seatData.slice(12*(i-1), 12*(i-1)+12)" :key="index" :span="2">
                    <el-button :type= "!item.is_used ? 'success' : 'danger'" @click= "getCurSeatData(item.id)"
                    :disabled="item.is_used" :id="item.id">{{ item.name }}</el-button>
                    <el-row style="text-align: center;">
                        <span>
                            <i v-if="item.is_special" class="el-icon-switch-button" ></i>
                            {{item.is_special ? '有插座' : '无插座' }}
                        </span>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div>
            <el-dialog :visible.sync="dialogVisible" title="座位信息" width="400px" @close="clearForm">
                <el-form :model="curSeatData" ref="form" label-width="80px">
                    <p style="text-align: center;"><b>{{ '座位名称:' + curSeatData.name }}</b></p>
                    <el-form-item label="预约时间">
                        <el-select v-model="curSeatData.start_time" placeholder="起始时间" id="start_time">
                            <el-option
                                v-for="item in st_list"
                                :key="item"
                                :value="item" id="start_opt">
                          </el-option>
                        </el-select>
                        <el-select v-model="curSeatData.end_time" placeholder="结束时间" id="end_time">
                            <el-option
                                v-for="item in et_list"
                                :key="item"
                                :value="item" id="end_opt">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button type="primary" @click="submitOrderInfo" id="booking">预约</el-button>
                    <el-button @click="clearForm">取消</el-button>
                </span>
            </el-dialog>
        </div>
  </div>
</template>

<script>
import {getClassroomById, getCurSeatDataById, submitOrder} from "../../network/index";
	export default {
	  data() {
		return {
            seatData: [],
            currentIndex: -1,
            cid: '',
            uid: '',
            dialogVisible: false,
            curSeatData: {},
            classroom_start_time: -1,
            classroom_end_time: -1,
            st_list: [],
            et_list: []
		}
	  },
	  methods: {
        padZero(number) {
            return number.toString().padStart(2, "0");
        },
        numToDate(num) {
            var currentDate = new Date();
            // 获取当前日期的年、月、日
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
            var day = currentDate.getDate();

            var dateTimeString = year + "-" + this.padZero(month) + "-" + this.padZero(day) + " " + num;
            return dateTimeString;
        },
        dateToNum(date) {
            var num = date.split(" ")[1].split(":")[0]
            return num
        },
        submitOrderInfo() {
            console.log(this.curSeatData)
            console.log(this.numToDate(this.curSeatData.start_time))
            submitOrder(this.uid, this.curSeatData.id, this.numToDate(this.curSeatData.start_time), this.numToDate(this.curSeatData.end_time)).then(res => {
                if (res.data.results.preserve === 1) {
                    this.$message('预约成功！')
                    this.clearForm()
                    
                }
                else
                {
                    this.$message('预约失败！')
                }
            })
        },
        getCurSeatData(id) {
            this.dialogVisible = true
            getCurSeatDataById(id).then(res => {
                //console.log(res)
                this.curSeatData = res.data.results
                console.log(res, this.dateToNum(this.curSeatData.pre_list[0].start_time), this.dateToNum(this.curSeatData.pre_list[0].end_time))
                this.st_list = []
                for (let i = this.classroom_start_time; i < this.classroom_end_time; i++) {
                    this.st_list.push(this.convertToTime(i))
                    //console.log(this.st_list[i])
                }
                for (let i=0; i<this.curSeatData.pre_list.length; i++) {
                    let left = parseInt(this.dateToNum(this.curSeatData.pre_list[i].start_time))
                    let right = parseInt(this.dateToNum(this.curSeatData.pre_list[i].end_time))
                    for (let j=left; j<right; j++)
                    {
                        let index = this.st_list.indexOf(this.convertToTime(j))
                        this.st_list.splice(index, 1)
                    } 
                }
            })
        },
        convertToTime(num) {
            // 将数字转换为字符串
            var str = String(num);
            // 如果字符串长度小于2，在前面添加一个'0'
            if (str.length < 2) {
                str = '0' + str;
            }
            // 将时间格式字符串拼接为hh:mm格式
            var time = str + ':00';
            return time;
        },
        convertToNumber(time) {
            // 去除时间字符串中的冒号，并转换为数字
            if (time) {
                var number = Number(time.replace(':', ''))/100;
                return number;
            }
            return 0
        },
        clearForm() {
            this.curSeatData.start_time = ''; // 设置起始时间为空字符串
            this.curSeatData.end_time = '';   // 设置结束时间为空字符串
            this.dialogVisible = false;       // 关闭对话框
        }
      },
      watch: {
            "curSeatData.start_time": function (val) {
                this.et_list = []
                let cur_et_list = []  
                for (let i = this.classroom_start_time; i <= this.classroom_end_time; i++) {
                    cur_et_list.push(i)
                    //console.log(this.st_list[i])
                }
                for (let i=0; i<this.curSeatData.pre_list.length; i++) {
                    let left = parseInt(this.dateToNum(this.curSeatData.pre_list[i].start_time))
                    let right = parseInt(this.dateToNum(this.curSeatData.pre_list[i].end_time))
                    for (let j=left+1; j<=right; j++)
                    {
                        let index = cur_et_list.indexOf(j)
                        cur_et_list.splice(index, 1)
                    }
                }
                let cur_st = this.convertToNumber(val)
                for (let i=0; i<cur_et_list.length; i++) {
                    if (cur_et_list[i]-1 == cur_st) {
                        //console.log(i)
                        for (let j=i; j<i+4; j++)
                        {
                            if ((cur_et_list[j]-cur_st) == (j-i+1)) {
                                this.et_list.push(this.convertToTime(cur_et_list[j]))
                            }
                        }
                    } else {
                        continue
                    }
                }
            }
      },
	  created() {
        this.cid = this.$route.params.cid
        this.uid = this.$route.params.uid
        
        getClassroomById(this.cid).then(res => {
            
            this.seatData = res.data.results
            this.classroom_start_time = res.data.start_time
            this.classroom_end_time = res.data.end_time
            })
      }
    
    }
</script>

<style>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
.select-class {
  border-radius: 13px;
  color: white;
  min-height: 50px;
  max-height: 50px;
  background: rgb(0, 183, 12);
  width: 9%;
  margin: 0 5px 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;

}

.class-item {
  border-radius: 13px;
  color: white;
  min-height: 50px;
  max-height: 50px;
  background: rgb(148, 148, 148);
  width: 9%;
  margin: 0 5px 5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.prompt-text {
  margin: 0 10px;
  padding: 8px;
  background: rgb(179, 216, 255);
  color: rgb(83, 168, 255);
  border-radius: 15px
}
</style>