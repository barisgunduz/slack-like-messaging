<template>
    <div>
        <div class="jumbotron bg-primary text-white text-center">
            <h2 class="lead display-3">#SLACK#</h2>
            <p>Realtime communication at it's best!</p>
        </div>

        <!-- show loading statue -->
        <div class="alert alert-info" v-if="loading">
            Processing....
        </div>

        <!-- show errors -->
        <div class="alert alert-danger" v-if="hasErrors">
            <div v-for="error in errors">{{ error}}</div>
        </div>

        <div class="container-fluid">
            <div class="row mt-5">
                <div class="col text-center"> 
                    <button @click="loginWithGoogle" class="btn btn-outline-danger btn-lg">Login with Google</button>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col text-center">
                    <button @click="loginWithTwitter" class="btn btn-outline-info btn-lg">Login with Twitter</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import auth from "firebase/auth"
import database from 'firebase/database'
export default {
  name: "login",
  data() {
    return {
      errors: [],
      loading: false,
      usersRef: firebase.database().ref('users')
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    loginWithGoogle() {
      //loading set to true
      this.loading = true;
      // clear old errors

      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(response => {
          //console.log(response.user)

          // pass user to save in db
          this.saveUserToUsersRef(response.user)

          // dispatch setUser action
          this.$store.dispatch("setUser", response.user);
          // then redirect user to '/' page
          this.$router.push("/");
        })
        .catch(error => {
          this.errors.push(error.message);
          // set loading to false
          this.loading = false;
        });
    },
    // save user to database
    saveUserToUsersRef(user){
        return this.usersRef.child(user.uid).set({
            name: user.displayName,
            avatar: user.photoURL
        })
    },
    loginWithTwitter() {
      //loading set to true
      this.loading = true;
      // clear old errors

      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(response => {
          //console.log(response.user)

          // dispatch setUser action
          this.$store.dispatch("setUser", response.user);
          // then redirect user to '/' page
          this.$router.push("/");
        })
        .catch(error => {
          this.errors.push(error.message);
          // set loading to false
          this.loading = false;
        });
    }
  }
};
</script>
<style>
.btn,
.jumbotron {
  border-radius: 0px;
}
</style>
