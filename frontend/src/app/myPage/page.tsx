"use client"

import { Suspense } from "react";
import MyPageDetail from "../components/ui/myPageTabs/myPageDetail";

const MyPage = () => {
    return (
        <div>
            <Suspense fallback={null}>
              <MyPageDetail />
            </Suspense>
        </div>
    );
};

export default MyPage;
