<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Create New Client</h4>
                        <form class="mt-5">
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
                                <button type="submit" class="btn btn-primary" @click="addClient">Create Client</button>
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
        title: "Create New Client",
        meta: [{ name: "description", content: appConfig.description }]
    },
    components: { Layout, PageHeader, Multiselect },
    data() {
        return {
            title: "Create New",
            items: [
                {
                    text: "Clients",
                    href: "/"
                },
                {
                    text: "Create New",
                    active: true
                }
            ],
            newClient: {},
            users: []
        };
    },
    created() {
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
        addClient() {
            this.$store.dispatch('clients/store', this.newClient)
            .then(() => {
                this.newClient = {};
                this.$router.go(-1)
            })
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
