"use client"

import { motion } from "framer-motion"
import { Droplets, Sun, Heart, FlaskConical } from "lucide-react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export interface Plant {
  id: string
  name: string
  species: string
  image: string
  health: number
  waterLevel: number
  light: "low" | "medium" | "high"
  lastWatered: string
  needsWater: boolean
  lastFertilized: string
  needsFertilize: boolean
}

interface PlantCardProps {
  plant: Plant
  index: number
}

function getHealthColor(health: number) {
  if (health >= 80) return "text-primary"
  if (health >= 50) return "text-accent-foreground"
  return "text-destructive"
}

function getHealthLabel(health: number) {
  if (health >= 80) return "สุขภาพดี"
  if (health >= 50) return "ปานกลาง"
  return "ต้องดูแล"
}

function getLightLabel(light: "low" | "medium" | "high") {
  switch (light) {
    case "low": return "แสงน้อย"
    case "medium": return "แสงปานกลาง"
    case "high": return "แสงมาก"
  }
}

export function PlantCard({ plant, index }: PlantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
    >
      <Card className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={plant.image}
            alt={plant.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {plant.needsWater && (
              <Badge className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <Droplets className="h-3 w-3" />
                ต้องรดน้ำ
              </Badge>
            )}
            {plant.needsFertilize && (
              <Badge className="gap-1 bg-accent text-accent-foreground hover:bg-accent/90">
                <FlaskConical className="h-3 w-3" />
                ต้องใส่ปุ๋ย
              </Badge>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <div>
            <h3 className="text-sm font-semibold text-card-foreground leading-tight">
              {plant.name}
            </h3>
            <p className="text-xs text-muted-foreground">{plant.species}</p>
          </div>

          <div className="flex items-center gap-1.5">
            <Heart className={`h-3.5 w-3.5 ${getHealthColor(plant.health)}`} />
            <Progress value={plant.health} className="h-1.5 flex-1" />
            <span className={`text-[10px] font-medium ${getHealthColor(plant.health)}`}>
              {getHealthLabel(plant.health)}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-[10px] text-muted-foreground">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Droplets className="h-3 w-3" />
                รดน้ำ: {plant.lastWatered}
              </span>
              <span className="flex items-center gap-1">
                <Sun className="h-3 w-3" />
                {getLightLabel(plant.light)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FlaskConical className="h-3 w-3" />
              ใส่ปุ๋ย: {plant.lastFertilized}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
