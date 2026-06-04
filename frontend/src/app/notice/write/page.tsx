"use client"

export const dynamic = "force-dynamic";

import NoticeForm from "@/app/components/ui/forms/Notice/NoticeForm"
import { useSearchParams } from "next/navigation"

const NoticeWrite = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")
    
    return (
        <div style={{width: "1200px", margin: "0 auto"}}>
            <NoticeForm noticeId={id || undefined} />
        </div>
    )
}

export default NoticeWrite