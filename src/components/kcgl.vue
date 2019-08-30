<template>
	<div class="kcgl-index">
		<div class="kcgl-title">
			<div class="kcgl-title-view">
				<div class="kcgl-title-view-kcgl">
					<span>课程管理</span>
				</div>
				<div class="kcgl-title-view-button">
					<el-button type="success" @click="" size="small">创建课程</el-button>
				</div>
			</div>
		</div>
		<div class="top-menu">
			<el-tabs v-model="activateName" @tab-click="handleClick">
				<el-tab-pane label="课程管理" name="first">
					<Kcgl_kcgl></Kcgl_kcgl>
				</el-tab-pane>
				<el-tab-pane label="课程推荐" name="second">课程推荐</el-tab-pane>
				<el-tab-pane label="课程统计" name="third">课程统计</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>
<style>
	.kcgl-title-view{
		border-bottom: 2px solid #eee;
		overflow: hidden;
	}
	.kcgl-title-view-kcgl{
		float: left;
	}
	.kcgl-title-view-kcgl>span{
		font-size: 20px;
		color: #aaa;
	}
	.kcgl-title-view-button{
		float: right;
	}
	.top-menu{
		margin-top: 10px;
	}
</style>
<script>
	import Kcgl_kcgl from './Kcgl_kcgl.vue'
	export default{
		name:"Kcgl",
		components:{
			Kcgl_kcgl
		},
		data(){
			return{
				activateName:'first'
			}
		}
	}
</script>
