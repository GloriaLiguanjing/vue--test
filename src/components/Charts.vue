<template>
		<div class="container chart">
			<div class="row">
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 chart-item">
					<div class="table" ref="charts" :style="{width: '400px',height:'300px'}"></div>
				</div>
				<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 chart-item">
					<div class="table" ref="orgs" :style="{width: '400px',height:'300px'}"></div>
				</div>
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 chart-item">
					<div class="table" ref="articles" :style="{width: '800px',height:'300px'}"></div>
				</div>
			</div>
		</div>
</template>
<script>
export default {
	data() {
		return {
			msg: 'Welcome',
			data: [],
			dataValue: [],
			dataName: [],
			dataAN: [],
			dataAT: []
		}
	},
	mounted: function() {
		this.initDate();
	},
	methods: {
		initDate() {
			//获取栏目
			this.getRequest('/article-categorys/tree').then(resp => {
				console.log(resp);
				resp.data.forEach((item, index) => {
					var { childrenNumber, name } = item;
					let v = item.childrenNumber;
					let n = item.name;
					var { value, name } = { value: v, name: n }
					this.data.push({ value, name });
				});
				this.drawLine();
			});
			//获取组织机构
			this.getRequest('/orgs').then(resp => {
				console.log(resp);
				resp.data.forEach((item, index) => {

					var { childrenNum, name } = item;
					let s = item.childrenNum;
					let l = item.name;
					this.dataValue.push(s);
					this.dataName.push(l);

				});
				this.drawLineOrg();
			});
			//获取文章信息
			//获取组织机构
			this.getRequest('/articles').then(resp => {

				resp.data.forEach((item, index) => {

					var { upsNum, id } = item;
					let s = item.upsNum;
					let l = item.id;
					this.dataAN.push(s);
					this.dataAT.push(l);

				});
				console.log(this.dataAT);
				console.log(this.dataAN);
				this.drawLineArticles();
			})
		},
		//绘制栏目图
		drawLine() {
			// 基于准备好的dom，初始化echarts实例
			var Chart = this.$refs.charts;
			var myChart = this.$echarts.init(Chart)
			// 绘制图表
			myChart.setOption({
				title: { text: '栏目分布图' },
				series: [{
					name: '栏目统计',
					type: 'pie',
					radius: '55%',
					roseType: 'angle',
					data: this.data
				}]
			});
		},
		//绘制组织机构图
		drawLineOrg() {
			// 基于准备好的dom，初始化echarts实例
			var org = this.$refs.orgs;
			var myOrgChart = this.$echarts.init(org)
			// 绘制图表
			myOrgChart.setOption({
				title: {
					text: '组织机构状态图'
				},
				tooltip: {},
				xAxis: {
					data: this.dataName
				},
				yAxis: {},
				series: [{
					name: '数量',
					type: 'bar',
					data: this.dataValue
				}]
			});
		},
		drawLineArticles() {
			// 基于准备好的dom，初始化echarts实例
			var articles = this.$refs.articles;
			var myArticleChart = this.$echarts.init(articles);
			// 绘制图表
			myArticleChart.setOption({
				title: {
					text: '文章点赞统计图'
				},
				tooltip: {},
				xAxis: {
					data: this.dataAT
				},
				yAxis: {},
				series: [{
					name: '数量',
					type: 'bar',
					data: this.dataAN
				}]
			});
		}
	}
};

</script>
<style>
.chart {
	width: 90%;
	background-color: #ffffff;
	margin-top: 20px;
	padding-top: 30px;
	padding-bottom: 20px;
}

.table {
	display: line-block;
	width: 45%;
}
.chart-item>div{
	margin: 0 auto;
}
</style>
