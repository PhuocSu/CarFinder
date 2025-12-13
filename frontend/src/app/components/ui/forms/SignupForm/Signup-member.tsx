"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Input, Radio, Typography } from "antd";

const SignupMember = () => {
  return (
    <Flex
      vertical
      align="center"
      justify="center"
      gap={40}
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
          회원정보 입력
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
          회원가입을 위해 회원정보를 입력해주세요.
        </Typography.Title>
      </Flex>

      <Flex vertical gap={20} style={{ width: "100%" }}>
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
          기본정보
        </Typography.Title>

        {/* ==========Custname and CustID============ */}
        <Flex gap={32} style={{ width: "100%" }}>
          {/* Flex 1 chiếm 50% */}
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
              상호명<span style={{ color: "#DC0000" }}> *</span>
            </Typography.Text>
            <Input placeholder="CUST-001 CUST_NM" />
          </Flex>

          {/* Flex 2 chiếm 50% */}
          <Flex flex={1}>
            <Flex flex={2}>
              <Typography.Text
                style={{
                  fontSize: 16,
                  fontFamily: "Noto Sans KR",
                  fontWeight: 400,
                  color: "#4A4A50",
                }}
              >
                아이디 <span style={{ color: "#DC0000" }}>*</span>
              </Typography.Text>
            </Flex>

            {/* Input + Button + Ghi chú */}
            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input placeholder="CUST-001 CUST_ID" />
                <Button type="primary" style={{ height: 40, whiteSpace: "nowrap", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  중복확인
                </Button>
              </Flex>
              {/* <Flex>
                <Typography.Text
                  style={{
                    color: "#767676",
                    fontSize: 13,
                    fontFamily: "Noto Sans KR",
                    fontWeight: 400,
                    lineHeight: "18px",
                  }}
                >
                  6~12자 이내 영문, 숫자
                </Typography.Text>
              </Flex> */}
            </Flex>
          </Flex>
        </Flex>

        {/* ============CustPw and check Password===========*/}
        <Flex gap={32} style={{ width: "100%" }}>
          {/* Flex 1 chiếm 50% */}
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
              비밀번호<span style={{ color: "#DC0000" }}> *</span>
            </Typography.Text>

            <Input.Password
              placeholder="CUST-001 CUST_PW"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Flex>

          {/* Flex 2 chiếm 50% */}
          <Flex flex={1}>
            <Flex flex={2}>
              <Typography.Text
                style={{
                  fontSize: 16,
                  fontFamily: "Noto Sans KR",
                  fontWeight: 400,
                  color: "#4A4A50",
                }}
              >
                비밀번호 확인 <span style={{ color: "#DC0000" }}>*</span>
              </Typography.Text>
            </Flex>

            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input.Password
                  placeholder="CUST-001 CUST_PW"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* ============CustHpNo and custEmail===========*/}
        <Flex gap={32} style={{ width: "100%" }}>
          {/* Flex 1 chiếm 50% */}
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
              휴대전화번호<span style={{ color: "#DC0000" }}> *</span>
            </Typography.Text>
            <Input placeholder="CUST-001 HP_NO" />
          </Flex>

          {/* Flex 2 chiếm 50% */}
          <Flex flex={1}>
            <Flex flex={2}>
              <Typography.Text
                style={{
                  fontSize: 16,
                  fontFamily: "Noto Sans KR",
                  fontWeight: 400,
                  color: "#4A4A50",
                }}
              >
                이메일
              </Typography.Text>
            </Flex>

            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input placeholder="CUST-001 EMAIL" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* ============CustBirthdt and custAddress===========*/}
        <Flex gap={32} style={{ width: "100%" }}>
          {/* Flex 1 chiếm 50% */}
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
              생년월일
            </Typography.Text>
            <Input placeholder="CUST-001 BIRTH_DT" />
          </Flex>

          {/* Flex 2 chiếm 50% */}
          <Flex flex={1}>
            <Flex flex={2}>
              <Typography.Text
                style={{
                  fontSize: 16,
                  fontFamily: "Noto Sans KR",
                  fontWeight: 400,
                  color: "#4A4A50",
                }}
              >
                주소
              </Typography.Text>
            </Flex>

            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input placeholder="CUST-001 ADDR" />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Button */}
        <Flex style={{ height: "56px", marginTop: "80px" }}>
          <Flex gap={10} style={{ width: "900px", margin: "0px auto" }}>
            <Button
              data-icon="none"
              data-shownumber="true"
              data-size="X-large"
              data-state="enabled"
              data-style="tertiary"
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 20,
                paddingRight: 20,
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
                  fontSize: 16,
                  fontFamily: "Inter",
                  fontWeight: "700",
                  wordWrap: "break-word",
                }}
              >
                이전
              </div>
            </Button>
            <Button
              data-icon="none"
              data-shownumber="true"
              data-size="X-large"
              data-state="enabled"
              data-style="primary"
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                background: "var(--button-primary-bg-enabled, #2F2C4D)",
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "inline-flex",
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
                다음
              </div>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignupMember;
