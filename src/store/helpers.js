import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
	...mapState('auth', {
		currentUser: (state) => state.currentUser,
	}),
	...mapState('tracker', {
		trackers: (state) => state.trackers,
	}),
	...mapGetters('auth', ['loggedIn']),
	...mapGetters('tracker', ['fetchTimeTracker']),
}

export const authMethods = mapActions('auth', ['logIn', 'logOut', 'register', 'resetPassword'])
