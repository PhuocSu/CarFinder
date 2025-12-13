"use client"

import CompletedSignup from "@/app/components/ui/forms/SignupForm/CompletedSignup";
import SignupCorporate from "@/app/components/ui/forms/SignupForm/Signup-corporate";
import SignupMember from "@/app/components/ui/forms/SignupForm/Signup-member";
import { useSearchParams } from "next/navigation";

const SignUpConsentPage = () => {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type') || 'member';
  return (
    <div style={{ width: "100%", marginTop: "30px", marginBottom: "142px" }}>
      {type === "member" ? <SignupMember /> : <SignupCorporate />}
    </div>
  );
};

export default SignUpConsentPage;
