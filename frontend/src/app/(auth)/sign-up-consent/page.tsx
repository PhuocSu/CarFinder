"use client"

import { Suspense } from "react";
import CompletedSignup from "@/app/components/ui/forms/SignupForm/CompletedSignup";
import SignupCorporate from "@/app/components/ui/forms/SignupForm/Signup-corporate";
import SignupMember from "@/app/components/ui/forms/SignupForm/Signup-member";
import { useSearchParams } from "next/navigation";

const SignUpConsentContent = () => {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type') || 'member';
  return (
    <div style={{ width: "1200px", margin: "30px auto 142px", padding: "0 20px" }}>
      {type === "member" ? <SignupMember /> : <SignupCorporate />}
    </div>
  );
};

const SignUpConsentPage = () => (
  <Suspense fallback={null}>
    <SignUpConsentContent />
  </Suspense>
);

export default SignUpConsentPage;
