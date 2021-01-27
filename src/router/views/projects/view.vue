<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div :class="isAllowed ? 'col-lg-8' : 'col-lg-12'">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card"> 
                            <div class="card-body">
                                <span class="badge"
                                    v-if="currentProject.status_name"
                                    :class="{ 
                                        'badge-primary': `${currentProject.status_name}` === 'Quoted',
                                        'badge-secondary': `${currentProject.status_name}` === 'Agreed',
                                        'badge-warning': `${currentProject.status_name}` === 'In Progress',
                                        'badge-success': `${currentProject.status_name}` === 'Completed',
                                        'badge-info': `${currentProject.status_name}` === 'To Invoice',
                                        'badge-dark': `${currentProject.status_name}` === 'Invoiced',
                                        'badge-light': `${currentProject.status_name}` === 'On Hold'
                                    }">{{currentProject.status_name}}
                                </span>
                                <p>&nbsp;</p>
                                <div class="media">
                                    <div class="media-body overflow-hidden">
                                        <h5 class="text-truncate font-size-34">{{ currentProject.title }}</h5>
                                        <p class="text-muted">{{ currentProject.description }}</p>
                                    </div>
                                    <div class="text-right">
                                        <button class="btn btn-primary" @click="editProject(currentProject.id)" v-if="isAllowed"> Edit Project</button>
                                    </div>
                                </div>
                                <h5 class="font-size-15 mt-4">Project Details</h5>
                                <p class="text-muted">{{ currentProject.details }}</p>

                                <div class="row" v-show="isAllowed">
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-money mr-1 text-primary"></i> Quoted
                                            </h5>
                                            <p class="text-muted font-size-18 mb-0">{{ currentProject.currency }}{{ currentProject.filtered_quoted }}</p>
                                        </div>
                                    </div>
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-money mr-1 text-primary"></i> Value
                                            </h5>
                                            <p class="text-muted font-size-18 mb-0">{{ currentProject.currency }}{{ currentProject.filtered_value }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="row task-dates">
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-calendar mr-1 text-primary"></i> Start Date
                                            </h5>
                                            <p class="text-muted mb-0" v-if="currentProject.start_date">
                                                {{ currentProject.start_date | moment("MMMM D, YYYY") }}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="col-lg-4 col-md-6 col-sm-6">
                                        <div class="mt-4">
                                            <h5 class="font-size-14">
                                                <i class="bx bx-calendar-check mr-1 text-primary"></i> Due Date
                                            </h5>
                                            <p class="text-muted mb-0" v-if="currentProject.due_date">
                                                {{ currentProject.due_date | moment("MMMM D, YYYY") }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title mb-4">Linked Jobs</h4>
                                <div class="table-responsive">
                                    <table class="table table-centered">
                                        <thead>
                                            <tr>
                                                <th scope="col" style="width: 100px">#</th>
                                                <th scope="col">Job</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Team</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="job in currentProject.jobs" :key="job.id">
                                                <td>
                                                    <span class="badge badge-light badge-pill badge-large">{{ job.id }}</span>
                                                </td>
                                                <td>
                                                    <h5 class="text-truncate font-size-14">
                                                        <a href="javascript: void(0);" class="text-dark" @click="goToJob(job.id)">{{job.title}}</a>
                                                    </h5>
                                                </td>
                                                <td>
                                                    <span class="badge"
                                                        :class="{ 
                                                            'badge-primary': `${job.status_name}` === 'Quoted',
                                                            'badge-secondary': `${job.status_name}` === 'Agreed',
                                                            'badge-warning': `${job.status_name}` === 'In Progress',
                                                            'badge-success': `${job.status_name}` === 'Completed',
                                                            'badge-info': `${job.status_name}` === 'To Invoice',
                                                            'badge-dark': `${job.status_name}` === 'Invoiced',
                                                            'badge-light': `${job.status_name}` === 'On Hold'
                                                        }">{{job.status_name}}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div class="team">
                                                        <a href="javascript: void(0);" class="team-member d-inline-block">
                                                            <img :src="`${job.client.logo}`" class="rounded-circle avatar-xs m-1" alt />
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
            
                        <myth-update 
                            :data="currentProject.updates" 
                            :model="model" 
                            :attach='true'
                            @updateChange="fetchProject">
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

                <myth-member :data="currentProject.users" :model="model" @updateChange="fetchProject"></myth-member>

                <myth-client :data="currentProject.client" :model="model" @updateChange="fetchProject"></myth-client>

                <myth-attachment :data="currentProject.attachments" :model="model" @updateChange="fetchProject"></myth-attachment>

                <myth-logs :data="currentProject.logs"></myth-logs>
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
import mythUpdate from "@/components/widgets/updates";
import mythLogs from "@/components/widgets/logs";
import mythAttachment from "@/components/widgets/attachment";
import mythClient from "@/components/widgets/assign-client";
import mythMember from "@/components/widgets/assign-member";
import mythTracker from "@/components/widgets/tracker";
import mythTrackerTimer from "@/components/widgets/tracker-timer";

/**
 * Projects-overview component
 */
export default { 
    page: {
        title: "Project Overview",
        meta: [{ name: "description", content: appConfig.description }]
    }, 
    components: { Layout, PageHeader, mythUpdate, mythLogs, mythAttachment, mythClient, mythMember, mythTracker, mythTrackerTimer },
    data() {
        return {
            model: {
                id: null,
                type: "Project"
            },
            isAllowed: false,
            currentProject: {
                client: {}
            },
            user: [],
            clients: [],
            trackers:[],
            title: "Project",
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
        };
    },
    created() {
        this.fetchProject();
        this.fetchUser();
        this.fetchUserTracker();
    },
    methods: {
        fetchProject() {
            const { projectId } = this.$route.params;
            
            this.model.id = projectId;

            if(!projectId) this.$router.push({ name: 'projectList' });

            this.$store.dispatch('projects/get', projectId)
            .then((res) => { this.currentProject = res })
            .catch(() => this.$router.push({ name: 'projectList' }))
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

        goToJob(id) {
            this.$router.push({ name: 'jobView', params: { jobId: id } })
        },

        goToEditJob(id) {
            this.$router.push({ name: 'jobEdit', params: { jobId: id } })
        },

        editProject(id) {
            this.$router.push({ name: 'projectEdit', params: { projectId: id } })
        },
    }
};
</script>