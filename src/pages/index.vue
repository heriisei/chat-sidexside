<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="flex gap-2rem">
    <ChatWindow side="west" />
    <ChatWindow side="east" />
  </div>
</template>

<style></style>
