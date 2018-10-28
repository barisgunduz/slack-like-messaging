<template>
    <div>
        <button @click="openModal" class="btn btn-outline-primary">Add Channel</button>

        <!-- show list of channels -->
        <div class="mt-4">
            <button v-for="channel in channels" class="list-group-item list-group-item-action" type="button">
                {{channel.name}}
            </button>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="channelModal">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title text-dark">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <input v-model="new_channel" type="text" id="new_channel" name="new_channel" placeholder="Channel Name" class="form-control">
                        </div>
                        <!-- errors -->
                        <ul class="list-group" v-if="hasErrors">
                            <li class="list-group-item text-danger" v-for="error in errors">{{ error }}</li>
                        </ul>
                    </form>
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button @click="addChannel" type="button" class="btn btn-primary">Add Channel</button>
                </div>

            </div>
        </div>
        </div>
    </div>
</template>

<script>
import database from "firebase/database";
export default {
  name: "channels",
  data() {
    return {
      new_channel: "",
      errors: [],
      channelsRef: firebase.database().ref("channels"),
      channels: []
    };
  },
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    }
  },
  methods: {
    openModal() {
      $("#channelModal")
        .appendTo("body")
        .modal("show");
    },
    // add new channel
    addChannel() {
        this.errors = []
      // get key to the newly creating channel
      let key = this.channelsRef.push().key;
      console.log("newly creating channel key: ", key);
      // minimum info needed to create a new channel
      // id and name
      let newChannel = { id: key, name: this.new_channel };
      // create new channel
      this.channelsRef
        .child(key)
        .update(newChannel)
        .then(() => {
          this.new_channel = "";
          $("#channelModal").modal("hide");
        })
        //error handling
        .catch(error => {
          this.errors.push(error.message);
        });
    },

    addListeners() {
        this.channelsRef.on('child_added', snapshot => {
            //console.log('listening channelsref on child_added: ', snapshot.val())
            this.channels.push(snapshot.val())
        })
    },

    detachListeners() {
        this.channelsRef.off()
    }
  },

  mounted() {
    this.addListeners();
  },

  beforeDestroy() {
    this.detachListeners();
  }
};
</script>
