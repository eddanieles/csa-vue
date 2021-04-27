<template>
  <div class="dashboard-page">
    {{this.$store.state.companyReviews}}
    <h1 class="page-title">Candidates</h1>
    <b-row>
        <b-col xs="12">
          <Widget
            bodyClass="widget-table-overflow"
            customHeader
          >
            <div class="table-responsive">
              <table class="table table-striped table-lg mb-0 requests-table">
                <thead>
                  <tr class="text-muted">
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>PHONE</th>
                    <th>APPLICATION TIME</th>
                    <th>EASY PROCESS</th>
                    <th>APPROVE APPLICATION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in this.$store.state.companyReviews"
                    :key="row.id"
                  >
                    <td>{{row.candidateInfo ? row.candidateInfo.firstName : "Placeholder"}} {{row.candidateInfo ? row.candidateInfo.lastName : "Placeholder"}}</td>
                    <td>{{row.candidateInfo ? row.candidateInfo.email : "Placeholder"}}</td>
                    <td>{{row.candidateInfo ? row.candidateInfo.phone : "Placeholder"}}</td>
                    <td>{{row.timeTakenMinutes}} minutes</td>
                    <td>
                      <b-badge
                        :variant="row.easy ? 'success' : 'info'"
                        pill
                      >
                        {{row.easy ? "Easy" : "Difficult"}}
                      </b-badge>
                    </td>
                    <td>
                      <b-badge
                        :variant="row.approved ? 'success' : 'danger'"
                        pill
                      >
                        {{row.approved ? "Approved" : "NOT Approved"}}
                      </b-badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Widget>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import mock from './mock';

export default {
    name: 'Candidates',
    components: {
        Widget
    },
    data() {
        return {
            mock,
            errorMessage: null,
            reviews: []
        };
    },
    methods: {
    },
    beforeCreate() {
      let companyId = this.$route.params.id;
      this.$store.dispatch('assignCompany', companyId);
    },
    mounted() {
      this.$store.dispatch('getReviews', this.$route.params.id);
    }
}
</script>

<style src="./Dashboard.scss" lang="scss" >

</style>