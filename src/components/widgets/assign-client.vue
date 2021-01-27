<template>
	<div class="card" v-show="isAllowed">
		<div class="card-body">
			<div class="row">
				<div class="col-md-12 col-lg-12 col-sm-12 col-12">
					<h4 class="card-title mb-4">Client</h4>
				</div>
			</div>
			<div class="row" v-if="!data">
				<div class="col-md-9 col-lg-9 col-sm-12 col-12">
					<multiselect v-model="client.client_id" :options="mappedClients" label="label" track-by="id" :searchable="true"></multiselect>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-12">
					<button class="btn btn-primary" @click="assignClient">Assign</button>
				</div>
			</div>

			<div class="table-responsive mt-3">
				<table class="table table-centered">
					<tbody>
						<tr v-if="data">
							<td style="width: 50px;">
								<img src="@/assets/images/users/avatar-1.jpg" class="rounded-circle avatar-xs" alt="" />
							</td>
							<td>
								<h5 class="font-size-14 m-0">
									<a href class="text-dark">
										{{ data.company }}
									</a>
								</h5>
							</td>
							<td>
								<div>
									<a href="javascript: void(0);" class="badge badge-info font-size-11">Client</a>
								</div>
							</td>
							<td>
								<b-button pill size="sm" @click="removeClient(data.id)" variant="danger">Remove</b-button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>

import Multiselect from "vue-multiselect";

export default {
	props: {
		data: Object,
		model: Object,
	},
	components: { Multiselect },
	data() {
		return {
			isAllowed: true,
			client: {
				model: this.model.type,
				model_id: this.model.id,
				client_id: null
			},
			clients: [],
			user: []
		}
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
		getClients() {
			this.$store.dispatch('clients/all')
			.then((res) => {
				this.clients = res;
			})
		},
		fetchUser() {
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
		assignClient() {
			this.$store.dispatch('clients/assign', this.client)
			.then(() => {
				this.$emit('updateChange');
			});
		},

		removeClient(id) {
			this.client.client_id = id;
			this.$store.dispatch('clients/removeClient', this.client)
			.then(() => {
				this.$emit('updateChange');
			});
		}
	}
};
</script>