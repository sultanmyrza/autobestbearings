<template>
  <div class="scrollmenu">
    <v-chip v-for="suggestion in suggestions" :key="suggestion" class="ma-2">
      {{ suggestion }}
    </v-chip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      suggestions: [
        'Welcome to autobearings.com',
        'Can I help you?',
        'What kind of products you are interested in?'
      ]
    }
  }
}
</script>

<style scoped>
.suggestions {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

div.scrollmenu {
  background-color: #333;
  overflow: auto;
  white-space: nowrap;
}
div.scrollmenu::-webkit-scrollbar {
  display: none;
}
</style>
