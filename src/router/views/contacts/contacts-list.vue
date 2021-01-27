<template>
	<Layout>
		<PageHeader :title="title" :items="items" :buttonText="`Create New +`" :buttonAction="`/contacts/create`" />
		<div class="row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-body">
						<div class="table-responsive">
							<table class="table table-centered table-nowrap table-hover">
								<thead class="thead-light">
									<tr>
										<th scope="col" style="width: 70px;">#</th>
										<th scope="col">Name</th>
										<th scope="col">Email</th>
										<th scope="col">Roles</th>
										<th scope="col">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="user in users" :key="user.id">
										<td style="width: 50px;">
											<img src="@/assets/images/users/avatar-1.jpg" class="rounded-circle avatar-xs" alt="" />
										</td>
										<td>
											<h5 class="font-size-14 mb-1">
												<a href="#" class="text-dark">{{user.name}}</a>
											</h5>
										</td>
										<td>{{user.email}}</td>
										<td>
											<div>
												<a
													href="javascript: void(0);"
													class="badge badge-soft-primary font-size-11 m-1"
													v-for="role in user.roles" :key="role.id"
												>{{ role.name }}</a>
											</div>
										</td>
										<td>
											<ul class="list-inline font-size-20 contact-links mb-0">
												<li class="list-inline-item px-2">
													<a v-b-tooltip.hover title="Message (Inactive)">
														<i class="bx bx-message-square-dots"></i>
													</a>
												</li>
												<li class="list-inline-item px-2">
													<a v-b-tooltip.hover title="Profile" href="javascript: void(0);" @click="editUser(user.id)">
														<i class="bx bx-edit"></i>
													</a>
												</li>
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

import { userGridData } from "./data-user";

/**
 * Contacts-list component
 */
export default {
	page: {
		title: "Users List",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { Layout, PageHeader },
	data() {
		return {
			userGridData: userGridData,
			users: [],
			title: "User List",
			items: [
				{
					text: "Contacts",
					href: "/"
				},
				{
					text: "User List",
					active: true
				}
			]
		};
	},
	created() {
		this.$store.dispatch('users/all')
		.then((res) => {
			this.users = res;
		})
	},
	methods: {
		editUser(id) {
			this.$router.push({ name: 'contactEdit', params: { contactId: id } })
		}
	}
};
</script>