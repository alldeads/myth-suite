<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<h4 class="card-title mb-4">Create New Job</h4>
						<form>
							<div class="form-group row mb-4">
								<label for="jobname" class="col-form-label col-lg-2">Job Name</label>
								<div class="col-lg-10">
									<input
										id="jobname"
										type="text"
										class="form-control"
										v-model="job.title"
										placeholder="Enter Job Name..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="jobdetails" class="col-form-label col-lg-2">Job Details</label>
								<div class="col-lg-10">
									<input
										id="jobdetails"
										type="text"
										class="form-control"
										v-model="job.details"
										placeholder="Enter Job Details..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="jobdesc" class="col-form-label col-lg-2">Job Description</label>
								<div class="col-lg-10">
									<textarea
										id="jobdesc"
										class="form-control"
										rows="3"
										v-model="job.description"
										placeholder="Enter Job Description..."
									></textarea>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="jobproject" class="col-form-label col-lg-2">Project</label>
								<div class="col-lg-10"> 
									<multiselect v-model="job.project" :options="mappedProjects" label="label" track-by="id" :searchable="true"></multiselect>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="jobclient" class="col-form-label col-lg-2">Client</label>
								<div class="col-lg-10"> 
									<multiselect v-model="job.client" :options="mappedClients" label="label" track-by="id" :searchable="true"></multiselect>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label class="col-form-label col-lg-2">Job Date</label>
								<div class="col-lg-10">
									<date-picker v-model="job.dates" range append-to-body lang="en" confirm></date-picker>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="jobvalue" class="col-form-label col-lg-2">Budget</label>
								<div class="col-lg-10">
									<input
										id="jobvalue"
										type="number"
										v-model="job.value"
										placeholder="Enter Job Budget..."
										class="form-control"
									/>
								</div>
							</div>
						</form>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="addJob">Create Job</button>
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
		title: "Create New Project",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { DatePicker, Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Create New",
			items: [
				{
					text: "Jobs",
					href: "/"
				},
				{
					text: "Create New",
					active: true
				}
			],
			dropzoneOptions: {
				url: "https://httpbin.org/post",
				thumbnailWidth: 150,
				maxFilesize: 0.5,
				headers: { "My-Awesome-Header": "header value" }
			},
			clients: [],
			projects: [],
			job: {},
		};
	},
	created() {
		this.$store.dispatch('clients/all')
		.then((res) => {
			this.clients = res;
		})

		this.$store.dispatch('projects/all')
		.then((res) => {
			this.projects = res;
		})
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
		}
	},
	methods: {
		addJob() {
			this.$store.dispatch('jobs/store', this.job)
			.then(() => {
				this.job = {}
				this.$router.go(-1)
			})
		},
	}
};
</script>
