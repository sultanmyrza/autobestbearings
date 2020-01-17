<template>
  <div>
    <v-btn @click="sheet = !sheet" bottom color="pink" dark fab fixed right>
      <v-icon>mdi-chat-processing</v-icon>
    </v-btn>

    <div class="text-center">
      <v-bottom-sheet v-model="sheet" scrollable inset>
        <v-card v-if="!authorized">
          <v-card-title>Chat</v-card-title>
          <v-divider></v-divider>
          <v-flex class="text-center">
            <blockquote class="blockquote">
              &#8220;Please write your name and you company name so we can chat
              instantly&#8221;
              <footer>
                <small>
                  <em>&mdash; manager of AUTO BEST BEARINGS CO., LTD</em>
                </small>
              </footer>
            </blockquote>
            <customer-profile @submitForm="processCompanyInfo" />
          </v-flex>
        </v-card>
        <v-card v-else>
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
import CustomerProfile from '@/components/CustomerProfile.vue'
export default {
  components: { MessagesList, CustomerProfile },
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
    messages: [],
    authorized: false
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
    },
    processCompanyInfo({ companyName, customerName }) {
      console.log(companyName)
      console.log(customerName)
    }
  }
}
</script>

<style></style>
