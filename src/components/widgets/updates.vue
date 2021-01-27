<template>
	<div class="card">
		<div class="card-body">
			<div style="float: right;" v-show="isAllowed">
				<toggle-button v-model="updates.privacy"/>
			</div>
			<h4 class="card-title mb-4">{{ componentName }}</h4>

			<div class="media mb-4" v-for="update in data" :key="update.id">
				<div class="mr-3">
					<img
						class="media-object rounded-circle avatar-xs"
						alt
						:src="update.user_avatar"
					/>
				</div>
				<div class="media-body">
					<h5 class="font-size-13 mb-1">{{ update.user_name }}</h5>
					<div v-html="update.description" class="text-muted mb-1"></div>
				</div>
				<div class="ml-3">
					<p class="text-primary text-dark">{{ update.created_at | moment("from", "now") }}</p>
				</div>
			</div>

			<p>&nbsp;</p>
			<ckeditor v-model="updates.description" :editor="editor"></ckeditor>

			<div v-show="isVisible">
				<vue-dropzone
					id="dropzone1"
					ref="myVueDropzone"
					:use-custom-slot="true"
					:options="dropzoneOptions"
					@vdropzone-complete="afterComplete"
					v-on:vdropzone-sending="sendingEvent">
					<div class="dropzone-custom-content">
						<i class="display-4 text-muted bx bxs-cloud-upload"></i>
						<h5>Drop files here or click to upload.</h5>
					</div>
				</vue-dropzone>
			</div>

			<div class="text-right mt-3">
				<button v-if="attach" class="btn btn-primary mr-2" :class="{disabled: isVisible}" @click="attachBtn"> Attach File</button>
				<button class="btn btn-primary" @click="addUpdate"> Save</button>
			</div>
		</div>
	</div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
	props: {
		data: Array,
		model: Object,
		id: Number,
		title: String,
		attach: Boolean,
	},
	components: { vueDropzone: vue2Dropzone, ckeditor: CKEditor.component },
	data() {
		return {
			isVisible: false,
			isAllowed: false,
			updates: {
				description: "",
				model: this.model.type,
				model_id: this.model.id,
				privacy: false
			},
			editor: ClassicEditor,
			user: {},
			dropzoneOptions: {
				url: `${process.env.VUE_APP_API_BASE_URI}updates`,
				thumbnailWidth: 150,
				maxFilesize: 50,
				autoProcessQueue: false,
				uploadMultiple: true,
				headers: { 'Authorization':'Bearer ' + localStorage.getItem('token') }
			},
		}
	},
	computed: {
		componentName() {
			if ( this.title ) {
				return this.title;
			}
			return "Updates";
		}
	},
	created() {
		this.fetchUser();
	},
	methods: {
		addUpdate() {
			let files = this.$refs.myVueDropzone.getQueuedFiles().length;

			if ( !this.updates.model_id ) {
				this.updates.model_id = this.id
			}

			if ( files > 0 ) {
				this.$refs.myVueDropzone.processQueue();
			} else {
				this.$store.dispatch('updates/store', this.updates)
				.then(() => {
					this.updates.description = ""
				})
			}

			this.isVisible = false;
			this.$emit('updateChange');
		},
		fetchUser()
		{
			this.$store.dispatch('auth/me')
			.then((res) => { 
				this.user = res;

				if ( this.user.role != 'client' ) {
					this.isAllowed = true;
				}
			})
			.finally(() => { 
				this.loadingState = false; 
			});
		},
		attachBtn() {
			this.isVisible = true;
		},
		sendingEvent(file, xhr, formData) {
			formData.append("model_id", this.updates.model_id);
			formData.append("model", this.updates.model);
			formData.append("description", this.updates.description);
			formData.append("privacy", this.updates.privacy);
		},
		afterComplete(response) {
			alert(response.status)
			this.$refs.myVueDropzone.removeAllFiles();
			this.updates.description = "";
		},
	}
};
</script>

<style type="text/css">
	
	.public {
		color: red;
	}

</style>