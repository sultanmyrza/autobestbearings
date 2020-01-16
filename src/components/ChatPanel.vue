<template>
  <div>
    <v-btn @click="sheet = !sheet" bottom color="pink" dark fab fixed right>
      <v-icon>mdi-chat-processing</v-icon>
    </v-btn>

    <div class="text-center">
      <v-bottom-sheet v-model="sheet" scrollable inset>
        <v-card>
          <v-card-title>Chat</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 400px; maring:0px; padding:0px">
            <messages-list :messages="messages" :customerId="'1'" />
          </v-card-text>
          <v-divider></v-divider>
          <div style="display:flex">
            <div
              style="display:flex;align-items: flex-end;padding-bottom: 16px"
            >
              <v-btn text icon color="pink">
                <v-icon>mdi-file</v-icon>
              </v-btn>
            </div>
            <div style="flex:1;">
              <v-textarea
                v-model="text"
                :auto-grow="true"
                :clearable="true"
                :outlined="outlined"
                :persistent-hint="persistentHint"
                :placeholder="placeholder"
                :rounded="rounded"
                :row-height="rowHeight"
                :rows="rows"
                :shaped="shaped"
                :single-line="singleLine"
                :solo="solo"
              ></v-textarea>
            </div>
            <div
              style="display:flex;align-items: flex-end; padding-bottom: 16px"
            >
              <v-btn @click="sendMessage" text icon color="pink">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>

<script>
import { customersCollection } from '../plugins/firebase'
import MessagesList from '@/components/MessagesList.vue'

export default {
  components: { MessagesList },
  data: () => ({
    autoGrow: false,
    clearable: false,
    hint: '',
    model: '',
    outlined: false,
    persistentHint: false,
    placeholder: 'Type here',
    rounded: false,
    rowHeight: 24,
    rows: 1,
    shaped: false,
    singleLine: false,
    solo: false,
    sheet: false,
    text: '',
    messages: []
  }),
  mounted() {
    customersCollection
      .doc('1')
      .collection('messages')
      .orderBy('timeStamp', 'asc')
      .onSnapshot((snap) => {
        this.messages = snap.docs.map((doc) => doc.data())
      })
  },
  methods: {
    sendMessage() {
      const docRef = customersCollection
        .doc(`1`)
        .collection('messages')
        .doc()
      docRef.set({
        id: docRef.id,
        senderName: '1',
        senderId: '1',
        receiverName: 'customerSupportAgentId',
        receiverId: 'customerSupportAgentId',
        timeStamp: Date.now(),
        text: this.text,
        document: null
      })
      this.text = ''
    }
  }
}
</script>

<style></style>
