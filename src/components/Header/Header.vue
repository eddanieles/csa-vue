<template>
  <b-navbar class="header d-print-none app-header">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='fi flaticon-menu' />
        </a>
      </b-nav-item>
    </b-nav>
    <b-nav class="ml-auto">
      <b-nav-item>
        <div class="d-md-down-none px-2">
          <span class="avatar rounded-circle thumb-sm float-left mr-2">
            <img class="rounded-circle" src="../../assets/people/profileIcon.jpeg" alt="..." />
          </span>
          <span class="px-2">{{this.$store.state.userProfile.firstName}} {{this.$store.state.userProfile.lastName}}</span>
        </div>
      </b-nav-item>
      <b-nav-item>
        <b-nav-item-dropdown id="v-step-2" class="settingsDropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <i class='fi flaticon-settings-10 px-2' />
        </template>
        <b-dropdown-item>My Account<i class='fi flaticon-person px-3 mr-3' /></b-dropdown-item>
        <b-dropdown-item-button @click="logout">
          Log Out
          <i class="fi flaticon-power-1 px-3 mr-3" />
        </b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-nav-item>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { auth } from '../../firebase'

export default {
  name: 'Header',
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic']),
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      this.$store.dispatch('logout')
    },
  },
  beforeMount() {
    this.$store.dispatch('getAuthUserProfile', JSON.parse(JSON.stringify(auth.currentUser)))
  }
};
</script>

<style src="./Header.scss" lang="scss"></style>
