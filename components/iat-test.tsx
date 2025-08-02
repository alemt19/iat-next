"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { TestConfig, TestStimulus } from "@/lib/test-configs"

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

interface IATTestProps {
  testConfig: TestConfig
  onComplete: (results: TestResults) => void
}

type BlockType =
  | "familarizacion-1"
  | "familarizacion-2"
  | "asociacion-congruente-1"
  | "asociacion-congruente-2"
  | "inversion"
  | "asociacion-incongruente-1"
  | "asociacion-incongruente-2"

interface Trial {
  stimulus: string
  name?: string
  type: "category1" | "category2"
  correctKey: "e" | "i"
  category1?: boolean
}

export function IATTest({ testConfig, onComplete }: IATTestProps) {
  const blockOrder: BlockType[] = [
    "familarizacion-1",
    "familarizacion-2",
    "asociacion-congruente-1",
    "asociacion-congruente-2",
    "inversion",
    "asociacion-incongruente-1",
    "asociacion-incongruente-2",
  ]

  const blockStageMap: Record<BlockType, "stage3" | "stage4" | "stage6" | "stage7" | null> = {
    "familarizacion-1": null,
    "familarizacion-2": null,
    "asociacion-congruente-1": "stage3",
    "asociacion-congruente-2": "stage4",
    "inversion": null,
    "asociacion-incongruente-1": "stage6",
    "asociacion-incongruente-2": "stage7",
  }

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = array.slice()
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }

  const assignCorrectKey = useCallback(
    (
      stimulus: TestStimulus,
      blockType: BlockType,
      stimulusType: "category1" | "category2"
    ): "e" | "i" => {
      const blockSide = testConfig.blockCategorySides[blockType]
      if (!blockSide) return stimulus.category1 ? "e" : "i"

      const leftIsTrue =
        stimulusType === "category1"
          ? blockSide.category1LeftIsTrue
          : blockSide.category2LeftIsTrue

      const isLeftSide = leftIsTrue === stimulus.category1

      const keyAssign = testConfig.blockInstructions[blockType]?.keyAssignment ?? { left: "e", right: "i" }

      return isLeftSide ? keyAssign.left : keyAssign.right
    },
    [testConfig]
  )

  const [currentBlock, setCurrentBlock] = useState<BlockType>(blockOrder[0])
  const [currentTrial, setCurrentTrial] = useState(0)
  const [trials, setTrials] = useState<Trial[]>([])
  const [showInstructions, setShowInstructions] = useState(true)
  const [showStimulus, setShowStimulus] = useState(false)
  const [showError, setShowError] = useState(false)
  const [startTime, setStartTime] = useState(0)
  const [reactionTimes, setReactionTimes] = useState<{
    stage3: number[]
    stage4: number[]
    stage6: number[]
    stage7: number[]
  }>({
    stage3: [],
    stage4: [],
    stage6: [],
    stage7: [],
  })
  const [attempts, setAttempts] = useState(0)

  const generateTrials = useCallback(
    (blockType: BlockType): Trial[] => {
      let trialCount
      switch (blockType) {
        case "familarizacion-1":
        case "familarizacion-2":
        case "inversion":
          trialCount = 4
          break
        case "asociacion-congruente-1":
        case "asociacion-incongruente-1":
          trialCount = 20
          break
        case "asociacion-congruente-2":
        case "asociacion-incongruente-2":
          trialCount = 40
          break
        default:
          trialCount = 20
      }

      let baseStimuli: Trial[] = []
      const blockSide = testConfig.blockCategorySides[blockType]
      const categoryType = blockSide?.categoryType ?? "category1"

        if (blockType === "inversion") {
          const stimuliCat = testConfig.stimuli.category1  // Solo category1 (emociones)
          baseStimuli = stimuliCat.map((stimulus) => ({
            stimulus: stimulus.display,
            name: stimulus.name,
            type: "category1",
            correctKey: assignCorrectKey(stimulus, blockType, "category1"),
            category1: stimulus.category1,
          }))
        } else if (categoryType === "mixed") {
        baseStimuli = [
          ...testConfig.stimuli.category1.map((stimulus) => ({
            stimulus: stimulus.display,
            name: stimulus.name,
            type: "category1" as "category1",
            correctKey: assignCorrectKey(stimulus, blockType, "category1"),
            category1: stimulus.category1,
          })),
          ...testConfig.stimuli.category2.map((stimulus) => ({
            stimulus: stimulus.display,
            name: stimulus.name,
            type: "category2" as "category2",
            correctKey: assignCorrectKey(stimulus, blockType, "category2"),
            category1: stimulus.category1,
          })),
        ]
      } else {
        const stimuliCat = testConfig.stimuli[categoryType]
        baseStimuli = stimuliCat.map((stimulus) => ({
          stimulus: stimulus.display,
          name: stimulus.name,
          type: categoryType,
          correctKey: assignCorrectKey(stimulus, blockType, categoryType),
          category1: stimulus.category1,
        }))
      }

      const stimuliList: Trial[] = []
      const fullCycles = Math.floor(trialCount / baseStimuli.length)
      const remainder = trialCount % baseStimuli.length

      for (let i = 0; i < fullCycles; i++) {
        stimuliList.push(...shuffleArray(baseStimuli))
      }
      if (remainder > 0) {
        stimuliList.push(...shuffleArray(baseStimuli).slice(0, remainder))
      }

      return stimuliList
    },
    [testConfig, assignCorrectKey]
  )


  const getBlockInstructions = (blockType: BlockType) => {
    return (
      testConfig.blockInstructions[blockType] || {
        title: "Instrucciones",
        leftCategory: "",
        rightCategory: "",
        description: "Presiona 'E' o 'I' según corresponda. Responde en menos de 3 segundos o avanzará automáticamente.",
        keyAssignment: { left: "e", right: "i" },
      }
    )
  }

  const startBlock = useCallback(() => {
    const newTrials = generateTrials(currentBlock)
    setTrials(newTrials)
    setCurrentTrial(0)
    setShowInstructions(true)
    setShowStimulus(false)
    setShowError(false)
    setAttempts(0)
  }, [currentBlock, generateTrials])

  const startTrial = useCallback(() => {
    setShowStimulus(true)
    setStartTime(Date.now())
    setAttempts(0)
  }, [])

  const calculateResults = useCallback(() => {
    const allRTs = [
      ...reactionTimes.stage3,
      ...reactionTimes.stage4,
      ...reactionTimes.stage6,
      ...reactionTimes.stage7,
    ]

    const shortTrials = allRTs.filter((rt) => rt < 300).length
    const totalTrials = allRTs.length
    const shortPct = totalTrials > 0 ? (shortTrials / totalTrials) * 100 : 0
    const remove = shortPct > 10

    const mean = (arr: number[]) => (arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length)

    const mean3 = mean(reactionTimes.stage3)
    const mean4 = mean(reactionTimes.stage4)
    const mean6 = mean(reactionTimes.stage6)
    const mean7 = mean(reactionTimes.stage7)

    const stage36 = [...reactionTimes.stage3, ...reactionTimes.stage6]
    const stage47 = [...reactionTimes.stage4, ...reactionTimes.stage7]

    const sd = (arr: number[]) => {
      if (arr.length <= 1) return 0
      const m = mean(arr)
      return Math.sqrt(arr.reduce((sum, rt) => sum + (rt - m) ** 2, 0) / (arr.length - 1))
    }

    const sd36 = sd(stage36)
    const sd47 = sd(stage47)

    const d36 = sd36 === 0 ? 0 : (mean6 - mean3) / sd36
    const d47 = sd47 === 0 ? 0 : (mean7 - mean4) / sd47
    const dScore = -((d36 + d47) / 2)

    onComplete({
      dScore,
      remove,
      stage3RT: reactionTimes.stage3,
      stage4RT: reactionTimes.stage4,
      stage6RT: reactionTimes.stage6,
      stage7RT: reactionTimes.stage7,
      totalTrials,
      shortTrials,
    })
  }, [reactionTimes, onComplete])

  const handleTimeout = useCallback(() => {
    setShowStimulus(false)
    setTimeout(() => {
      if (currentTrial + 1 >= trials.length) {
        const currentBlockIndex = blockOrder.indexOf(currentBlock)
        if (currentBlockIndex + 1 >= blockOrder.length) {
          calculateResults()
        } else {
          setCurrentBlock(blockOrder[currentBlockIndex + 1])
        }
      } else {
        setCurrentTrial((prev) => prev + 1)
      }
    }, 300)
  }, [currentTrial, trials.length, currentBlock, blockOrder, calculateResults])

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (showInstructions || showError) return
      if (!showStimulus || currentTrial >= trials.length) return

      const key = event.key.toLowerCase()
      if (key !== "e" && key !== "i") return

      const reactionTime = Date.now() - startTime
      if (reactionTime >= 3000) return

      const currentTrialData = trials[currentTrial]
      const isCorrect = key === currentTrialData.correctKey

      setAttempts((prev) => prev + 1)

      if (isCorrect) {
        const stageKey = blockStageMap[currentBlock]
        if (stageKey) {
          setReactionTimes((prev) => ({
            ...prev,
            [stageKey]: [...prev[stageKey], reactionTime],
          }))
        }

        setShowStimulus(false)

        setTimeout(() => {
          if (currentTrial + 1 >= trials.length) {
            const currentBlockIndex = blockOrder.indexOf(currentBlock)
            if (currentBlockIndex + 1 >= blockOrder.length) {
              calculateResults()
            } else {
              setCurrentBlock(blockOrder[currentBlockIndex + 1])
            }
          } else {
            setCurrentTrial((prev) => prev + 1)
          }
        }, 300)
      } else {
        setShowStimulus(false)
        setShowError(true)
        setTimeout(() => {
          setShowError(false)
          setShowStimulus(true)
          setStartTime(Date.now())
        }, 300)
      }
    },
    [
      showInstructions,
      showError,
      showStimulus,
      currentTrial,
      trials,
      startTime,
      currentBlock,
      blockOrder,
      calculateResults,
      blockStageMap,
    ],
  )

  useEffect(() => {
    const startBlock = () => {
      const newTrials = generateTrials(currentBlock)
      setTrials(newTrials)
      setCurrentTrial(0)
      setShowInstructions(true)
      setShowStimulus(false)
      setShowError(false)
      setAttempts(0)
    }
    startBlock()
  }, [currentBlock, generateTrials])


  useEffect(() => {
    if (!showInstructions && !showError && showStimulus) {
      window.addEventListener("keydown", handleKeyPress)
      return () => window.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress, showInstructions, showError, showStimulus])

  useEffect(() => {
    if (showStimulus && !showError) {
      const timeout = setTimeout(() => {
        handleTimeout()
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showStimulus, showError, handleTimeout])

  useEffect(() => {
    if (!showInstructions && !showStimulus && !showError && currentTrial < trials.length) {
      const timer = setTimeout(startTrial, 500)
      return () => clearTimeout(timer)
    }
  }, [showInstructions, showStimulus, showError, currentTrial, trials.length, startTrial])

  const instructions = getBlockInstructions(currentBlock)
  const progress = ((blockOrder.indexOf(currentBlock) + 1) / blockOrder.length) * 100
  
  if (showInstructions) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <h2 className="text-2xl font-bold">{instructions.title}</h2>

              <div className="flex justify-between items-center text-lg font-medium py-8">
                <div className="text-left">
                  <div className="text-sm text-gray-600 mb-2">Presiona 'E' para</div>
                  <div className="font-bold">{instructions.leftCategory}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-2">Presiona 'I' para</div>
                  <div className="font-bold">{instructions.rightCategory}</div>
                </div>
              </div>

              <p className="text-gray-700 text-lg">{instructions.description}</p>

              <p className="text-sm text-gray-600">
                Si cometes un error, aparecerá una X roja. Presiona la tecla correcta para continuar.
              </p>

              <Button onClick={() => setShowInstructions(false)} size="lg" className="mt-6">
                Comenzar ({trials.length} elementos)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-between items-center text-lg font-medium mb-12">
          <div className="text-left">
            <div className="text-sm text-gray-600 mb-2">Presiona 'E' para</div>
            <div className="font-bold">{instructions.leftCategory}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-2">Presiona 'I' para</div>
            <div className="font-bold">{instructions.rightCategory}</div>
          </div>
        </div>

        <div className="text-center">
          <div className="h-32 flex items-center justify-center">
            {showError && <div className="text-6xl text-red-500 font-bold">✕</div>}
            {showStimulus && !showError && trials[currentTrial] && (
              // Aquí detectamos si el display es una ruta (string que termina en extensión de imagen) para renderizar img
              (() => {
                const stimulus = trials[currentTrial].stimulus
                const isImage =
                  typeof stimulus === "string" &&
                  /\.(png|jpe?g|svg|gif|bmp|webp)$/.test(stimulus.toLowerCase())
                return isImage ? (
                  <img
                    src={stimulus}
                    alt={"stimulus"}
                    className="h-32 object-contain mx-auto"
                    draggable={false}
                  />
                ) : (
                  <span className="text-8xl">{stimulus}</span>
                )
              })()
            )}
            {!showStimulus && !showError && <div className="w-2 h-2 bg-black rounded-full"></div>}
          </div>

          <div className="mt-8 text-sm text-gray-600">
            Elemento {currentTrial + 1} de {trials.length}
          </div>

          <div className="mt-4 text-xs text-gray-500">Si cometes un error presiona la otra tecla para continuar</div>
        </div>
      </div>
    </div>
  )
}
