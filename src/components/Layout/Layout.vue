<template>
  <div :class="[{root: true, sidebarClose, sidebarStatic}, 'sing-dashboard']" >
    <div v-if="this.$route.params.id == this.$store.state.userProfile.company">
      <Sidebar />
        <div class="wrap">
          <Header />
          <v-touch class="content" @swipe="handleSwipe" :swipe-options="{direction: 'horizontal'}">
            <transition name="router-animation">
              <router-view />
            </transition>
            <footer class="contentFooter">
              Sing App Vue Dashboard Free Template - Made by <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">Flatlogic</a>
            </footer>
          </v-touch>
        </div>
    </div>
    <div v-else>
      You do not have access to this page
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('layout');

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import './Layout.scss';

export default {
  name: 'Layout',
  components: { Sidebar, Header },
  methods: {
    ...mapActions(['switchSidebar', 'handleSwipe', 'changeSidebarActive', 'toggleSidebar'],
    ),
    handleWindowResize() {
      const width = window.innerWidth;

      if (width <= 768 && this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      }
    },
  },
  computed: {
    ...mapState(["sidebarClose", "sidebarStatic"]),
  },
  created() {
    const staticSidebar = JSON.parse(localStorage.getItem('sidebarStatic'));

    if (staticSidebar) {
      this.$store.state.layout.sidebarStatic = true;
    } else if (!this.sidebarClose) {
      setTimeout(() => {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }, 2500);
    }

    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
};
</script>

<style src="./Layout.scss" lang="scss" />
