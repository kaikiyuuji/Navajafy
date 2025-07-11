"use client"

import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogIn, LogOutIcon } from "lucide-react"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import SingInDialog from "./sing-in-dialog"

const SidebarButton = () => {
  const { data } = useSession()
  const handleLogoutClick = () => signOut()

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex items-center gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? " "} />
            </Avatar>
            <div>
              <p className="font-bold">{data?.user.name}</p>
              <p className="text-xs">{data?.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá. Faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"icon"}>
                  <LogIn />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]" aria-describedby={undefined}>
                <SingInDialog />  
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href={"/"}>
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose asChild key={option.title}>
            <Button
              className="justify-start gap-2"
              variant="ghost"
              asChild
            >
              <Link href={`/barbershops?search=serviço:${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={18}
                  height={18}
                  alt={option.title}
                />
                {option.title}    
              </Link>           
            </Button>
          </SheetClose>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleLogoutClick}
        >
          <LogOutIcon size={18} />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarButton
