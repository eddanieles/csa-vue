<template>
  <div>
      <h1>Dashboard</h1>
      <button @click="logout()">Logout</button>
  </div>
</template>

<script>
import { auth } from '../firebase'

export default {
    name: 'Dashboard',
    data() {
        return {
            errorMessage: null
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log(`Dashboard Company State: ${this.$store.state.companyId}`);
        // eslint-disable-next-line
        console.log(`Dashboard User State: ${JSON.stringify(this.$store.state.userProfile)}`);
        // eslint-disable-next-line
        console.log(`Dashboard auth.currentUser: ${JSON.stringify(auth.currentUser)}`)
    },

}
</script>

<style>

</style>