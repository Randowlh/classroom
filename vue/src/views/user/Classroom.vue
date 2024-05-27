<template>
	<div class="user_home_body">
	  <div class="container">
		<h1>自习室预定情况</h1>
		<el-table
			:data="ClassroomData"
			border
			style="width: 100%">
			<el-table-column
				fixed
				prop="name"
				label="自习室"
				min-width="150">
			</el-table-column>
			<el-table-column
				prop="start_time"
				label="开始时间"
				min-width="180">
				<template slot-scope="scope">
					<el-tag :type="''">
						{{ scope.row.start_time + ' : 00' }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				prop="end_time"
				label="结束时间"
				min-width="180">
				<template slot-scope="scope">
					<el-tag :type="'warning'">
						{{ scope.row.end_time + ' : 00' }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				prop="is_open"
				label="是否开放"
				min-width="150">
				<template slot-scope="scope">
					<el-tag
						:type="scope.row.is_open ? 'success' : 'danger'"
						effect="dark">
						{{ scope.row.is_open ? '已开放' : '未开放' }}
					</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				min-width="180">
				<template slot-scope="scope">
					<el-button @click="goDetail(scope.row.id)" type="text" size="small"
						:disabled="!scope.row.is_open" :id="scope.row.id">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
	  </div>
	</div>
  </template>
  
  
  <style scoped>
  .user_home_body {
    min-height: 100vh;
    background: linear-gradient(to top, #74ebd5 0%, #9face6 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: 'Roboto', sans-serif;
  }

  .container {
    width: 100%;
    max-width: 1000px; /* 调整为最适合的宽度 */
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    border-radius: 10px;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
    font-size: 24px; /* 增大标题字体大小 */
  }

  .el-table th {
    background-color: #2c3e50;
    color: white;
    font-size: 16px;
    line-height: 1.5;
  }

  .el-table td {
    background-color: #fff;
    color: #333;
    font-size: 15px;
  }

  .el-tag {
    font-size: 14px;
    margin: 0 5px;
  }

  .el-button {
    font-size: 14px;
    border: none;
    border-radius: 4px;
  }

  .el-button:hover {
    background-color: #74ebd5;
    color: white;
  }

  .el-button:not(:disabled):hover {
    background-color: #3498db;
    color: #fff;
  }

  .el-button:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
</style>