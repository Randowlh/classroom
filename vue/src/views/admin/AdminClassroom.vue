<template>
	<div>
		<el-table
    		:data="ClassroomData"
			border
    		style="width: 100vw;">
    		<el-table-column
      			fixed
      			prop= 'name'
      			label= '自习室'
      			min-width= '150'>
    		</el-table-column>
			<el-table-column
      			prop= 'start_time'
      			label= '开始时间'
      			min-width= '150'>
				  	<template slot-scope="scope">
        				<el-tag :type = "''">
							{{scope.row.start_time + ' : 00'}}</el-tag>
      				</template>
    		</el-table-column>
			<el-table-column
      			prop= 'end_time'
      			label= '结束时间'
      			min-width= '150'>
				  <template slot-scope="scope">
        				<el-tag :type = "'warning'">
							{{scope.row.end_time + ' : 00'}}</el-tag>
      				</template>
    		</el-table-column>
			<el-table-column
      			prop= 'is_open'
      			label="是否开放"
      			min-width="150">
      				<template slot-scope="scope">
        				<el-tag
							:type = "scope.row.is_open ? 'success' : 'danger'"
          					effect = "dark">
							{{scope.row.is_open ? '已开放' : '未开放'}}</el-tag>
      				</template>
    		</el-table-column>
    		<el-table-column
      			label= '操作'
      			min-width= '150'>
      				<template slot-scope="scope">
        				<el-button @click="getCurClassroomData(scope.$index, scope.row.id)" type="text" size="small" :id="scope.row.id">修改</el-button>
      				</template>()
    		</el-table-column>
  		</el-table>

        <el-dialog :visible.sync="dialogVisible" title="座位信息" width="400px" @close="clearForm">
              <el-form :model="curClassroomData" ref="form" label-width="80px">
                  <p style="text-align: center;"><b>{{ '座位名称:' + curClassroomData.name }}</b></p>
                    <el-input v-model="curClassroomData.start_time">
                        <template slot="prepend">
                            开始时间：
                        </template>
                    </el-input>
                    <el-input v-model="curClassroomData.end_time">
                        <template slot="prepend">
                            结束时间：
                        </template>
                    </el-input>
              </el-form>
              <span slot="footer">
                  <el-button type="primary" @click="updateClassroom()">修改</el-button>
                  <el-button @click="clearForm">取消</el-button>
              </span>
        </el-dialog>
	</div>
</template>
  
<script>
    import { getClassroom, updateClassroomInfo } from "../../network/index";
	export default {
	  data() {
		return {
            dialogVisible : false,
			ClassroomData: [],
            curClassroomData: {},
            curCid : -1
		}
	  },
	  methods: {
		goDetail(cid) {
            console.log(cid)
		},
        getCurClassroomData(idx, cid) {
            this.dialogVisible = true;
            this.curClassroomData = this.ClassroomData[idx];
            this.curCid = cid;
        },
        updateClassroom() {
            console.log(this.curClassroomData.start_time, this.curClassroomData.end_time)
            updateClassroomInfo(this.curCid, this.curClassroomData.start_time, this.curClassroomData.end_time).then(res => {
                console.log(res)
                if (res.data.results.is_change == 1) {
                    this.$message('修改成功！')
                    this.clearForm()
                    getClassroom().then(res => {
			            this.ClassroomData = res.data.results
			            console.log(res)
		            })
                } else {
                    this.$message('修改失败！')
                }
            })
        },
        clearForm() {
            this.dialogVisible = false;       // 关闭对话框
        }
	  },
	  created() {
		//获取自习室
		getClassroom().then(res => {
			this.ClassroomData = res.data.results
			console.log(res)
		})
	  }
	}
</script>