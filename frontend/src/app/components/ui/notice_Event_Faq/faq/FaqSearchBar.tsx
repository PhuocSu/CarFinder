"use client"

import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { faqState } from "@/store/faqStore.atom";
import { useState } from "react";

const FaqSearchBar = () => {
    const [faqData, setFaqData] = useRecoilState(faqState);
    const [inputText, setInputText] = useState(faqData.search);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        
        if (e.target.value.trim() === "") {
            setFaqData((prev) => ({
                ...prev,
                search: "",
                page: 1
            }));
        }
    };

    const handleSearchClick = () => {
        setFaqData((prev) => ({
            ...prev,
            search: inputText.trim(),
            page: 1,
        }));
    };

    return (
        <Space size={8} style={{ height: "40px" }}>
            <Input 
                placeholder="질문을 검색해주세요."
                suffix={<SearchOutlined />}
                value={inputText}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchClick();
                    }
                }}
                style={{
                    width: "338px",
                    height: "40px",
                    borderRadius: 0
                }}
            />
            <Button type="primary" style={{
                width: "80px",
                height: "40px",
                borderRadius: 0,
                background: 'var(--button-primary-bg-enabled, #2F2C4D)'
            }}
            onClick={handleSearchClick}
            >
                <div style={{ color: 'var(--button-primary-fg, white)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>검색</div>
            </Button>
        </Space>
    );
};

export default FaqSearchBar;