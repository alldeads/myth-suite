<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-xl-4">
                <div class="card overflow-hidden">
                    <div class="bg-primary">
                        <div class="row">
                            <div class="col-7">
                                <div class="text-primary p-3">
                                    <h5 class="text-dark">{{ client.name }}</h5>
                                    <p class="text-muted">{{ client.company }}</p>
                                </div>
                            </div>
                            <div class="col-5 align-self-end">
                                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex mb-4 align-items-center justify-content-between">
                            <h4 class="card-title">Personal Information</h4>
                            <button class="btn btn-primary" @click="editClient(client.id)"> Edit Information</button>
                        </div>

                        <div class="table-responsive mb-0">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <th scope="row">Company:</th>
                                        <td>{{ client.company }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status:</th>
                                        <td style="text-transform: capitalize;">{{ client.status }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Primary Person:</th>
                                        <td>{{ client.name }}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Primary Email:</th>
                                        <td>{{ client.email }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <!-- end card -->

                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">My Projects</h4>
                        <div class="table-responsive mb-0">
                            <table class="table table-nowrap table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Projects</th>
                                        <th scope="col">Start Date</th>
                                        <th scope="col">Deadline</th>
                                        <th scope="col">Budget</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="project in client.projects" :key="project.id">
                                        <th scope="row">{{ project.id }}</th>
                                        <td>{{ project.title }}</td>
                                        <td>{{ project.start_date | moment("MMMM D, YYYY") }}</td>
                                        <td>{{ project.due_date | moment("MMMM D, YYYY") }}</td>
                                        <td>{{ project.value }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-xl-8">
                <div class="row">
                    <div v-for="stat of statData" :key="stat.icon" class="col-md-4">
                        <Stat :icon="stat.icon" :title="stat.title" :value="stat.value" />
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-5">Client Updates</h4>
                        <div>
                            <ul class="verti-timeline list-unstyled">
                                <li class="event-list active">
                                    <div class="event-timeline-dot">
                                        <i class="bx bx-right-arrow-circle bx-fade-right"></i>
                                    </div>
                                    <div class="media">
                                        <div class="mr-3">
                                            <i class="bx bx-server h4 text-primary"></i>
                                        </div>
                                        <div class="media-body">
                                            <div>
                                                <h5 class="font-size-15">
                                                    <a href="javascript: void(0);" class="text-dark">Back end Developer</a>
                                                </h5>
                                                <span class="text-primary">2016 - 19</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="event-list">
                                    <div class="event-timeline-dot">
                                        <i class="bx bx-right-arrow-circle"></i>
                                    </div>
                                    <div class="media">
                                        <div class="mr-3">
                                            <i class="bx bx-code h4 text-primary"></i>
                                        </div>
                                        <div class="media-body">
                                            <div>
                                                <h5 class="font-size-15">
                                                    <a href="javascript: void(0);" class="text-dark">Front end Developer</a>
                                                </h5>
                                                <span class="text-primary">2013 - 16</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="event-list">
                                    <div class="event-timeline-dot">
                                        <i class="bx bx-right-arrow-circle"></i>
                                    </div>
                                    <div class="media">
                                        <div class="mr-3">
                                            <i class="bx bx-edit h4 text-primary"></i>
                                        </div>
                                        <div class="media-body">
                                            <div>
                                                <h5 class="font-size-15">
                                                    <a href="javascript: void(0);" class="text-dark">UI /UX Designer</a>
                                                </h5>
                                                <span class="text-primary">2011 - 13</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- end card -->
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Active Work</h4>
                        <div id="revenue-chart" class="apex-charts"></div>
                        <apexchart
                          class="apex-charts"
                          type="bar"
                          height="300"
                          :series="revenueChart.series"
                          :options="revenueChart.chartOptions">
                        </apexchart>
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

import { revenueChart } from "./data-profile";
import Stat from "@/components/widgets/stat";

/**
 * Contacts-Profile component
 */
export default {
    page: {
        title: "Profile",
        meta: [{ name: "description", content: appConfig.description }]
    },
    components: { Layout, PageHeader, Stat },
    data() {
        return {
            revenueChart: revenueChart,
            title: "Client",
            items: [
                {
                    text: "Contacts",
                    href: "/"
                },
                {
                    text: "Profile",
                    active: true
                }
            ],
            statData: [
                {
                    icon: "bx bx-check-circle",
                    title: "Completed Work",
                    value: "125"
                },
                {
                    icon: "bx bx-hourglass",
                    title: "Active Work",
                    value: "12"
                },
                {
                    icon: "bx bx-package",
                    title: "Total Revenue (est)",
                    value: "£36,524"
                }
            ],
            client: {}
        };
    },
    created() {
        this.fetchClient();
    },
    methods: {
        fetchClient() {
            const { clientId } = this.$route.params;

            if(!clientId) this.$router.push({ name: 'client/list' });

            this.$store.dispatch('clients/get', clientId)
            .then((res) => { this.client = res })
            .catch(() => this.$router.push({ name: 'client/list' }))
            .finally(() => { this.loadingState = false })
        },

        editClient(id) {
            this.$router.push({ name: 'clientEdit', params: { clientId: id } })
        }
    }
};
</script>