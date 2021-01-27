<template>
	<Layout>
		<PageHeader :title="title" :items="items" />
		<div class="row">
			<div :class="!isAllowed ? 'col-lg-12' : 'col-lg-8'">
				<div class="row">
					<div class="col-lg-12">
						<div class="card"> 
							<div class="card-body">
								<span class="badge badge-danger text-capitalize">
									{{ currentTicket.level }}
								</span>
								<span class="badge badge-primary ml-3 text-capitalize">
									{{ currentTicket.status }}
								</span> 
								<p>&nbsp;</p>
								<div class="media">
									<!-- <img src="@/assets/images/companies/img-1.png" alt class="avatar-sm mr-4" /> -->
									<div class="media-body overflow-hidden">
										<h3 class="font-size-15 mt-4">Ticket</h3>
										<h5 class="text-truncate font-size-34">{{ currentTicket.subject }}</h5>
									</div>
								</div>
								<h5 class="font-size-15 mt-4">Details</h5>
								<p class="text-muted">{{ currentTicket.description }}</p>

								<div class="row task-dates">
									<div class="col-lg-4 col-md-6 col-sm-6">
										<div class="mt-4">
											<h5 class="font-size-14">
												<i class="bx bx-calendar mr-1 text-primary"></i> Created Date
											</h5>
											<p class="text-muted mb-0">{{ currentTicket.start_date | moment("MMMM D, YYYY") }}</p>
										</div>
									</div>

									<div class="col-lg-4 col-md-6 col-sm-6">
										<div class="mt-4">
											<h5 class="font-size-14">
												<i class="bx bx-calendar-check mr-1 text-primary"></i> Last Updated Date
											</h5>
											<p class="text-muted mb-0">{{ currentTicket.last_updated_date | moment("MMMM D, YYYY") }}</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						<myth-update 
								:data="currentTicket.updates" 
								:model="model" 
								:attach='true'
								@updateChange="fetchTicket">
						</myth-update>
						
						<myth-tracker v-show="isAllowed" :data="trackers" :model="model" @updateChange="fetchUserTracker"></myth-tracker>
					</div>
				</div>
			</div>
			<!-- end col -->

			<div class="col-lg-4" v-show="isAllowed">
				<div class="card">
						<div class="card-body">
								<h4 class="card-title mb-4">Time Tracker</h4>
								<myth-tracker-timer :data="trackers" :model="model" @updateChange="fetchUserTracker"></myth-tracker-timer>
						</div>
				</div>
				
				<div class="card" v-show="isAllowed">
					<div class="card-body">
						<div class="row">
							<div class="col-md-12 col-lg-12 col-sm-12 col-12">
								<h4 class="card-title mb-4">Status</h4>
							</div>
						</div>
						<div class="row">
							<div class="col-md-9 col-lg-9 col-sm-12 col-12 mb-2">
								<select class="form-control" v-model="currentTicket.status">
									<option value="for review"> For Review</option>
									<option value="in progress"> In Progress</option>
									<option value="on hold"> On Hold</option>
									<option value="completed"> Completed</option>
								</select>
							</div>
							<div class="col-md-3 col-lg-3 col-sm-12 col-12">
								<button class="btn btn-danger" @click="changeStatus()"> Save</button>
							</div>
						</div>
					</div>
				</div>
				
				<myth-member :data="currentTicket.users" :model="model" @updateChange="fetchTicket"></myth-member>
				<myth-client v-show="isAllowed" :data="currentTicket.client" :model="model" @updateChange="fetchTicket"></myth-client>
				<myth-attachment :data="currentTicket.attachments" :model="model" @updateChange="fetchTicket"></myth-attachment>
			</div>
			<!-- end col -->
		</div>
		<!-- end row -->
	</Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import mythClient from "@/components/widgets/assign-client";
import mythAttachment from "@/components/widgets/attachment";
import mythMember from "@/components/widgets/assign-member";
import mythUpdate from "@/components/widgets/updates";
import mythTracker from "@/components/widgets/tracker";
import mythTrackerTimer from "@/components/widgets/tracker-timer";

/**
 * Projects-overview component
 */
export default { 
	page: {
		title: "Ticket Overview",
		meta: [{ name: "description", content: appConfig.description }]
	}, 
	components: { mythUpdate, Layout, PageHeader, mythAttachment, mythClient, mythMember, mythTracker, mythTrackerTimer },
	data() {
		return {
			model: {
                id: null,
                type: "Ticket"
            },
			isVisible: false,
			isAllowed: false,
			trackers: [],
			currentTicket: {},
			title: "Ticket",
			items: [
				{
					text: "Tickets",
					href: "/"
				},
				{
					text: "Ticket Overview",
					active: true
				}
			],
		};
	},
	created() {
		this.fetchTicket();
		this.fetchUser();
		this.fetchUserTracker();
	},
	methods: {
		fetchTicket() {
			const { ticketId } = this.$route.params;

			this.model.id = ticketId;

			if(!ticketId) this.$router.push({ name: 'ticketList' });

			this.$store.dispatch('tickets/get', ticketId)
			.then((res) => { 
				this.currentTicket = res;
				this.currentTicket.ticket_id = res.id;
			})
			.catch(() => this.$router.push({ name: 'projectList' }))
			.finally(() => { this.loadingState = false })
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

        fetchUserTracker() {
            let data = {};

            data.model_id = this.model.id;
            data.model = this.model.type;

            this.$store.dispatch('tracker/me', data)
            .then((res) => { 
                this.trackers = res;
            })
            .finally(() => { 
                this.loadingState = false; 
            });
        },

		changeStatus() {
			this.$store.dispatch('tickets/status', this.currentTicket)
			.then(() => {
				this.fetchTicket();
			});
		}
	}
};
</script>