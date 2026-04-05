"use client"

import { useSearchParams } from "next/navigation"
import StepOne from "../components/ui/buyMyCar/stepOne"
import StepTwo from "../components/ui/buyMyCar/stepTwo"
import StepThree from "../components/ui/buyMyCar/stepThree"
import PurchaseContract from "../components/ui/buyMyCar/Contract/PurchaseContract"

const BuyMyCar = () => {
    const searchParams = useSearchParams()
    const vehicleId = searchParams.get('id')
    
    return (
        <div style={{width: "1200px", margin: "40px auto 40px"}}>
            {/* <StepOne vehicleId={vehicleId} /> */}
            {/* <StepTwo /> */}
            {/* <StepThree vehicleId={vehicleId} /> */}
            <PurchaseContract />
        </div>
    )
}

export default BuyMyCar