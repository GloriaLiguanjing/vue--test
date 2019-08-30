<template>
	<div>
		<el-menu default-active="1" class="el-menu-vertical-demo" text-color="#333" active-text-color="#428BCA">
			<el-menu-item v-for="(item,index) in menu" :key="index">
				<span v-text="item.name"></span>
			</el-menu-item>
		</el-menu>
	</div>
</template>
<script>
export default {
	name: "Menu",
	data() {
		return {
			menu: [
				{ name: "课程管理" },
				{ name: "公开课管理" },
				{ name: "直播管理" },
				{ name: "班级管理" },
				{ name: "话题管理" },
				{ name: "问答管理" },
				{ name: "笔记管理" },
				{ name: "评价管理" },
				{ name: "分类管理" },
				{ name: "标签管理" },
			]
		}
	}
}

</script>
