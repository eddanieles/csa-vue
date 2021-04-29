<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        {{this.$store.state.companyProfile ? "Welcome" : "Wrong login link!"}}
        <i class="fa fa-circle text-danger"></i>
        <br>
        <img v-bind:style="{height: '50px', marginTop: '10px'}" v-bind:src="`${this.$store.state.companyProfile.logo}`" alt="No image found"/>
      </h5>

      <div v-show="this.$store.state.companyProfile"> 
        <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'>Login to your Web App</h3>" customHeader>
          <p class="widget-auth-info">
              Use your email to sign in.
          </p>
          <form class="mt" @submit.prevent="login">
            <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
              {{errorMessage}}
            </b-alert>
            <div class="form-group">
              <input class="form-control no-border" ref="email" required type="email" name="email" placeholder="Email" />
            </div>
            <div class="form-group">
              <input class="form-control no-border" ref="password" required type="password" name="password" placeholder="Password" />
            </div>
            <b-button type="submit" size="sm" class="auth-btn mb-3 " variant="inverse">Login</b-button>
            <p class="widget-auth-info">or sign in with</p>
            <div class="social-buttons">
              <b-button variant="primary" class="social-button mb-2">
                <i class="social-icon social-google"></i>
                <p class="social-text">GOOGLE</p>
              </b-button>
              <b-button variant="success" class="social-button">
                <i class="social-icon social-microsoft"></i>
                <p class="social-text">MICROSOFT</p>
              </b-button>
            </div>
          </form>
          <p class="widget-auth-info">
            Don't have an account? Sign up now!
          </p>
          <router-link class="d-block text-center" to="login">Create an Account</router-link>
        </Widget>
      </div>
      
    </b-container>
    <footer class="auth-footer">
      2019 &copy; Sing App Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com/">Flatlogic</a>
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    login() {
      let that = this;
      this.$store.dispatch('login', {
          email: that.$refs.email.value,
          password: that.$refs.password.value
      })
    },
  },
  created() {
    let companyId = this.$route.params.id;
    this.$store.dispatch('assignCompany', companyId);
  },
};
</script>
