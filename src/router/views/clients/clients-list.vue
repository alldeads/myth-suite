<template>
    <Layout>
        <PageHeader :title="title" :items="items" :buttonText="`Create New +`" :buttonAction="`/clients/create`" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-centered table-nowrap table-hover">
                                <thead class="thead-light">
                                    <tr>
                                        <th scope="col" style="width: 70px;">#</th>
                                        <th scope="col">Company</th>
                                        <th scope="col">Projects</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="client in clients" :key="client.id">
                                        <td>
                                            <div>
                                                <img class="rounded-circle avatar-xs" :src="`${client.logo}`" alt />
                                            </div>
                                        </td>
                                        <td>
                                            <a class="text-dark" href="javascript: void(0);" @click="goToClient(client.id)">
                                                {{client.company}}
                                            </a>
                                        </td>
                                        <td>{{client.project_count}}</td>
                                        <td>
                                            <ul class="list-inline font-size-20 contact-links mb-0">
                                                <li class="list-inline-item px-2">
                                                    <a v-b-tooltip.hover title="Edit Client" href="javascript: void(0);" @click="editClient(client.id)">
                                                        <i class="bx bx-edit"></i> 
                                                    </a>
                                                </li>
                                                <li class="list-inline-item px-2">
                                                    <a v-b-tooltip.hover title="Profile" href="javascript: void(0);" @click="goToClient(client.id)">
                                                        <i class="bx bx-user-circle"></i>
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
 * Clients-list component
 */
export default {
    page: {
        title: "Client List",
        meta: [{ name: "description", content: appConfig.description }]
    },
    components: { Layout, PageHeader },
    data() {
        return {
            userGridData: userGridData,
            title: "Client List",
            items: [
                {
                    text: "Clients",
                    href: "/"
                },
                {
                    text: "Client List",
                    active: true
                }
            ],
            clients: []
        };
    },
    created() {
        this.$store.dispatch('clients/all')
        .then((res) => { 
            this.clients = res; 
        })
        .finally(() => { 
            this.loadingState = false; 
        });
    },

    methods: {
        editClient(id) {
            this.$router.push({ name: 'clientEdit', params: { clientId: id } })
        },
        goToClient(id) {
            this.$router.push({ name: 'clientProfile', params: { clientId: id } })
        }
    }
};
</script>