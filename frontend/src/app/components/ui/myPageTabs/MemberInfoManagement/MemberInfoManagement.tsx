"use client"


import { authState } from "@/store/authStore";
import { useRecoilValue } from "recoil";
import IndividualMemberInfo from "../../forms/MyPage/IndividualMemberInfo";
import BusinessMemberInfo from "../../forms/MyPage/BusinessMemberInfo";
import AgencyMemberInfo from "../../forms/MyPage/AgencyMemberInfo";

const MemberInfoManagement = () => {
    const {user, isAuthenticated} = useRecoilValue(authState);
    if (!isAuthenticated || !user) return null;

    return (
        <div>
            {user.role === "INDIVIDUAL" && <IndividualMemberInfo />}
            {user.role === "BUSINESS" && <BusinessMemberInfo />}
            {user.role === "AGENCY" && <AgencyMemberInfo />}
            {/* admin từ từ cũng được */}
        </div>
    )
}

export default MemberInfoManagement
