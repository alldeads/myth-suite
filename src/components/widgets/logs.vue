<template>
	<div class="card">
        <div class="card-body">
            <h4 class="card-title mb-4"> Logs</h4>

            <ul class="verti-timeline list-unstyled">
                <li v-for="(plog, index) in data" :key="plog.id" class="event-list active">
                    <div class="event-timeline-dot">
                        <i v-if="index == 0" class="bx bxs-right-arrow-circle font-size-18 bx-fade-right"></i>
                        <i v-else class="bx bxs-right-arrow-circle font-size-18"></i>
                    </div>
                    <div class="media"> 
                        <div class="mr-3">
                            <h5 class="font-size-14">
                                {{ plog.created_at | moment("from", "now") }}
                                <i class="bx bx-right-arrow-alt font-size-16 text-primary align-middle ml-2"></i>
                            </h5>
                        </div>
                        <div class="media-body">
                            <div>{{ plog.description }}</div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="text-center mt-4">
                <a href="javascript: void(0);" class="btn btn-primary btn-sm">Load More</a>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
    props: {
        data: Array,
    },
    data() {
        return {
            isVisible: false,
        }
    },
};
</script>