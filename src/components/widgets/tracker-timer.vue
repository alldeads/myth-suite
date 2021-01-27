<template>
	<div class="time-tracker">
		<!-- <h2 v-for="(timer, index) in incompleteTimer" :key="index">{{ timer.created_at|moment('HH:mm:ss') }} <br /> {{ currentTimestamp }}</h2> -->
		<h2 v-if="incompleteTimer.length != 0"> {{ currentTimestamp }}</h2>
		<div class="time-tracker--icon" :class="incompleteTimer.length == 0 ? 'inactive' : 'active'" @click="addTracker">
			<i class="fas fa-play" v-if="incompleteTimer.length == 0"></i>
			<i class="fas fa-stop" v-else></i>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			data: Array,
			model: Object,
		},
		data() {
			return {
				now: Date.now(),
				tracker: {
					model_id: this.model.id,
					model: this.model.type
				}
			};
		},
		created () {
			var self = this;
			var moment = this.$moment;
			setInterval(function () {
				let start = moment(Date.now())
				let now = moment(Date.now())

				if ( self.incompleteTimer.length != 0 ) {
					start = moment(self.incompleteTimer[0].created_at)
				}

				let diff = now.diff(start, 'seconds'); 
				self.now = moment.utc(moment.duration(diff, "seconds").asMilliseconds())
			}, 1000)
		},
		computed: {
			currentTimestamp() {
				return this.$moment(this.now).format('HH:mm:ss');
			},
			incompleteTimer() {
				return this.data.filter(p => p.completed === 0);
			}
		},
		methods: {
			addTracker() {
				this.$store.dispatch('tracker/store', this.tracker)
				.then(() => this.$emit('updateChange') )
			}
		}
	}
</script>