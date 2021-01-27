<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<button class="btn btn-success" style="float: right;" @click="viewClient(newClient.id)">View Client</button>
						<h4 class="card-title mb-4">Edit Client</h4>
						<form class="mt-5">
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Client Name</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="newClient.name"
										placeholder="Enter Client Name..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Client Email</label>
								<div class="col-lg-10">
									<input
										type="email"
										class="form-control"
										v-model="newClient.email"
										placeholder="Enter Client Email..."
									/>
								</div>
							</div>
							<div class="form-group row mb-4">
								<label for="projectname" class="col-form-label col-lg-2">Client Company</label>
								<div class="col-lg-10">
									<input
										type="text"
										class="form-control"
										v-model="newClient.company"
										placeholder="Enter Client Company..."
									/>
								</div>
							</div>

							<div class="form-group row mb-4">
                                <label for="projectname" class="col-form-label col-lg-2">Client Status</label>
                                <div class="col-lg-10">
                                    <select class="form-control" v-model="newClient.status">
                                        <option value="active"> Active</option>
                                        <option value="lead"> Lead</option>
                                        <option value="lapsed"> Lapsed</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row mb-4">
                                <label for="projectname" class="col-form-label col-lg-2">Main Contact</label>
                                <div class="col-lg-10">
                                    <multiselect v-model="newClient.users" :options="mappedMembers" label="label" track-by="id" :searchable="true" :multiple="true" :close-on-select="false"></multiselect>
                                </div>
                            </div>
							
						</form>
						<div class="row justify-content-end">
							<div class="col-lg-10">
								<button type="submit" class="btn btn-primary" @click="saveClient">Save Changes</button>
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
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import Multiselect from "vue-multiselect";

/**
 * Projects-create component
 */
export default {
	page: {
		title: "Edit Client",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { Layout, PageHeader, Multiselect },
	data() {
		return {
			title: "Edit Client",
			items: [
				{
					text: "Clients",
					href: "/"
				},
				{
					text: "Edit Client",
					active: true
				}
			],
			newClient: {},
			users: []
		};
	},
	created() {
		this.fetchClient();
		this.getUsers();
	},
	computed: {
		mappedMembers() {
            return this.users.map((item) => {
                return {
                    id : item.id,
                    label : item.name
                }
            })
        },
	},
	methods: {
		saveClient() {
			this.$store.dispatch('clients/saveClient', this.newClient)
			.then(() => { this.$router.go(-1) })
		},

		fetchClient() {
			const { clientId } = this.$route.params;

			if(!clientId) this.$router.push({ name: 'clientList' });

			this.$store.dispatch('clients/get', clientId)
			.then((res) => { 
				this.newClient = res;
			})
			.catch(() => this.$router.push({ name: 'clientList' }))
			.finally(() => { this.loadingState = false })
		},

		viewClient(id) {
			this.$router.push({ name: 'clientProfile', params: { clientId: id } })
		},

		getUsers() {
            this.$store.dispatch('users/clients')
                .then((res) => { 
                this.users = res; 
            })
            .finally(() => { 
                this.loadingState = false; 
            });
        },
	}
};
</script>
