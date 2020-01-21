/* eslint-disable */
<template>
  <div>
    <h1>Login</h1>
    <v-form ref="form" @submit.prevent="login">
      <v-card-text>
        <v-text-field label="Email" v-model="email.value" :rules="email" hide-details="auto"></v-text-field>
        <v-text-field
          label="Password"
          v-model="password.value"
          :rules="password"
          type="password"
          hide-details="auto"
        ></v-text-field>
      </v-card-text>

      <!-- <md-field :class="{'md-invalid':$v.email.$invalid && $v.email.$dirty}">
     <label>Email</label>
     <md-input type="email " required v-model="$v.email.$model"></md-input>
      <span class="md-error">There is an error</span>
   </md-field>
   <md-field :class="{'md-invalid':$v.password.$invalid && $v.password.$dirty}">
     <label>Password</label>
     <md-input type="password" required v-model="$v.password.$model"></md-input>
      <span class="md-error">There is an error</span>
      </md-field>-->
      <v-card-actions>
        <div class="d-flex">
          <v-btn type="submit" small color="primary">Login</v-btn>
        </div>
      </v-card-actions>
      <!-- <md-button  class="md-raised" :disabled="$v.$invalid">Login</md-button> -->
      <!-- <a v-on:click="login">Submit</a> -->
    </v-form>
    <!-- {{$v}} -->
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data: function() {
    return {
      valid: true,
      lazy: true,
      email: [
        value => !!value || "Required.",
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        }
      ],
      password: [value => !!value || "Required."]
    };
  },
  methods: {
    login: function() {
      // console.log(this.$store.getters.getUser('admin'))
      if (this.$refs.form.validate()) {
        this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(res => {
          if (this.$store.getters.isLoggedIn) {
            console.log(this.email, this.password, this.store);
            this.$emit("submitted", true);
          } else {
            console.log("Error");
            alert("Wrong Credentials");
          }
        })
        .catch(res => {
          console.log("Error");
          alert("Wrong Credentials");
        });
      }
      else{
        alert('Please Fill All Details')
      }
    }
  }
};
</script>

<style>
.v-card__actions {
  /* display: flex; */
  justify-content: center;
}
</style>