"use client";

import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, Typography } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OnboardingPage = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<"member" | "corporate">("member");

  const handleSelect = () => {
    if(!selectedType) return;
    router.push(`/sign-up-consent?type=${selectedType}`);
  };

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={80}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Header */}
      <Flex vertical gap={8} style={{ width: "100%" }}>
        <Typography.Text
          style={{
            color: "#4A4A50",
            fontSize: 18,
            fontFamily: "Noto Sans KR",
            fontWeight: 400,
            lineHeight: "28px",
          }}
        >
          회원가입
        </Typography.Text>
        <Typography.Title
          level={2}
          style={{
            color: "#37373E",
            fontSize: 28,
            fontFamily: "Noto Sans KR",
            fontWeight: 700,
            lineHeight: "38px",
            margin: 0,
          }}
        >
          회원구분을 선택해주세요.
        </Typography.Title>
      </Flex>

      {/* Options */}
      <Flex gap={20}>
        {/* 일반회원 */}
        <Card
          onClick={() => setSelectedType("member")}
          style={{
            width: 590,
            height: 234,
            borderRadius: 2,
            border: "1px solid #E0E0E3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex vertical align="center" gap={16}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Icon placeholder */}
              <UserOutlined style={{ fontSize: 40, color: "#4A4A50" }} />
            </div>
            <Typography.Text
              strong
              style={{
                fontSize: 18,
                fontFamily: "Noto Sans KR",
                lineHeight: "26px",
                color: "#37373E",
              }}
            >
              일반회원으로 가입하기
            </Typography.Text>
          </Flex>
        </Card>

        {/* 기업회원 */}
        <Card
          onClick={() => setSelectedType("corporate")}
          style={{
            width: 590,
            height: 234,
            borderRadius: 2,
            border: "1px solid #37373E",
            background: "#F9F9F9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Flex vertical align="center" gap={16}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* svg ở đây */}
              <Image src="/images/building1-svgrepo-com.svg" alt="Building" width={50} height={50} preview={false}/>
            </div>
            <Typography.Text
              style={{
                fontSize: 18,
                fontFamily: "Noto Sans KR",
                lineHeight: "28px",
                color: "#4A4A50",
              }}
            >
              기업회원으로 가입하기
            </Typography.Text>
          </Flex>
        </Card>
      </Flex>

      {/* Button */}
      <Button
      onClick={handleSelect}
        type="primary"
        size="large"
        style={{
          width: 488,
          height: 56,
          fontWeight: 700,
          fontSize: 16,
          fontFamily: "Inter",
          background: "#2F2C4D",
        }}
      >
        가입하기
      </Button>
    </Flex>
  );
};

export default OnboardingPage;
