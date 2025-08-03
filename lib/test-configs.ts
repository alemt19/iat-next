export interface TestStimulus {
  id: number
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
    title: "Emociones y Formas - 1",
    description: "Mide asociaciones entre emociones (felicidad/tristeza) y tipos de formas (orgánicas/geométricas).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Felicidad", "Orgánica"],
    rightCategories: ["Tristeza", "Geométrica"],
    stimuli: {
      category1: [
        { id: 1, name: "Felicidad", display: "./images/felicidad/Picture1.png", category1: true },
        { id: 2, name: "Felicidad", display: "./images/felicidad/Picture2.png", category1: true },
        { id: 3, name: "Felicidad", display: "./images/felicidad/Picture3.png", category1: true },
        { id: 4, name: "Felicidad", display: "./images/felicidad/Picture4.png", category1: true },
        { id: 5, name: "Felicidad", display: "./images/felicidad/Picture5.png", category1: true },
        { id: 6, name: "Tristeza", display: "./images/tristeza/Picture6.png", category1: false },
        { id: 7, name: "Tristeza", display: "./images/tristeza/Picture7.png", category1: false },
        { id: 8, name: "Tristeza", display: "./images/tristeza/Picture8.png", category1: false },
        { id: 9, name: "Tristeza", display: "./images/tristeza/Picture9.png", category1: false },
        { id: 10, name: "Tristeza", display: "./images/tristeza/Picture10.png", category1: false },
      ],
      category2: [
        { id: 1, name: "Orgánica", display: "./images/organicas/Picture1.png", category1: true },
        { id: 2, name: "Orgánica", display: "./images/organicas/Picture2.png", category1: true },
        { id: 3, name: "Orgánica", display: "./images/organicas/Picture3.png", category1: true },
        { id: 4, name: "Orgánica", display: "./images/organicas/Picture4.png", category1: true },
        { id: 5, name: "Orgánica", display: "./images/organicas/Picture5.png", category1: true },
        { id: 6, name: "Orgánica", display: "./images/organicas/Picture6.png", category1: true },
        { id: 7, name: "Orgánica", display: "./images/organicas/Picture7.png", category1: true },
        { id: 8, name: "Geométrica", display: "./images/geometricas/Picture8.png", category1: false },
        { id: 9, name: "Geométrica", display: "./images/geometricas/Picture9.png", category1: false },
        { id: 10, name: "Geométrica", display: "./images/geometricas/Picture10.png", category1: false },
        { id: 11, name: "Geométrica", display: "./images/geometricas/Picture11.png", category1: false },
        { id: 12, name: "Geométrica", display: "./images/geometricas/Picture12.png", category1: false },
        { id: 13, name: "Geométrica", display: "./images/geometricas/Picture13.png", category1: false },
        { id: 14, name: "Geométrica", display: "./images/geometricas/Picture14.png", category1: false },
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
  },

  
  "emociones-formas-2": {
    title: "Emociones y Formas - 2",
    description: "Mide asociaciones entre emociones (nostalgia/indiferencia) y tipos de formas (orgánicas/geométricas).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Nostalgia", "Orgánica"],
    rightCategories: ["Indiferencia", "Geométrica"],
    stimuli: {
      category1: [
        { id: 1, name: "Nostalgia", display: "./images/nostalgia/Picture1.png", category1: true },
        { id: 2, name: "Nostalgia", display: "./images/nostalgia/Picture2.png", category1: true },
        { id: 3, name: "Nostalgia", display: "./images/nostalgia/Picture3.png", category1: true },
        { id: 4, name: "Nostalgia", display: "./images/nostalgia/Picture4.png", category1: true },
        { id: 5, name: "Nostalgia", display: "./images/nostalgia/Picture5.png", category1: true },
        { id: 6, name: "Nostalgia", display: "./images/nostalgia/Picture6.png", category1: true },
        { id: 7, name: "Indiferencia", display: "./images/indiferencia/Picture7.png", category1: false },
        { id: 8, name: "Indiferencia", display: "./images/indiferencia/Picture8.png", category1: false },
        { id: 9, name: "Indiferencia", display: "./images/indiferencia/Picture9.png", category1: false },
        { id: 10, name: "Indiferencia", display: "./images/indiferencia/Picture10.png", category1: false },
        { id: 11, name: "Indiferencia", display: "./images/indiferencia/Picture11.png", category1: false },
      ],
      category2: [
        { id: 1, name: "Orgánica", display: "./images/organicas/Picture1.png", category1: true },
        { id: 2, name: "Orgánica", display: "./images/organicas/Picture2.png", category1: true },
        { id: 3, name: "Orgánica", display: "./images/organicas/Picture3.png", category1: true },
        { id: 4, name: "Orgánica", display: "./images/organicas/Picture4.png", category1: true },
        { id: 5, name: "Orgánica", display: "./images/organicas/Picture5.png", category1: true },
        { id: 6, name: "Orgánica", display: "./images/organicas/Picture6.png", category1: true },
        { id: 7, name: "Orgánica", display: "./images/organicas/Picture7.png", category1: true },
        { id: 8, name: "Geométrica", display: "./images/geometricas/Picture8.png", category1: false },
        { id: 9, name: "Geométrica", display: "./images/geometricas/Picture9.png", category1: false },
        { id: 10, name: "Geométrica", display: "./images/geometricas/Picture10.png", category1: false },
        { id: 11, name: "Geométrica", display: "./images/geometricas/Picture11.png", category1: false },
        { id: 12, name: "Geométrica", display: "./images/geometricas/Picture12.png", category1: false },
        { id: 13, name: "Geométrica", display: "./images/geometricas/Picture13.png", category1: false },
        { id: 14, name: "Geométrica", display: "./images/geometricas/Picture14.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Nostalgia",
        rightCategory: "Indiferencia",
        description: "Clasifica las emociones presionando 'E' para Nostalgia e 'I' para Indiferencia.",
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
        leftCategory: "Nostalgia o Orgánica",
        rightCategory: "Indiferencia o Geométrica",
        description: "Presiona 'E' para Nostalgia u Orgánica, 'I' para Indiferencia o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Orgánica o Nostalgia",
        rightCategory: "Geométrica o Indiferencia",
        description: "Continúa clasificando. Presiona 'E' para Orgánica o Nostalgia, 'I' para Geométrica o Indiferencia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Indiferencia",
        rightCategory: "Nostalgia",
        description: "Ahora clasifica las emociones invertidas: presiona 'E' para Indiferencia e 'I' para Nostalgia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Indiferencia o Orgánica",
        rightCategory: "Nostalgia o Geométrica",
        description: "Presiona 'E' para Indiferencia u Orgánica, 'I' para Nostalgia o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Orgánica o Indiferencia",
        rightCategory: "Geométrica o Nostalgia",
        description: "Continúa clasificando. Presiona 'E' para Orgánica o Indiferencia, 'I' para Geométrica o Nostalgia.",
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
  },

  
  "emociones-colores": {
    title: "Emociones y Colores - 1",
    description: "Mide asociaciones entre emociones (felicidad/tristeza) y tipos de colores (fríos/cálidos).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Felicidad", "Fríos"],
    rightCategories: ["Tristeza", "Cálidos"],
    stimuli: {
      category1: [
        { id: 1, name: "Felicidad", display: "./images/felicidad/Picture1.png", category1: true },
        { id: 2, name: "Felicidad", display: "./images/felicidad/Picture2.png", category1: true },
        { id: 3, name: "Felicidad", display: "./images/felicidad/Picture3.png", category1: true },
        { id: 4, name: "Felicidad", display: "./images/felicidad/Picture4.png", category1: true },
        { id: 5, name: "Felicidad", display: "./images/felicidad/Picture5.png", category1: true },
        { id: 6, name: "Tristeza", display: "./images/tristeza/Picture6.png", category1: false },
        { id: 7, name: "Tristeza", display: "./images/tristeza/Picture7.png", category1: false },
        { id: 8, name: "Tristeza", display: "./images/tristeza/Picture8.png", category1: false },
        { id: 9, name: "Tristeza", display: "./images/tristeza/Picture9.png", category1: false },
        { id: 10, name: "Tristeza", display: "./images/tristeza/Picture10.png", category1: false },
      ],
      category2: [
        { id: 1, name: "Fríos", display: "./images/frios/Picture1.png", category1: true },
        { id: 2, name: "Fríos", display: "./images/frios/Picture2.png", category1: true },
        { id: 3, name: "Fríos", display: "./images/frios/Picture3.png", category1: true },
        { id: 4, name: "Fríos", display: "./images/frios/Picture4.png", category1: true },
        { id: 5, name: "Fríos", display: "./images/frios/Picture5.png", category1: true },
        { id: 6, name: "Fríos", display: "./images/frios/Picture6.png", category1: true },
        { id: 7, name: "Fríos", display: "./images/frios/Picture7.png", category1: true },
        { id: 8, name: "Cálidos", display: "./images/calidos/Picture8.png", category1: false },
        { id: 9, name: "Cálidos", display: "./images/calidos/Picture9.png", category1: false },
        { id: 10, name: "Cálidos", display: "./images/calidos/Picture10.png", category1: false },
        { id: 11, name: "Cálidos", display: "./images/calidos/Picture11.png", category1: false },
        { id: 12, name: "Cálidos", display: "./images/calidos/Picture12.png", category1: false },
        { id: 13, name: "Cálidos", display: "./images/calidos/Picture13.png", category1: false },
        { id: 14, name: "Cálidos", display: "./images/calidos/Picture14.png", category1: false },
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
        leftCategory: "Fríos",
        rightCategory: "Cálidos",
        description: "Clasifica las figuras presionando 'E' para Fríos e 'I' para Cálidos.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Felicidad o Fríos",
        rightCategory: "Tristeza o Cálidos",
        description: "Presiona 'E' para Felicidad u Fríos, 'I' para Tristeza o Cálidos.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Fríos o Felicidad",
        rightCategory: "Cálidos o Tristeza",
        description: "Continúa clasificando. Presiona 'E' para Fríos o Felicidad, 'I' para Cálidos o Tristeza.",
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
        leftCategory: "Tristeza o Fríos",
        rightCategory: "Felicidad o Cálidos",
        description: "Presiona 'E' para Tristeza u Fríos, 'I' para Felicidad o Cálidos.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Fríos o Tristeza",
        rightCategory: "Cálidos o Felicidad",
        description: "Continúa clasificando. Presiona 'E' para Fríos o Tristeza, 'I' para Cálidos o Felicidad.",
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
  },

  
  "emociones-colores-2": {
    title: "Emociones y Colores - 2",
    description: "Mide asociaciones entre emociones (nostalgia/tristeza) y tipos de colores (fríos/cálidos).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Nostalgia", "Fríos"],
    rightCategories: ["Tristeza", "Cálidos"],
    stimuli: {
      category1: [
        { id: 1, name: "Nostalgia", display: "./images/nostalgia/Picture1.png", category1: true },
        { id: 2, name: "Nostalgia", display: "./images/nostalgia/Picture2.png", category1: true },
        { id: 3, name: "Nostalgia", display: "./images/nostalgia/Picture3.png", category1: true },
        { id: 4, name: "Nostalgia", display: "./images/nostalgia/Picture4.png", category1: true },
        { id: 5, name: "Nostalgia", display: "./images/nostalgia/Picture5.png", category1: true },
        { id: 6, name: "Nostalgia", display: "./images/nostalgia/Picture6.png", category1: true },
        { id: 7, name: "Tristeza", display: "./images/tristeza/Picture6.png", category1: false },
        { id: 8, name: "Tristeza", display: "./images/tristeza/Picture7.png", category1: false },
        { id: 9, name: "Tristeza", display: "./images/tristeza/Picture8.png", category1: false },
        { id: 10, name: "Tristeza", display: "./images/tristeza/Picture9.png", category1: false },
        { id: 11, name: "Tristeza", display: "./images/tristeza/Picture10.png", category1: false },
      ],
      category2: [
        { id: 1, name: "Fríos", display: "./images/frios/Picture1.png", category1: true },
        { id: 2, name: "Fríos", display: "./images/frios/Picture2.png", category1: true },
        { id: 3, name: "Fríos", display: "./images/frios/Picture3.png", category1: true },
        { id: 4, name: "Fríos", display: "./images/frios/Picture4.png", category1: true },
        { id: 5, name: "Fríos", display: "./images/frios/Picture5.png", category1: true },
        { id: 6, name: "Fríos", display: "./images/frios/Picture6.png", category1: true },
        { id: 7, name: "Fríos", display: "./images/frios/Picture7.png", category1: true },
        { id: 8, name: "Cálidos", display: "./images/calidos/Picture8.png", category1: false },
        { id: 9, name: "Cálidos", display: "./images/calidos/Picture9.png", category1: false },
        { id: 10, name: "Cálidos", display: "./images/calidos/Picture10.png", category1: false },
        { id: 11, name: "Cálidos", display: "./images/calidos/Picture11.png", category1: false },
        { id: 12, name: "Cálidos", display: "./images/calidos/Picture12.png", category1: false },
        { id: 13, name: "Cálidos", display: "./images/calidos/Picture13.png", category1: false },
        { id: 14, name: "Cálidos", display: "./images/calidos/Picture14.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Nostalgia",
        rightCategory: "Tristeza",
        description: "Clasifica las emociones presionando 'E' para Nostalgia e 'I' para Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Fríos",
        rightCategory: "Cálidos",
        description: "Clasifica las figuras presionando 'E' para Fríos e 'I' para Cálidos.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Nostalgia o Fríos",
        rightCategory: "Tristeza o Cálidos",
        description: "Presiona 'E' para Nostalgia u Fríos, 'I' para Tristeza o Cálidos.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Fríos o Nostalgia",
        rightCategory: "Cálidos o Tristeza",
        description: "Continúa clasificando. Presiona 'E' para Fríos o Nostalgia, 'I' para Cálidos o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Tristeza",
        rightCategory: "Nostalgia",
        description: "Ahora clasifica las emociones invertidas: presiona 'E' para Tristeza e 'I' para Nostalgia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Tristeza o Fríos",
        rightCategory: "Nostalgia o Cálidos",
        description: "Presiona 'E' para Tristeza u Fríos, 'I' para Nostalgia o Cálidos.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Fríos o Tristeza",
        rightCategory: "Cálidos o Nostalgia",
        description: "Continúa clasificando. Presiona 'E' para Fríos o Tristeza, 'I' para Cálidos o Nostalgia.",
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
