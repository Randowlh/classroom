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
        				<el-button @click="goDetail(scope.row.id)" type="text" size="small" :disabled="!scope.row.is_open" :id="scope.row.id">查看详情</el-button>
      				</template>()
    		</el-table-column>
  		</el-table>
	</div>
</template>
  
<script>
	import {getClassroom} from "../../network/index";
	export default {
	  data() {
		return {
            uid: 0,
			ClassroomData: []
		}
	  },
	  methods: {
		goDetail(cid) {
            console.log(cid, this.uid)
			this.$router.push(`/userSelect/${cid}/${this.uid}`)
		}
	  },
	  created() {
        this.uid = this.$route.params.id
        console.log(this.uid)
		//获取自习室
		getClassroom().then(res => {
			this.ClassroomData = res.data.results
			//console.log(res)
		})
	  }
	}
</script>