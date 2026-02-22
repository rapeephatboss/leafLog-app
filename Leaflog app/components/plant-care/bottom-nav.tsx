"use client"

import { Home, User } from "lucide-react"

type Tab = "home" | "profile"

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: "home", label: "หน้าหลัก", icon: Home },
  { id: "profile", label: "โปรไฟล์", icon: User },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md"
      role="tablist"
      aria-label="เมนูหลัก"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-3 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-[11px] font-medium">{tab.label}</span>
              {isActive && (
                <span className="absolute bottom-0 h-0.5 w-10 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
