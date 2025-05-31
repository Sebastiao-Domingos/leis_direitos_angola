// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useActionUser } from "@/hooks/user/useUserAction";

export default function RegisterPage() {
  const router = useRouter();
  const [confirmPassWord, setConfirmPassWord] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutationRegister } = useActionUser();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
    mutationRegister.mutateAsync(
      {
        username: name,
        password: password,
      },
      {
        onError(erros) {
          console.log(erros);
        },
      }
    );

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (mutationRegister.isSuccess) {
        router.push("/login");
      }
    }, 4000);
  };

  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Nome</label>
              <Input
                type="text"
                placeholder="Nome do usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Confirmar Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassWord}
                onChange={(e) => setConfirmPassWord(e.target.value)}
                required
              />
            </div>

            {password !== confirmPassWord && (
              <div>
                <p className="text-primary text-sm">
                  As Senhas devem ser iguais!
                </p>
              </div>
            )}
            {password === confirmPassWord && (
              <div>
                <p className="text-green-600 text-sm flex items-center gap-2">
                  <Check size={10} /> Senhas iguais!
                </p>
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              Criar Conta
            </Button>
          </form>
          <p className="text-sm text-center mt-4">
            Já tens uma conta?{" "}
            <Link href="/login" className="underline font-medium">
              Iniciar Sessão
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
