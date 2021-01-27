<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.currentUser
    }
  },
  methods: {
    /**
     * Menu clicked show the submenu
     */
    onMenuClick(event) {
      event.preventDefault();
      const nextEl = event.target.nextSibling;
      if (nextEl && !nextEl.classList.contains("show")) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove("show");
        }
        nextEl.classList.add("show");
      } else if (nextEl) {
        nextEl.classList.remove("show");
      }
      return false;
    },
  }
};
</script>
<template>
  <div class="topnav">
    <div class="container-fluid">
      <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
        <div id="topnav-menu-content" class="collapse navbar-collapse">
          <ul class="navbar-nav">

            <!-- <li class="nav-item">
              <router-link tag="a" class="nav-link" to="/">
                <i class="bx bx-home-circle mr-2"></i>Dashboard
              </router-link>
            </li> -->

            <!-- <li class="nav-item">
              <router-link tag="a" class="nav-link" to="/tasks/list">
                <i class="bx bx-task mr-2"></i>My Tasks
              </router-link>  
            </li> -->

            <li class="nav-item dropdown">
              <a
                id="topnav-pages"
                class="nav-link dropdown-toggle arrow-none"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="onMenuClick"
              >
                <i class="bx bx-briefcase-alt-2 mr-2"></i>Projects
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="topnav-pages">
                <router-link tag="a" to="/projects/list" class="dropdown-item">All projects</router-link>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a
                id="topnav-pages"
                class="nav-link dropdown-toggle arrow-none"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="onMenuClick"
              >
                <i class="bx bx-briefcase-alt mr-2"></i>Jobs
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="topnav-pages">
                <router-link tag="a" to="/jobs/list" class="dropdown-item">All jobs</router-link>
              </div>
            </li>

            <li class="nav-item dropdown" v-if="currentUser.role !== 'client'">
              <a
                id="topnav-pages"
                class="nav-link dropdown-toggle arrow-none"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="onMenuClick"
              >
                <i class="bx bx bx-user-circle mr-2"></i>Clients
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="topnav-pages">
                <router-link tag="a" to="/clients/list" class="dropdown-item">All clients</router-link>
              </div>
            </li>

            <li class="nav-item dropdown" v-if="currentUser.role !== 'client'">
              <a
                id="topnav-pages"
                class="nav-link dropdown-toggle arrow-none"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="onMenuClick"
              >
                <i class="bx bxs-user-detail mr-2"></i>Users
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="topnav-pages">
                <router-link tag="a" to="/contacts/list" class="dropdown-item">All users</router-link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a
                id="topnav-pages"
                class="nav-link dropdown-toggle arrow-none"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                @click="onMenuClick"
              >
                <i class="bx bxs-conversation mr-2"></i>Tickets
                <div class="arrow-down"></div>
              </a>
              <div class="dropdown-menu" aria-labelledby="topnav-pages">
                <router-link tag="a" to="/tickets/list" class="dropdown-item">All tickets</router-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>