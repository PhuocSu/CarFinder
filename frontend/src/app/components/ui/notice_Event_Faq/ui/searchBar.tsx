"use client"

import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
    return (
        <Space size={8} style={{ height: "40px" }}>
            <Input placeholder="Example"
                suffix={<SearchOutlined />}
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
            >
                <div style={{ color: 'var(--button-primary-fg, white)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>검색</div>
            </Button>
        </Space>
    );
};

export default SearchBar;