"use client";

import { useEventDetailQuery } from "@/app/api/event/useEventDetailQuery";
import { useEventQuery } from "@/app/api/event/useEventQuery";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Flex, Image, Typography } from "antd";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const EventDetail = () => {
  const params = useParams();
  const eventId = params.id as string;
  const { data: eventData } = useEventDetailQuery(eventId);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handlePrev = () => {
    if (!eventData?.prevEventId) return;
    router.push(`/event/view/${eventData.prevEventId}`);
  };

  const handleNext = () => {
    if (!eventData?.nextEventId) return;
    router.push(`/event/view/${eventData.nextEventId}`);
  };

  return (
    <div style={{ width: "1200px", margin: "40px auto 40px" }}>
      <Flex vertical gap={60}>
        <Flex vertical gap={8}>
          <Typography.Text
            style={{
              width: "100%",
              color: "var(--base-fg-color-base-fg-70, #37373E)",
              fontSize: 24,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            이벤트
          </Typography.Text>
          <Typography.Text
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 16,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            KGM 인증중고차의 이벤트 소식을 접해보세요.
          </Typography.Text>
        </Flex>

        <Flex
          justify="space-between" // Chia đều 3 phần: trái - giữa - phải
          style={{
            alignItems: "flex-start",
            borderRadius: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Phần 1: Icon bên trái */}
          <LeftOutlined
            style={{
              fontSize: "24px",
              color: "#4A4A50",
              cursor: "pointer",
            }}
            onClick={handleGoBack}
          />

          {/* Phần 2: Tiêu đề ở giữa */}
          <Flex vertical gap={32} align="center">
            <Typography.Text
              style={{
                width: "100%",
                textAlign: "center",
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 24,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {eventData?.title}
            </Typography.Text>

            <Image
              src={eventData?.fileAttachment || ""}
              preview={false}
              style={{ width: "544px", height: "100%", objectFit: "cover" }}
            />

            <Typography.Text
              style={{
                width: "100%",
                textAlign: "center",
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 20,
                fontFamily: "Noto Sans KR",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              {eventData?.subTitle}
            </Typography.Text>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
                alignItems: "center",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap",
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: eventData?.content || "" }}
              />
            </div>
          </Flex>

          {/* Phần 3: Không gian trống bên phải */}
          <div style={{ width: "24px" }}></div>
        </Flex>

        <Flex justify="space-between" align="center">
          <Flex
            align="center"
            style={{
              cursor: "pointer",
              height: "100%",
              border:
                "1px solid var(--button-secondary-stroke-enabled, #2F2C4D)",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                gap: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handlePrev}
            >
              <LeftOutlined style={{ fontSize: "24px", color: "#4A4A50" }} />
              <Typography.Text
                style={{
                  color: "#4A4A50",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                이전글
              </Typography.Text>
            </div>
          </Flex>

          <Flex
            align="center"
            style={{
              cursor: "pointer",
              height: "100%",
              border:
                "1px solid var(--button-secondary-stroke-enabled, #2F2C4D)",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                gap: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleNext}
            >
              <Typography.Text
                style={{
                  color: "#4A4A50",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                다음글
              </Typography.Text>
              <RightOutlined style={{ fontSize: "24px", color: "#4A4A50" }} />
            </div>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default EventDetail;
