"use client"


import { authState } from "@/store/authStore.atom";
import { useRecoilValue } from "recoil";
import IndividualMemberInfo from "../../forms/MyPage/IndividualMemberInfo";
import BusinessMemberInfo from "../../forms/MyPage/BusinessMemberInfo";
import AgencyMemberInfo from "../../forms/MyPage/AgencyMemberInfo";

const MemberInfoManagement = () => {
    const {user, isAuthenticated} = useRecoilValue(authState);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("User role:", user?.role);
    console.log("Full user object:", user);
    
    return (
        <div>
            {isAuthenticated && user?.role === "INDIVIDUAL" && <IndividualMemberInfo />}
            {isAuthenticated && user?.role === "BUSINESS" && <BusinessMemberInfo />}
            {isAuthenticated && user?.role === "AGENCY" && <AgencyMemberInfo />}
            {/* admin từ từ cũng được */}
        </div>

    )
}

export default MemberInfoManagement
