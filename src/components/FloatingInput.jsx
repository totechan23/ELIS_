import { useState } from 'react'
import { motion } from 'framer-motion'

export function FloatingInput({ onSend }) {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed) return

    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <motion.div
      animate={{ width: isFocused ? 'min(760px, calc(100% - 32px))' : 'min(700px, calc(100% - 32px))' }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className="absolute bottom-7 left-1/2 w-[min(700px,calc(100%-32px))] -translate-x-1/2"
    >
      <div className="flex items-center gap-3 rounded-full border border-line bg-white px-4 py-3">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask ELIS anything..."
          className="w-full bg-transparent text-[15px] text-text outline-none placeholder:text-muted"
          aria-label="Ask ELIS anything"
        />

        <button
          type="button"
          onClick={submit}
          className="rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-colors hover:bg-[#F7F8F7] hover:text-text"
        >
          Send
        </button>
      </div>
    </motion.div>
  )
}
