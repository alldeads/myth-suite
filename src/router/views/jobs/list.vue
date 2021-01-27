<template>
  <Layout>
    <PageHeader :title="title" :items="items" :buttonText="`Create New +`" :buttonAction="`/jobs/create`" :buttonExcludeClient='!isAllowed' />
    <div class="row">
      <div class="col-lg-12">
        <div class>
          <div class="table-responsive">
            <table class="table project-list-table table-centered table-borderless">
              <thead>
                <tr>
                  <th scope="col" style="width: 100px">#</th>
                  <th scope="col">Job</th>
                  <th scope="col">Project</th>
                  <th scope="col">Client</th>
                  <th scope="col" v-if="isAllowed">Value</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in activeJobs" :key="job.id">
                  <td>
                    <span class="badge badge-light badge-pill badge-large">{{job.id}}</span>
                  </td>
                  <td>
                    <h5 class="text-truncate font-size-14">
                      <a href="javascript: void(0);" class="text-dark" @click="goToJob(job.id)">{{ job.title }}</a>
                    </h5>
                  </td>
                  <td>
                    <h5 class="text-truncate font-size-14">
                      <a href="javascript: void(0);" class="text-dark" @click="goToProject(job.project.id)">{{job.project.title}}</a>
                    </h5> 
                  </td>
                  <td>{{job.client.company}}</td>
                  <!-- <td><h5 class="text-truncate font-size-14">{{job.quoted|currency}}</h5></td> -->
                  <td v-if="isAllowed"><h5 class="text-truncate font-size-14">{{job.value|currency}}</h5></td>
                  <td>
                    <span
                      class="badge"
                      v-if="job.status_name"
                      :class="{
                        'badge-primary': `${job.status_name}` === 'Quoted',
                        'badge-secondary': `${job.status_name}` === 'Agreed',
                        'badge-warning': `${job.status_name}` === 'In Progress',
                        'badge-success': `${job.status_name}` === 'Completed',
                        'badge-info': `${job.status_name}` === 'To Invoice',
                        'badge-dark': `${job.status_name}` === 'Invoiced',
                        'badge-light': `${job.status_name}` === 'On Hold'
                      }"
                    >{{job.status_name}}</span>
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
 * Projects-list component
 */
export default {
  page: {
    title: "Jobs",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  
  data() {
    return {
      title: "Jobs",
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
      jobs: [],
      isAllowed: false
    }
  },
  created() {
    this.fetchUser();
    this.$store.dispatch('jobs/all')
    .then((res) => { 
      this.jobs = res; 
      })
      .finally(() => { 
        this.loadingState = false; 
      });
  },
  computed: {
    activeJobs() {
      return this.jobs.filter(p => p.completed === 0);
    },
    completedJobs() {
      return this.jobs.filter(p => p.completed === 1);
    }
  },
  methods: {
    goToJob(id) {
      this.$router.push({ name: 'jobView', params: { jobId: id } })
    },
    goToProject(id) {
      this.$router.push({ name: 'projectView', params: { projectId: id } })
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
  }
};
</script>
