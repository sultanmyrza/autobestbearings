<template>
  <div>
    <v-list ref="v-list-messages" three-line>
      <template v-for="message in messages">
        <v-list-item :key="message.id">
          <v-list-item-avatar>
            <img
              v-if="message.senderId == customerId"
              src="~/assets/client.png"
            />
            <img v-else src="~/assets/agent.png" />
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
export default {
  props: {
    messages: { type: Array, default: () => [] },
    customerId: { type: String, default: () => '' }
  },
  watch: {
    messages(e) {}
  }
}
</script>

<style></style>
