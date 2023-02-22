import { acceptHMRUpdate, defineStore } from 'pinia'

interface Message {
  origin: string
  msg: string[]
  dateTime: string
}

export const useChatStore = defineStore('chat', () => {
  const conversation = ref<Message[]>([])

  const storageKey = 'chat-history'
  const getChatHistory = () => {
    if (localStorage.getItem(storageKey))
      conversation.value = JSON.parse(localStorage.getItem(storageKey) as string)
  }
  const setChatHistory = () => {
    localStorage.setItem(storageKey, JSON.stringify(conversation.value))
  }

  function pushMessage(origin: string, msg: string, dateTime: Date) {
    const message = {
      origin,
      dateTime: dateTime.toISOString(),
      msg: msg.split('\n'),
    }
    conversation.value.push(message)
    setChatHistory()
  }

  return {
    conversation,
    pushMessage,
    getChatHistory,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useChatStore, import.meta.hot))
