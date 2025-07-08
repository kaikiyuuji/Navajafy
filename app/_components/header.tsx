import { Card, CardContent } from "@/app/_components/ui/card"
import Image from "next/image"
import SidebarButton from "./sidebar-button"
import { MenuIcon } from "lucide-react"
import { SheetTrigger, Sheet } from "./ui/sheet"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <Card className="sticky top-0 z-50 rounded-none border-x-0 border-t-0 bg-card/80 shadow-md backdrop-blur-lg">
      <CardContent className="flex flex-row items-center justify-between p-4 lg:container sm:px-6 md:px-8 lg:mx-auto lg:max-w-6xl">
        <div className="flex flex-row items-center gap-3">
          <div className="gradient-animate relative flex h-10 w-10 items-center justify-center rounded-full">
            <Image src="/logo.svg" alt="Navajafy" width={40} height={40} />
          </div>
          <h1 className="bg-gradient-to-r text-lg font-extrabold tracking-tight md:text-xl">
            NavajaFy
          </h1>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="pulse-animation transition-all duration-300 hover:border-primary/50 hover:bg-primary/10"
            >
              <MenuIcon className="h-5 w-5 text-foreground/80" />
            </Button>
          </SheetTrigger>
          <SidebarButton></SidebarButton>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
