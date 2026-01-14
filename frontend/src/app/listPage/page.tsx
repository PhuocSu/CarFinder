"use client"

import LeftFilter from "../components/ui/filter/listpage/LeftFilter/LeftFilter";
import RightContent from "../components/ui/filter/listpage/RightContent/RightContent";

const ListPage = () => {
    return (
        <div style={{ width: "1200px", height: "100%", margin: "40px auto", display: "flex", gap: "20px" }}>
            <LeftFilter />
            <RightContent />
        </div>
    );
};

export default ListPage
