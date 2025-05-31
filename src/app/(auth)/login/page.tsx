// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useActionUser } from "@/hooks/user/useUserAction";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutationLogin } = useActionUser();
  const [isLoading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Lógica de login aqui
    mutationLogin.mutateAsync(
      { username: email, password: password },
      {
        onError(error) {
          console.log(error);
        },
      }
    );

    setTimeout(() => {
      setLoading(false);

      if (mutationLogin.isSuccess) {
        router.push("/sango-luzingo/inicial");
      }
    }, 4000);
  };

  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center bg-transparent">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Iniciar Sessão</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Nome do Usuário
              </label>
              <Input
                type="text"
                placeholder="SebastiaoAfonso"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              Entrar
            </Button>
          </form>
          <p className="text-sm text-center mt-4">
            Ainda não tens uma conta?{" "}
            <Link href="/cadastrar" className="underline font-medium">
              Criar Conta
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
