export interface TestStimulus {
  name: string
  display: string
  category1: boolean
}

export interface BlockInstruction {
  title: string
  leftCategory: string
  rightCategory: string
  description: string
  keyAssignment: {
    left: "e" | "i"
    right: "e" | "i"
  }
}

export interface TestConfig {
  title: string
  description: string
  estimatedDuration: string
  leftCategories: string[]
  rightCategories: string[]
  stimuli: {
    category1: TestStimulus[]
    category2: TestStimulus[]
  }
  blockInstructions: Record<string, BlockInstruction>
  blockCategorySides: Record<
    string,
    {
      categoryType: "category1" | "category2" | "mixed"
      category1LeftIsTrue: boolean
      category2LeftIsTrue: boolean
    }
  >
}

export const testConfigs: Record<string, TestConfig> = {
  "emociones-formas": {
    title: "Emociones y Formas",
    description: "Mide asociaciones entre emociones (felicidad/tristeza) y tipos de formas (orgánicas/geométricas).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Felicidad", "Orgánica"],
    rightCategories: ["Tristeza", "Geométrica"],
    stimuli: {
      category1: [
        { name: "emocion1", display: "./test1/felicidad/Picture1.png", category1: true },
        { name: "emocion2", display: "./test1/felicidad/Picture2.png", category1: true },
        { name: "emocion3", display: "./test1/felicidad/Picture3.png", category1: true },
        { name: "emocion4", display: "./test1/felicidad/Picture4.png", category1: true },
        { name: "emocion5", display: "./test1/felicidad/Picture5.png", category1: true },
        { name: "emocion6", display: "./test1/tristeza/Picture6.png", category1: false },
        { name: "emocion7", display: "./test1/tristeza/Picture7.png", category1: false },
        { name: "emocion8", display: "./test1/tristeza/Picture8.png", category1: false },
        { name: "emocion9", display: "./test1/tristeza/Picture9.png", category1: false },
        { name: "emocion0", display: "./test1/tristeza/Picture10.png", category1: false },
      ],
      category2: [
        { name: "forma1", display: "./test1/organicas/Picture1.png", category1: true },
        { name: "forma2", display: "./test1/organicas/Picture2.png", category1: true },
        { name: "forma3", display: "./test1/organicas/Picture3.png", category1: true },
        { name: "forma4", display: "./test1/organicas/Picture4.png", category1: true },
        { name: "forma5", display: "./test1/organicas/Picture5.png", category1: true },
        { name: "forma6", display: "./test1/organicas/Picture6.png", category1: true },
        { name: "forma7", display: "./test1/organicas/Picture7.png", category1: true },
        { name: "forma8", display: "./test1/geometricas/Picture8.png", category1: false },
        { name: "forma9", display: "./test1/geometricas/Picture9.png", category1: false },
        { name: "forma10", display: "./test1/geometricas/Picture10.png", category1: false },
        { name: "forma11", display: "./test1/geometricas/Picture11.png", category1: false },
        { name: "forma12", display: "./test1/geometricas/Picture12.png", category1: false },
        { name: "forma13", display: "./test1/geometricas/Picture13.png", category1: false },
        { name: "forma14", display: "./test1/geometricas/Picture14.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Felicidad",
        rightCategory: "Tristeza",
        description: "Clasifica las emociones presionando 'E' para Felicidad e 'I' para Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Orgánica",
        rightCategory: "Geométrica",
        description: "Clasifica las figuras presionando 'E' para Orgánica e 'I' para Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Felicidad o Orgánica",
        rightCategory: "Tristeza o Geométrica",
        description: "Presiona 'E' para Felicidad u Orgánica, 'I' para Tristeza o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Orgánica o Felicidad",
        rightCategory: "Geométrica o Tristeza",
        description: "Continúa clasificando. Presiona 'E' para Orgánica o Felicidad, 'I' para Geométrica o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Tristeza",
        rightCategory: "Felicidad",
        description: "Ahora clasifica las emociones invertidas: presiona 'E' para Tristeza e 'I' para Felicidad.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Tristeza o Orgánica",
        rightCategory: "Felicidad o Geométrica",
        description: "Presiona 'E' para Tristeza u Orgánica, 'I' para Felicidad o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Orgánica o Tristeza",
        rightCategory: "Geométrica o Felicidad",
        description: "Continúa clasificando. Presiona 'E' para Orgánica o Tristeza, 'I' para Geométrica o Felicidad.",
        keyAssignment: { left: "e", right: "i" },
      },
    },
    blockCategorySides: {
      "familarizacion-1": {
        categoryType: "category1",
        category1LeftIsTrue: true,
        category2LeftIsTrue: true,
      },
      "familarizacion-2": {
        categoryType: "category2",
        category1LeftIsTrue: true,
        category2LeftIsTrue: true,
      },
      "asociacion-congruente-1": {
        categoryType: "mixed",
        category1LeftIsTrue: true,
        category2LeftIsTrue: true,
      },
      "asociacion-congruente-2": {
        categoryType: "mixed",
        category1LeftIsTrue: true,
        category2LeftIsTrue: true,
      },
      "inversion": {
        categoryType: "mixed",
        category1LeftIsTrue: false,
        category2LeftIsTrue: false,
      },
      "asociacion-incongruente-1": {
        categoryType: "mixed",
        category1LeftIsTrue: false,
        category2LeftIsTrue: true,
      },
      "asociacion-incongruente-2": {
        categoryType: "mixed",
        category1LeftIsTrue: false,
        category2LeftIsTrue: true,
      },
    },
  }
}
