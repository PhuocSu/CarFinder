"use client";

import { Button, Flex, Image, Input, Typography } from "antd";

const FindByPassword = () => {
  return (
    // FindByPassword
    //     <Flex
    //     vertical
    //     gap={"40px"}
    //     style={{ width: "496px", margin: " 80px auto" }}
    //   >
    //     <Flex vertical gap={"16px"}>
    //       <Typography.Text
    //         style={{
    //           width: "100%",
    //           textAlign: "center",
    //           color: "var(--base-fg-color-base-fg-70, #313948)",
    //           fontSize: 28,
    //           fontFamily: "Noto Sans KR",
    //           fontWeight: "700",
    //           wordWrap: "break-word",
    //         }}
    //       >
    //         비밀번호 찾기
    //       </Typography.Text>
    //       <Typography.Text
    //         style={{
    //           width: "100%",
    //           textAlign: "center",
    //           color: "var(--base-fg-color-base-fg-40, #8F97A4)",
    //           fontSize: 24,
    //           fontFamily: "Noto Sans KR",
    //           fontWeight: "700",
    //           wordWrap: "break-word",
    //         }}
    //       >
    //         필요한 정보를 입력해주세요.
    //       </Typography.Text>
    //     </Flex>

    //     <Flex vertical gap={"28px"} style={{padding: "48px", border: "1px solid var(--base-bg-color-base-bg-0, #E5E7EB)", borderRadius: 2 }}>
    //       <Flex vertical gap={"12px"}>
    //         <Typography.Text
    //           style={{
    //             width: "100%",
    //             color: "var(--base-fg-color-base-fg-50, #606776)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           회원가입 시 입력하신 이름을 입력해 주세요.
    //         </Typography.Text>
    //         <Input
    //           placeholder="이름을 입력해주세요."
    //           style={{ height: "52px" }}
    //         />
    //       </Flex>

    //       <Flex vertical gap={"12px"}>
    //         <Typography.Text
    //           style={{
    //             width: "100%",
    //             color: "var(--base-fg-color-base-fg-50, #606776)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           아이디를 입력해 주세요.
    //         </Typography.Text>
    //         <Input
    //           placeholder="아이디를 입력해주세요."
    //           style={{ height: "52px" }}
    //         />
    //       </Flex>

    //       <Flex vertical gap={"12px"}>
    //         <Typography.Text
    //           style={{
    //             width: "100%",
    //             color: "var(--base-fg-color-base-fg-50, #606776)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           회원가입 시 인증하신 휴대폰 번호를 입력해 주세요.
    //         </Typography.Text>
    //         <Input
    //           placeholder="휴대폰 번호를 입력해주세요."
    //           style={{ height: "52px" }}
    //         />
    //       </Flex>

    //       <Button
    //         data-icon="none"
    //         data-shownumber="true"
    //         data-size="X-large"
    //         data-state="enabled"
    //         data-style="primary"
    //         style={{
    //           marginTop: "13px",
    //           width: "100%",
    //           height: "56px",
    //           paddingLeft: 20,
    //           paddingRight: 20,
    //           background: "var(--button-primary-bg-enabled, #3533CC)",
    //           borderRadius: 2,
    //           justifyContent: "center",
    //           alignItems: "center",
    //           gap: 4,
    //           display: "inline-flex",
    //         }}
    //       >
    //         <span
    //           style={{
    //             color: "var(--button-primary-fg, white)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           비밀번호 찾기
    //         </span>
    //       </Button>
    //     </Flex>
    //   </Flex>

    // Find Password - Enter new Password
    //     <Flex
    //     vertical
    //     gap={"40px"}
    //     style={{ width: "496px", margin: " 80px auto" }}
    //   >
    //     <Flex vertical gap={"28px"} style={{padding: "48px", border: "1px solid var(--base-bg-color-base-bg-0, #E5E7EB)", borderRadius: 2 }}>
    //       <Flex vertical gap={"12px"}>
    //         <Typography.Text
    //           style={{
    //             width: "100%",
    //             color: "var(--base-fg-color-base-fg-50, #606776)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           새로운 비밀번호를 입력해주세요.
    //         </Typography.Text>
    //         <Input
    //           placeholder="비밀번호를 입력해주세요."
    //           style={{ height: "52px" }}
    //         />
    //       </Flex>

    //       <Flex vertical gap={"12px"}>
    //         <Typography.Text
    //           style={{
    //             width: "100%",
    //             color: "var(--base-fg-color-base-fg-50, #606776)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           새로운 비밀번호를 입력해주세요.
    //         </Typography.Text>
    //         <Input
    //           placeholder="동일한 비밀번호를 입력해주세요."
    //           style={{ height: "52px" }}
    //         />
    //       </Flex>

    //       <Button
    //         data-icon="none"
    //         data-shownumber="true"
    //         data-size="X-large"
    //         data-state="enabled"
    //         data-style="primary"
    //         style={{
    //           marginTop: "13px",
    //           width: "100%",
    //           height: "56px",
    //           paddingLeft: 20,
    //           paddingRight: 20,
    //           background: "var(--button-primary-bg-enabled, #3533CC)",
    //           borderRadius: 2,
    //           justifyContent: "center",
    //           alignItems: "center",
    //           gap: 4,
    //           display: "inline-flex",
    //         }}
    //       >
    //         <span
    //           style={{
    //             color: "var(--button-primary-fg, white)",
    //             fontSize: 16,
    //             fontFamily: "Noto Sans KR",
    //             fontWeight: "700",
    //             wordWrap: "break-word",
    //           }}
    //         >
    //           비밀번호 변경
    //         </span>
    //       </Button>
    //     </Flex>
    //   </Flex>

    // Completed Find Password
    <Flex
      vertical
      gap={"40px"}
      style={{ width: "496px", margin: " 80px auto" }}
    >
      <Flex
        vertical
        gap={"28px"}
        style={{
          padding: "48px",
          border: "1px solid var(--base-bg-color-base-bg-0, #E5E7EB)",
          borderRadius: 2,
        }}
      >
        <Flex vertical gap={"40px"} align="center">
          <Image
            src="/images/TickCircle.svg"
            style={{ width: "72px", height: "72px" }}
            preview={false}
          />

          <Flex gap={"12px"} style={{width: "100%"}}>
            <Button
              data-icon="none"
              data-shownumber="true"
              data-size="X-large"
              data-state="enabled"
              data-style="tertiary"
              style={{
                flex: 1,
                height: "56px",
                paddingLeft: 20,
                paddingRight: 20,
                background: "var(--button-tertiary-bg-enabled, white)",
                borderRadius: 2,
                outline:
                  "1px var(--button-tertiary-stroke-enabled, #CBCFD6) solid",
                outlineOffset: "-1px",
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "inline-flex",
              }}
            >
              <span
                style={{
                  color: "var(--button-tertiary-fg-enabled, #606776)",
                  fontSize: 16,
                  fontFamily: "Noto Sans KR",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                메인페이지로 가기
              </span>
            </Button>

            <Button
              data-icon="none"
              data-shownumber="true"
              data-size="X-large"
              data-state="enabled"
              data-style="primary"
              style={{
                flex: 1,
                height: "56px",
                paddingLeft: 20,
                paddingRight: 20,
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
                  fontSize: 16,
                  fontFamily: "Noto Sans KR",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                로그인하기
              </span>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FindByPassword;
