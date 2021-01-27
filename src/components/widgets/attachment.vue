<template>
	<div class="card">
        <div class="card-body">
            <h4 class="card-title mb-4">Attached Files</h4>
            <vue-dropzone
              id="dropzone"
              ref="myVueDropzone"
              :use-custom-slot="true"
              :options="dropzoneOptions"
              @vdropzone-complete="afterComplete"
              v-on:vdropzone-sending="sendingEvent">
                <div class="dropzone-custom-content">
                    <i class="display-4 text-muted bx bxs-cloud-upload"></i>
                    <h5>Drop files here or click to upload.</h5>
                </div>
            </vue-dropzone>
            <div class="table-responsive mb-0">
                <table class="table table-nowrap table-centered table-hover">
                    <tbody>
                        <tr v-for="attachment in data" :key="attachment.id">
                            <td style="width: 45px;">
                                <div class="avatar-sm">
                                    <span class="avatar-title rounded-circle bg-soft-primary text-primary font-size-24"
                                    >
                                        <i class="bx bxs-file-doc"></i>
                                    </span>
                                </div>
                            </td>
                            <td>
                                <h5 class="font-size-14 mb-1">
                                    <a href="javascript: void(0);" class="text-dark">{{ attachment.filename }}</a>
                                </h5>
                                <small>Size : {{ attachment.filesize }}</small>
                            </td>
                            <td>
                                <div class="text-center">
                                    <a href="javascript: void(0);" class="text-dark">
                                        <i class="bx bx-download h3 m-0"></i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
    props: {
        data: Array,
        model: Object,
    },
    components: { vueDropzone: vue2Dropzone },
    data() {
        return {
            attachment: {
                model: this.model.type,
                model_id: this.model.id,
            },
            user: {},
            dropzoneOptions: {
                url: `${process.env.VUE_APP_API_BASE_URI}attachments/`,
                thumbnailWidth: 150,
                maxFilesize: 100,
                headers: { 'Authorization':'Bearer ' + localStorage.getItem('token') }
            },
        }
    },
    methods: {
        sendingEvent(file, xhr, formData) {
            formData.append("model_id", this.attachment.model_id);
            formData.append("model", this.attachment.model);
        },

        afterComplete(response) {
            alert(response.status)
            this.$refs.myVueDropzone.removeAllFiles();
            this.$emit('updateChange');
        },
    }
};
</script>