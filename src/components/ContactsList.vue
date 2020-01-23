<template>
  <!-- <v-toolbar>
      <v-toolbar-title>Contacts</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar> -->

  <v-list three-line>
    <v-subheader>Recent</v-subheader>
    <template v-for="customer in customers">
      <v-list-item :key="customer.id" :to="`/admin/chat/${customer.id}`" exact>
        <v-list-item-avatar>
          <img src="~/assets/client.png" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{ customer.companyName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            <span class="text--primary">{{
              customer.lastMessage.senderName
            }}</span>
            &mdash;
            {{ customer.lastMessage.text }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>
<script>
export default {
  props: { customers: { type: Array, default: () => [] } }
}
</script>
