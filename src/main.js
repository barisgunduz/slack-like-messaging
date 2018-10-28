// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import store from './store'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBuP_CIgQGWwpVHwz1r0or-c6HfcwbU-0s",
  authDomain: "slack-like-messaging.firebaseapp.com",
  databaseURL: "https://slack-like-messaging.firebaseio.com",
  projectId: "slack-like-messaging",
  storageBucket: "slack-like-messaging.appspot.com",
  messagingSenderId: "417036004119"
};
firebase.initializeApp(config);

window.firebase = firebase;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
