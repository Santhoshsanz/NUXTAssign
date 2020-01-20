/* eslint-disable */
<template>
  <div>
    <h1>{{title}}</h1>
    <v-card-text>
      <form @submit.prevent="registration">
        <v-text-field label="Name" v-model="user.name.value" :rules="user.name"></v-text-field>
        <v-text-field label="Email" v-model="user.email.value" :rules="user.email"></v-text-field>
        <v-text-field label="Password" v-model="user.password.value" :rules="user.password"></v-text-field>
        <v-text-field label="company" v-model="user.company.value" :rules="user.company"></v-text-field>
        <v-text-field label="Job Title" v-model="user.jobtitle.value" :rules="user.jobtitle"></v-text-field>
        <v-text-field label="Address" v-model="user.address.value" :rules="user.address"></v-text-field>
        <!--  <v-text-field label="State" v-model="user.address.state.value" :rules="user.address.state"></v-text-field> -->
        <!-- <v-text-field
          label="Country"
          v-model="user.address.country.value"
          :rules="user.address.country"
        ></v-text-field>-->
        <div class="c-flex">
          <v-btn type="submit" v-if="editting" small elevation="2" color="primary">Save</v-btn>
          <v-btn type="submit" v-if="!editting" small elevation="2" color="primary">Register</v-btn>
          <v-btn
            type="button"
            v-if="editting"
            small
            elevation="2"
            color="warning"
            @click.native="cancelClick()"
          >Cancel</v-btn>
        </div>
      </form>
    </v-card-text>
    <!-- {{user}} -->
  </div>
</template>
<script>
export default {
  props: {
    title: "",
    userDetails: {},
    userIndex: ""
  },
  name: "Registration",
  data: function() {
    return {
      user: {
        name: [value => !!value || "Required."],
        email: [
          value => !!value || "Required.",
          value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid e-mail.";
          }
        ],
        password: [value => !!value || "Required."],
        company: [value => !!value || "Required."],
        jobtitle: [value => !!value || "Required."],
        address: [value => !!value || "Required."]
        // address: {
        //   city: [value => !!value || "Required."],
        //   state: [value => !!value || "Required."],
        //   country: [value => !!value || "Required."]
        // }
      },
      editting: false,
      btnName: ""
    };
  },
  mounted() {
    if (this.userDetails && Object.keys(this.userDetails).length > 0) {
      this.editting = true;
      this.btnName = "Save";
      (this.user.name.value = this.userDetails.name),
        (this.user.email.value = this.userDetails.email),
        (this.user.password.value = this.userDetails.password),
        (this.user.company.value = this.userDetails.company),
        (this.user.jobtitle.value = this.userDetails.jobtitle),
        (this.user.address.value = this.userDetails.address);
      // (this.user.address.state.value = this.userDetails.address.state),
      // (this.user.address.country.value = this.userDetails.address.country);
    } else {
      this.editting = false;
      this.btnName = "Register";
      (this.user.name.value = ""),
        (this.user.email.value = ""),
        (this.user.password.value = ""),
        (this.user.company.value = ""),
        (this.user.jobtitle.value = ""),
        (this.user.address.value = "");
      // (this.user.address.state.value = ""),
      // (this.user.address.country.value = "");
    }
  },
  watch: {
    userDetails: function(newVal, oldVal) {
      console.log("Inside Watch");
      if (Object.keys(newVal).length > 0) {
        // (this.user.n = [value => !!value || "Required."])
        // this.initialise(newVal);

        (this.user.name.value = newVal.name),
          (this.user.email.value = newVal.email),
          (this.user.password.value = newVal.password),
          (this.user.company.value = newVal.company),
          (this.user.jobtitle.value = newVal.jobtitle),
          (this.user.address.value = newVal.address),
          // (this.user.address.state.value = newVal.address.state),
          // (this.user.address.country.value = newVal.address.country);
          (this.editting = true);
        this.btnName = "Save";
      } else {
        this.editting = false;
        (this.btnName = "Register"),
          (this.user.name.value = ""),
          (this.user.email.value = ""),
          (this.user.password.value = ""),
          (this.user.company.value = ""),
          (this.user.jobtitle.value = ""),
          (this.user.address.value = "");
        // (this.user.address.state.value = ""),
        // (this.user.address.country.value = "");
      }
    },
    deep: true
  },
  updated() {
    console.log("Before Update");
  },
  methods: {
    registration: function() {
      console.log("userIndex", this.userIndex);
      console.log("user", this.user);
      if (!this.editting) {
        this.$store
          .dispatch("addUser", {
            name: this.user.name.value,
            email: this.user.email.value,
            password: this.user.password.value,
            company: this.user.company.value,
            jobtitle: this.user.jobtitle.value,
            address: this.user.address.value
            // address: {
            //   city: this.user.address.city.value,
            //   state: this.user.address.state.value,
            //   country: this.user.address.country.value
            // }
          })
          .then(res => {
            if (res) {
              alert("Registered");
            }
          });
      } else {
        const temp = {
          name: this.user.name.value,
          email: this.user.email.value,
          password: this.user.password.value,
          company: this.user.company.value,
          jobtitle: this.user.jobtitle.value,
          address: this.user.address.value
          // address: {
          //   city: this.user.address.city.value,
          //   state: this.user.address.state.value,
          //   country: this.user.address.country.value
          // }
        };
        console.log(">>>>FinalData", temp);
        this.$store.dispatch("editUser", {
          temp: temp,
          id: this.userDetails._id
        });
      }
      console.log(this.$store.getters.getUsers);
      this.$emit("submitted", true);
    },
    cancelClick: function() {
      this.$emit("cancelled");
    },
    initialise(val) {
      console.log("Re Iniatise");

      this.$set(this.user.name, "value", val.n);
      this.$set(this.user.email, "value", val.email);
      // this.user.n.value = "";
      // this.user.email.value = "";
      // this.user.password.value = "";
      // this.user.company.value = "";
      // this.user.jobtitle.value = "";
      // this.user.address.city.value = "";
      // this.user.address.state.value = "";
      // this.user.address.country.value = "";
    },
    setName(event) {}
  }
};
</script>

<style lang="scss">
.c-flex {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.v-card__actions {
  /* display: flex; */
  justify-content: flex-end;
}
.v-btn {
  margin: 10px 10px;
}
</style>
