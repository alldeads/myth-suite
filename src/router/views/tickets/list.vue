<template>
	<Layout>
		<PageHeader :title="title" :items="items" :buttonText="`Create New +`" :buttonAction="`/tickets/create`" />
		<div class="row">
			<div class="col-lg-12">
				<div class="table-responsive">
					<table class="table project-list-table table-centered table-borderless">
						<thead>
							<tr>
								<th scope="col" style="width: 100px">#</th>
								<th scope="col">Ticket</th>
								<th scope="col">Description</th>
								<th v-if="user.role != 'client'" scope="col">Client</th>
								<th scope="col">Status</th>
								<th scope="col">Level</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="ticket in tickets" :key="ticket.id">
								<td>
									<span class="badge badge-light badge-pill badge-large">{{ticket.ref}}</span>
								</td>
								<td>
									<h5 class="text-truncate font-size-14">
										<a href="javascript: void(0);" class="text-dark" @click="goToTicket(ticket.id)">{{ ticket.subject }}</a>
									</h5>
								</td>
								<td>
									<h5 class="text-truncate font-size-14">
										<a href="javascript: void(0);" class="text-dark">{{ticket.short_description}}</a>
									</h5> 
								</td>
								<td v-if="user.role != 'client'">
									<a href="javascript: void(0);" class="text-dark" @click="goToClient(ticket.client.id)">{{ticket.client.company}}</a>
								</td>
								<td>
									<span class="badge text-capitalize" v-if="ticket.status" 
										:class="{ 'badge-success': `${ticket.status}` === 'completed',
										'badge-primary': `${ticket.status}` === 'in progress',
										'badge-warning': `${ticket.status}` === 'for review' }">
										{{ticket.status}}
									</span>
								</td>
								<td>
									<span class="badge text-capitalize" v-if="ticket.level" 
										:class="{ 
										'badge-primary': `${ticket.level}` === 'low',
										'badge-success': `${ticket.level}` === 'medium',
										'badge-warning': `${ticket.level}` === 'high',
										'badge-danger': `${ticket.level}` === 'critical' }">
										{{ticket.level}}
									</span>
								</td>
							</tr>
						</tbody>
					</table>
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
 * Tickets-list component
 */
export default {
	page: {
		title: "Tickets",
		meta: [{ name: "description", content: appConfig.description }]
	},
	components: { Layout, PageHeader },
  
	data() {
		return {
			title: "Tickets",
			user: [],
			items: [
				{
					text: "Tickets",
					href: "/"
				},
				{
					text: "Tickets Overview",
					active: true
				}
			],
			tickets: []
		}
	},
	created() {
		this.fetchTickets();
		this.fetchUser();
	},
	methods: {
		fetchTickets() {
			this.$store.dispatch('tickets/all')
			.then((res) => { 
				this.tickets = res;
			})
			.finally(() => { 
				this.loadingState = false; 
			});
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
		goToTicket(id) {
			this.$router.push({ name: 'ticketView', params: { ticketId: id } })
		},
		goToClient(id) {
			this.$router.push({ name: 'clientProfile', params: { clientId: id } })
		}
	}
};
</script>
