"use client"

export const dynamic = "force-dynamic";

import FaqForm from "@/app/components/ui/forms/Faq/FaqForm"
import { useAuth } from "@/hooks/useAuth"
import { useSearchParams } from "next/navigation"

const FaqWrite = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    return (
        <div style={{width: "1200px", margin: "0 auto"}}>
            <FaqForm faqId={id || undefined}/>
        </div>
    )
}

export default FaqWrite