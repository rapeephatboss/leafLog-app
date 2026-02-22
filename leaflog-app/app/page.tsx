"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { PlantCarePage } from "@/components/plant-care/plant-care-page"
import { LoginPage } from "@/components/plant-care/login-page"
import { ProfilePage } from "@/components/plant-care/profile-page"
import { BottomNav } from "@/components/plant-care/bottom-nav"

type AuthStatus = "guest" | "authenticated"
type Tab = "home" | "profile"

export default function Page() {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("guest")
  const [activeTab, setActiveTab] = useState<Tab>("home")

  const handleLogin = () => {
    setAuthStatus("authenticated")
    setActiveTab("home")
  }

  const handleLogout = () => {
    setAuthStatus("guest")
    setActiveTab("home")
  }

  if (authStatus === "guest") {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {activeTab === "home" ? (
          <motion.main
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="pb-20"
          >
            <PlantCarePage />
          </motion.main>
        ) : (
          <motion.main
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className="pb-20"
          >
            <ProfilePage onLogout={handleLogout} />
          </motion.main>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
