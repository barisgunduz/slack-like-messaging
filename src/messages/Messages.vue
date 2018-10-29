<template>
    <div>
        <!-- show single message -->
        <single-message></single-message>
        <!-- message from -->
        <message-form></message-form>
    </div>
</template>

<script>
import SingleMessage from './SingleMessage'
import MessageForm from './MessageForm'
import database from 'firebase/database'
import {mapGetters} from 'vuex'

export default {
    name: 'messages',

    components: {SingleMessage, MessageForm},
    
    data(){
        return{
            messagesRef: firebase.database().ref('messages'),
            messages: [],
            channel: ''
        }
    },

    computed: {
        ...mapGetters(['currentChannel'])
    },

    watch: {
        currentChannel: function(){
            //if current channel changes, watch for its channel
            this.messages = []
            this.addListeners()
            this.channel = this.currentChannel
        }
    },

    methods: {
        addListeners(){
            // listen to child added events on current channel
            this.messagesRef.child(this.currentChannel.id).on('child_added', (snapshot) => {
                this.messages.push(snapshot.val())
            })
        },

        detachListeners(){
            if(this.channel !== null){
                this.messagesRef.child(this.channel.id).off()
            }
        },

        beforeDestroy(){
            this.detachListeners()
        }
    }
}
</script>
