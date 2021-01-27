<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<h4 class="card-title mb-4">Create New User</h4>
						<form>
							<div class="form-group row mb-4">
								<label for="fullname" class="col-form-label col-lg-2">Full Name</label>
								<div class="col-lg-10">
									<input
										id="fullname"
										name="fullname"
										type="text"
										class="form-control"
										v-model="newUser.fullname"
										placeholder="Enter Full Name..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="email" class="col-form-label col-lg-2">Email Address</label>
								<div class="col-lg-10">
									<input
										id="email"
										name="email"
										type="email"
										class="form-control"
										v-model="newUser.email"
										placeholder="Enter Email Address..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="password" class="col-form-label col-lg-2">Password</label>
								<div class="col-lg-10">
									<input
										id="password"
										name="password"
										type="password"
										class="form-control"
										v-model="newUser.password"
										placeholder="Enter Password..."
									/>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Role</label>
								<div class="col-lg-10"> 
									<multiselect v-model="newUser.role" :options="mappedRoles" label="label" track-by="id" :searchable="true" @input="triggerClient"></multiselect>
								</div>
							</div>

							<div class="form-group row mb-4" v-show="show">
								<label for="projectname" class="col-form-label col-lg-2">Client</label>
								<div class="col-lg-10"> 
									<multiselect v-model="newUser.client" :options="mappedClients" label="label" track-by="id" :searchable="true"></multiselect>
								</div>
							</div>
						</form>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="addUser">Create User</button>
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
import Multiselect from "vue-multiselect";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Projects-create component
 */
export default {
	page: {
		title: "Create New User",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Create New",
			items: [
				{
					text: "Users",
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
			show: false,
			roles: [],
			newUser: {},
			clients: []
		};
	},
	created() {
		this.getRoles();
		this.getClients();
	},
	computed: {
		mappedRoles() {
			return this.roles.map((item) => {
				return {
					id : item.id,
					label : item.name
				}
			})
		},

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
		addUser() {
			this.$store.dispatch('users/store', this.newUser)
			.then(() => {
				this.newUser = {}
				this.$router.go(-1)
			})
			
		},

		getRoles() {
			this.$store.dispatch('roles/all')
			.then((res) => {
				this.roles = res;
			})
		},

		getClients() {
			this.$store.dispatch('clients/all')
			.then((res) => {
				this.clients = res;
			})
		},

		triggerClient() {
			if ( this.newUser.role.label == "client" ) {
				this.show = true;
			} else {
				this.show = false;
			}
		}
	}
};
</script>
