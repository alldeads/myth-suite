<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<h4 class="card-title mb-4">Create New Ticket</h4>
						<form>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Client</label>
								<div class="col-lg-10"> 
									<multiselect v-model="newTicket.client" :options="mappedClients" label="label" track-by="id" :searchable="true"></multiselect>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Subject</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="newTicket.subject"
										placeholder="Enter Ticket Subject..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectdesc" class="col-form-label col-lg-2">Description</label>
								<div class="col-lg-10">
									<textarea
										class="form-control"
										rows="3"
										v-model="newTicket.description"
										placeholder="Enter Ticket Description...">        
									</textarea>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Level</label>
								<div class="col-lg-10"> 
									<select class="form-control" v-model="newTicket.level">
										<option value="low" selected="true"> Low</option>
										<option value="medium"> Medium</option>
										<option value="high"> High</option>
										<option value="critical"> Critical</option>
									</select>
								</div>
							</div>
						</form>
						<div class="row mb-4">
							<label class="col-form-label col-lg-2">Attached Files</label>
							<div class="col-lg-10">
								<vue-dropzone
									id="dropzone"
									ref="myVueDropzone"
									:use-custom-slot="true"
									:options="dropzoneOptions"
									@vdropzone-complete="afterComplete"
									@vdropzone-success-multiple="multipleComplete"
									v-on:vdropzone-sending="sendingEvent">
									<div class="dropzone-custom-content">
										<i class="display-4 text-muted bx bxs-cloud-upload"></i>
										<h4>Drop files here or click to upload.</h4>
									</div>
								</vue-dropzone>
							</div>
						</div>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="addTicket">Create Ticket</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<!-- end row -->
	</Layout>
</template> 

<script>
import vue2Dropzone from "vue2-dropzone";
import Multiselect from "vue-multiselect";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Projects-create component
 */
export default {
	page: {
		title: "Create New Ticket",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { vueDropzone: vue2Dropzone, Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Create New",
			items: [
				{
					text: "Tickets",
					href: "/"
				},
				{
					text: "Create New",
					active: true
				}
			],
			dropzoneOptions: {
				url: `${process.env.VUE_APP_API_BASE_URI}tickets`,
				thumbnailWidth: 150,
				maxFilesize: 10000,
				maxFiles: 5,
				autoProcessQueue: false,
				uploadMultiple: true,
				headers: { 'Authorization':'Bearer ' + localStorage.getItem('token') }
			},
			newTicket: {},
			user: {},
			show: false,
			clients:[]
		};
	},
	created() {
		this.fetchUser();
		this.getClients();
	},
	computed: {
		mappedClients() {
			return this.clients.map((item) => {
				return {
					id : item.id,
					label : item.company
				}
			})
		}
	},
	methods: {
		sendingEvent(file, xhr, formData) {
			formData.append("subject", this.newTicket.subject);
			formData.append("description", this.newTicket.description);
			formData.append("level", this.newTicket.level);
			formData.append("client", this.newTicket.client.id);
		},

		afterComplete(files, response) {
			this.$refs.myVueDropzone.removeAllFiles();

			alert(JSON.stringify(response));
		},

		multipleComplete(response) {
			this.$refs.myVueDropzone.removeAllFiles();
	
			if ( response !== undefined ) {
				alert(response)
			}
		},

		getClients() {
			this.$store.dispatch('clients/all')
			.then((res) => {
				this.clients = res;
			})
		},

		fetchUser()
		{
			this.$store.dispatch('auth/me')
			.then((res) => { 
				this.user = res;
			})
			.finally(() => { 
				this.loadingState = false; 
			});
		},

		addTicket() {
			let files = this.$refs.myVueDropzone.getQueuedFiles().length;

			if ( files > 0 ) {
				this.$refs.myVueDropzone.processQueue();
			} else {
				this.$store.dispatch('tickets/store', this.newTicket)
				.then(() => { 
					this.newTicket = {};
					this.$router.go(-1) 
				})
			}
			
			this.newTicket = {};
		}
	}
};
</script>
