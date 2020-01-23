<template>
  <div>
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

<style></style>
