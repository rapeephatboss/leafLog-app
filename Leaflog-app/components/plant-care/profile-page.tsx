"use client"

import { LogOut, Bell, Moon, HelpCircle, ChevronRight, Leaf } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface ProfilePageProps {
  onLogout: () => void
}

const menuItems = [
  { icon: Bell, label: "การแจ้งเตือน", description: "จัดการการแจ้งเตือนรดน้ำ" },
  { icon: Moon, label: "ธีม", description: "สลับโหมดมืด/สว่าง" },
  { icon: HelpCircle, label: "ช่วยเหลือ", description: "คำถามที่พบบ่อย" },
]

export function ProfilePage({ onLogout }: ProfilePageProps) {
  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <h1 className="mb-6 text-xl font-bold text-foreground">โปรไฟล์</h1>

      <Card className="mb-6 p-5">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-lg font-bold text-primary">
              LL
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-card-foreground">Plant Lover</h2>
            <p className="text-sm text-muted-foreground">plant@example.com</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-primary">
              <Leaf className="h-3.5 w-3.5" />
              <span className="font-medium">ดูแลต้นไม้มาแล้ว 5 ต้น</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-6 overflow-hidden">
        {menuItems.map((item, index) => (
          <div key={item.label}>
            <button className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-muted/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <item.icon className="h-4.5 w-4.5 text-secondary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
            {index < menuItems.length - 1 && <Separator />}
          </div>
        ))}
      </Card>

      <Button
        variant="outline"
        onClick={onLogout}
        className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="mr-2 h-4 w-4" />
        ออกจากระบบ
      </Button>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Leaflog v1.0.0
      </p>
    </div>
  )
}
