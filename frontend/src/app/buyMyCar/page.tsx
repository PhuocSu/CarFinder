"use client"

import { useSearchParams } from "next/navigation"
import StepOne from "../components/ui/buyMyCar/stepOne"
import StepTwo from "../components/ui/buyMyCar/stepTwo"

const BuyMyCar = () => {
    const searchParams = useSearchParams()
    const vehicleId = searchParams.get('id')
    
    return (
        <div style={{width: "1200px", margin: "40px auto 40px"}}>
            {/* <StepOne vehicleId={vehicleId} /> */}
            <StepTwo />
        </div>
    )
}

export default BuyMyCar