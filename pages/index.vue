<template>
  <div class="container">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
      rel="stylesheet"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css"
      rel="stylesheet"
    />
    <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet" />
    <v-card class="mx-auto" max-width="800" min-width="400">
      <Login v-if="login" @submitted="submitted" />
      <Registration v-if="!login" @submitted="regSubmitted" title="Registration" />
      <a v-if="login" @click="login=!login">Register</a>
      <a v-if="!login" @click="login=!login">Login</a>
    </v-card>

    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

    <!-- <Registration v-if="!login" @submitted='regSubmitted' title="Registration"/> -->
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import Login from "~/components/Login.vue";
import Registration from '@/components/Registration.vue'

export default {
  name: "home",
  data: function() {
    return {
      login: true
    };
  },
  components: {
    Login,
    Registration
  },
  methods: {
    submitted: function(val) {
      console.log("val", val);
      if (val) {
        this.$router.push("user");
      }
    },
    regSubmitted: function(val) {
      debugger
      if (val) {
        this.login = !this.login;
      }
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
