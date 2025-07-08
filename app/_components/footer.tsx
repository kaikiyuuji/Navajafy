import React from "react"

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-secondary/20 bg-card/30 px-5 py-6 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-4 px-5 lg:container sm:flex-row sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        <div className="flex flex-col items-center sm:items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 NavajaFy. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/70">
            A melhor plataforma para agendamento de barbearias
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
