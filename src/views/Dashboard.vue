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
        console.log(this.$store.state.company)
    },
}
</script>

<style>

</style>