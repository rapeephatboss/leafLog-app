"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Droplets, FlaskConical, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Plant } from "./plant-card"

interface NotificationPanelProps {
  plants: Plant[]
  isOpen: boolean
  onClose: () => void
}

interface Notification {
  id: string
  plantName: string
  type: "water" | "fertilize" | "health"
  message: string
  icon: typeof Droplets
  colorClass: string
  time: string
}

function generateNotifications(plants: Plant[]): Notification[] {
  const notifications: Notification[] = []

  for (const plant of plants) {
    if (plant.needsWater) {
      notifications.push({
        id: `water-${plant.id}`,
        plantName: plant.name,
        type: "water",
        message: `${plant.name} ขาดน้ำ - รดน้ำครั้งสุดท้าย ${plant.lastWatered}`,
        icon: Droplets,
        colorClass: "bg-primary/10 text-primary",
        time: "ตอนนี้",
      })
    }
    if (plant.needsFertilize) {
      notifications.push({
        id: `fertilize-${plant.id}`,
        plantName: plant.name,
        type: "fertilize",
        message: `${plant.name} ต้องการปุ๋ย - ใส่ปุ๋ยครั้งสุดท้าย ${plant.lastFertilized}`,
        icon: FlaskConical,
        colorClass: "bg-accent/15 text-accent-foreground",
        time: "ตอนนี้",
      })
    }
    if (plant.health < 50) {
      notifications.push({
        id: `health-${plant.id}`,
        plantName: plant.name,
        type: "health",
        message: `${plant.name} สุขภาพไม่ค่อยดี (${plant.health}%) - ควรดูแลเพิ่มเติม`,
        icon: AlertTriangle,
        colorClass: "bg-destructive/10 text-destructive",
        time: "ตอนนี้",
      })
    }
  }

  return notifications
}

export function NotificationPanel({ plants, isOpen, onClose }: NotificationPanelProps) {
  const notifications = generateNotifications(plants)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 top-4 z-50 mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-card-foreground">
                  การแจ้งเตือน
                </h2>
                {notifications.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                    {notifications.length}
                  </span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-muted-foreground"
                aria-label="ปิดการแจ้งเตือน"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Notification List */}
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-primary/40" />
                  <p className="text-sm font-medium text-muted-foreground">
                    ไม่มีการแจ้งเตือน
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    ต้นไม้ทุกต้นสุขภาพดี
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {notifications.map((notification, i) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      <Card className="flex items-start gap-3 border-0 bg-muted/50 p-3">
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notification.colorClass}`}
                        >
                          <notification.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-medium leading-relaxed text-card-foreground">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
