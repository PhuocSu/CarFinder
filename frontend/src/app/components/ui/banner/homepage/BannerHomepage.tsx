"use client";

import { Button, Flex, Typography } from "antd";

const BannerHomepage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg, rgba(66, 77, 97, .8), rgba(91, 107, 139, .49) 42.42%, rgba(77, 124, 216, 0) 60%), url(/images/homepage/banner1.webp) #d3d3d3 50% / cover no-repeat",
        height: "488px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex gap={40} vertical style={{ width: "1200px" }}>
        <Flex vertical>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-0, white)",
              fontSize: 18,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            내 차 팔 때, 믿을 수 있는 첫걸음
          </Typography.Text>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-0, white)",
              fontSize: 15,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            복잡한 절차 없이 간편하게 ! KGM이 정직한 가격으로 내 차를 매입해
            드립니다.
          </Typography.Text>
        </Flex>

        <Button
          data-icon="right"
          data-shownumber="true"
          data-size="middle"
          data-state="enabled"
          data-style="primary"
          style={{
            all: "unset",
            width: "124px",
            height: "40px",
            paddingLeft: 12,
            paddingRight: 12,
            background: "#292743",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              color: "var(--button-primary-fg, white)",
              fontSize: 13,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            내차사러 가기
            <img
              src="/images/16px-icon-chevron-right.svg"
              alt="arrow"
            />
          </div>
        </Button>
      </Flex>
    </div>
  );
};

export default BannerHomepage;
