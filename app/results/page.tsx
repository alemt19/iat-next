"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface IATResult {
  id: number
  d_score: number
  d_score_level: string
  d_score_description: string
  total_trials: number
  short_trials: number
  average_rt_ms: number
  age: string
  gender: string
  education: string
  ethnicity: string
  test_title: string
  left_category: string
  right_category: string
  created_at: string
}

function pairedCategories(leftStr: string, rightStr: string) {
  const left = leftStr.split(" y ").map(s => s.trim())
  const right = rightStr.split(" y ").map(s => s.trim())
  const maxLen = Math.max(left.length, right.length)
  const pairs = []
  for (let i = 0; i < maxLen; i++) {
    const l = left[i] ?? ""
    const r = right[i] ?? ""
    pairs.push([l, r])
  }
  return pairs
}

export default function AdminResultsPage() {
  const [results, setResults] = useState<IATResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedResult, setSelectedResult] = useState<IATResult | null>(null)
  const [search, setSearch] = useState("")
  const [filterGender, setFilterGender] = useState("")
  const [filterCategory, setFilterCategory] = useState("")

  const fetchResults = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from("iat_results")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    setResults(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchResults()
  }, [])

  const allCategories = Array.from(
    new Set(
      results.flatMap(r =>
        [...r.left_category.split(" y "), ...r.right_category.split(" y ")].map(s => s.trim())
      )
    )
  ).sort()

  const filteredResults = results.filter(r => {
    const plain = (
      r.test_title +
      r.d_score_level +
      r.d_score_description +
      r.left_category +
      r.right_category +
      r.age +
      r.gender +
      String(r.d_score)
    ).toLowerCase()
    const searchOk = search === "" || plain.includes(search.toLowerCase())
    const genderOk = filterGender === "" || r.gender === filterGender
    const categoryOk =
      filterCategory === "" ||
      r.left_category.includes(filterCategory) ||
      r.right_category.includes(filterCategory)
    return searchOk && genderOk && categoryOk
  })

  const downloadCSV = () => {
    const csv = [
      [
        "ID",
        "D-Score",
        "Nivel",
        "Descripción",
        "Ensayos",
        "Rápidas",
        "RT Prom.",
        "Edad",
        "Género",
        "Título del Test",
        "Categorías",
        "Fecha",
      ].join(","),
      ...filteredResults.map(r =>
        [
          r.id,
          r.d_score.toFixed(3),
          `"${r.d_score_level}"`,
          `"${r.d_score_description.replace(/"/g, '""')}"`,
          r.total_trials,
          r.short_trials,
          r.average_rt_ms.toFixed(0),
          `"${r.age}"`,
          `"${r.gender}"`,
          `"${r.test_title}"`,
          `"${r.left_category} | ${r.right_category}"`,
          new Date(r.created_at).toLocaleString(),
        ].join(",")
      ),
    ].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "resultados_IAT.csv"
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <Card className="w-full max-w-6xl mb-6">
        <CardHeader>
          <CardTitle className="text-2xl">Tabla de Resultados de los Tests</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-6 items-end">
            <div>
              <label className="text-sm block mb-1">Buscar</label>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por título, nivel, dscore, etc."
                className="border px-3 py-2 rounded w-48 shadow-sm focus:outline-blue-500 text-base"
              />
            </div>
            <div>
              <label className="text-sm block mb-1">Género</label>
              <select
                value={filterGender}
                onChange={e => setFilterGender(e.target.value)}
                className="border px-3 py-2 rounded w-36 shadow-sm"
              >
                <option value="">Todos</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
                <option value="prefiero-no-decir">Prefiero no decir</option>
              </select>
            </div>
            <div>
              <label className="text-sm block mb-1">Categoría</label>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="border px-3 py-2 rounded w-48 shadow-sm"
              >
                <option value="">Todas</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <Button variant="outline" onClick={fetchResults}>
              Refrescar
            </Button>
            <Button variant="default" onClick={downloadCSV}>
              Descargar CSV
            </Button>
            <span className="ml-auto text-sm text-gray-600">
              Registros mostrados: <b>{filteredResults.length}</b> / <b>{results.length}</b>
            </span>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto rounded border">
            <table className="w-full min-w-[900px] border-collapse text-base">
              <thead className="bg-blue-50">
                <tr>
                  <th className="p-2 border font-medium">ID</th>
                  <th className="p-2 border font-medium">Edad</th>
                  <th className="p-2 border font-medium">Género</th>
                  <th className="p-2 border font-medium">Título del Test</th>
                  <th className="p-2 border font-medium">Categorías Pareadas</th>
                  <th className="p-2 border font-medium">D-Score</th>
                  <th className="p-2 border font-medium">Nivel</th>
                  <th className="p-2 border font-medium">Fecha</th>
                  <th className="p-2 border font-medium text-center">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length === 0 && (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-gray-500">
                      No hay registros para mostrar.
                    </td>
                  </tr>
                )}
                {filteredResults.map((r, i) => {
                  const pairs = pairedCategories(r.left_category, r.right_category)
                  return (
                    <tr
                      key={r.id}
                      className={`transition duration-75 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                    >
                      <td className="p-2 border">{r.id}</td>
                      <td className="p-2 border">{r.age}</td>
                      <td className="p-2 border">{r.gender}</td>
                      <td className="p-2 border whitespace-pre-wrap">{r.test_title}</td>
                      <td className="p-2 border whitespace-pre-wrap">
                        {pairs.map(([left, right], i) => (
                          <div key={i}>
                            {left}
                            {left && right ? " y " : ""}
                            {right}
                          </div>
                        ))}
                      </td>
                      <td className="p-2 border text-center">{r.d_score.toFixed(3)}</td>
                      <td className="p-2 border text-center">{r.d_score_level}</td>
                      <td className="p-2 border text-xs">{new Date(r.created_at).toLocaleString()}</td>
                      <td className="p-2 border text-center">
                        <Button variant="outline" size="sm" onClick={() => setSelectedResult(r)}>
                          Ver
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {loading && (
              <div className="p-4 text-center text-blue-500 font-medium">Cargando resultados...</div>
            )}
            {error && (
              <div className="p-4 text-center text-red-600 font-medium">Error: {error}</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal lateral detalles */}
      {selectedResult && (
        <div
          className="fixed inset-0 z-30 flex justify-end bg-black/20"
          onClick={() => setSelectedResult(null)}
        >
          <div
            className="w-full max-w-md bg-white shadow-2xl h-full overflow-y-auto flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Detalle del Resultado</h2>
              <button
                className="text-2xl hover:text-red-500"
                onClick={() => setSelectedResult(null)}
                aria-label="Cerrar detalles"
              >
                &times;
              </button>
            </div>
            <div className="p-6 flex-1 space-y-5">
              <div>
                <b>ID:</b> {selectedResult.id}
              </div>
              <div>
                <b>Fecha:</b> {new Date(selectedResult.created_at).toLocaleString()}
              </div>
              <hr />
              <div>
                <b>D-Score:</b>{" "}
                <span className="font-mono text-lg">{selectedResult.d_score.toFixed(3)}</span>
              </div>
              <div>
                <b>Nivel de preferencia:</b> {selectedResult.d_score_level}
              </div>
              <div>
                <b>Interpretación:</b>
                <div className="text-gray-700">{selectedResult.d_score_description}</div>
              </div>
              <hr />
              <div>
                <b>Total de ensayos:</b> {selectedResult.total_trials}
              </div>
              <div>
                <b>Respuestas muy rápidas (&lt;300ms):</b> {selectedResult.short_trials}
              </div>
              <div>
                <b>RT promedio:</b> {Math.round(selectedResult.average_rt_ms)} ms
              </div>
              <hr />
              <div>
                <b>Edad:</b> {selectedResult.age}
              </div>
              <div>
                <b>Género:</b> {selectedResult.gender}
              </div>
              <div>
                <b>Educación:</b> {selectedResult.education}
              </div>
              <div>
                <b>Etnia:</b> {selectedResult.ethnicity}
              </div>
              <div>
                <b>Título del Test:</b> {selectedResult.test_title}
              </div>
              <div>
                <b>Categorías Izquierda:</b> {selectedResult.left_category}
              </div>
              <div>
                <b>Categorías Derecha:</b> {selectedResult.right_category}
              </div>
            </div>
            <div className="px-6 pb-6 flex justify-end">
              <Button variant="outline" onClick={() => setSelectedResult(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
