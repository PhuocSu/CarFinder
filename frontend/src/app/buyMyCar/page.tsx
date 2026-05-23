"use client"

import { useSearchParams } from "next/navigation"
import StepOne from "../components/ui/buyMyCar/stepOne"
import StepTwo from "../components/ui/buyMyCar/stepTwo"
import StepThree from "../components/ui/buyMyCar/stepThree"
import { useState } from "react"

const BuyMyCar = () => {
    const searchParams = useSearchParams()
    const vehicleId = searchParams.get('id')
    const [currentStep, setCurrentStep] = useState(1)

    const handleNextStep = () => {
        setCurrentStep(prev => prev + 1)
    }
    
    const handlePreviousStep = () => {
        setCurrentStep(prev => prev - 1)
    }

    return (
        <div style={{width: "1200px", margin: "40px auto 40px"}}>
            {currentStep === 1 && (
                <StepOne vehicleId={vehicleId} onNext={handleNextStep} />
            )}
            {currentStep === 2 && (
                <StepTwo onNext={handleNextStep} onPrevious={handlePreviousStep} vehicleId={vehicleId} />
            )}
            {currentStep === 3 && (
                <StepThree vehicleId={vehicleId} />
            )}
        </div>
    )
}

export default BuyMyCar
