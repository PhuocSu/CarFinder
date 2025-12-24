"use client";

import { Button, Flex, Image, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Compare.module.scss";
import { useCompare } from "@/hooks/useCompare";
import { useEffect } from "react";

const Compare = () => {
  const { isOpen, close } = useCompare();

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={close}> 
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={{ width: "600px", margin: "auto" }}>
          <Flex vertical gap={8} style={{ padding: "12px 24px 16px" }}>
            <Flex justify="space-between">
              <Typography.Text>차량비교</Typography.Text>
              <CloseOutlined onClick={close} />
            </Flex>

            <Flex
              style={{
                paddingBottom: "16px",
                borderBottom:
                  "1px var(--base-stroke-color-base-stroke-50, #606776) solid",
              }}
            >
              {/* CarCar 1 */}
              <Flex
                vertical
                gap={8}
                className="compare__card"
                style={{ width: "184px", padding: "0px 8px" }}
              >
                <Flex justify="space-between">
                  <Typography.Text>290무2123</Typography.Text>
                  <CloseOutlined />
                </Flex>

                <Flex justify="center" vertical gap={8}>
                  <Image
                    src="/images/car_sample.webp"
                    preview={false}
                    style={{ objectFit: "contain" }}
                  />

                  <Typography.Text
                    style={{ width: "100%", height: "40px", padding: "2px" }}
                  >
                    티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
                  </Typography.Text>

                  <Button
                    data-icon="none"
                    data-shownumber="true"
                    data-size="small"
                    data-state="enabled"
                    data-style="primary"
                    style={{
                      width: "100%",
                      height: "32px",
                      paddingLeft: 12,
                      paddingRight: 12,
                      background: "var(--button-primary-bg-enabled, #3533CC)",
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
                        fontSize: 13,
                        fontFamily: "Noto Sans KR",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      상세보기
                    </span>
                  </Button>
                </Flex>
              </Flex>

              {/* CarCar 2 */}
              <Flex
                vertical
                gap={8}
                className="compare__card"
                style={{ width: "184px", padding: "0px 8px" }}
              >
                <Flex justify="space-between">
                  <Typography.Text>290무2123</Typography.Text>
                  <CloseOutlined />
                </Flex>

                <Flex justify="center" vertical gap={8}>
                  <Image
                    src="/images/car_sample.webp"
                    preview={false}
                    style={{ objectFit: "contain" }}
                  />

                  <Typography.Text
                    style={{ width: "100%", height: "40px", padding: "2px" }}
                  >
                    티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
                  </Typography.Text>

                  <Button
                    data-icon="none"
                    data-shownumber="true"
                    data-size="small"
                    data-state="enabled"
                    data-style="primary"
                    style={{
                      width: "100%",
                      height: "32px",
                      paddingLeft: 12,
                      paddingRight: 12,
                      background: "var(--button-primary-bg-enabled, #3533CC)",
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
                        fontSize: 13,
                        fontFamily: "Noto Sans KR",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      상세보기
                    </span>
                  </Button>
                </Flex>
              </Flex>

              {/* CarCar 3 */}
              <Flex
                vertical
                gap={8}
                className="compare__card"
                style={{ width: "184px", padding: "0px 8px" }}
              >
                <Flex justify="space-between">
                  <Typography.Text>290무2123</Typography.Text>
                  <CloseOutlined />
                </Flex>

                <Flex justify="center" vertical gap={8}>
                  <Image
                    src="/images/car_sample.webp"
                    preview={false}
                    style={{ objectFit: "contain" }}
                  />

                  <Typography.Text
                    style={{ width: "100%", height: "40px", padding: "2px" }}
                  >
                    티볼리 베리 뉴 티볼리 1.5 가솔린 2WD V3
                  </Typography.Text>

                  <Button
                    data-icon="none"
                    data-shownumber="true"
                    data-size="small"
                    data-state="enabled"
                    data-style="primary"
                    style={{
                      width: "100%",
                      height: "32px",
                      paddingLeft: 12,
                      paddingRight: 12,
                      background: "var(--button-primary-bg-enabled, #3533CC)",
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
                        fontSize: 13,
                        fontFamily: "Noto Sans KR",
                        fontWeight: "400",
                        wordWrap: "break-word",
                      }}
                    >
                      상세보기
                    </span>
                  </Button>
                </Flex>
              </Flex>
            </Flex>

            <Flex vertical style={{ width: "100%", height: "calc(100vh - 400px)", overflowY: "auto", overflowX: "hidden", paddingRight: "8px" }}>
              {/* Giá xe */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    차량가격
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    {/* Price car 1 */}
                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        2,050만원
                      </Typography.Text>
                    </Flex>

                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        2,050만원
                      </Typography.Text>
                    </Flex>

                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        2,050만원
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* Year */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    연식
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        2023년형
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* Mileage */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    주행거리
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        50,500km
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* Fuel */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    연료/배기량
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        디젤/2157cc
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* Exterior Color */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    외관색상
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        흰색
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* Interior Color */}
              <Flex
                vertical
                gap={20}
                style={{
                  borderBottom:
                    "1px var(--base-stroke-color-base-stroke-20, #E2E4E8) solid",
                }}
              >
                <Flex vertical gap={6}>
                  <Typography.Text className={styles["compare__title"]}>
                    내장색상
                  </Typography.Text>
                  <Flex style={{ width: "100%" }}>
                    <Flex
                      className={styles["flex__compare__content"]}
                      justify="center"
                      align="center"
                      style={{ padding: "8px 0px", width: "180px" }}
                    >
                      <Typography.Text className={styles["compare__content"]}>
                        흰색
                      </Typography.Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Compare;
