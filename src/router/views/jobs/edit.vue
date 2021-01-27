<template>
	<Layout>
		<PageHeader :title="title" :items="items"/>
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<button class="btn btn-primary" style="float: right;" @click="viewJob(currentJob.id)"> 
							Go back
						</button>
						<h4 class="card-title mb-4">Edit Job</h4>
						<form class="mt-5">
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Job Name</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="currentJob.title"
										placeholder="Enter Project Name..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Job Details</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="currentJob.details"
										placeholder="Enter Project Subtitle..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectdesc" class="col-form-label col-lg-2">Job Description</label>
								<div class="col-lg-10">
									<textarea
										class="form-control"
										rows="3"
										v-model="currentJob.description"
										placeholder="Enter Project Description...">        
									</textarea>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="jobproject" class="col-form-label col-lg-2">Project</label>
								<div class="col-lg-10"> 
									<multiselect v-model="currentJob.project" :options="mappedProjects" label="label" track-by="id" :searchable="true"></multiselect>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Client</label>
								<div class="col-lg-10"> 
									<multiselect v-model="currentJob.client" :options="mappedClients" label="label" track-by="id" :searchable="true">
									</multiselect>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label class="col-form-label col-lg-2">Job Date</label>
								<div class="col-lg-10">
									<date-picker v-model="currentJob.dates" range append-to-body lang="en" confirm>
									</date-picker>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectbudget" class="col-form-label col-lg-2">Quoted (Original Value)</label>
								<div class="col-lg-10">
									<input
										type="number"
										v-model="currentJob.quoted"
										placeholder="Enter Project Quoted..."
										class="form-control"
										disabled
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectbudget" class="col-form-label col-lg-2">Value (Total Project Value)</label>
								<div class="col-lg-10">
									<input
										type="number"
										v-model="currentJob.value"
										placeholder="Enter Project Budget..."
										class="form-control"
									/>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="projectbudget" class="col-form-label col-lg-2">Status</label>
								<div class="col-lg-10">
									<multiselect v-model="currentJob.status" :options="mappedStatus" label="label" track-by="id" :searchable="true">
									</multiselect>
								</div>
							</div>
						</form>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="saveJob">Save Changes</button>
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
		title: "Edit Job",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { DatePicker, Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Edit Job",
			items: [
				{
					text: "Jobs",
					href: "/"
				},
				{
					text: "Edit Job",
					active: true
				}
			],
			clients: [],
			currentJob: {},
			status: [],
			projects: [],
		};
	},
	created() {
		this.getClients();
		this.fetchProject();
		this.getStatus();
		this.getProjects();
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

		mappedProjects() {
			return this.projects.map((item) => {
				return {
					id : item.id,
					label : item.title
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
			const { jobId } = this.$route.params;

			if(!jobId) this.$router.push({ name: 'jobList' });

			this.$store.dispatch('jobs/get', jobId)
			.then((res) => { 
				this.currentJob = res;

				if ( this.currentJob.client ) {
					this.currentJob.client = {
						id: this.currentJob.client.id,
						label: this.currentJob.client.company
					};
				}

				if ( this.currentJob.project ) {
					this.currentJob.project = {
						id: this.currentJob.project.id,
						label: this.currentJob.project.title
					}
				}

				this.currentJob.status = {
					id: this.currentJob.status.id,
					label: this.currentJob.status.description
				};

				if ( this.currentJob.start_date && this.currentJob.due_date ) {
					this.currentJob.dates = [
						new Date(this.currentJob.start_date),
						new Date(this.currentJob.due_date)
					];
				}
			})
			.catch(() => this.$router.push({ name: 'jobList' }))
			.finally(() => { this.loadingState = false })
		},

		getProjects() {
			this.$store.dispatch('projects/all')
			.then((res) => {
				this.projects = res;
			})
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

		saveJob() {
			const { jobId } = this.$route.params;

			if(!jobId) this.$router.push({ name: 'jobList' });

			this.$store.dispatch('jobs/editJob', this.currentJob)
			.then(() => { this.$router.go(-1) })
		},

		viewJob(id) {
			this.$router.push({ name: 'jobView', params: { jobId: id } })
		}
	}
};
</script>
