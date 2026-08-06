'use client'

interface Tab {
  id: string
  label: string
  count?: number
}

interface SearchResultTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function SearchResultTabs({ tabs, activeTab, onTabChange }: SearchResultTabsProps) {
  return (
    <div className="border-b border-border">
      <div className="flex gap-6 px-6 py-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap px-1 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && <span className="ml-2 text-xs text-muted-foreground">({tab.count})</span>}
          </button>
        ))}
      </div>
    </div>
  )
}


