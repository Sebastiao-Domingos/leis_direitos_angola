"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import useSpeechToText from "@/hooks/textToSpeech/useSpeechToText";
import { Slider } from "@/components/ui/slider";

export default function AgentSettingsPage() {
  const [enabled, setEnabled] = useState(true);

  const handleSave = () => {
    toast.success("Configurações salvas com sucesso!");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { voices, selectedVoice, setSelectedVoice, volume, rate } =
    useSpeechToText({ lang: "pt-BR" });

  return (
    <div className="relative max-w-3xl mx-auto py-12 px-4 sm:px-8">
      <div className="space-y-2 mb-8 text-white">
        <h1 className="text-3xl font-bold">Configurações do Agente</h1>
        <p className="text-slate-100">
          Personalize o comportamento e a apresentação do agente inteligente.
        </p>
      </div>

      <div className="space-y-8 bg-slate-100/10 text-white dark:bg-muted rounded-xl shadow-md p-6">
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

              <Select>
                <SelectTrigger id="language">
                  <SelectValue
                    placeholder="Selecione o idioma"
                    className="placeholder:text-white"
                  />
                </SelectTrigger>
                <SelectContent className="bg-black/50 border-none rounded text-white">
                  <SelectItem value="pt-pt" defaultChecked>
                    Português do Protugal
                  </SelectItem>
                  <SelectItem value="pt-br">Português do Brazil</SelectItem>
                  <SelectItem value="gl">inglês</SelectItem>
                  <SelectItem value="fr">Francês</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="voice-select">Voz</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger id="voice-select">
                  <SelectValue placeholder="Selecione uma voz" />
                </SelectTrigger>
                <SelectContent className="bg-black/50 border-none rounded text-white">
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      ({voice.lang}) - {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="space-y-2">
                <Label htmlFor="volume">Volume: {volume?.toFixed(1)}</Label>
                <Slider
                  id="volume"
                  defaultValue={[volume]}
                  max={1}
                  step={0.1}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rate">Velocidade: {rate?.toFixed(1)}</Label>
                <Slider
                  id="rate"
                  defaultValue={[rate]}
                  max={2}
                  min={0.5}
                  step={0.1}
                  className="text-secondary"
                />
              </div>
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
