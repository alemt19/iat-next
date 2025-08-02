"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TestResults } from "@/app/[testId]/page"
import type { TestConfig } from "@/lib/test-configs"

interface ResultsProps {
  results: TestResults
  testConfig: TestConfig
  onRestart: () => void
}

export function Results({ results, testConfig, onRestart }: ResultsProps) {
  const getDScoreInterpretation = (dScore: number) => {
    const absScore = Math.abs(dScore)

    if (absScore < 0.15) {
      return {
        level: "Poca o ninguna preferencia",
        description: "Tus resultados sugieren poca o ninguna asociación automática entre las categorías.",
        color: "text-gray-600",
      }
    } else if (absScore < 0.35) {
      return {
        level: "Preferencia ligera",
        description:
          dScore > 0
            ? `Tus resultados sugieren una ligera asociación automática entre ${testConfig.leftCategories.join(" y ")}.`
            : `Tus resultados sugieren una ligera asociación automática entre ${testConfig.rightCategories.join(" y ")}.`,
        color: "text-blue-600",
      }
    } else if (absScore < 0.65) {
      return {
        level: "Preferencia moderada",
        description:
          dScore > 0
            ? `Tus resultados sugieren una asociación automática moderada entre ${testConfig.leftCategories.join(" y ")}.`
            : `Tus resultados sugieren una asociación automática moderada entre ${testConfig.rightCategories.join(" y ")}.`,
        color: "text-orange-600",
      }
    } else {
      return {
        level: "Preferencia fuerte",
        description:
          dScore > 0
            ? `Tus resultados sugieren una fuerte asociación automática entre ${testConfig.leftCategories.join(" y ")}.`
            : `Tus resultados sugieren una fuerte asociación automática entre ${testConfig.rightCategories.join(" y ")}.`,
        color: "text-red-600",
      }
    }
  }

  const interpretation = getDScoreInterpretation(results.dScore)
  const avgRT = (
    results.stage3RT.concat(results.stage4RT, results.stage6RT, results.stage7RT).reduce((a, b) => a + b, 0) /
    results.totalTrials
  ).toFixed(0)

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Resultados del Test</CardTitle>
          <CardDescription>{testConfig.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {results.remove && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Nota sobre la validez</h3>
              <p className="text-yellow-700 text-sm">
                Tus resultados pueden no ser completamente válidos debido a que más del 10% de tus respuestas fueron muy
                rápidas (menos de 300ms). Esto puede indicar que no estabas prestando suficiente atención a los
                estímulos.
              </p>
            </div>
          )}

          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Tu Puntuación D</h3>
            <div className="text-4xl font-bold text-blue-600">{results.dScore.toFixed(3)}</div>
            <div className={`text-lg font-medium ${interpretation.color}`}>{interpretation.level}</div>
            <p className="text-gray-700 max-w-2xl mx-auto">{interpretation.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estadísticas del Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total de ensayos:</span>
                  <span className="font-medium">{results.totalTrials}</span>
                </div>
                <div className="flex justify-between">
                  <span>Respuestas muy rápidas:</span>
                  <span className="font-medium">{results.shortTrials}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tiempo de reacción promedio:</span>
                  <span className="font-medium">{avgRT}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Puntuación D:</span>
                  <span className="font-medium">{results.dScore.toFixed(3)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interpretación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    <strong>Puntuación D positiva:</strong> Asociación más fuerte entre{" "}
                    {testConfig.leftCategories.join(" y ")}.
                  </p>
                  <p>
                    <strong>Puntuación D negativa:</strong> Asociación más fuerte entre{" "}
                    {testConfig.rightCategories.join(" y ")}.
                  </p>
                  <p>
                    <strong>Puntuación D cercana a cero:</strong> Poca diferencia en la fuerza de las asociaciones.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3">Sobre este test</h3>
            <div className="text-blue-700 text-sm space-y-2">
              <p>
                El Test de Asociación Implícita (IAT) mide la fuerza de las asociaciones automáticas entre conceptos en
                tu mente. Los resultados reflejan asociaciones que pueden estar fuera de tu control consciente.
              </p>
              <p>
                Es importante recordar que estos resultados no definen tus valores conscientes o creencias explícitas.
                Las asociaciones implícitas pueden estar influenciadas por la exposición cultural y no necesariamente
                reflejan tus preferencias personales.
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <Button onClick={onRestart} size="lg">
              Volver al Inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
