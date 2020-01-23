<template>
  <div class="message-form-container">
    <v-card style="border-radius:0px;" shaped>
      <MessageSuggestionPanel />

      <div class="message-form">
        <div class="left-button">
          <v-btn text icon color="pink">
            <v-icon large>mdi-file</v-icon>
          </v-btn>
        </div>

        <v-textarea
          v-model="text"
          :auto-grow="autoGrow"
          :clearable="clearable"
          :filled="filled"
          :flat="flat"
          :hint="hint"
          :label="label"
          :loading="loading"
          :no-resize="noResize"
          :outlined="outlined"
          :persistent-hint="persistentHint"
          :placeholder="placeholder"
          :rounded="rounded"
          :row-height="rowHeight"
          :rows="rows"
          :shaped="shaped"
          :single-line="singleLine"
          :solo="solo"
          dense
          class="ma-0 pa-0"
        />

        <div class="right-button">
          <v-btn @click="sendMessage" text icon color="pink">
            <v-icon large>mdi-send</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import { customersCollection } from '../plugins/firebase'
import MessageSuggestionPanel from '@/components/MessageSuggestionPanel.vue'

export default {
  components: {
    MessageSuggestionPanel
  },
  props: {
    customerId: {
      type: String,
      default: () => ''
    }
  },
  data: () => ({
    autoGrow: true,
    autofocus: true,
    clearable: true,
    counter: 0,
    filled: true,
    flat: true,
    hint: '',
    label: '',
    loading: false,
    model: 'Type Here.',
    noResize: false,
    outlined: true,
    persistentHint: false,
    placeholder: '',
    rounded: true,
    rowHeight: 24,
    rows: 1,
    shaped: false,
    singleLine: true,
    solo: true,
    text: ''
  }),
  methods: {
    sendMessage() {
      const docRef = customersCollection
        .doc(this.customerId)
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
      customersCollection.doc(this.customerId).update({
        lastMessage: {
          senderName: 'customerSupportAgentId',
          text: this.text
        }
      })
      this.text = ''
    }
  }
}
</script>
<style scoped>
.message-form-container {
  position: sticky;
  bottom: -8px;
  left: 16px;
  right: 16px;
}
.message-form {
  display: flex;
  margin-top: 8px;
}
.left-button {
  display: flex;
  align-items: flex-end;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 28px;
}
.right-button {
  display: flex;
  align-items: flex-end;
  margin-right: 8px;
  margin-left: 8px;
  margin-bottom: 28px;
}
</style>
