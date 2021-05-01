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
              <b-button variant="primary" class="social-button mb-2" @click="googleLogin">
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
import { googleProvider, auth } from '../firebase'

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
    googleLogin() {
      auth
        .signInWithPopup(googleProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // eslint-disable-next-line
          console.log("token: ", token);
          // The signed-in user info.
          var user = result.user;
          // eslint-disable-next-line
          console.log("user: ", user);
          this.$store.dispatch('fetchUserProfile', user)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          // eslint-disable-next-line
          console.log("errorCode: ", errorCode);
          var errorMessage = error.message;
           // eslint-disable-next-line
          console.log("errorMessage: ", errorMessage);
          // The email of the user's account used.
          var email = error.email;
           // eslint-disable-next-line
          console.log("email: ", email);
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
           // eslint-disable-next-line
          console.log("credential: ", credential);
          // ...
        });
    }
  },
  beforeCreate() {
    let companyId = this.$route.params.id;
    this.$store.dispatch('assignCompany', companyId);
  }
};
</script>
