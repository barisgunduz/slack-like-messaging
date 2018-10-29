<template>
    <div>
        <div class="messageform">
            <form>
                <div class="input-group mb-3">
                    <input v-model.trim="message" name="message" id="message" placeholder="Write something" class="form-control mt-3" autofocus>

                    <div class="input-group-append">
                        <button @click="sendMessage" class="btn btn-primary mt-3" type="button">&nbsp; Send &nbsp;</button>
                    </div>

                    <div class="input-group-append">
                        <button class="btn btn-warning mt-3" type="button">Upload</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

    export default {
        name: 'message-form',

        data() {
          return {
            message: '',
            errors: []
          }
        },

        computed: {
          ...mapGetters(['currentChannel', 'currentUser'])
        },

        methods: {
          sendMessage() {
            // construct new message object
            let newMessage = {
              content: this.message,
              timestamp: firebase.database.ServerValue.TIMESTAMP,
              user: {
                name: this.currentUser.displayName,
                avatar: this.currentUser.photoURL,
                id: this.currentUser.uid
              }
            }

            // use some validation
            if(this.currentChannel !== null) {
              if(this.message.length > 0) {
                this.$parent.messagesRef.child(this.currentChannel.id).push().set(newMessage)
                .then(() => {
                  //
                })
                .catch((error) => {
                  this.errors.push(error.message)
                })
                // reset message
                this.message = ''
              }
            }
          }
        }
    }
</script>

<style scoped>
    .messageform {
        position: fixed;
        left:0;
        bottom:0;
        width: 67%;
        z-index:100;
        color:white;
        text-align:center;
        margin-bottom:-16px;
        margin-left:33.3%;
    }

    input, button {
        height:50px;
    }
</style>










