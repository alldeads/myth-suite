<template>
	<Layout>
		<PageHeader :title="title" :items="items"/>
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<button class="btn btn-danger" style="float: right;" @click="viewProject(currentProject.id)"> 
							View Project <i class="fa fa-eye"></i>
						</button>
						<h4 class="card-title mb-4">Edit Project</h4>
						<form class="mt-5">
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Project Name</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="currentProject.title"
										placeholder="Enter Project Name..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectdetails" class="col-form-label col-lg-2">Project Subtitle</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="currentProject.details"
										placeholder="Enter Project Subtitle..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectdesc" class="col-form-label col-lg-2">Project Description</label>
								<div class="col-lg-10">
									<textarea
										class="form-control"
										rows="3"
										v-model="currentProject.description"
										placeholder="Enter Project Description...">        
									</textarea>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Client</label>
								<div class="col-lg-10"> 
									<multiselect v-model="currentProject.client" :options="mappedClients" label="label" track-by="id" :searchable="true">
									</multiselect>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label col-lg-2">Project Date</label>
								<div class="col-lg-10">
									<date-picker v-model="currentProject.dates" range append-to-body lang="en" confirm>
									</date-picker>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectbudget" class="col-form-label col-lg-2">Quoted</label>
								<div class="col-lg-10">
									<input
										type="number"
										v-model="currentProject.quoted"
										placeholder="Enter Project Quoted..."
										class="form-control"
										disabled
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectbudget" class="col-form-label col-lg-2">Value</label>
								<div class="col-lg-10">
									<input
										type="number"
										v-model="currentProject.value"
										placeholder="Enter Project Budget..."
										class="form-control"
									/>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="projectbudget" class="col-form-label col-lg-2">Status</label>
								<div class="col-lg-10"> 
									<multiselect v-model="currentProject.status" :options="mappedStatus" label="label" track-by="id" :searchable="true">
									</multiselect>
								</div>
							</div>
						</form>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="saveProject">Save Changes</button>
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
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Projects-create component
 */
export default {
	page: {
		title: "Edit Project",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { DatePicker, Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Edit Project",
			items: [
				{
					text: "Projects",
					href: "/"
				},
				{
					text: "Edit Project",
					active: true
				}
			],
			clients: [],
			currentProject: {},
			status: []
		};
	},
	created() {
		this.getClients();
		this.getStatus();
		this.fetchProject();
	},
	computed: {
		mappedClients() {
			return this.clients.map((item) => {
				return {
					id : item.id,
					label : item.company
				}
			})
		},

		mappedStatus() {
			return this.status.map((item) => {
				return {
					id : item.id,
					label : item.description
				}
			})
		}
	},
	methods: {
		fetchProject() {
			const { projectId } = this.$route.params;

			if(!projectId) this.$router.push({ name: 'projectList' });

			this.$store.dispatch('projects/get', projectId)
			.then((res) => { 
				this.currentProject = res;

				if ( this.currentProject.client ) {
					this.currentProject.client = {
						id: this.currentProject.client.id,
						label: this.currentProject.client.company
					};
				}
				this.currentProject.status = {
					id: this.currentProject.status.id,
					label: this.currentProject.status.description
				};

				if ( this.currentProject.start_date && this.currentProject.due_date ) {
					this.currentProject.dates = [
						new Date(this.currentProject.start_date),
						new Date(this.currentProject.due_date)
					];
				}
			})
			.catch(() => this.$router.push({ name: 'projectList' }))
			.finally(() => { this.loadingState = false })
		},

		getClients() {
			this.$store.dispatch('clients/all')
			.then((res) => {
				this.clients = res;
			})
		},

		getStatus() {
			this.$store.dispatch('status/all')
			.then((res) => {
				this.status = res;
			})
		},

		saveProject() {
			const { projectId } = this.$route.params;

			if(!projectId) this.$router.push({ name: 'projectList' });

			this.$store.dispatch('projects/editProject', this.currentProject)
			.then(() => this.$router.go(-1))
		},

		viewProject(id) {
			this.$router.push({ name: 'projectView', params: { projectId: id } })
		}
	}
};
</script>
