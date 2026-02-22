"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Droplets, Scissors, FlaskConical, Check } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Task {
  id: string
  plant: string
  type: "water" | "prune" | "fertilize"
  time: string
}

const initialTasks: Task[] = [
  { id: "1", plant: "มอนสเตอร่า", type: "water", time: "08:00" },
  { id: "2", plant: "ลิ้นมังกร", type: "fertilize", time: "09:00" },
  { id: "3", plant: "ไทรใบสัก", type: "prune", time: "10:00" },
  { id: "4", plant: "พอทอส", type: "water", time: "14:00" },
]

function getTaskIcon(type: Task["type"]) {
  switch (type) {
    case "water": return Droplets
    case "prune": return Scissors
    case "fertilize": return FlaskConical
  }
}

function getTaskLabel(type: Task["type"]) {
  switch (type) {
    case "water": return "รดน้ำ"
    case "prune": return "ตัดแต่ง"
    case "fertilize": return "ให้ปุ๋ย"
  }
}

function getTaskColors(type: Task["type"]) {
  switch (type) {
    case "water": return "bg-primary/10 text-primary border-primary/15"
    case "prune": return "bg-accent/15 text-accent-foreground border-accent/20"
    case "fertilize": return "bg-secondary text-secondary-foreground border-secondary"
  }
}

export function CareSchedule() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const toggleTask = (id: string) => {
    setCompletedTasks((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const completedCount = completedTasks.size
  const totalCount = initialTasks.length

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">
          ตารางวันนี้
        </h2>
        <span className="text-xs font-medium text-muted-foreground">
          {completedCount}/{totalCount} เสร็จแล้ว
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {initialTasks.map((task) => {
            const isCompleted = completedTasks.has(task.id)
            const Icon = getTaskIcon(task.type)
            const colors = getTaskColors(task.type)

            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Card
                  className={`flex cursor-pointer items-center gap-3 border p-3 transition-all ${
                    isCompleted ? "opacity-50" : ""
                  }`}
                  onClick={() => toggleTask(task.id)}
                  role="button"
                  aria-label={`${getTaskLabel(task.type)} ${task.plant}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${colors}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium text-card-foreground ${
                        isCompleted ? "line-through" : ""
                      }`}
                    >
                      {getTaskLabel(task.type)} - {task.plant}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.time} น.</p>
                  </div>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {isCompleted && <Check className="h-3.5 w-3.5" />}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}
