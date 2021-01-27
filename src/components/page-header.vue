<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-flex align-items-center justify-content-between">
        <h4 class="mb-0 font-size-18">{{ title }}</h4>

        <div class="page-title-right">
          <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>
          <router-link v-if="buttonText && !buttonExcludeClient" class="btn btn-primary w-md ml-5" :to="buttonAction">{{ buttonText }}</router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    buttonText: {
      type: String,
      default: '',
    },
    buttonAction: {
      type: String,
      default: '',
    },
    buttonExcludeClient: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}
</script>
