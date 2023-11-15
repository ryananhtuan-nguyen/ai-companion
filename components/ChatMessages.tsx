'use client'

import { Companion, Message } from '@prisma/client'
import ChatMessage from './ChatMessage'

interface ChatMessagesProps {
  messages: any[]
  isLoading: boolean
  companion: Companion
}

const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      <ChatMessage
        role="user"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
    </div>
  )
}

export default ChatMessages
