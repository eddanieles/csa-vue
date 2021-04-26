<template>
  <div class="dashboard-page">
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
                    <th>PRODUCT</th>
                    <th>PRICE</th>
                    <th>DATE</th>
                    <th>CITY</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in mock.table"
                    :key="row.id"
                  >
                    <td>{{row.name}}</td>
                    <td>{{row.email}}</td>
                    <td>{{row.product}}</td>
                    <td>{{row.price}}</td>
                    <td>{{row.date}}</td>
                    <td>{{row.city}}</td>
                    <td>
                      <b-badge
                        :variant="row.status === 'Pending'
                          ? 'success'
                          : row.status === 'Declined' ? 'danger' : 'info'"
                        pill
                      >
                        {{row.status}}
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
            errorMessage: null
        };
    },
    methods: {
      
    },
    beforeCreate() {
      let companyId = this.$route.params.id;
      this.$store.dispatch('assignCompany', companyId);
    }
}
</script>

<style src="./Dashboard.scss" lang="scss" >

</style>