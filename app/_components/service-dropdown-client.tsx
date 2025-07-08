"use client"

import { useRouter } from "next/navigation"
import ServiceDropdown from "./service-dropdown"
import { QuickSearchOption } from "../_constants/search"

interface ServiceDropdownClientProps {
  quickSearchOptions: QuickSearchOption[]
}

const ServiceDropdownClient = ({
  quickSearchOptions,
}: ServiceDropdownClientProps) => {
  const router = useRouter()

  return (
    <ServiceDropdown
      quickSearchOptions={quickSearchOptions}
      onSelect={(option) => {
        router.push(
          `/barbershops?search=serviço:${encodeURIComponent(option.title)}`,
        )
      }}
    />
  )
}

export default ServiceDropdownClient
