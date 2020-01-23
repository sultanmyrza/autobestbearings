<template>
  <div>
    <v-list three-line>
      <template v-for="message in messages">
        <v-list-item :key="message.id">
          <v-list-item-avatar>
            <v-img
              v-if="message.senderId === $route.params.customerId"
              src="../assets/client.png"
            ></v-img>
            <v-img v-else src="../assets/agent.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="message.senderName"></v-list-item-title>
            <v-list-item-subtitle v-html="message.text"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
import { customersCollection } from '../plugins/firebase'

export default {
  data: () => ({
    messages: []
  }),
  watch: {
    $route(to) {
      const { customerId } = to.params
      console.log(customerId)

      customersCollection
        .doc(customerId)
        .collection('messages')
        .orderBy('timeStamp', 'asc')
        .onSnapshot((snap) => {
          this.messages = snap.docs.map((doc) => doc.data())
        })
    }
  },
  mounted() {
    const { customerId } = this.$route.params
    customersCollection
      .doc(customerId)
      .collection('messages')
      .orderBy('timeStamp', 'asc')
      .onSnapshot((snap) => {
        this.messages = snap.docs.map((doc) => doc.data())
      })
  }
}
</script>

<style></style>
