<template>
  <div class="sidebar-wrapper">
    <nav
        :class="{sidebar: true, sidebarStatic, sidebarOpened}"
        @mouseenter="sidebarMouseEnter"
        @mouseleave="sidebarMouseLeave"
    >
      <header class="logo">
        <router-link to="dashboard"><span class="primary-word">{{this.$store.state.companyProfile.name}}</span></router-link>
      </header>
      <ul class="nav">
        <NavLink
            :activeItem="activeItem"
            header="Dashboard"
            :link="`/${this.path}/dashboard`"
            iconName="flaticon-database"
            index="dashboard"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Candidates"
            :link="`/${this.path}/candidates`"
            iconName="flaticon-user"
            index="candidates"
            isHeader
        />
        <NavLink
            :activeItem="activeItem"
            header="Social Causes"
            :link="`/${this.path}/socialcauses`"
            iconName="flaticon-megaphone"
            index="socialcauses"
            isHeader
        />
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      path: ""
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
  },
  created() {
    this.setActiveByRoute();
    let path = this.$route.fullPath.split('/');
    path.pop();
    this.path = path.join('/');
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
