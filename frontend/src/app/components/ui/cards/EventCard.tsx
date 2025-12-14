"use client";

import { Button, Flex, Image, Typography } from "antd";

const EventCard = () => {
  return (
    <Flex
      vertical
      style={{ width: "245px", padding: "20px", border: "1px solid #E0E0E3" }}
    >
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />

      <Typography.Text
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "var(--base-fg-color-base-fg-60, #4A4A50)",
          fontSize: 14,
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          wordWrap: "break-word",
          marginTop: "10px"
        }}
      >
        702 Prime 의 이벤트 소식을 접해보세요 접해보세요.
      </Typography.Text>

      <Typography.Text
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "var(--base-fg-color-base-fg-50, #666670)",
          fontSize: 14,
          fontFamily: "Noto Sans KR",
          fontWeight: "400",
          wordWrap: "break-word",
          marginTop: "10px"
        }}
      >
        2025.05.02 ~ 2024.02.02
      </Typography.Text>

      <Flex gap={8} style={{ marginTop: "10px" }}>
        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="small"
          data-state="enabled"
          data-style="tertiary"
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            background: "var(--button-tertiary-bg-enabled, white)",
            borderRadius: 2,
            outline: "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
        >
          <span
            style={{
              color: "var(--button-tertiary-fg-enabled, #666670)",
              fontSize: 13,
              fontFamily: "Pretendard",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            수정
          </span>
        </Button>
        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="small"
          data-state="enabled"
          data-style="tertiary"
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            background: "var(--button-tertiary-bg-enabled, white)",
            borderRadius: 2,
            outline: "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
        >
          <span
            style={{
              color: "var(--button-tertiary-fg-enabled, #666670)",
              fontSize: 13,
              fontFamily: "Pretendard",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            삭제
          </span>
        </Button>
      </Flex>
    </Flex>
  );
};

export default EventCard;
