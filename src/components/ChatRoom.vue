<template>
  <div class="chat-room">
    <MessagesListAgent />
    <MessageForm :customerId="customerId" />
  </div>
</template>

<script>
import MessagesListAgent from '@/components/MessagesListAgent.vue'

import MessageForm from '@/components/MessageForm.vue'
export default {
  components: { MessageForm, MessagesListAgent },
  data: () => ({ customerId: '' }),
  // watch: {
  //   $route(to) {
  //     const { customerId } = to.params;
  //     this.customerId = customerId;

  //     console.log('watch');
  //     console.log(to);
  //     console.log(customerId);
  //   }
  // },
  mounted() {
    this.customerId = this.$route.params.customerId
  }
}
</script>

<style>
.chat-room {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-content: flex-end;
  justify-content: flex-end;
}
</style>
