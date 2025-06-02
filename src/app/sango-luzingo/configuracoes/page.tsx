"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function AgentSettingsPage() {
  const [enabled, setEnabled] = useState(true);

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  return (
    <div className="relative max-w-3xl mx-auto py-12 px-4 sm:px-8">
      <div className="space-y-2 mb-8 text-white">
        <h1 className="text-3xl font-bold">Configurações do Agente</h1>
        <p className="text-slate-100">
          Personalize o comportamento e a apresentação do agente inteligente.
        </p>
      </div>

      <div className="space-y-8 bg-slate-100/10 text-white dark:bg-muted rounded-xl shadow-md p-6 border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">Agente Ativo</Label>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="agentName">Nome do Agente</Label>
              <Input
                id="agentName"
                placeholder="Ex: Kimbundu"
                defaultValue="Agente Inteligente"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Idioma Preferido</Label>
              <Input
                id="language"
                placeholder="Ex: Português, Kimbundu..."
                defaultValue="Português"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tom de Resposta</Label>
            <Textarea
              id="tone"
              placeholder="Formal, amigável, direto, educativo..."
              defaultValue="Educativo e acessível para todos os públicos."
            />
          </div>
        </div>

        <Separator />

        <div className="flex justify-end">
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  );
}
