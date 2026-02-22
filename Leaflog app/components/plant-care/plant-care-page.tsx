"use client"

import { motion } from "framer-motion"
import {
  Leaf,
  Droplets,
  AlertTriangle,
  TrendingUp,
  Plus,
  Search,
  Bell,
  Sun,
  CloudRain,
  Lightbulb,
  FlaskConical,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlantCard, type Plant } from "./plant-card"
import { CareSchedule } from "./care-schedule"

const plants: Plant[] = [
  {
    id: "1",
    name: "มอนสเตอร่า",
    species: "Monstera deliciosa",
    image: "/images/monstera.jpg",
    health: 92,
    waterLevel: 75,
    light: "medium",
    lastWatered: "วันนี้",
    needsWater: false,
    lastFertilized: "2 สัปดาห์ก่อน",
    needsFertilize: true,
  },
  {
    id: "2",
    name: "ลิ้นมังกร",
    species: "Sansevieria trifasciata",
    image: "/images/snake-plant.jpg",
    health: 88,
    waterLevel: 40,
    light: "low",
    lastWatered: "2 วันก่อน",
    needsWater: true,
    lastFertilized: "1 สัปดาห์ก่อน",
    needsFertilize: false,
  },
  {
    id: "3",
    name: "ไทรใบสัก",
    species: "Ficus lyrata",
    image: "/images/fiddle-leaf.jpg",
    health: 65,
    waterLevel: 30,
    light: "high",
    lastWatered: "3 วันก่อน",
    needsWater: true,
    lastFertilized: "3 สัปดาห์ก่อน",
    needsFertilize: true,
  },
  {
    id: "4",
    name: "พอทอส",
    species: "Epipremnum aureum",
    image: "/images/pothos.jpg",
    health: 95,
    waterLevel: 60,
    light: "low",
    lastWatered: "เมื่อวาน",
    needsWater: false,
    lastFertilized: "5 วันก่อน",
    needsFertilize: false,
  },
  {
    id: "5",
    name: "กุหลาบหิน",
    species: "Echeveria elegans",
    image: "/images/succulent.jpg",
    health: 45,
    waterLevel: 20,
    light: "high",
    lastWatered: "5 วันก่อน",
    needsWater: true,
    lastFertilized: "1 เดือนก่อน",
    needsFertilize: true,
  },
]

const stats = [
  {
    label: "ต้นไม้ทั้งหมด",
    value: "5",
    icon: Leaf,
    color: "bg-primary/10 text-primary",
  },
  {
    label: "ต้องรดน้ำ",
    value: "3",
    icon: Droplets,
    color: "bg-primary/8 text-primary",
  },
  {
    label: "ต้องใส่ปุ๋ย",
    value: "3",
    icon: FlaskConical,
    color: "bg-accent/15 text-accent-foreground",
  },
  {
    label: "ต้องดูแลเพิ่ม",
    value: "1",
    icon: AlertTriangle,
    color: "bg-accent/15 text-accent-foreground",
  },
  {
    label: "สุขภาพดี",
    value: "77%",
    icon: TrendingUp,
    color: "bg-secondary text-secondary-foreground",
  },
]

const tips = [
  "ช่วงหน้าร้อน ควรรดน้ำเช้าหรือเย็น หลีกเลี่ยงรดน้ำตอนแดดจัด",
  "ต้นมอนสเตอร่าชอบดินชื้นแต่ไม่แฉะ ควรรอให้หน้าดินแห้งก่อนรดน้ำ",
  "ลิ้นมังกรทนแล้งได้ดี ไม่ควรรดน้ำบ่อยเกินไปจะทำให้รากเน่า",
  "ควรให้ปุ๋ยทุก 2-4 สัปดาห์ในช่วงฤดูเจริญเติบโต และลดลงในฤดูหนาว",
]

export function PlantCarePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-4">
      {/* Header */}
      <header className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">สวัสดีตอนเช้า</p>
          <h1 className="text-xl font-bold text-foreground">สวนของฉัน</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground" aria-label="ค้นหา">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground" aria-label="แจ้งเตือน">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
        </div>
      </header>

      {/* Weather Banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-5 overflow-hidden border-0 bg-primary p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium opacity-80">สภาพอากาศวันนี้</p>
              <p className="mt-1 text-2xl font-bold">32°C</p>
              <div className="mt-1 flex items-center gap-3 text-xs opacity-80">
                <span className="flex items-center gap-1">
                  <Sun className="h-3.5 w-3.5" />
                  แดดจัด
                </span>
                <span className="flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5" />
                  ความชื้น 65%
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CloudRain className="h-10 w-10 opacity-80" />
              <span className="text-[10px] font-medium opacity-70">พรุ่งนี้ฝนตก</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-6 grid grid-cols-3 gap-2 sm:grid-cols-5"
      >
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="flex flex-col items-center gap-1.5 border-0 bg-card p-3 shadow-sm"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-card-foreground">{stat.value}</span>
            <span className="text-center text-[10px] leading-tight text-muted-foreground">
              {stat.label}
            </span>
          </Card>
        ))}
      </motion.div>

      {/* Plant Grid */}
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">ต้นไม้ของฉัน</h2>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs text-primary">
            <Plus className="h-3.5 w-3.5" />
            เพิ่มต้นไม้
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {plants.map((plant, i) => (
            <PlantCard key={plant.id} plant={plant} index={i} />
          ))}
        </div>
      </section>

      {/* Care Schedule */}
      <div className="mb-6">
        <CareSchedule />
      </div>

      {/* Tips */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mb-4"
      >
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-accent" />
          <h2 className="text-base font-semibold text-foreground">เคล็ดลับการดูแล</h2>
        </div>
        <div className="flex flex-col gap-2">
          {tips.map((tip, i) => (
            <Card key={i} className="flex items-start gap-3 border-0 bg-secondary/50 p-3">
              <Badge
                variant="secondary"
                className="mt-0.5 shrink-0 bg-primary/10 text-primary"
              >
                {i + 1}
              </Badge>
              <p className="text-xs leading-relaxed text-secondary-foreground">{tip}</p>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
