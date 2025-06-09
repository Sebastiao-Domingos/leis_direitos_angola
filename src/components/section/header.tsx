import { SidebarTrigger } from "../ui/sidebar";
import { Settings, UserCircle } from "lucide-react";
import { useGetLoggedUser } from "@/hooks/user/useGetUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpeechToText from "@/hooks/textToSpeech/useSpeechToText";
import { Button } from "../ui/button";
import Image from "next/image";
export function AppHeader() {
  const { data, result } = useGetLoggedUser();
  const { isSpeaking, isListening } = useSpeechToText({ lang: "pt-BR" });

  return (
    <header className="px-6 py-4 shadow-md flex items-center gap-4 sticky top-0 z-40 text-white bg-gradient-to-br from-black/90 /via-primary/90 to-primary/80">
      <div>
        <SidebarTrigger className="-ml-1" />

        <div className="flex items-center gap-4">
          <Avatar className="border-2 border-yellow-400">
            <AvatarImage src="/agent-avatar.png" />
            <AvatarFallback className="bg-yellow-500 text-black">
              AO
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl tracking-tight text-secondary/80 font-bold">
              Sango Luzingo
            </h1>
            <p className="text-sm text-white/90">
              Fale com o nosso agente digital{" "}
              <span>
                {isSpeaking
                  ? "Falando ....."
                  : isListening
                  ? "Ouvindo  ....."
                  : ""}
              </span>
            </p>
          </div>
        </div>
      </div>

      {result.isSuccess && data && (
        <div className="ml-auto flex flex-col gap-1 items-center">
          <UserCircle />
          <p>{data.username.split(" ")[0].toUpperCase()}</p>
        </div>
      )}
      <Image
        alt="Logo da uniluanda"
        src={"/images/logo.png"}
        width={100}
        height={100}
      />
    </header>
  );
}

function SettingsContent() {
  const { voices, selectedVoice, setSelectedVoice, volume, rate } =
    useSpeechToText({ lang: "pt-BR" });

  return (
    <div className="flex items-center justify-between">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-red-700"
          >
            <Settings size={30} className="w-5 h-5 md:w-10 md:h-10" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 border-none text-white bg-gradient-to-br from-black/90 /via-primary/90 via-primary/30 to-black/90">
          <div className="space-y-4">
            <h3 className="font-medium">Configurações de Voz</h3>

            <div className="space-y-2">
              <Label htmlFor="voice-select">Voz</Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma voz" />
                </SelectTrigger>
                <SelectContent className="!bg-black/60 !border-none !rounded !text-white">
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      ({voice.lang}) - {voice.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volume: {volume?.toFixed(1)}</Label>
              <Slider id="volume" defaultValue={[volume]} max={1} step={0.1} />
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
        </PopoverContent>
      </Popover>
    </div>
  );
}
