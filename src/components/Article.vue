<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
					<div v-if="this.active">
						<div class="container-fulid">
							<div class="row article-button">
								<div class="col-lg-1 col-md-1 dol-sm-2 col-xs-3">
									<el-button type="primary" @click="changeActive()">返回</el-button>
								</div>
							</div>
							<div class="row article-data">
								<editor ref="editor"></editor>
							</div>
						</div>
					</div>
					<div v-else>
						<div class="container-fulid">
							<div class="row article-button">
								<div class="col-lg-1 col-md-2 dol-sm-3 col-xs-2">
									<el-button type="primary" @click="changeActive()">添加文章</el-button>
								</div>
								<div class="col-lg-1 col-md-2 dol-sm-3 col-xs-2">
									<el-button type="primary" @click="aduitArticle()">审核文章</el-button>
								</div>
							</div>
							<div class="row article-data">
								<articleShow ref="articleShow"></articleShow>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import editor from './editor'
import articleShow from './ArticleShow'
export default {
	components: {
		editor,
		articleShow
	},
	data() {
		return {
			myeditor: "<p></p>",
			active: false
		}
	},
	methods: {
		init() {
			this.$refs.editor.setHtml(this.myeditor);
		},
		save() {
			this.myeditor = this.$refs.editor.getHtml();

			console.log(this.myeditor)
		},
		changeActive() {
			this.active = !this.active;
		},
		aduitArticle() {
			alert("此功能正在开发")
		}
	},
	mounted() {
		this.$nextTick(function() {
			this.init();
		});
	}
}

</script>
<style>

</style>
