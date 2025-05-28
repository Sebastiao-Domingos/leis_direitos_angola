import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8 pb-20 sm:p-20 font-[var(--font-geist-sans)]">
      <div>
        <Button className="p-6 rounded-full text-[18px]" size={"lg"}>
          Iniciar um Conversa
        </Button>
      </div>
    </div>
  );
}
