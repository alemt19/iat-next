"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TestConfig } from "@/lib/test-configs"

interface GeneralInstructionsProps {
  testConfig: TestConfig
  onComplete: () => void
}

export function GeneralInstructions({ testConfig, onComplete }: GeneralInstructionsProps) {
  const [step, setStep] = useState<1 | 2>(1)

  const showInstructions = step === 1
  const showStimuli = step === 2

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{showInstructions ? "Instrucciones del Test" : "Ejemplos de estímulos"}</CardTitle>
          <CardDescription>{testConfig.title}</CardDescription>
        </CardHeader>
        <CardContent>
          {showInstructions && (
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                <strong>Bienvenido al Test de Asociación Implícita: {testConfig.title}.</strong>
              </p>
              <p>{testConfig.description}</p>
              <p>
                En este test, verás elementos que aparecerán uno a la vez en el centro de la pantalla. Tu tarea será
                clasificarlos lo más rápido posible presionando las teclas correspondientes.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Instrucciones de las teclas:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Tecla 'E':</strong> Para elementos de la categoría izquierda</li>
                  <li><strong>Tecla 'I':</strong> Para elementos de la categoría derecha</li>
                </ul>
              </div>
              <p>El test consta de varias etapas. En cada etapa, las categorías que aparecen en la parte superior de la pantalla te indicarán qué tecla presionar para cada tipo de elemento.</p>
              <p><strong>Importante:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Responde lo más rápido posible, pero trata de ser preciso</li>
                <li>Tienes máximo 3 segundos para responder a cada elemento</li>
                <li>Si no respondes a tiempo, el test avanzará automáticamente a la siguiente pregunta</li>
                <li>Si cometes un error, aparecerá una X roja. Presiona la tecla correcta para continuar</li>
                <li>Mantén tus dedos sobre las teclas 'E' e 'I' durante todo el test</li>
                <li>El test tomará aproximadamente {testConfig.estimatedDuration}</li>
              </ul>
              <p>Al final del test, recibirás información sobre tus resultados.</p>

              <div className="text-center pt-6">
                <Button onClick={() => setStep(2)} size="lg">
                  Siguiente
                </Button>
              </div>
            </div>
          )}

          {showStimuli && (
            <div className="space-y-8">
              {/* Categoría 1 */}
              <div>
                <h3 className="font-semibold mb-4">Categoría 1</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {testConfig.stimuli.category1.map((stimulus) => (
                    <div key={stimulus.id} className="flex flex-col items-center gap-2">
                      {typeof stimulus.display === "string" &&
                      /\.(png|jpe?g|svg|gif|bmp|webp)$/.test(stimulus.display.toLowerCase()) ? (
                        <img
                          src={stimulus.display}
                          alt={stimulus.name}
                          className="h-24 w-24 object-contain rounded border border-gray-300"
                          draggable={false}
                        />
                      ) : (
                        <span className="text-6xl">{stimulus.display}</span>
                      )}
                      <span className="text-sm">{stimulus.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categoría 2 */}
              <div>
                <h3 className="font-semibold mb-4">Categoría 2</h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {testConfig.stimuli.category2.map((stimulus) => (
                    <div key={stimulus.id} className="flex flex-col items-center gap-2">
                      {typeof stimulus.display === "string" &&
                      /\.(png|jpe?g|svg|gif|bmp|webp)$/.test(stimulus.display.toLowerCase()) ? (
                        <img
                          src={stimulus.display}
                          alt={stimulus.name}
                          className="h-24 w-24 object-contain rounded border border-gray-300"
                          draggable={false}
                        />
                      ) : (
                        <span className="text-6xl">{stimulus.display}</span>
                      )}
                      <span className="text-sm">{stimulus.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-6">
                <Button onClick={onComplete} size="lg">
                  Comenzar el Test
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
