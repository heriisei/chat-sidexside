<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'

const props = defineProps<{
  side: string
}>()

const chat = useChatStore()
const { conversation } = storeToRefs(chat)
const { pushMessage, getChatHistory } = chat
getChatHistory()

const message = ref<string>('')
const clearInput = () => message.value = ''
const sendMessage = () => {
  pushMessage(props.side, message.value, new Date())
  clearInput()
}
</script>

<template>
  <section class="w-full h-100vh p-1rem">
    <div class="h-full overflow-scroll rounded-lg bg-#343434 relative">
      <header class="text-left text-#000 py-.25rem px-.5rem bg-#afafaf absolute top-0 w-full capitalize">
        <h2>{{ `${props.side} team` }}</h2>
      </header>
      <div class="chat-wrapper mt-3rem mb-4rem px-1rem overflow-scroll">
        <div class="chat-inner flex flex-col justify-end items-end">
          <div v-for="msg in conversation" :key="msg.dateTime" class="flex flex-col my-.5rem max-w-95%"
            :class="msg.origin !== side ? 'self-start' : 'self-end'">
            <div class="py-.5rem px-1rem rounded-md chat-bubble"
              :class="msg.origin !== side ? 'bg-#216398' : 'bg-#515151'">
              <template v-for="(p, index) in msg.msg" :key="index">
                <p>
                  {{ p }}
                </p>
                <br v-if="msg.msg.length > 1 && index !== msg.msg.length - 1">
              </template>
            </div>
            <div class="text-.75rem text-right">
              <time>
                {{ `${new Date(msg.dateTime).getHours()}:${new Date(msg.dateTime).getMinutes()}` }}
              </time>
            </div>
          </div>
        </div>
      </div>
      <footer class="bg-#afafaf absolute bottom-0 w-full px-1rem">
        <form class="flex items-center h-4rem gap-1rem text-#000 py-.25rem px-.5rem">
          <textarea id="message" v-model="message" name="message" cols="30" rows="1"
            class="w-full resize-none p-0.5rem grow h-full rounded-md" @keypress.enter.exact="sendMessage" />
          <button class="w-5rem grow h-full text-center text-#fff rounded-md bg-#216398 hover:bg-#1c517d"
            @click.prevent="sendMessage">
            Send
          </button>
        </form>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.chat-wrapper {
  height: calc(100% - 7rem);
}

.chat-bubble {
  animation-name: newmessage;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  overflow: hidden;
  transition: width ease 1.5s;
}

@keyframes newmessage {
  0% {
    width: 0px;
    opacity: 0;
    white-space: nowrap;
  }

  100% {
    width: auto;
    opacity: 1;
    white-space: unset;
  }
}
</style>
