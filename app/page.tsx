"use client"

import { useState } from "react"
import { DemographicForm } from "@/components/demographic-form"
import { TestSelector } from "@/components/test-selector"

export interface DemographicData {
  age: string
  gender: string
  education: string
  ethnicity: string
}

export default function Home() {
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null)

  const handleDemographicComplete = (data: DemographicData) => {
    setDemographicData(data)
    // Store demographic data in localStorage for access across routes
    localStorage.setItem("demographicData", JSON.stringify(data))
  }

  return (
    <div className="min-h-screen bg-white">
      {!demographicData ? <DemographicForm onComplete={handleDemographicComplete} /> : <TestSelector />}
    </div>
  )
}
