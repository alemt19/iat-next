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
        description: "Clasifica las emociones presionando el botón/tecla correspondiente para Felicidad o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Orgánica",
        rightCategory: "Geométrica",
        description: "Clasifica las figuras presionando el botón/tecla correspondiente para Orgánica o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Felicidad o Orgánica",
        rightCategory: "Tristeza o Geométrica",
        description: "Presiona el botón/tecla correspondiente para Felicidad-Orgánica o Tristeza-Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Orgánica o Felicidad",
        rightCategory: "Geométrica o Tristeza",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Orgánica-Felicidad o Geométrica-Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Tristeza",
        rightCategory: "Felicidad",
        description: "Ahora clasifica las emociones invertidas: presiona el botón/tecla correspondiente para Tristeza o Felicidad.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Tristeza o Orgánica",
        rightCategory: "Felicidad o Geométrica",
        description: "Presiona el botón/tecla correspondiente para Tristeza-Orgánica o Felicidad-Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Orgánica o Tristeza",
        rightCategory: "Geométrica o Felicidad",
        description: "Continúa clasificando. presiona el botón/tecla correspondiente para Orgánica-Tristeza o Geométrica-Felicidad.",
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
        description: "Clasifica las emociones presionando el botón/tecla correspondiente para Nostalgia o Indiferencia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Orgánica",
        rightCategory: "Geométrica",
        description: "Clasifica las figuras presionando el botón/tecla correspondiente para Orgánica o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Nostalgia o Orgánica",
        rightCategory: "Indiferencia o Geométrica",
        description: "Presiona el botón/tecla correspondiente para Nostalgia u Orgánica, o Indiferencia o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Orgánica o Nostalgia",
        rightCategory: "Geométrica o Indiferencia",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Orgánica o Nostalgia, o Geométrica o Indiferencia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Indiferencia",
        rightCategory: "Nostalgia",
        description: "Ahora clasifica las emociones invertidas presionando el botón/tecla correspondiente para Indiferencia o Nostalgia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Indiferencia o Orgánica",
        rightCategory: "Nostalgia o Geométrica",
        description: "Presiona el botón/tecla correspondiente para Indiferencia u Orgánica, o Nostalgia o Geométrica.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Orgánica o Indiferencia",
        rightCategory: "Geométrica o Nostalgia",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Orgánica o Indiferencia, o Geométrica o Nostalgia.",
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
    leftCategories: ["Felicidad", "Frío"],
    rightCategories: ["Tristeza", "Cálido"],
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
        { id: 1, name: "Frío", display: "./images/frios/Picture1.png", category1: true },
        { id: 2, name: "Frío", display: "./images/frios/Picture2.png", category1: true },
        { id: 3, name: "Frío", display: "./images/frios/Picture3.png", category1: true },
        { id: 4, name: "Frío", display: "./images/frios/Picture4.png", category1: true },
        { id: 5, name: "Frío", display: "./images/frios/Picture5.png", category1: true },
        { id: 6, name: "Frío", display: "./images/frios/Picture6.png", category1: true },
        { id: 7, name: "Frío", display: "./images/frios/Picture7.png", category1: true },
        { id: 8, name: "Cálido", display: "./images/calidos/Picture8.png", category1: false },
        { id: 9, name: "Cálido", display: "./images/calidos/Picture9.png", category1: false },
        { id: 10, name: "Cálido", display: "./images/calidos/Picture10.png", category1: false },
        { id: 11, name: "Cálido", display: "./images/calidos/Picture11.png", category1: false },
        { id: 12, name: "Cálido", display: "./images/calidos/Picture12.png", category1: false },
        { id: 13, name: "Cálido", display: "./images/calidos/Picture13.png", category1: false },
        { id: 14, name: "Cálido", display: "./images/calidos/Picture14.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Felicidad",
        rightCategory: "Tristeza",
        description: "Clasifica las emociones presionando el botón/tecla correspondiente para Felicidad o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Frío",
        rightCategory: "Cálido",
        description: "Clasifica las figuras presionando el botón/tecla correspondiente para Frío o Cálido.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Felicidad o Frío",
        rightCategory: "Tristeza o Cálido",
        description: "Presiona el botón/tecla correspondiente para Felicidad o Frío, o Tristeza o Cálido.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Frío o Felicidad",
        rightCategory: "Cálido o Tristeza",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Frío o Felicidad, o Cálido o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Tristeza",
        rightCategory: "Felicidad",
        description: "Ahora clasifica las emociones invertidas presionando el botón/tecla correspondiente para Tristeza o Felicidad.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Tristeza o Frío",
        rightCategory: "Felicidad o Cálido",
        description: "Presiona el botón/tecla correspondiente para Tristeza o Frío, o Felicidad o Cálido.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Frío o Tristeza",
        rightCategory: "Cálido o Felicidad",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Frío o Tristeza, o Cálido o Felicidad.",
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
    description: "Mide asociaciones entre emociones (nostalgia/indiferencia) y tipos de colores (fríos/cálidos).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Nostalgia", "Frío"],
    rightCategories: ["Indiferencia", "Cálido"],
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
        { id: 1, name: "Frío", display: "./images/frios/Picture1.png", category1: true },
        { id: 2, name: "Frío", display: "./images/frios/Picture2.png", category1: true },
        { id: 3, name: "Frío", display: "./images/frios/Picture3.png", category1: true },
        { id: 4, name: "Frío", display: "./images/frios/Picture4.png", category1: true },
        { id: 5, name: "Frío", display: "./images/frios/Picture5.png", category1: true },
        { id: 6, name: "Frío", display: "./images/frios/Picture6.png", category1: true },
        { id: 7, name: "Frío", display: "./images/frios/Picture7.png", category1: true },
        { id: 8, name: "Cálido", display: "./images/calidos/Picture8.png", category1: false },
        { id: 9, name: "Cálido", display: "./images/calidos/Picture9.png", category1: false },
        { id: 10, name: "Cálido", display: "./images/calidos/Picture10.png", category1: false },
        { id: 11, name: "Cálido", display: "./images/calidos/Picture11.png", category1: false },
        { id: 12, name: "Cálido", display: "./images/calidos/Picture12.png", category1: false },
        { id: 13, name: "Cálido", display: "./images/calidos/Picture13.png", category1: false },
        { id: 14, name: "Cálido", display: "./images/calidos/Picture14.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Nostalgia",
        rightCategory: "Indiferencia",
        description: "Clasifica las emociones presionando el botón/tecla correspondiente para Nostalgia o Indiferencia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Frío",
        rightCategory: "Cálido",
        description: "Clasifica las figuras presionando el botón/tecla correspondiente para Frío o Cálido.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Nostalgia o Frío",
        rightCategory: "Indiferencia o Cálido",
        description: "Presiona el botón/tecla correspondiente para Nostalgia o Frío, o Indiferencia o Cálido.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Frío o Nostalgia",
        rightCategory: "Cálido o Indiferencia",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Frío o Nostalgia, o Cálido o Indiferencia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Indiferencia",
        rightCategory: "Nostalgia",
        description: "Ahora clasifica las emociones invertidas presionando el botón/tecla correspondiente para Indiferencia o Nostalgia.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Indiferencia o Frío",
        rightCategory: "Nostalgia o Cálido",
        description: "Presiona el botón/tecla correspondiente para Indiferencia o Frío, o Nostalgia o Cálido.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Frío o Indiferencia",
        rightCategory: "Cálido o Nostalgia",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Frío o Indiferencia, o Cálido o Nostalgia.",
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
  
  
  
  "emociones-narrativa": {
    title: "Emociones y Narrativa - 1",
    description: "Mide asociaciones entre emociones (felicidad/tristeza) y tipos de narrativa (nacional/extranjera).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Felicidad", "Nacional"],
    rightCategories: ["Tristeza", "Extranjera"],
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
        { id: 1, name: "Nacional", display: "./images/nacional/Picture1.png", category1: true },
        { id: 2, name: "Nacional", display: "./images/nacional/Picture2.png", category1: true },
        { id: 3, name: "Nacional", display: "./images/nacional/Picture3.png", category1: true },
        { id: 4, name: "Nacional", display: "./images/nacional/Picture4.png", category1: true },
        { id: 5, name: "Nacional", display: "./images/nacional/Picture5.png", category1: true },
        { id: 6, name: "Extranjera", display: "./images/extranjera/Picture6.png", category1: false },
        { id: 7, name: "Extranjera", display: "./images/extranjera/Picture7.png", category1: false },
        { id: 8, name: "Extranjera", display: "./images/extranjera/Picture8.png", category1: false },
        { id: 9, name: "Extranjera", display: "./images/extranjera/Picture9.png", category1: false },
        { id: 10, name: "Extranjera", display: "./images/extranjera/Picture10.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Felicidad",
        rightCategory: "Tristeza",
        description: "Clasifica las emociones presionando el botón/tecla correspondiente para Felicidad o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Nacional",
        rightCategory: "Extranjera",
        description: "Clasifica las figuras presionando el botón/tecla correspondiente para Nacional o Extranjera.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Felicidad o Nacional",
        rightCategory: "Tristeza o Extranjera",
        description: "Presiona el botón/tecla correspondiente para Felicidad o Nacional, o Tristeza o Extranjera.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Nacional o Felicidad",
        rightCategory: "Extranjera o Tristeza",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Nacional o Felicidad, o Extranjera o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Tristeza",
        rightCategory: "Felicidad",
        description: "Ahora clasifica las emociones invertidas presionando el botón/tecla correspondiente para Tristeza o Felicidad.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Tristeza o Nacional",
        rightCategory: "Felicidad o Extranjera",
        description: "Presiona el botón/tecla correspondiente para Tristeza o Nacional, o Felicidad o Extranjera.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Nacional o Tristeza",
        rightCategory: "Extranjera o Felicidad",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Nacional o Tristeza, o Extranjera o Felicidad.",
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
  
  
  
  "emociones-narrativa-2": {
    title: "Emociones y Narrativa - 2",
    description: "Mide asociaciones entre emociones (nostalgia/indiferencia) y tipos de narrativa (nacional/extranjera).",
    estimatedDuration: "5-7 minutos",
    leftCategories: ["Nostalgia", "Nacional"],
    rightCategories: ["Indiferencia", "Extranjera"],
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
        { id: 1, name: "Nacional", display: "./images/nacional/Picture1.png", category1: true },
        { id: 2, name: "Nacional", display: "./images/nacional/Picture2.png", category1: true },
        { id: 3, name: "Nacional", display: "./images/nacional/Picture3.png", category1: true },
        { id: 4, name: "Nacional", display: "./images/nacional/Picture4.png", category1: true },
        { id: 5, name: "Nacional", display: "./images/nacional/Picture5.png", category1: true },
        { id: 6, name: "Extranjera", display: "./images/extranjera/Picture6.png", category1: false },
        { id: 7, name: "Extranjera", display: "./images/extranjera/Picture7.png", category1: false },
        { id: 8, name: "Extranjera", display: "./images/extranjera/Picture8.png", category1: false },
        { id: 9, name: "Extranjera", display: "./images/extranjera/Picture9.png", category1: false },
        { id: 10, name: "Extranjera", display: "./images/extranjera/Picture10.png", category1: false },
      ],
    },
    blockInstructions: {
      "familarizacion-1": {
        title: "Clasificación de Emociones",
        leftCategory: "Felicidad",
        rightCategory: "Tristeza",
        description: "Clasifica las emociones presionando el botón/tecla correspondiente para Felicidad o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "familarizacion-2": {
        title: "Clasificación de Figuras",
        leftCategory: "Nacional",
        rightCategory: "Extranjera",
        description: "Clasifica las figuras presionando el botón/tecla correspondiente para Nacional o Extranjera.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-1": {
        title: "Asociación Congruente - Parte 1",
        leftCategory: "Felicidad o Nacional",
        rightCategory: "Tristeza o Extranjera",
        description: "Presiona el botón/tecla correspondiente para Felicidad o Nacional, o Tristeza o Extranjera.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-congruente-2": {
        title: "Asociación Congruente - Parte 2",
        leftCategory: "Nacional o Felicidad",
        rightCategory: "Extranjera o Tristeza",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Nacional o Felicidad, o Extranjera o Tristeza.",
        keyAssignment: { left: "e", right: "i" },
      },
      "inversion": {
        title: "Clasificación de Emociones Invertida",
        leftCategory: "Tristeza",
        rightCategory: "Felicidad",
        description: "Ahora clasifica las emociones invertidas presionando el botón/tecla correspondiente para Tristeza o Felicidad.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-1": {
        title: "Asociación Incongruente - Parte 1",
        leftCategory: "Tristeza o Nacional",
        rightCategory: "Felicidad o Extranjera",
        description: "Presiona el botón/tecla correspondiente para Tristeza o Nacional, o Felicidad o Extranjera.",
        keyAssignment: { left: "e", right: "i" },
      },
      "asociacion-incongruente-2": {
        title: "Asociación Incongruente - Parte 2",
        leftCategory: "Nacional o Tristeza",
        rightCategory: "Extranjera o Felicidad",
        description: "Continúa clasificando. Presiona el botón/tecla correspondiente para Nacional o Tristeza, o Extranjera o Felicidad.",
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
}
