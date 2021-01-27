<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-md-12 col-lg-12 col-sm-12 col-12">
					<h4 class="card-title mb-4">Team Members</h4>
				</div>
			</div>
			<div class="row">
				<div class="col-md-9 col-lg-9 col-sm-12 col-12">
					<multiselect v-model="member.user_id" :options="mappedMembers" label="label" track-by="id" :searchable="true"></multiselect>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-12">
					<button class="btn btn-primary" @click="assignMember">Assign</button>
				</div>
			</div>

			<div class="table-responsive mt-3">
				<table class="table table-centered">
					<tbody>
						<tr v-for="user in data" :key="user.id">
							<td style="width: 50px;">
								<img :src="user.avatar" class="rounded-circle avatar-xs" alt="" />
							</td>
							<td>
								<h5 class="font-size-14 m-0">
									<a href class="text-dark">{{ user.name }}</a>
								</h5>
							</td>
							<td>
								<div>
									<a href="javascript: void(0);" class="badge badge-info font-size-11">Member</a>
								</div>
							</td>
							<td v-if="user.role == 'administrator'">
								<a href="javascript: void(0);" class="btn btn-danger"><i class="fa fa-minus" title="Remove"></i></a>
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
		data: Array,
		model: Object,
	},
	components: { Multiselect },
	data() {
		return {
			isAllowed: true,
			member: {
				model: this.model.type,
				model_id: this.model.id,
				user_id: null
			},
			clients: [],
			user: [],
			users: [],
		}
	},
	created() {
		this.fetchUser();
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
		getUsers() {
			this.$store.dispatch('users/members')
				.then((res) => { 
				this.users = res; 
			})
			.finally(() => { 
				this.loadingState = false; 
			});
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
		assignMember() {
			this.$store.dispatch('users/assign', this.member)
			.then(() => {
				this.$emit('updateChange');
			});
		},
	}
};
</script>