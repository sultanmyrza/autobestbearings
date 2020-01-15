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
            <messages-list />
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
                v-model="model"
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
              <v-btn text icon color="pink">
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
    message: 'message',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  })
}
</script>

<style></style>
