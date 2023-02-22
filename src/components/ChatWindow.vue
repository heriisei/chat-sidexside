<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useChatStore } from '~/store/chat'

const props = defineProps<{
  side: string
}>()

const scrollToBottom = () => {
  setTimeout(() => {
    const chatWrapperEl = document.querySelectorAll('.chat-wrapper') as NodeListOf<HTMLElement>
    chatWrapperEl.forEach((el: HTMLElement) => el.scrollTop = el.scrollHeight)
  }, 100)
}

const chat = useChatStore()
const { conversation } = storeToRefs(chat)
const { pushMessage, getChatHistory } = chat

onMounted(() => {
  getChatHistory()
  scrollToBottom()
})

const message = ref<string>('')
const clearInput = () => message.value = ''
const sendMessage = () => {
  pushMessage(props.side, message.value, new Date())
  scrollToBottom()
  clearInput()
}
</script>

<template>
  <section class="w-full h-100vh p-1rem">
    <div class="h-full overflow-scroll rounded-lg bg-#343434 relative">
      <header class="text-left text-#000 py-.25rem px-.5rem bg-#afafaf absolute top-0 w-full capitalize">
        <h2>{{ props?.side }} team</h2>
      </header>
      <div class="chat-wrapper mt-3rem mb-4rem px-1rem overflow-scroll">
        <div class="chat-inner flex flex-col justify-end items-end">
          <div v-for="msg in conversation" :key="msg.dateTime" class="flex flex-col my-.5rem max-w-95% relative"
            :class="msg.origin !== side ? 'self-start' : 'self-end'">
            <div class="py-.5rem px-1rem rounded-md chat-bubble"
              :class="msg.origin !== side ? 'bg-#216398 left' : 'bg-#515151 right'">
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
        <form id="formChat" class="flex items-center h-4rem gap-1rem text-#000 py-.25rem px-.5rem">
          <label for="messageInput" class="sr-only">Message</label>
          <textarea id="messageInput" v-model="message" name="messageInput" cols="30" rows="1"
            class="w-full resize-none p-0.5rem grow h-full rounded-md" @keypress.enter.exact.prevent="sendMessage" />
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
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  overflow: hidden;
  transition: width ease 1.5s;
  position: relative;
}

.chat-bubble.left {
  animation-name: loadMessageLeft;
}

.chat-bubble.right {
  animation-name: loadMessageRight;
}

@keyframes loadMessageLeft {
  0% {
    opacity: 0;
    left: -0.5rem;
  }

  50% {
    left: 0.5rem;
  }

  100% {
    opacity: 1;
    left: 0;
  }
}

@keyframes loadMessageRight {
  0% {
    opacity: 0;
    right: -0.5rem;
  }

  50% {
    right: 0.5rem;
  }

  100% {
    opacity: 1;
    right: 0;
  }
}
</style>
