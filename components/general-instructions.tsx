"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TestConfig } from "@/lib/test-configs"

interface GeneralInstructionsProps {
  testConfig: TestConfig
  onComplete: () => void
}

export function GeneralInstructions({ testConfig, onComplete }: GeneralInstructionsProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Instrucciones del Test</CardTitle>
          <CardDescription>{testConfig.title}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              <strong>Bienvenido al Test de Asociación Implícita: {testConfig.title}.</strong>
            </p>

            <p>{testConfig.description}</p>

            <p>
              En este test, verás elementos que aparecen uno a la vez en el centro de la pantalla. Tu tarea será
              clasificar cada elemento lo más rápido posible presionando las teclas correspondientes.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Instrucciones de las teclas:</h3>
              <ul className="space-y-2">
                <li>
                  <strong>Tecla 'E':</strong> Para elementos de la categoría izquierda
                </li>
                <li>
                  <strong>Tecla 'I':</strong> Para elementos de la categoría derecha
                </li>
              </ul>
            </div>

            <p>
              El test consta de varias etapas. En cada etapa, las categorías que aparecen en la parte superior de la
              pantalla te indicarán qué tecla presionar para cada tipo de elemento.
            </p>

            <p>
              <strong>Importante:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Responde lo más rápido posible, pero trata de ser preciso</li>
              <li>Tienes máximo 3 segundos para responder a cada elemento</li>
              <li>Si no respondes a tiempo, el test avanzará automáticamente a la siguiente pregunta</li>
              <li>Si cometes un error, aparecerá una X roja. Presiona la tecla correcta para continuar</li>
              <li>Mantén tus dedos sobre las teclas 'E' e 'I' durante todo el test</li>
              <li>El test tomará aproximadamente {testConfig.estimatedDuration}</li>
            </ul>

            <p>Al final del test, recibirás información sobre tus resultados.</p>
          </div>

          <div className="text-center pt-4">
            <Button onClick={onComplete} size="lg">
              Comenzar el Test
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
