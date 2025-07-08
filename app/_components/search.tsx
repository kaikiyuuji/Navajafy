"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite algo para buscar",
  }),
})

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })
  const router = useRouter()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?search=${data.search}`)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="relative w-full">
              <FormControl>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                  <Input
                    placeholder="Buscar barbearias..."
                    {...field}
                    className="h-11 w-full rounded-xl border-secondary/70 bg-secondary/30 pl-10 pr-4 transition-all duration-300 focus:border-primary/50 focus:bg-secondary/50 focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </FormControl>
              <FormMessage className="ml-1 mt-1 text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="icon"
          className="pulse-animation ml-1 h-11 w-11 rounded-xl bg-primary p-1 shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
        >
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}

export default Search
