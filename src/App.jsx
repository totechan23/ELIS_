import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
import { FloatingInput } from './components/FloatingInput'

const initialMessage = {
  id: 'welcome',
  role: 'assistant',
  text: "Hi, I’m ELIS. Ask me anything, I’ll make it simple.",
}

const smartActions = ['Simplify more', 'Show example', 'Visualize']

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [messages, setMessages] = useState([initialMessage])
  const [showSmartActions, setShowSmartActions] = useState(false)

  const handleSend = (content) => {
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: content,
    }

    const aiMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: `Here’s a clean summary: ${content}`,
    }

    setMessages((prev) => [...prev, userMessage])

    window.setTimeout(() => {
      setMessages((prev) => [...prev, aiMessage])
      setShowSmartActions(true)
    }, 320)
  }

  const applySmartAction = (action) => {
    handleSend(action)
  }

  return (
    <div className="h-screen bg-canvas text-text antialiased">
      <div className="flex h-full">
        <Sidebar
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="relative flex flex-1 justify-center overflow-hidden">
          <section className="w-full max-w-chat px-8 pb-44 pt-16">
            <div className="space-y-8">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.article
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                    className="space-y-2"
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">
                      {message.role === 'assistant' ? 'ELIS' : 'You'}
                    </p>
                    <p className="text-[15px] leading-7 text-text">{message.text}</p>
                  </motion.article>
                ))}
              </AnimatePresence>

              {showSmartActions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {smartActions.map((action) => (
                    <button
                      type="button"
                      key={action}
                      onClick={() => applySmartAction(action)}
                      className="rounded-elis border border-line bg-white px-3 py-1.5 text-sm text-muted transition-colors hover:bg-[#F7F8F7] hover:text-text"
                    >
                      {action}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </section>

          <FloatingInput onSend={handleSend} />
        </main>
      </div>
    </div>
  )
}
