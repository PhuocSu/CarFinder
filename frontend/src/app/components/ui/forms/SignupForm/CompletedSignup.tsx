import { Button, Flex, Image, Typography } from "antd";

const CompletedSignup = () => {
  return (
    <div>
      <Flex
        vertical
        align="center"
        justify="center"
        gap={40}
        style={{ width: "100%", height: "100%" }}
      >
        <Flex vertical gap={8} style={{ width: "100%" }}>
          <Typography.Text
            style={{
              color: "#4A4A50",
              fontSize: 18,
              fontFamily: "Noto Sans KR",
              fontWeight: 400,
            }}
          >
            회원가입 완료
          </Typography.Text>
          <Typography.Title
            level={2}
            style={{
              color: "#37373E",
              fontSize: 28,
              fontFamily: "Noto Sans KR",
              fontWeight: 700,
              margin: 0,
            }}
          >
            KGM 사이트의 회원가입이 완료되었습니다.
          </Typography.Title>
        </Flex>

        <Flex vertical style={{ padding: "24px", marginTop: "50px", marginBottom: "153px" }}>
          <Flex
            vertical
            style={{ width: "460px", margin: "0 auto" }}
          >
            <Flex
              vertical
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 24,
                display: "inline-flex",
              }}
            >
              <Flex vertical style={{width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
                {/* CircleCircle */}
                <Image
                  src="/images/TickCircle.svg"
                  alt="TickCircle"
                  width={50}
                  height={50}
                  preview={false}
                />

                {/* Title */}
                <Typography.Text
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#111111",
                    fontSize: 28,
                    fontFamily: "Noto Sans KR",
                    fontWeight: "700",
                    wordWrap: "break-word",
                  }}
                >
                  회원가입 완료
                </Typography.Text>
              </Flex>

              <Typography.Text
                style={{
                  textAlign: "center",
                  color: "#111111",
                  fontSize: 24,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  wordWrap: "break-word",
                }}
              >
                KGM 회원이 되신 것을 환영합니다.
              </Typography.Text>
            </Flex>
          </Flex>

          <Button
            data-icon="none"
            data-shownumber="true"
            data-size="X-large"
            data-state="enabled"
            data-style="primary"
            style={{
              width: "470px",
              height: "56px",
              paddingLeft: 20,
              paddingRight: 20,
              background: "var(--button-primary-bg-enabled, #2F2C4D)",
              borderRadius: 2,
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
              display: "inline-flex",
              marginTop: "45px",
            }}
          >
            <div
              style={{
                color: "var(--button-primary-fg, white)",
                fontSize: 16,
                fontFamily: "Inter",
                fontWeight: "700",
                wordWrap: "break-word",
              }}
            >
              메인화면으로 가기
            </div>
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default CompletedSignup;
