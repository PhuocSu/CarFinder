"use client"

import { Suspense } from "react"
import FaqForm from "@/app/components/ui/forms/Faq/FaqForm"
import { useAuth } from "@/hooks/useAuth"
import { useSearchParams } from "next/navigation"

const FaqWriteContent = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    return (
        <div style={{width: "1200px", margin: "0 auto"}}>
            <FaqForm faqId={id || undefined}/>
        </div>
    )
}

const FaqWrite = () => (
  <Suspense fallback={null}>
    <FaqWriteContent />
  </Suspense>
)

export default FaqWrite