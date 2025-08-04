"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { TestConfig } from "@/lib/test-configs"
import { useIsMobile } from "@/hooks/use-mobile"

interface GeneralInstructionsProps {
  testConfig: TestConfig
  onComplete: () => void
}

export function GeneralInstructions({ testConfig, onComplete }: GeneralInstructionsProps) {
  const [step, setStep] = React.useState<1 | 2>(1)
  const isMobile = useIsMobile()

  // Textos dinámicos según dispositivo
  const teclaIzquierdaTexto = isMobile ? "Botón izquierdo" : "Tecla 'E'"
  const teclaDerechaTexto = isMobile ? "Botón derecho" : "Tecla 'I'"

  const showInstructions = step === 1
  const showStimuli = step === 2

  // Extraer subcategorías únicas de los estímulos category1 y category2
  const uniqueSubcatsCategory1 = React.useMemo(() => {
    const setSubcats = new Set<string>()
    testConfig.stimuli.category1.forEach(s => setSubcats.add(s.name))
    return Array.from(setSubcats)
  }, [testConfig.stimuli.category1])

  const uniqueSubcatsCategory2 = React.useMemo(() => {
    const setSubcats = new Set<string>()
    testConfig.stimuli.category2.forEach(s => setSubcats.add(s.name))
    return Array.from(setSubcats)
  }, [testConfig.stimuli.category2])

  const [mainTitle, suffix] = (testConfig.title ?? "").split(" - ").map(s => s.trim())

  const [category1Title, category2Title] = mainTitle.split(" y ").map(s => s.trim())

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
              <p><strong>Bienvenido al Test de Asociación Implícita: {testConfig.title}.</strong></p>
              <p>{testConfig.description}</p>
              <p>En este test, verás elementos uno a la vez en el centro de la pantalla. Tu tarea será clasificarlos lo más rápido posible.</p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Instrucciones {isMobile ? "de los botones" : "de las teclas"}:</h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>{teclaIzquierdaTexto}:</strong> Para elementos de la categoría izquierda</li>
                  <li><strong>{teclaDerechaTexto}:</strong> Para elementos de la categoría derecha</li>
                </ul>
              </div>
              <p>El test consta de varias etapas. En cada etapa, las categorías que aparecen en la parte superior de la pantalla te indicarán qué tecla o botón presionar.</p>
              <p><strong>Importante:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Responde lo más rápido posible, pero trata de ser preciso</li>
                <li>Tienes máximo 3 segundos para responder a cada elemento</li>
                <li>Si no respondes a tiempo, el test avanzará automáticamente a la siguiente pregunta</li>
                <li>Si cometes un error, aparecerá una X roja. Presiona {isMobile ? "el botón correcto" : "la tecla correcta"} para continuar</li>
                <li>Mantén tus dedos {isMobile ? "sobre los botones" : "sobre las teclas 'E' e 'I'"} durante todo el test</li>
              </ul>
              <div className="text-center pt-6">
                <Button onClick={() => setStep(2)} size="lg">Siguiente</Button>
              </div>
            </div>
          )}

          {showStimuli && (
            <div className="space-y-8">
              {/* Renderizado agrupado por subcategorías desde category1 */}
              <h2 className="text-2xl font-bold mb-2 text-center">{category1Title}</h2>
              {uniqueSubcatsCategory1.map((subcat) => {
                const group = testConfig.stimuli.category1.filter((stimulus) => stimulus.name === subcat)
                if (group.length === 0) return null
                return (
                  <section key={subcat}>
                    <h3 className="font-semibold mb-2">{subcat}</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {group.map((stimulus) => (
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
                        </div>
                      ))}
                    </div>
                  </section>
                )
              })}

              {/* Renderizado agrupado por subcategorías desde category2 */}
              <h2 className="text-2xl font-bold mb-4 text-center">{category2Title}</h2>
              {uniqueSubcatsCategory2.map((subcat) => {
                const group = testConfig.stimuli.category2.filter((stimulus) => stimulus.name === subcat)
                if (group.length === 0) return null
                return (
                  <section key={subcat}>
                    <h3 className="font-semibold mb-4">{subcat}</h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {group.map((stimulus) => (
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
                        </div>
                      ))}
                    </div>
                  </section>
                )
              })}

              <div className="text-center pt-6">
                <Button onClick={onComplete} size="lg">Comenzar el Test</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
