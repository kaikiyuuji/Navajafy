"use client"

import { usePathname } from "next/navigation"
import Footer from "./footer"

const FooterWrapper = () => {
  const pathname = usePathname()
  const isAdminPage = pathname.startsWith("/admin")

  if (isAdminPage) {
    return null
  }

  return <Footer />
}

export default FooterWrapper
