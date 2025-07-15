"use client"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu"
import { ScissorsIcon, ChevronDown } from "lucide-react"
import Image from "next/image"

interface QuickSearchOption {
  title: string
  imageUrl: string
}

interface ServiceDropdownProps {
  quickSearchOptions: QuickSearchOption[]
  // eslint-disable-next-line no-unused-vars
  onSelect: (option: QuickSearchOption) => void
}

const ServiceDropdown = ({
  quickSearchOptions,
  onSelect,
}: ServiceDropdownProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        className="flex h-11 w-full items-center gap-2 rounded-xl border-secondary/70 bg-secondary/30 transition-all duration-300 hover:border-primary/50 hover:bg-secondary/50 hover:shadow-md"
      >
        <ScissorsIcon size={16} className="text-primary" />
        <span className="text-sm font-normal text-muted-foreground">
          Selecione um serviço
        </span>
        <ChevronDown size={16} className="ml-auto opacity-70" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      className="w-[220px] rounded-xl border-secondary/70 bg-secondary/90 backdrop-blur-md"
    >
      {quickSearchOptions.map((option) => {
        return (
          <DropdownMenuItem
            key={option.title}
            className="cursor-pointer gap-2 focus:bg-secondary/50 focus:text-foreground"
            onClick={() => onSelect(option)}
          >
            <div className="flex h-5 w-5 items-center justify-center">
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
                className="transition-transform duration-300"
              />
            </div>
            {option.title}
          </DropdownMenuItem>
        )
      })}
    </DropdownMenuContent>
  </DropdownMenu>
)

export default ServiceDropdown
