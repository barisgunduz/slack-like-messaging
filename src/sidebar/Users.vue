<template>
    <div>
        <div class="text-light">
            <h4>Users</h4>
            <ul class="nav flex-column">
                <li v-for="user in users" :key="user.uid">
                    <span>
                        <img class="img rounded-circle" :src="user.avatar" height="20">
                        <span class="text-primary">{{ user.name }}</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import database from 'firebase/database'
import {mapGetters} from 'vuex'
export default {
    name: 'users',

    data(){
        return{
            users: [],
            usersRef: firebase.database().ref('users'),
            connectedRef: firebase.database().ref('.info/connected'),
            presenceRef: firebase.database().ref('presence')
        }
    },

    computed: {
        ...mapGetters(['currentUser'])
    },

    methods: {
        addListeners(){
            this.usersRef.on('child_added', (snapshot) =>{
                if(this.currentUser.uid !== snapshot.key){
                    // build user object and push to users[]
                    let user = snapshot.val()
                    user['uid'] = snapshot.key
                    user['status'] = 'offline'
                    this.users.push(user)
                }
            })

            // returns 'connected' to every user connected to our application
            this.connectedRef.on('value', snapshot => {
                //console.log('connected user : ', snapshot)
                if(snapshot.val() === true){
                    let ref = this.presenceRef.child(this.currentUser.uid)
                    ref.set(true)
                    ref.onDisconnect().remove()
                }
            })

        },

        detachListeners(){
        
        }
    },

    mounted(){
        this.addListeners()
    },

    beforeDestroy(){
        this.detachListeners()
    }
}
</script>
