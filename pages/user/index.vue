<template>
  <div class="user">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <h1>Welcome {{user.name | capitalize}} !!!</h1>
    <!-- {{editUser}} -->
    <v-card v-if="!user.isAdmin">
      <v-card-title>Account Details</v-card-title>
      <v-card-text>
        <v-list class="transparent">
          <v-list-item v-for="(u,name) in user" :key="u.email">
            <v-list-item-title>{{ name | capitalize}} : {{u | capitalize}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <!-- <md-card-title>
        <div class="md-title">{{user.name}}</div>
        <div class="md-subhead">{{user.email}}</div>
        <div class="md-subhead">{{user.jobTitle}}</div>
      </md-card-title>
      <md-card-text>
        <div class="md-body-2">City :{{user.address.city}}</div>
        <div class="md-body-2">State: {{user.address.state}}</div>
        <div class="md-body-2">Country:{{user.address.country}}</div>
      </md-card-text>-->
    </v-card>

    <div>
      <v-card v-if="user.isAdmin">
        <v-card-title>User Details</v-card-title>
        <v-card-text>
          <v-simple-table v-if="user.isAdmin">
            <template>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Job Title</th>
                  <!-- <th>City</th> -->
                  <th>Address</th>
                  <!-- <th>Country</th>-->
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user,index) in userList" :key="user.name">
                  <td>{{user.name || 'NA'}}</td>
                  <td>{{user.email || 'NA'}}</td>
                  <td>{{user.company|| 'NA'}}</td>
                  <td>{{user.jobtitle || 'NA'}}</td>
                  <td>{{user.address || 'NA'}}</td>
                  <!-- <td>{{user.address.state || 'NA'}}</td>
                  <td>{{user.address.country || 'NA'}}</td>-->
                  <td>
                    <!-- <v-icon class="fa fa-edit" @click.native="editU(user,index)" key="1"></v-icon> -->
                    <div class="text-center">
                      <v-dialog
                        v-model="dialog[index]"
                        width="500"
                        persistent
                        :retain-focus="false"
                        :overlay-opacity="0.2"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon class="fa fa-edit" @click.native="editU(user,index)" v-on="on"></v-icon>
                          <v-icon class="fa fa-trash" @click.native="deleteUser(user._id,index)"></v-icon>
                          <!-- <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn> -->
                        </template>
                        <v-card>
                          <v-card-title class="headline grey lighten-2" primary-title>Edit User</v-card-title>
                          <v-card-text>
                            <Registration
                              v-if="editUser"
                              :userDetails="editingUser"
                              :userIndex="userIndex"
                              title
                              @cancelled="cancel(index)"
                              @submitted="saved(index)"
                            />
                          </v-card-text>
                        </v-card>
                      </v-dialog>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-divider></v-divider>
          <div class="d-flex">
          <v-btn text color="primary" @click.native="logOut()">Logout</v-btn>
          </div>
        </v-card-text>
      </v-card>

      <!-- {{userList}} -->
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Registration from "@/components/Registration.vue";
import axios from "axios";
export default {
  name: "user",
  // http://dummy.restapiexample.com/api/v1/employees
  async asyncData({ app }) {
    const self = this;
    const res = await axios.get("http://127.0.0.1:5000/api/users");
    app.store.dispatch("setAllUsers", res.data);
    let userList = app.store.getters.getUsers;
    let dialog=[];
    userList.forEach(element => {
      dialog.push(false)
    });
    console.log("herer", userList);
    return {
      user: null,
      dialog: dialog,
      editUser: false,
      userDetail: {},
      address: {},
      userList: userList,
      showDialog: false,
      editingUser: {},
      userIndex: 0
    };
  },
  // data() {
  //   return {
  //     user: null,
  //     dialog: null,
  //     editUser: false,
  //     userDetail: {},
  //     address: {},
  //     userList: [],
  //     showDialog: false,
  //     editingUser: {},
  //     userIndex: 0
  //   };
  // },
  beforeMount() {
    this.user = this.$store.getters.getUser;
    console.log(this.user);
  },
  components: {
    Registration
  },
  mounted() {},
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    submitted: function(val) {
      console.log("val", val);
      if (val) {
        this.$router.push("about");
      }
    },
    regSubmitted: function(val) {
      if (val) {
        this.login = !this.login;
      }
    },
    deleteUser(id, index) {
      this.$store.dispatch("deleteUser", { index: index, id: id }).then(res => {
        if (res) {
          alert("Deleted");
        }
      });
    },
    editU(user, index) {
      this.dialog[index]="true"
      console.log(">>>", user);
      console.log(">>>", index);
      this.editingUser = user;
      this.editUser = true;
      this.userIndex = index;
    },
    cancel(i) {
      this.dialog[i] = false;
      this.editUser = false;
    },
    saved(i) {
      alert("Saved");
      this.cancel(i);
    },
    logOut() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
  // watch: {
  //   user: function() {
  //     if (this.$store.getters.getUser.isAdmin) {
  //       this.userList = this.$store.getters.getUsers
  //     }
  //   }
  // }
};
</script>

<style lang="scss">
h1{
margin:40px 0px;
}
.th {
  text-align: center;
}
.user {
  max-width: 1200px;
  margin: auto;
  .md-icon {
    cursor: pointer;
  }
}
.md-dialog {
  max-width: 768px;
}
.d-flex{
  display: flex;
  justify-content: flex-end;
}
</style>
