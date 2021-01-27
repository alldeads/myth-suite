<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<h4 class="card-title mb-4">Edit User</h4>
						<form>
							<div class="form-group row mb-4">
								<label for="fullname" class="col-form-label col-lg-2">Full Name</label>
								<div class="col-lg-10">
									<input
										id="fullname"
										type="text"
										class="form-control"
										v-model="currentUser.name"
										placeholder="Enter Full Name..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="email" class="col-form-label col-lg-2">Email Address</label>
								<div class="col-lg-10">
									<input
										id="email"
										type="email"
										class="form-control"
										v-model="currentUser.email"
										placeholder="Enter Email Address..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="password" class="col-form-label col-lg-2">Password</label>
								<div class="col-lg-10">
									<input
										id="password"
										type="password"
										class="form-control"
										v-model="currentUser.password"
										placeholder="Enter Password..."
									/>
								</div>
							</div>

							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Role</label>
								<div class="col-lg-10"> 
									<multiselect v-model="currentUser.role" :options="mappedRoles" label="label" track-by="id" :searchable="true" @input="triggerClient"></multiselect>
								</div>
							</div>

							<div class="form-group row mb-4" v-show="show">
								<label for="projectname" class="col-form-label col-lg-2">Client</label>
								<div class="col-lg-10"> 
									<multiselect v-model="currentUser.client" :options="mappedClients" label="label" track-by="id" :searchable="true"></multiselect>
								</div>
							</div>
						</form>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="saveUser">Save Changes</button>
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
		title: "Edit User",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Edit",
			items: [
				{
					text: "Users",
					href: "/"
				},
				{
					text: "Edit",
					active: true
				}
			],
			show: false,
			currentUser: {},
			roles: [],
			newUser: {},
			clients: []
		};
	},
	created() {
		this.getRoles();
		this.getClients();
		this.fetchUser()
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
		fetchUser() {
			const { contactId } = this.$route.params;

			if(!contactId) this.$router.push({ name: 'contactList' });

			this.$store.dispatch('users/get', contactId)
			.then((res) => {
				this.currentUser = res.data;

				if ( this.currentUser.roles.length != 0 ) {
					this.currentUser.role = {
						id: this.currentUser.role.id,
						label: this.currentUser.role.name,
					};

					if ( this.currentUser.role.label == "client" ) {
						this.show = true;
					}
				}

				if ( this.currentUser.clients.length != 0 ) {
					this.currentUser.client = {
						id: this.currentUser.client.id,
						label: this.currentUser.client.company,
					};
				}
			})
			.catch(() => this.$router.push({ name: 'contactList' }))
			.finally(() => { this.loadingState = false })
		},

		saveUser() {
			this.$store.dispatch('users/editUser', this.currentUser)
			.then(() => { this.$router.go(-1) })
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
			if ( this.currentUser.role && this.currentUser.role.label == "client" ) {
				this.show = true;
			} else {
				this.show = false;
			}
		}
	}
};
</script>
