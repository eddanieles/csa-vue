<template>
  <div>
      <h1>Dashboard</h1>
  </div>
</template>

<script>
export default {
    name: 'Dashboard',
    data() {
        return {
            errorMessage: null
        };
    },
    methods: {

    },
    mounted() {
        // eslint-disable-next-line
        console.log(`Current Company State: ${this.$store.state.companyId}`)
    },
}
</script>

<style>

</style>