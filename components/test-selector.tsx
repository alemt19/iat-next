"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { testConfigs } from "@/lib/test-configs"

export function TestSelector() {
  const router = useRouter()

  const handleTestSelect = (testId: string) => {
    router.push(`/${testId}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Selecciona un Test de Asociación Implícita</CardTitle>
          <CardDescription>
            Elige uno de los siguientes tests para comenzar. Cada test mide diferentes tipos de asociaciones
            Implícitas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {Object.entries(testConfigs).map(([testId, config]) => (
              <Card key={testId} className="cursor-pointer hover:shadow-lg transition-shadow justify-between">
                <CardHeader>
                  <CardTitle className="text-lg">{config.title}</CardTitle>
                  <CardDescription className="text-sm">{config.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button onClick={() => handleTestSelect(testId)} className="w-full" variant="outline">
                      Comenzar Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => {
                localStorage.removeItem("demographicData")
                window.location.reload()
              }}
              variant="ghost"
              size="sm"
            >
              Cambiar información demográfica
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
