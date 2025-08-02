"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { GeneralInstructions } from "@/components/general-instructions"
import { IATTest } from "@/components/iat-test"
import { Results } from "@/components/results"
import { testConfigs } from "@/lib/test-configs"
import type { DemographicData } from "@/app/page"

export interface TestResults {
  dScore: number
  remove: boolean
  stage3RT: number[]
  stage4RT: number[]
  stage6RT: number[]
  stage7RT: number[]
  totalTrials: number
  shortTrials: number
}

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.testId as string

  const [currentStep, setCurrentStep] = useState<"instructions" | "test" | "results">("instructions")
  const [testResults, setTestResults] = useState<TestResults | null>(null)
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null)

  useEffect(() => {
    // Check if demographic data exists
    const storedData = localStorage.getItem("demographicData")
    if (!storedData) {
      router.push("/")
      return
    }
    setDemographicData(JSON.parse(storedData))

    // Check if test configuration exists
    if (!testConfigs[testId]) {
      router.push("/")
      return
    }
  }, [testId, router])

  const handleInstructionsComplete = () => {
    setCurrentStep("test")
  }

  const handleTestComplete = (results: TestResults) => {
    setTestResults(results)
    setCurrentStep("results")
  }

  const handleRestart = () => {
    router.push("/")
  }

  const testConfig = testConfigs[testId]

  if (!testConfig || !demographicData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {currentStep === "instructions" && (
        <GeneralInstructions testConfig={testConfig} onComplete={handleInstructionsComplete} />
      )}
      {currentStep === "test" && <IATTest testConfig={testConfig} onComplete={handleTestComplete} />}
      {currentStep === "results" && testResults && (
        <Results results={testResults} testConfig={testConfig} onRestart={handleRestart} />
      )}
    </div>
  )
}
