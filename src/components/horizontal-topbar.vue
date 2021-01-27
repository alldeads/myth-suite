<template>
	<header id="page-topbar">
		<div class="navbar-header">
			<div class="d-flex">
				<!-- LOGO -->
				<div class="navbar-brand-box">
					<router-link to="/" class="logo logo-dark">
						<span class="logo-sm">
							<img src="@/assets/images/logo.svg" alt height="22" />
						</span>
						<span class="logo-lg">
							<img src="@/assets/images/logo-dark.png" alt height="17" />
						</span>
					</router-link>

					<router-link to="/" class="logo logo-light">
						<span class="logo-sm">
							<img src="@/assets/images/logo-light.svg" alt height="32" />
						</span>
						<span class="logo-lg">
							<img src="@/assets/images/logo-light.svg" alt height="29" />
						</span>
					</router-link>
				</div>

				<button
					id="toggle"
					type="button"
					class="btn btn-sm mr-2 font-size-16 d-lg-none header-item"
					@click="toggleMenu"
				>
					<i class="fa fa-fw fa-bars"></i>
				</button>
			</div>

			<div class="d-flex">
				<b-dropdown
					v-if="currentUser.role != 'client'"
					toggle-class="header-item noti-icon"
					right
					menu-class="dropdown-menu-lg p-0"
					variant="black"
				>
					<template v-slot:button-content>
						<i class="bx bx-timer bx-tada"></i>
						<span class="badge badge-success badge-pill" style="padding: 2px 4px;">{{ timeLogs.length }}</span>
					</template>

					<div class="p-3">
						<div class="row align-items-center">
							<div class="col">
								<h6 class="m-0">Time Tracking</h6>
							</div>
						</div>
					</div>
					<simplebar data-simplebar style="max-height: 230px;">
						<div class="text-reset notification-item" v-for="(timer, index) in timeLogs" :key="index">
							<div class="media">
								<div class="avatar-xs mr-3">
									<span class="avatar-title bg-dark rounded-circle font-size-16">
										<i class="bx bx-time"></i> 
									</span>
								</div>
								<div class="media-body">
									<div class="font-size-12 text-muted float-right">
										<p class="mb-0">
											<button class="btn btn-danger btn-small font-size-11" style="padding: 5px;">
												<i class="mdi mdi-stop"></i> Stop
											</button>
										</p>
									</div>
									<h6 class="mt-0 mb-1 text-muted">Project name ({{ timer.id }})</h6>
									<h5 class="mt-0 mb-1 text-dark">{{ timer.diff }}</h5>
								</div>
							</div>
						</div>
					</simplebar>
				</b-dropdown>

				<div class="dropdown d-inline-block d-lg-none ml-2">
					<button
						id="page-header-search-dropdown"
						type="button"
						class="btn header-item noti-icon"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						<i class="mdi mdi-magnify"></i>
					</button>
					<div
						class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
						aria-labelledby="page-header-search-dropdown"
					>
						<form class="p-3">
							<div class="form-group m-0">
								<div class="input-group">
									<input
										type="text"
										class="form-control"
										placeholder="Search ..."
										aria-label="Recipient's username"
									/>
									<div class="input-group-append">
										<button class="btn btn-primary" type="submit">
											<i class="mdi mdi-magnify"></i>
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>

				<div class="dropdown d-none d-lg-inline-block ml-1">
					<button type="button" class="btn header-item noti-icon" @click="initFullScreen">
						<i class="bx bx-fullscreen"></i>
					</button>
				</div>

				<b-dropdown right variant="black" toggle-class="header-item">
					<template v-slot:button-content>
						<span class="rounded-circle header-profile-user p-2"><strong>JN</strong></span>
						<span class="d-none d-xl-inline-block ml-1">{{ currentUser.name }}</span>
						<i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
					</template>
					<!-- item-->
					<!-- <a class="dropdown-item" href="/contacts/profile">
						<i class="bx bx-user font-size-16 align-middle mr-1"></i> Profile
					</a> -->
					<div class="dropdown-divider"></div>
					<a class="dropdown-item text-danger" href="/logout">
						<i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i> Logout
					</a>
				</b-dropdown>
			</div>
		</div>
	</header>
</template>

<script>
import simplebar from 'simplebar-vue';

export default {
	components: { simplebar },
	created() {
		var self = this;
		setInterval(function () {
			var moment = self.$moment;
			self.timeLogs.map((item, index) => {
				let start = moment(item.created_at)
				let now = moment(Date.now())

				let diff = now.diff(start, 'seconds')
				item.diff = moment.utc(moment.duration(diff, "seconds").asMilliseconds())
				item.diff = moment(item.diff).format('HH:mm:ss')
				// self.timeLogs.splice(index, 1, item)
				self.$store.commit('tracker/UPDATE_TRACKER', item, index)
				// self.$set(self.timeLogs, index, item)
			}, moment, self)
		}, 1000)
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.currentUser
		},
		timeLogs() {
			return this.$store.getters['tracker/fetchTimeTracker']
		},
		currentTimestamp() {
			return this.$moment(this.now).format('HH:mm:ss');
		},
	},
	methods: {
		toggleMenu() {
			let element = document.getElementById("topnav-menu-content");
			element.classList.toggle("show");
		},
		initFullScreen() {
			document.body.classList.toggle("fullscreen-enable");
			if (
				!document.fullscreenElement &&
				/* alternative standard method */ !document.mozFullScreenElement &&
				!document.webkitFullscreenElement
			) {
				// current working methods
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.mozRequestFullScreen) {
					document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen(
						Element.ALLOW_KEYBOARD_INPUT
					);
				}
			} else {
				if (document.cancelFullScreen) {
					document.cancelFullScreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
					document.webkitCancelFullScreen();
				}
			}
		}
	}
};
</script>