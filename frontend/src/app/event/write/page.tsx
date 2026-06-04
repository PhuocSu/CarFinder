"use client"

import { Suspense } from "react"
import EventForm from "@/app/components/ui/forms/Event/EventForm"
import { useSearchParams } from "next/navigation"


const EventWriteContent = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    return (
        <div style={{width: "1200px", margin: "0 auto"}}>
            <EventForm eventId={id || undefined}/>
        </div>
    )
}

const EventWrite = () => (
  <Suspense fallback={null}>
    <EventWriteContent />
  </Suspense>
)

export default EventWrite