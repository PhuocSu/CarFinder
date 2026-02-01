"use client";

import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { eventState } from "@/store/eventStore.atom";

const EventSearchBar = () => {
  const [eventData, setEventData] = useRecoilState(eventState);
  const [inputText, setInputText] = useState(eventData.search);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);

    if (e.target.value.trim() === "") {
      setEventData((prev) => ({
        ...prev,
        search: "",
        page: 1,
      }));
    }
  };

  const handleSearchClick = () => {
    setEventData((prev) => ({
      ...prev,
      search: inputText.trim(),
      page: 1,
    }));
  };

  return (
    <Space size={8} style={{ height: "40px" }}>
      <Input
        placeholder="이벤트 제목을 검색해주세요."
        onChange={handleInputChange}
        onPressEnter={handleSearchClick}
        suffix={<SearchOutlined />}
        style={{
          width: "338px",
          height: "40px",
          borderRadius: 0,
        }}
      />
      <Button
        type="primary"
        style={{
          width: "80px",
          height: "40px",
          borderRadius: 0,
          background: "var(--button-primary-bg-enabled, #2F2C4D)",
        }}
        onClick={handleSearchClick}
      >
        <div
          style={{
            color: "var(--button-primary-fg, white)",
            fontSize: 14,
            fontFamily: "Noto Sans KR",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          검색
        </div>
      </Button>
    </Space>
  );
};

export default EventSearchBar;
