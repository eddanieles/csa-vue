<template>
  <div>
      <h1>Dashboard</h1>
  </div>
</template>

<script>
import { companiesCollection } from '@/firebase'

export default {
    name: 'Dashboard',
    data() {
        return {
            errorMessage: null
        };
    },
    methods: {
        async getCompanies() {
            let companyId = "wwmGhfjFY2O4cH1cZRfM";
            var docRef = companiesCollection.doc(companyId)
            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    },
    mounted() {
        this.getCompanies()
    },
}
</script>

<style>

</style>