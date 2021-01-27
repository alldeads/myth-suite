<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div :class="user.role != 'client' ? 'col-lg-8' : 'col-lg-12'">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-body">
                                <span class="badge"
                                    v-if="currentJob.status_name"
                                    :class="{ 
                                        'badge-primary': `${currentJob.status_name}` === 'Quoted',
                                        'badge-secondary': `${currentJob.status_name}` === 'Agreed',
                                        'badge-warning': `${currentJob.status_name}` === 'In Progress',
                                        'badge-success': `${currentJob.status_name}` === 'Completed',
                                        'badge-info': `${currentJob.status_name}` === 'To Invoice',
                                        'badge-dark': `${currentJob.status_name}` === 'Invoiced',
                                        'badge-light': `${currentJob.status_name}` === 'On Hold'
                                    }">{{currentJob.status_name}}
                                </span>
                                <p>&nbsp;</p>
                                <div class="media">
                                    <!-- <img src="@/assets/images/companies/img-1.png" alt class="avatar-sm mr-4" /> -->
                                    <div class="media-body overflow-hidden">
                                        <h5 class="text-truncate font-size-34">{{ currentJob.title }}</h5>
                                        <p class="text-muted">{{ currentJob.description }}</p>
                                    </div>
                                    <div class="text-right mr-3">
                                        <button class="btn btn-primary" @click="editJob(currentJob.id)" v-if="isAllowed">Edit Job</button>
                                    </div>
                                    <div class="text-right">
                                        <button class="btn btn-outline-info" @click="goToProject(currentJob.project.id)"> View Project</button>
                                    </div>
                                </div>
                                <h5 class="font-size-15 mt-4">Job Details</h5>
                                <p class="text-muted">{{ currentJob.details }}</p>

                                <div class="row" v-if="user.role == 'administrator' && currentJob.quoted != 0">
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-money mr-1 text-primary"></i> Quoted
                                            </h5>
                                            <p class="text-muted font-size-18 mb-0">{{ currentJob.currency }}{{ currentJob.filtered_quoted }}</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-money mr-1 text-primary"></i> Value
                                            </h5>
                                            <p class="text-muted font-size-18 mb-0">{{ currentJob.currency }}{{ currentJob.filtered_value }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="row task-dates">
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-calendar mr-1 text-primary"></i> Start Date
                                            </h5>
                                            <p class="text-muted mb-0">{{ currentJob.start_date | moment("MMMM D, YYYY") }}</p>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-calendar-check mr-1 text-primary"></i> Due Date
                                            </h5>
                                            <p class="text-muted mb-0">{{ currentJob.due_date | moment("MMMM D, YYYY") }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <myth-update 
                            :data="currentJob.updates" 
                            :model="model" 
                            :attach='true'
                            @updateChange="fetchJob">
                        </myth-update>
                        
                        <myth-tracker v-if="user.role != 'client'" :data="trackers" :model="model" @updateChange="fetchUserTracker"></myth-tracker>
                    </div>
                </div>
            </div>
            <!-- end col -->

            <div class="col-lg-4" v-if="user.role != 'client'">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Time Tracker</h4>
                        <myth-tracker-timer :data="trackers" :model="model" @updateChange="fetchUserTracker"></myth-tracker-timer>
                    </div>
                </div>

                <myth-member :data="currentJob.users" :model="model" @updateChange="fetchJob"></myth-member>

                <myth-client :data="currentJob.client" :model="model" @updateChange="fetchJob"></myth-client>

                <myth-attachment :data="currentJob.attachments" :model="model" @updateChange="fetchJob"></myth-attachment>

                <myth-logs :data="currentJob.logs"></myth-logs>
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
import mythUpdate from "@/components/widgets/updates";
import mythAttachment from "@/components/widgets/attachment";
import mythLogs from "@/components/widgets/logs";
import mythMember from "@/components/widgets/assign-member";
import mythTracker from "@/components/widgets/tracker";
import mythTrackerTimer from "@/components/widgets/tracker-timer";

/**
 * Projects-overview component
 */
export default { 
    page: {
        title: "Job Overview",
        meta: [{ name: "description", content: appConfig.description }]
    }, 
    components: { Layout, PageHeader, mythMember, mythClient, mythUpdate, mythAttachment, mythLogs, mythTracker, mythTrackerTimer },
    data() {
        return {
            isVisible: false,
            trackers: [],
            isAllowed: false,
            model: {
                id: null,
                type: "Job"
            },
            currentJob: {},
            title: "Job",
            user: [],
            items: [
                {
                    text: "Jobs",
                    href: "/"
                },
                {
                    text: "Job Overview",
                    active: true
                }
            ],
        };
    },
    created() {
        this.fetchJob();
        this.fetchUser();
        this.fetchUserTracker();
    },
    methods: {
        fetchJob() {
            const { jobId } = this.$route.params;

            this.model.id = jobId;

            if(!jobId) this.$router.push({ name: 'jobList' });

            this.$store.dispatch('jobs/get', jobId)
            .then((res) => { this.currentJob = res })
            .catch(() => this.$router.push({ name: 'jobList' }))
            .finally(() => { this.loadingState = false })
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

        editJob(id) {
            this.$router.push({ name: 'jobEdit', params: { jobId: id } })
        },

        goToProject(id) {
            this.$router.push({ name: 'projectView', params: { projectId: id } })
        },
    }
};
</script>