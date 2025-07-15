"use client"

import { useState } from "react"
import { Button } from "../_components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card"
import { signIn, useSession } from "next-auth/react"
import { redirect, useSearchParams } from "next/navigation"
import { Shield, Sparkles, Users } from "lucide-react"
import Image from "next/image"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { data } = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Inicia o login com Google e redireciona após autenticação
    await signIn("google", { callbackUrl })
  }

  if (data?.user) {
    return redirect(callbackUrl)
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Fundo Animado */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Fundo Animado Personalizado */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradiente base */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-secondary/20" />

          {/* Ondas animadas */}
          <div className="absolute inset-0">
            <svg
              className="absolute bottom-0 left-0 h-full w-full"
              viewBox="0 0 1200 800"
              preserveAspectRatio="none"
            >
              <path
                d="M0,400 C300,300 600,500 1200,400 L1200,800 L0,800 Z"
                fill="url(#wave1)"
                className="animate-wave-slow"
              />
              <path
                d="M0,500 C400,400 800,600 1200,500 L1200,800 L0,800 Z"
                fill="url(#wave2)"
                className="animate-wave-medium"
              />
              <path
                d="M0,600 C200,550 800,650 1200,600 L1200,800 L0,800 Z"
                fill="url(#wave3)"
                className="animate-wave-fast"
              />
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.1"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity="0.05"
                  />
                </linearGradient>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity="0.08"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity="0.03"
                  />
                </linearGradient>
                <linearGradient id="wave3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor="hsl(var(--chart-3))"
                    stopOpacity="0.06"
                  />
                  <stop
                    offset="100%"
                    stopColor="hsl(var(--chart-2))"
                    stopOpacity="0.02"
                  />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Formas geométricas flutuantes */}
          <div className="absolute inset-0">
            <div className="animate-float-slow absolute left-20 top-20 h-32 w-32 rounded-full bg-primary/5" />
            <div className="bg-chart-1/8 animate-float-medium absolute right-32 top-40 h-24 w-24 rotate-45 rounded-lg" />
            <div className="bg-chart-2/6 animate-float-fast absolute bottom-40 left-40 h-40 w-40 rounded-full" />
            <div className="bg-chart-3/10 animate-float-slow absolute left-1/2 top-60 h-20 w-20 rounded-lg" />
            <div className="bg-primary/4 animate-float-medium absolute bottom-60 right-20 h-36 w-36 rounded-full" />
          </div>

          {/* Linhas conectoras animadas */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1200 800"
          >
            <g
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              fill="none"
              opacity="0.1"
            >
              <path
                d="M100,100 Q400,200 800,150 T1100,200"
                className="animate-draw"
              />
              <path
                d="M200,300 Q500,400 900,350 T1200,400"
                className="animate-draw-delayed"
              />
              <path
                d="M50,500 Q350,600 750,550 T1150,600"
                className="animate-draw-slow"
              />
            </g>
          </svg>

          {/* Grid pattern sutil */}
          <div className="absolute inset-0 animate-pulse bg-[linear-gradient(rgba(59,127,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,127,254,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="border-border/50 bg-card/80 shadow-2xl backdrop-blur-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto mb-2 mt-4 h-20 w-20 animate-bounce">
              <Image
                src="/logo.svg"
                width={16}
                height={16}
                alt="NavajaFy Logo"
                className="h-full w-full object-contain drop-shadow-lg filter"
              />
            </div>
            <CardTitle className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-3xl font-bold text-transparent">
              Bem-vindo ao NavajaFy
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Conecte-se à plataforma mais avançada
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Botão de Login com Google */}
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group h-12 w-full transform bg-primary text-lg font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  <span>Conectando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Image
                    src="/google-icon.svg"
                    width={20}
                    height={20}
                    alt="Google"
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />
                  <span>Entrar com Google</span>
                </div>
              )}
            </Button>

            {/* Recursos */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="space-y-2 text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "hsl(var(--chart-1), 0.10)" }}
                >
                  <Shield
                    className="h-10 w-10"
                    style={{ color: "hsl(var(--chart-1))" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Seguro</p>
              </div>
              <div className="space-y-2 text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "hsl(var(--chart-2), 0.10)" }}
                >
                  <Sparkles
                    className="h-10 w-10"
                    style={{ color: "hsl(var(--chart-2))" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Rápido</p>
              </div>
              <div className="space-y-2 text-center">
                <div
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "hsl(var(--chart-3), 0.10)" }}
                >
                  <Users
                    className="h-10 w-10"
                    style={{ color: "hsl(var(--chart-3))" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">Confiável</p>
              </div>
            </div>

            {/* Termos de Uso */}
            <div className="space-y-3 border-t border-border/50 pt-4 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Ao fazer login, você concorda com nossos{" "}
                <button className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80">
                  Termos de Serviço
                </button>{" "}
                e{" "}
                <button className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80">
                  Política de Privacidade
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Texto adicional */}
        <div className="mt-8 space-y-2 text-center">
          <p className="text-sm text-muted-foreground">
            Primeira vez aqui? Sua conta será criada automaticamente.
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span>Sistema online e funcionando</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
