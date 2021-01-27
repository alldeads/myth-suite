<template>
		<Layout>
		<PageHeader :title="title" :items="items" :buttonText="`Create New +`" :buttonAction="`/projects/create`" :buttonExcludeClient='!isAllowed' />
		<div class="row">
			<div class="col-lg-12">
				<div class>
					<div class="table-responsive">
						<table class="table project-list-table table-centered table-borderless">
							<thead>
								<tr>
									<th scope="col" style="width: 100px">#</th>
									<th scope="col">Projects</th>
									<th scope="col">Client</th>
									<th scope="col" v-if="isAllowed">Quoted</th>
									<th scope="col" v-if="isAllowed">Value</th>
									<th scope="col">Status</th>
									<th scope="col">Team</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="project in activeProjects" :key="project.id">
									<td>
										<span class="badge badge-light badge-pill badge-large">{{ project.id }}</span>
									</td>
									<td>
										<h5 class="text-truncate font-size-14">
											<a href="javascript: void(0);" class="text-dark" @click="goToProject(project.id)">{{project.title}}</a>
										</h5>
									</td>
									<td>
										<h5 class="text-truncate font-size-14" v-if="project.client">{{project.client.company}}</h5>
										<h5 class="text-truncate font-size-14" v-else>No Client</h5>
									</td>
									<td v-if="isAllowed"><h5 class="text-truncate font-size-14">{{project.quoted|currency}}</h5></td>
									<td v-if="isAllowed"><h5 class="text-truncate font-size-14">{{project.value|currency}}</h5></td>
									<td>
										<span
											v-if="project.status_name"
											class="badge"
											:class="{
												'badge-primary': `${project.status_name}` === 'Quoted',
												'badge-secondary': `${project.status_name}` === 'Agreed',
												'badge-warning': `${project.status_name}` === 'In Progress',
												'badge-success': `${project.status_name}` === 'Completed',
												'badge-info': `${project.status_name}` === 'To Invoice',
												'badge-dark': `${project.status_name}` === 'Invoiced',
												'badge-light': `${project.status_name}` === 'On Hold'}"
										>{{project.status_name}}</span>
									</td> 
									<td>
										<div class="team">
											<a href="javascript: void(0);" class="team-member d-inline-block">
												<img v-if="project.client" :src="`${project.client.logo}`" class="rounded-circle avatar-xs m-1" alt />
											</a>
										</div>
									</td>
									<!-- <td>
										<b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
											<template v-slot:button-content>
												<i class="mdi mdi-dots-horizontal font-size-18"></i>
											</template>
											<b-dropdown-item href="javascript: void(0);">Action</b-dropdown-item>
											<b-dropdown-item href="javascript: void(0);">Another action</b-dropdown-item>
											<b-dropdown-item href="javascript: void(0);">Something else here</b-dropdown-item>
										</b-dropdown>
									</td> -->
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<!-- end row -->

		<div class="row">
			<!-- <div class="col-12">
				<div class="text-center my-3">
					<a href="javascript:void(0);" class="text-success">
						<i class="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i> Load more
					</a>
				</div>
			</div> -->
			<!-- end col-->
		</div>
		<!-- end row -->
	</Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Projects-list component
 */
export default {
	page: {
		title: "Projects",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { Layout, PageHeader },
	
	data() {
		return {
			title: "Projects",
			items: [
				{
					text: "Projects",
					href: "/"
				},
				{
					text: "Project Overview",
					active: true
				}
			],
			projects: [],
			isAllowed: false
		}
	},
	created() {
		this.fetchUser()
		this.getProjects()
	},
	computed: {
		activeProjects() {
			return this.projects.filter(p => p.completed === 0);
		},
		completedProjects() {
			return this.projects.filter(p => p.completed === 1);
		}
	},
	methods: {
		goToProject(id) {
			this.$router.push({ name: 'projectView', params: { projectId: id } })
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
		getProjects() {
			this.$store.dispatch('projects/all')
			.then((res) => { 
				this.projects = res;
			})
			.finally(() => { 
				this.loadingState = false; 
			});
		}
	}
};
</script>
