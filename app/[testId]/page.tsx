"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { GeneralInstructions } from "@/components/general-instructions"
import { IATTest } from "@/components/iat-test"
import { testConfigs } from "@/lib/test-configs"
import type { DemographicData } from "@/app/page"
import { supabase } from "@/lib/supabaseClient" // importamos el cliente
import { CompletionMessage } from "@/components/completion-message"

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

  const [currentStep, setCurrentStep] = useState<"instructions" | "test" | "results" | "saving">("instructions")
  const [testResults, setTestResults] = useState<TestResults | null>(null)
  const [demographicData, setDemographicData] = useState<DemographicData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Obtener datos demográficos guardados localmente (o redirigir)
    const storedData = localStorage.getItem("demographicData")
    if (!storedData) {
      router.push("/")
      return
    }
    setDemographicData(JSON.parse(storedData))

    // Verificar que exista configuración para testId
    if (!testConfigs[testId]) {
      router.push("/")
      return
    }
  }, [testId, router])

  const handleInstructionsComplete = () => {
    setCurrentStep("test")
  }

  // Función para guardar a Supabase
  const saveResultsToSupabase = async (results: TestResults, demographics: DemographicData) => {
    // Calcula avgRT para guardarlo, igual que en Results
    const avgRT =
      results.stage3RT.concat(results.stage4RT, results.stage6RT, results.stage7RT).reduce((a, b) => a + b, 0) /
      results.totalTrials || 0

    // Puedes calcular la interpretación aquí para guardar (o guardarla por separado)
    const absScore = Math.abs(results.dScore)
    let dScoreLevel = "Poca o ninguna preferencia"
    let dScoreDescription = "Tus resultados sugieren poca o ninguna asociación automática entre las categorías."

    if (absScore >= 0.15 && absScore < 0.35) {
      dScoreLevel = "Preferencia ligera"
      dScoreDescription =
        results.dScore > 0
          ? `Tus resultados sugieren una ligera asociación automática entre ${testConfigs[testId].leftCategories.join(" y ")}.`
          : `Tus resultados sugieren una ligera asociación automática entre ${testConfigs[testId].rightCategories.join(" y ")}.`
    } else if (absScore >= 0.35 && absScore < 0.65) {
      dScoreLevel = "Preferencia moderada"
      dScoreDescription =
        results.dScore > 0
          ? `Tus resultados sugieren una asociación automática moderada entre ${testConfigs[testId].leftCategories.join(" y ")}.`
          : `Tus resultados sugieren una asociación automática moderada entre ${testConfigs[testId].rightCategories.join(" y ")}.`
    } else if (absScore >= 0.65) {
      dScoreLevel = "Preferencia fuerte"
      dScoreDescription =
        results.dScore > 0
          ? `Tus resultados sugieren una fuerte asociación automática entre ${testConfigs[testId].leftCategories.join(" y ")}.`
          : `Tus resultados sugieren una fuerte asociación automática entre ${testConfigs[testId].rightCategories.join(" y ")}.`
    }

    const { error } = await supabase.from("iat_results").insert([
      {
        d_score: results.dScore,
        d_score_level: dScoreLevel,
        d_score_description: dScoreDescription,
        total_trials: results.totalTrials,
        short_trials: results.shortTrials,
        average_rt_ms: avgRT,
        age: demographics.age,
        gender: demographics.gender,
        education: demographics.education,
        ethnicity: demographics.ethnicity,
        created_at: new Date().toISOString(),
      },
    ])

    return error
  }

  const handleTestComplete = async (results: TestResults) => {
    if (!demographicData) {
      setError("Datos demográficos no disponibles.")
      return
    }

    setCurrentStep("saving")
    const error = await saveResultsToSupabase(results, demographicData)

    if (error) {
      setError("Error guardando resultados. Por favor intenta de nuevo.")
      setCurrentStep("results") // O manejar un paso de error
      setTestResults(results) // Mostrar resultados igual
      return
    }

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
        <div className="text-center text-lg">Cargando...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-4">
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={() => {
            setError(null)
            setCurrentStep("instructions")
          }}
          className="btn-primary px-4 py-2 rounded"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {currentStep === "instructions" && <GeneralInstructions testConfig={testConfig} onComplete={handleInstructionsComplete} />}
      {currentStep === "test" && <IATTest testConfig={testConfig} onComplete={handleTestComplete} />}
      {currentStep === "saving" && (
        <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
          Guardando resultados...
        </div>
      )}
      {currentStep === "results" && testResults && (
        <CompletionMessage onRestart={handleRestart} />
      )}
    </div>
  )
}
