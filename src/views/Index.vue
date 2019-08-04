<template>
	<div class="index" :class="leftwidth">
		<div class="leftmenu">
			<LeftMenu></LeftMenu>
		</div>
		<div>
			<div class="rightcontent-top">
				<Breadcrumb></Breadcrumb>
			</div>
			<div class="rightcontent-index">
				<router-view class="view"></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import Breadcrumb from '../components/Breadcrumb.vue'
	import LeftMenu from '../components/LeftMenu.vue'
	export default{
		name:'index',
		components:{
			Breadcrumb,
			LeftMenu
		},
		data(){
			return{
				leftwidth:"rightcontent-180"
			}
		},
		mounted: function() {
	        this.isCollapse = false;
	        this.bus.$on('menuState', res => {
	        	if (res==false)
	        	{
	        		this.leftwidth = "rightcontent-180";
	        	}
	        	else 
	        	{
	        		this.leftwidth = "rightcontent-64";
	        	}
	        })
	    }
	};
</script>

<style>
.leftmenu{
	overflow: hidden;
    position: fixed;
    height: 100%;
    top: 0;
    left: 0;
	z-index: 10003;
}
.rightcontent-180{
	margin-left: 180px;
	transition-property: margin-left;
	transition-duration: 0.5s;

}
.rightcontent-64{
	margin-left: 64px;	
	transition-property: margin-left;
	transition-duration: 0.4s;
}
	.rightcontent-index{
		margin-top: 81.55px;
		margin-bottom: 30px;
	}
.rightcontent-top{
 
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
	transition-property: width;
	transition-duration: 1s;
}
</style>
