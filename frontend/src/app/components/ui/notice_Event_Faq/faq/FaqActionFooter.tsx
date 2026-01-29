"use client";

import { Button, Flex, Typography } from "antd";
import { useRecoilValue } from "recoil";
import { faqState } from "@/store/faqStore.atom";
import { useFaqQuery } from "@/app/api/faq/useFaqQuery";

const FaqActionFooter = () => {
  const faqData = useRecoilValue(faqState);
  const { data } = useFaqQuery(faqData.page, faqData.limit, faqData.search);
  return (
    <Flex justify="space-between" align="center">
      <Typography.Text>
        <span
          style={{
            color: "var(--base-fg-color-base-fg-70, #37373E)",
            fontSize: 16,
            fontFamily: "Pretendard",
            fontWeight: "600",
            wordWrap: "break-word",
          }}
        >
          총 {data?.total ?? 0}건
        </span>
        <span
          style={{
            color: "var(--base-fg-color-base-fg-70, #37373E)",
            fontSize: 16,
            fontFamily: "Pretendard",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          의 게시글
        </span>
      </Typography.Text>
      <Button
        type="primary"
        style={{
          width: "80px",
          height: "40px",
          borderRadius: 0,
          background: "var(--button-primary-bg-enabled, #2F2C4D)",
        }}
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
          글쓰기
        </div>
      </Button>
    </Flex>
  );
};

export default FaqActionFooter;
