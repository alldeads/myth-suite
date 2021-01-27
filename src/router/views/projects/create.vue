<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Create New Project</h4>
                        <form>
                            <div class="form-group row mb-4">
                                <label for="projectname" class="col-form-label col-lg-2">Project Name</label>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="newProject.title"
                                        placeholder="Enter Project Name..."
                                    />
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="projectdetails" class="col-form-label col-lg-2">Project Subtitle</label>
                                <div class="col-lg-10">
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="newProject.details"
                                        placeholder="Enter Project Subtitle..."
                                    />
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="projectdesc" class="col-form-label col-lg-2">Project Description</label>
                                <div class="col-lg-10">
                                    <textarea
                                        class="form-control"
                                        rows="3"
                                        v-model="newProject.description"
                                        placeholder="Enter Project Description...">        
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="projectname" class="col-form-label col-lg-2">Client</label>
                                <div class="col-lg-10"> 
                                    <multiselect v-model="newProject.client" :options="mappedClients" label="label" track-by="id" :searchable="true">
                                    </multiselect>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label class="col-form-label col-lg-2">Project Date</label>
                                <div class="col-lg-10">
                                    <date-picker v-model="newProject.dates" range append-to-body lang="en" confirm>
                                    </date-picker>
                                </div>
                            </div>
                            <div class="form-group row mb-4">
                                <label for="projectbudget" class="col-form-label col-lg-2">Budget</label>
                                <div class="col-lg-10">
                                    <input
                                        type="number"
                                        v-model="newProject.value"
                                        placeholder="Enter Project Budget..."
                                        class="form-control"
                                    />
                                </div>
                            </div>
                        </form>
                        <div class="row mb-4">
                            <label class="col-form-label col-lg-2">Attached Files</label>
                            <div class="col-lg-10">
                                <vue-dropzone
                                  id="dropzone"
                                  ref="myVueDropzone"
                                  :use-custom-slot="true"
                                  :options="dropzoneOptions"
                                  @vdropzone-complete="afterComplete"
                                  @vdropzone-success-multiple="multipleComplete"
                                  v-on:vdropzone-sending="sendingEvent">
                                    <div class="dropzone-custom-content">
                                        <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                                        <h4>Drop files here or click to upload.</h4>
                                    </div>
                                </vue-dropzone>
                            </div>
                        </div>
                        <div class="row justify-content-end">
                            <div class="col-lg-10">
                                <button type="submit" class="btn btn-primary" @click="addProject">Create Project</button>
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
import vue2Dropzone from "vue2-dropzone";
import DatePicker from "vue2-datepicker";
import Multiselect from "vue-multiselect";

import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";

/**
 * Projects-create component
 */
export default {
    page: {
        title: "Create New Project",
        meta: [{ name: "description", content: appConfig.description }]
    },
    components: { vueDropzone: vue2Dropzone, DatePicker, Layout, PageHeader, Multiselect },
    data() {
        return {
            title: "Create New",
            items: [
                {
                    text: "Projects",
                    href: "/"
                },
                {
                    text: "Create New",
                    active: true
                }
            ],
            dropzoneOptions: {
                url: `${process.env.VUE_APP_API_BASE_URI}projects`,
                thumbnailWidth: 150,
                maxFilesize: 10000,
                maxFiles: 5,
                autoProcessQueue: false,
                uploadMultiple: true,
                headers: { 'Authorization':'Bearer ' + localStorage.getItem('token') }
            },
            clients: [],
            newProject: {}
        };
    },
    created() {
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
        sendingEvent(file, xhr, formData) {
            formData.append("title", this.newProject.title);
            formData.append("details", this.newProject.details);
            formData.append("description", this.newProject.description);
            formData.append("client", this.newProject.client.id);
            formData.append("value", this.newProject.value);
            formData.append("dates", this.newProject.dates);
        },

        afterComplete() {
            this.$refs.myVueDropzone.removeAllFiles();
            this.newProject = {};
        },

        multipleComplete(response) {
            this.$refs.myVueDropzone.removeAllFiles();
     
            if ( response !== undefined ) {
                alert(response)
            }
            this.newProject = {};
        },

        addProject() {
            let files = this.$refs.myVueDropzone.getQueuedFiles().length;
            
            if ( files > 0 ) {
                this.$refs.myVueDropzone.processQueue();
            } else {
                this.$store.dispatch('projects/store', this.newProject)
                .then(() => {
                    this.newProject = {};
                    this.$router.go(-1)
                })
            }
        },

        getClients() {
            this.$store.dispatch('clients/all')
            .then((res) => {
                this.clients = res;
            })
        }
    }
};
</script>
