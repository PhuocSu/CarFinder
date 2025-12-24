"use client"


import { authState } from "@/store/authStore";
import { useRecoilValue } from "recoil";
import IndividualMemberInfo from "../../forms/MyPage/IndividualMemberInfo";
import BusinessMemberInfo from "../../forms/MyPage/BusinessMemberInfo";
import AgencyMemberInfo from "../../forms/MyPage/AgencyMemberInfo";

const MemberInfoManagement = () => {
    // const {user, isAuthenticated} = useRecoilValue(authState);
    // console.log('Auth state:', { user, isAuthenticated });
    // if (!isAuthenticated || !user) return null;

    return (
        // <div>
        //     {isAuthenticated && user.role === "INDIVIDUAL" && <IndividualMemberInfo />}
        //     {isAuthenticated && user.role === "BUSINESS" && <BusinessMemberInfo />}
        //     {isAuthenticated && user.role === "AGENCY" && <AgencyMemberInfo />}
        //     {/* admin từ từ cũng được */}
        // </div>

        //hiệ tại đang lỗi nên để sau
        <div>
            <h1>MemberInfoManagement</h1>
        </div>
    )
}

export default MemberInfoManagement
