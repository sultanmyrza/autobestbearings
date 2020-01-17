<template>
  <div>
    <v-btn @click="sheet = !sheet" bottom color="pink" dark fab fixed right>
      <v-icon>mdi-chat-processing</v-icon>
    </v-btn>

    <div class="text-center">
      <v-bottom-sheet v-model="sheet" scrollable inset>
        <v-card v-if="!customerId">
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
            <messages-list :messages="messages" :customerId="customerId" />
          </v-card-text>
          <v-divider></v-divider>
          <div style="display:flex">
            <div
              style="display:flex;align-items: flex-end;padding-bottom: 16px"
            >
              <v-btn @click="logoutAnonymousUser" text icon color="pink">
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
import {
  customersCollection,
  getAnonymousUser,
  auth
} from '../plugins/firebase'
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
    customerId: null,
    companyName: null,
    customerName: null
  }),
  mounted() {
    this.loginUserAnonymouosly()
  },
  methods: {
    sendMessage() {
      const docRef = customersCollection
        .doc(this.customerId)
        .collection('messages')
        .doc()
      docRef.set({
        id: docRef.id,
        senderName: this.customerName,
        senderId: this.customerId,
        receiverName: 'customerSupportAgentId',
        receiverId: 'customerSupportAgentId',
        timeStamp: Date.now(),
        text: this.text,
        document: null
      })
      customersCollection.doc(this.customerId).update({
        lastMessage: {
          senderName: this.customerName,
          text: this.text
        }
      })
      this.text = ''
    },
    subscribeToMessages() {
      customersCollection
        .doc(this.customerId)
        .collection('messages')
        .orderBy('timeStamp', 'asc')
        .onSnapshot((snap) => {
          this.messages = snap.docs.map((doc) => doc.data())
        })
    },
    loginUserAnonymouosly() {
      // TODO handle edge case errors etc

      return getAnonymousUser().then((anonUser) => {
        if (anonUser) {
          this.customerId = anonUser.uid
          this.subscribeToMessages()
        }
        return anonUser
      })
    },
    logoutAnonymousUser() {
      auth.signOut().then((result) => {
        this.customerId = null
        this.customerName = ''
        this.companyName = ''
      })
    },
    processCompanyInfo({ companyName, customerName }) {
      this.customerName = customerName
      this.companyName = companyName
      this.loginUserAnonymouosly().then((anonUser) => {
        customersCollection.doc(anonUser.uid).set({
          id: anonUser.uid,
          companyName,
          lastMessage: {
            senderName: 'customerSupportAgentId',
            text: 'New user. lets write something to him'
          }
        })
      })
    }
  }
}
</script>

<style></style>
