import { motion } from 'framer-motion'

const history = ['Product positioning notes', 'Roadmap Q2 draft', 'Funnel analysis']

const menu = ['New Chat', 'Create', 'Analyze', 'Settings']

export function Sidebar({ isOpen, onToggle }) {
  return (
    <motion.aside
      animate={{ width: isOpen ? 220 : 72 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="h-full border-r border-line bg-sidebar"
    >
      <div className="flex h-full flex-col px-3 py-4">
        <button
          type="button"
          onClick={onToggle}
          className="mb-6 flex items-center gap-3 rounded-elis p-2 text-left transition-colors hover:bg-[#ECEEEC]"
        >
          <div className="grid h-8 w-8 place-items-center rounded-elis border border-line bg-white text-sm font-semibold">
            E
          </div>
          {isOpen && <span className="text-sm font-medium tracking-wide">ELIS</span>}
        </button>

        <nav className="space-y-1">
          {menu.map((item) => (
            <button
              key={item}
              type="button"
              className="w-full rounded-elis px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-[#ECEEEC] hover:text-text"
            >
              {isOpen ? item : item[0]}
            </button>
          ))}
        </nav>

        <div className="mt-6 border-t border-line pt-4">
          {isOpen && <p className="px-3 text-xs uppercase tracking-[0.12em] text-muted">History</p>}
          <div className="mt-2 space-y-1">
            {history.map((chat) => (
              <button
                key={chat}
                type="button"
                className="w-full truncate rounded-elis px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-[#ECEEEC] hover:text-text"
                title={chat}
              >
                {isOpen ? chat : '•'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
