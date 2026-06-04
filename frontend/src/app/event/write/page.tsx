"use client"

export const dynamic = "force-dynamic";

import EventForm from "@/app/components/ui/forms/Event/EventForm"
import { useSearchParams } from "next/navigation"


const EventWrite = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    return (
        <div style={{width: "1200px", margin: "0 auto"}}>
            <EventForm eventId={id || undefined}/>
        </div>
    )
}

export default EventWrite