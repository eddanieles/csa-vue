<template>
  <div class="dashboard-page">
    <h1 class="page-title">Social Causes</h1>
    <b-container>
      <b-row>
        <b-col v-for="cause in this.causes" :key="cause.id">
          <b-card
            v-bind:title="`${cause.title}`"
            v-bind:img-src="`${cause.img}`"
            img-alt="Image"
            img-height=300,
            img-width=300,
            tag="article"
            style="min-width: 20rem; min-height: 20rem"
            class="mt-3"
          >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      causes: [
        {
          title: "Black Lives Matter",
          img: "https://www.nelsonmandela.org/uploads/files/_600xAUTO_crop_center-center/Black-Lives-Matter-2.jpg"
        },
        {
          title: "LGBTQ+",
          img: "https://www.bbva.com/wp-content/uploads/2020/09/LGBTQ.jpg"
        },
        {
          title: "No Kid Hungry",
          img: "https://shortyawards.imgix.net/entries/NKH.png?auto=format&fit=crop&h=300&q=65&w=500&s=92bb79b6b2cce234acfe26c34371b840"
        },
        {
          title: "Redcross",
          img: "https://pbs.twimg.com/profile_images/1290360066248515584/9Y4_iGfJ_400x400.jpg"
        },
        {
          title: "End Homelessness",
          img: "https://pbs.twimg.com/profile_images/969463179649544192/Yw8bynyE_400x400.jpg"
        },
        {
          title: "Mental Health",
          img: "https://www.newmethodwellness.com/wp-content/uploads/2020/05/mental-health-awareness-month-1200x630-1.jpg"
        }
      ]
    }
  },
  beforeCreate() {
    let companyId = this.$route.params.id;
    this.$store.dispatch('assignCompany', companyId);
  }
}
</script>

<style src="./Dashboard.scss" lang="scss">

</style>