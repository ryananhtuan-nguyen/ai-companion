'use client'

import ChatHeader from '@/components/ChatHeader'
import { Companion, Message } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useCompletion } from 'ai/react'
import ChatForm from '@/components/ChatForm'
import ChatMessages from '@/components/ChatMessages'

interface ChatClientProps {
  companion: Companion & {
    messages: Message[]
    _count: {
      messages: number
    }
  }
}

const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter()

  const [messages, setMessages] = useState<any[]>(companion.messages)

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(_, completion) {
        const systemMessage = {
          role: 'system',
          content: completion,
        }
        setMessages((current) => [...current, systemMessage])
        setInput('')

        router.refresh()
      },
    })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: 'user',
      content: input,
    }

    setMessages((current) => [...current, userMessage])

    handleSubmit(e)
  }

  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <ChatMessages
        messages={messages}
        companion={companion}
        isLoading={isLoading}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ChatClient
