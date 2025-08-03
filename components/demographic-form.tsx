"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DemographicData } from "@/app/page"

interface DemographicFormProps {
  onComplete: (data: DemographicData) => void
}

export function DemographicForm({ onComplete }: DemographicFormProps) {
  const [formData, setFormData] = useState<DemographicData>({
    age: "",
    gender: "",
    education: "",
    ethnicity: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.age && formData.gender && formData.education && formData.ethnicity) {
      onComplete(formData)
    }
  }

  const isFormValid = formData.age && formData.gender && formData.education && formData.ethnicity

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Test de Asociación Implícita</CardTitle>
          <CardDescription>
            Por favor, completa la siguiente información antes de comenzar el test.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium">Edad</Label>
              <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu rango de edad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-24">18-24 años</SelectItem>
                  <SelectItem value="25-34">25-34 años</SelectItem>
                  <SelectItem value="35-44">35-44 años</SelectItem>
                  <SelectItem value="45-54">45-54 años</SelectItem>
                  <SelectItem value="55-64">55-64 años</SelectItem>
                  <SelectItem value="65+">65+ años</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Género</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="masculino" id="masculino" />
                  <Label htmlFor="masculino">Masculino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="femenino" id="femenino" />
                  <Label htmlFor="femenino">Femenino</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="otro" id="otro" />
                  <Label htmlFor="otro">Otro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefiero-no-decir" id="prefiero-no-decir" />
                  <Label htmlFor="prefiero-no-decir">Prefiero no decir</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Nivel de Educación</Label>
              <Select
                value={formData.education}
                onValueChange={(value) => setFormData({ ...formData, education: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu nivel de educación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primaria">Educación Primaria</SelectItem>
                  <SelectItem value="secundaria">Educación Secundaria</SelectItem>
                  <SelectItem value="preparatoria">Preparatoria/Bachillerato</SelectItem>
                  <SelectItem value="tecnica">Educación Técnica</SelectItem>
                  <SelectItem value="universitaria">Educación Universitaria</SelectItem>
                  <SelectItem value="posgrado">Posgrado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-medium">Origen Étnico</Label>
              <Select
                value={formData.ethnicity}
                onValueChange={(value) => setFormData({ ...formData, ethnicity: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu origen étnico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hispano-latino">Hispano/Latino</SelectItem>
                  <SelectItem value="blanco">Blanco</SelectItem>
                  <SelectItem value="afroamericano">Afroamericano</SelectItem>
                  <SelectItem value="asiatico">Asiático</SelectItem>
                  <SelectItem value="indigena">Indígena Americano</SelectItem>
                  <SelectItem value="mixto">Mixto</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                  <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={!isFormValid}>
              Continuar al Test
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
