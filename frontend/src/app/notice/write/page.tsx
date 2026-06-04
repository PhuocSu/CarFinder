"use client"

import { Suspense } from "react"
import NoticeForm from "@/app/components/ui/forms/Notice/NoticeForm"
import { useSearchParams } from "next/navigation"

const NoticeWriteContent = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    
    return (
        <div style={{width: "1200px", margin: "0 auto"}}>
            <NoticeForm noticeId={id || undefined} />
        </div>
    )
}

const NoticeWrite = () => (
  <Suspense fallback={null}>
    <NoticeWriteContent />
  </Suspense>
)

export default NoticeWrite