<template>
	<div class="container">
		<el-table :data="tableData" border style="width: 100%">
			<el-table-column prop="articleId" label="文章id" width="180">
			</el-table-column>
			<el-table-column prop="createdTime" label="点赞时间" width="180">
			</el-table-column>
			<el-table-column prop="userId" label="用户id">
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
export default {
	data() {
		return {
			tableData: []
		}
	},
	methods: {
		initDate() {
			this.getListRequest('/article-likes').then(resp => {
				this.tableData = resp.data;
				console.log("获取到的数据")
				console.log(this.tableData)
			})
		},
	},
	mounted: function() {
    this.initDate();
  },
}

</script>
