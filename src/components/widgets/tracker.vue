<template>
	<div class="card">
		<div class="card-body">
			<h4 class="card-title mb-4">Time Logs</h4>

			<div class="row justify-content-center m-auto">
				<div class="col-2 border-bottom">
					<p>User</p>
				</div>
				<div class="col-2 border-bottom">
					<p>Start</p>
				</div>
				<div class="col-2 border-bottom">
					<p>End</p>
				</div>
				<div class="col-3 border-bottom">
					<p>Time Tracked</p>
				</div>
				<div class="col-3 border-bottom">
					<p>Action</p>
				</div>
			</div>

			<div v-for="tracker in data" :key="tracker.id" class="row justify-content-center mt-4">
				<div class="col-2 border-bottom">
					<p>{{ tracker.user_name }}</p>
				</div>
				<div class="col-2 border-bottom">
					<p>{{ tracker.start_time | moment("MM/DD/YYYY, h:mm:ss a") }}</p>
				</div>
				<div class="col-2 border-bottom">
					<p>{{ tracker.end_time | moment("MM/DD/YYYY, h:mm:ss a") }}</p>
				</div>
				<div class="col-3 border-bottom">
					<p>{{ tracker.duration }}</p>
				</div>
				<div class="col-3 border-bottom">
					<b-button v-b-toggle="`${tracker.id}`" variant="primary">
						<i class='bx bx-chevron-left px-2'></i>
					</b-button>
				</div>

				<div class="col-12">
					<b-collapse :id="`${tracker.id}`" class="mt-2">
						<b-card>
							<myth-update 
								:data="tracker.updates" 
								:id="tracker.id"
								:title="title"
								:model="trackers" 
								@updateChange="updateChange">
							</myth-update>
						</b-card>
					</b-collapse>
				</div>
			</div>
			<!-- <table class="table table-striped w-100 mt-3">
				<thead>
					<tr>
						<th>User</th>
						<th>Start</th>
						<th>End</th>
						<th>Time Tracked</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="tracker in data" :key="tracker.id">
						<td>{{ tracker.user_name }}</td>
						<td>{{ tracker.start_time | moment("MMMM DD, YYYY, h:mm:ss a") }}</td>
						<td>{{ tracker.end_time | moment("MMMM DD, YYYY, h:mm:ss a") }}</td>
						<td>{{ tracker.duration }}</td>
						<td class="tracker-icon" style='white-space: nowrap;'>
							<b-button v-b-toggle="`${tracker.id}`" variant="primary">
								<i class='bx bx-chevron-left px-2'></i>
							</b-button>
						</td>
						<br>
						
					</tr>
				</tbody>
			</table> -->
		</div>
	</div>
</template>

<script>
	/**
 * Projects-overview component
 */
import mythUpdate from "@/components/widgets/updates";
export default {
	props: {
		data: Array,
		model: Object,
	},
	components: { mythUpdate },
	data() {
		return {
			title: "Notes",
			trackers: {
                id: null,
                type: "Tracker"
            },
		};
	},
	methods: {
		updateChange() {
			this.$emit('updateChange')
		}
	}
};
</script>

<style type="text/css">
	.tracker-icon {
		font-size: 18px;
	}
</style>