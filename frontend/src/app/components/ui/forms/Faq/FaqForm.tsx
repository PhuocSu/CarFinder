"use client";

import { Editor } from "@tinymce/tinymce-react";
import { Button, Flex, Input, Select, Typography } from "antd";

const categoryOptions = [
  { label: "차량 및 계약 절차 관련", value: "vehicle_and_contract_procedure" },
  { label: "계약 조건 관련", value: "contract_terms" },
  { label: "결제/비용 관련", value: "payment_and_cost" },
  { label: "인수관련", value: "handover" },
  { label: "기타", value: "others" },
];

const FaqForm = () => {
  return (
    <Flex vertical align="center" gap={"80px"} style={{ marginBottom: "80px" }}>
      <Typography.Text
        style={{
          width: "100%",
          textAlign: "center",
          color: "var(--base-fg-color-base-fg-70, #37373E)",
          fontSize: 28,
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        자주묻는 질문
      </Typography.Text>

      <Flex vertical gap={"40px"} style={{ width: "100%" }}>
        <Flex vertical gap={"16px"}>
          <Flex align="center" gap={16} style={{ height: "40px" }}>
            <Typography.Text 
              style={{ width: "100px", flexShrink: 0, display: "inline-block" }}
            >
              글제목
            </Typography.Text>
            <Input placeholder="글제목을 입력해주세요." style={{ height: "100%" }}/>
          </Flex>

          {/* category */}
          <Flex align="center" gap={16} style={{ height: "40px" }}>
            <Typography.Text
              style={{ width: "100px", flexShrink: 0, display: "inline-block" }}
            >
              질문 주제
            </Typography.Text>

            <Select
              style={{ height: "100%", width: "542px", display: "flex", justifyContent: "center" }}
              placeholder="질문의 주제를 선택해주세요."
              options={categoryOptions}
            />
          </Flex>

          <Flex align="center" gap={16} style={{ height: "40px" }}>
            <Typography.Text
              style={{ width: "100px", flexShrink: 0, display: "inline-block" }}
            >
              파일첨부
            </Typography.Text>
            <Input
              placeholder="선택된 파일 없음"
              style={{ height: "100%", width: "458px" }}
              disabled
            />
            <Button
              data-icon="none"
              data-shownumber="true"
              data-size="middle"
              data-state="enabled"
              data-style="tertiary"
              style={{
                width: "75px",
                height: "100%",
                paddingLeft: 12,
                paddingRight: 12,
                background: "var(--button-tertiary-bg-enabled, white)",
                borderRadius: 2,
                outline:
                  "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "inline-flex",
              }}
            >
              <div
                style={{
                  color: "var(--button-tertiary-fg-enabled, #666670)",
                  fontSize: 14,
                  fontFamily: "Noto Sans KR",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                파일선택
              </div>
            </Button>
          </Flex>
        </Flex>

        <Editor
          apiKey="dttcf1ulrpqltrzmq790n50l71y4tde3gubprnr5siyurx8v"
          init={{
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
          }}
          initialValue=""
        />
      </Flex>

      <Flex gap={10}>
        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="primary"
          style={{
            width: "200px",
            height: "48px",
            paddingLeft: 16,
            paddingRight: 16,
            background: "var(--button-primary-bg-enabled, #2F2C4D)",
            borderRadius: 2,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
        >
          <span
            style={{
              color: "var(--button-primary-fg, white)",
              fontSize: 14,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            확인
          </span>
        </Button>

        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="secondary"
          style={{
            width: "200px",
            height: "48px",
            paddingLeft: 16,
            paddingRight: 16,
            background: "var(--button-secondary-bg-enabled, white)",
            borderRadius: 2,
            outline:
              "1px var(--button-secondary-stroke-enabled, #4F4C6B) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
        >
          <span
            style={{
              color: "var(--button-secondary-fg-enabled, #4F4C6B)",
              fontSize: 14,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            임시저장
          </span>
        </Button>

        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="tertiary"
          style={{
            width: "200px",
            height: "48px",
            paddingLeft: 16,
            paddingRight: 16,
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
              fontSize: 14,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            취소
          </span>
        </Button>
      </Flex>
    </Flex>
  );
};

export default FaqForm;
