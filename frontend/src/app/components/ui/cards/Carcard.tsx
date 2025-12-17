"use client";

import { Flex, Image, Typography } from "antd";

const CarCard = () => {
  return (
    <Flex vertical style={{ width: "387px", borderRadius: "8px" }}>
      <Flex vertical style={{ position: "relative" }}>
        <Image
          style={{ height: "220px" }}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="CarImage"
          preview={false}
        />

        <Flex style={{ position: "absolute", bottom: "8px", right: "8px" }}>
          <Image
            style={{ padding: "6px" }}
            src="/images/CompareIcon.svg"
            alt="CompareIcon"
            preview={false}
          />

          <Image
            style={{ padding: "6px" }}
            src="/images/FavoriteIcon.svg"
            alt="FavoriteIcon"
            preview={false}
          />
        </Flex>

        <Flex gap={"8px"} style={{ position: "absolute", top: "8px", left: "8px" }}>
          <div
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 4,
              paddingBottom: 4,
              background:
                "linear-gradient(163deg, #6427C2 0%, #2F2C4D 100%), linear-gradient(156deg, #44217A 0%, #2F2C4D 100%), var(--primary-bg-color-primary-bg-10, #EFE9FE)",
              borderRadius: 9999,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              display: "flex",
            }}
          >
            <Typography.Text
              style={{
                color: "white",
                fontSize: 12,
                fontFamily: "Inter",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              텍스트
            </Typography.Text>
          </div>
        </Flex>
      </Flex>

      <Flex style={{ marginTop: "12px", width: "100%" }}>
        <Flex vertical style={{ padding: "0 12px" }}>
          {/* Car Name */}
          <Typography.Text
            style={{color: 'var(--base-fg-color-base-fg-60, #4A4A50)', fontSize: 18, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}
          >
            더 뉴렉스턴 스포츠 칸 쿨멘 2.2 4WD 노블레스 1263274867463
          </Typography.Text>

          {/* Price */}
          <Flex vertical gap={4} style={{ marginBottom: "12px" }}>
            {/* Discount Percent && basePrice */}
            <Flex gap={4}>
              <Typography.Text
                style={{
                  color:
                    "var(--status-error-color-status-error-fg-50, #EF4444)",
                  fontSize: 14,
                  fontFamily: "Noto Sans KR",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                10%
              </Typography.Text>
              <Typography.Text
                style={{
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 14,
                  fontFamily: "Noto Sans KR",
                  fontWeight: "400",
                  textDecoration: "line-through",
                  wordWrap: "break-word",
                }}
              >
                35,000,000원
              </Typography.Text>
            </Flex>

            {/* Price */}
            <Typography.Text
              style={{
                color: "var(--base-fg-color-base-fg-70, #37373E)",
                fontSize: 18,
                fontFamily: "Inter",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              32,100,000원
            </Typography.Text>
          </Flex>

          {/* Car Badge */}
          <Flex gap={8}>
            {/* Year */}
            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                overflow: "hidden",
                borderRadius: 2,
                outline:
                  "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <Typography.Text
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                2022년
              </Typography.Text>
            </div>

            {/* Mileage */}
            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                overflow: "hidden",
                borderRadius: 2,
                outline:
                  "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <Typography.Text
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                132,232 km
              </Typography.Text>
            </div>

            <div
              style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                overflow: "hidden",
                borderRadius: 2,
                outline:
                  "1px var(--base-stroke-color-base-stroke-20, #E0E0E3) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
                display: "inline-flex",
              }}
            >
              <Typography.Text
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  color: "var(--base-fg-color-base-fg-50, #666670)",
                  fontSize: 12,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                가솔린
              </Typography.Text>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CarCard;
