"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Flex, Input, Radio, Typography } from "antd";
import { Button } from "antd/es/radio";
import { useState } from "react";

const SignupCorporate = () => {
  const [businessType, setBusinessType] = useState<"business" | "corporate">(
    "business"
  );

  return (
    <div>
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

        {/* Check 2 types corporate */}
        <Flex
          style={{
            width: "100%",
            height: "100%",
            background: "var(--base-bg-color-base-bg-5, #F9F9F9)",
            borderRadius: 2,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 16,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              padding: 24,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 80,
              display: "inline-flex",
            }}
          >
            <div
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 32,
                display: "flex",
              }}
            >
              <Typography.Text
                style={{
                  color: "#4A4A50",
                  fontSize: 14,
                  fontFamily: "Noto Sans KR",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                기업형태 선택
              </Typography.Text>

              <Radio.Group
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                style={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: 12,
                  display: "flex",
                }}
              >
                <Radio
                  value="business"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Typography.Text
                    style={{
                      color: "#37373E",
                      fontSize: 14,
                      fontFamily: "Inter",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    개인사업자
                  </Typography.Text>
                </Radio>

                <Radio
                  value="corporate"
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <Typography.Text
                    style={{
                      color: "#37373E",
                      fontSize: 14,
                      fontFamily: "Inter",
                      fontWeight: 400,
                      lineHeight: "20px",
                    }}
                  >
                    법인사업자
                  </Typography.Text>
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </Flex>

        {businessType === "business" ? (
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
                <Flex flex={8} vertical>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CUST_ID" />
                    <Button
                      type="primary"
                      style={{
                        height: 40,
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      중복확인
                    </Button>
                  </Flex>
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

            {/* ==============CUST-001 REPRSNT_NM and CUST-001 BSNM_REG_NO======= */}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  대표자명<span style={{ color: "#DC0000" }}> *</span>
                </Typography.Text>
                <Input placeholder="CUST-001 REPRSNT_NM" />
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
                    사업자등록번호 <span style={{ color: "#DC0000" }}>*</span>
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 BSNM_REG_NO" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ============CUST-001 CORP_TELL_NO and CUST-001 BIRTH_DT===========*/}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  회사 전화번호 <span style={{ color: "#DC0000" }}> *</span>
                </Typography.Text>
                <Input placeholder="CUST-001 CORP_TELL_NO" />
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
                    대표자 생년월일
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 BIRTH_DT" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ============CUST-001 BSNM_REG_CERT and CUST-001 CORP_FAX_NO===========*/}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  사업자등록증
                </Typography.Text>
                <Input placeholder="CUST-001 BSNM_REG_CERT" />
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
                    <Input placeholder="CUST-001 CORP_FAX_NO" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ======CUST-001 CUST_REP and CUST-001 CUST_REP_PHONE and CUST-001 REP_DEP_TIT======= */}
            <Flex vertical gap={20} style={{ marginTop: "80px" }}>
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
                담당자 정보
              </Typography.Title>

              {/* ======CUST-001 CUST_REP and CUST-001 CUST_REP_PHONE======= */}
              <Flex gap={32} style={{ width: "100%" }}>
                {/* Flex 1 chiếm 50% */}
                <Flex flex={1} gap={16} style={{ height: "40px" }}>
                  <Typography.Text style={{ width: "318px", display: "flex" }}>
                    성명<span style={{ color: "#DC0000" }}> *</span>
                  </Typography.Text>
                  <Input placeholder="CUST-001 CUST_REP" />
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
                      담당자 전화번호
                      <span style={{ color: "#DC0000" }}> *</span>
                    </Typography.Text>
                  </Flex>

                  <Flex flex={8} vertical gap={8}>
                    <Flex gap={8} style={{ height: 40 }}>
                      <Input placeholder="CUST-001 CUST_REP_PHONE" />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* ============CUST-001 REP_DEP_TIT=========== */}
              <Flex gap={32} style={{ width: "584px" }}>
                <Flex flex={1} gap={16} style={{ height: "40px" }}>
                  <Typography.Text style={{ width: "318px", display: "flex" }}>
                    부서/직급
                  </Typography.Text>
                  <Input placeholder="CUST-001 REP_DEP_TIT" />
                </Flex>

                {/* Empty flex to maintain layout - invisible */}
                <Flex flex={1}></Flex>
              </Flex>
            </Flex>
          </Flex>
        ) : (
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
                <Flex flex={8} vertical>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CUST_ID" />
                    <Button
                      type="primary"
                      style={{
                        height: 40,
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      중복확인
                    </Button>
                  </Flex>
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

            {/* ==============CUST-001 REPRSNT_NM and CUST-001 CORP_REG_NO========= */}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  대표자명<span style={{ color: "#DC0000" }}> *</span>
                </Typography.Text>
                <Input placeholder="CUST-001 REPRSNT_NM" />
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
                    법인등록번호 <span style={{ color: "#DC0000" }}>*</span>
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CORP_REG_NO" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ============CUST-001 CORP_TELL_NO and CUST-001 BSNM_REG_NO===========*/}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  회사 전화번호 <span style={{ color: "#DC0000" }}> *</span>
                </Typography.Text>
                <Input placeholder="CUST-001 CORP_TELL_NO" />
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
                    사업자등록번호 <span style={{ color: "#DC0000" }}>*</span>
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 BSNM_REG_NO" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ============CUST-001 BSNM_REG_CERT and CUST-001 BIRTH_DT===========*/}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  사업자등록증
                </Typography.Text>
                <Input placeholder="CUST-001 BSNM_REG_CERT" />
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
                    대표자 생년월일
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 BIRTH_DT" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ============CUST-001 ADDR and CUST-001 CORP_FAX_NO===========*/}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  사업장주소
                </Typography.Text>
                <Input placeholder="CUST-001 ADDR" />
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
                    팩스
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CORP_FAX_NO" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex gap={32} style={{ width: "584px" }}>
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  이메일
                </Typography.Text>
                <Input placeholder="CUST-001 CUST_EMAIL" />
              </Flex>

              {/* Empty flex to maintain layout - invisible */}
              <Flex flex={1}></Flex>
            </Flex>

            {/* ======CUST-001 CUST_REP and CUST-001 CUST_REP_PHONE and CUST-001 REP_DEP_TIT======= */}
            <Flex vertical gap={20} style={{ marginTop: "80px" }}>
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
                담당자 정보
              </Typography.Title>

              {/* ======CUST-001 CUST_REP and CUST-001 CUST_REP_PHONE======= */}
              <Flex gap={32} style={{ width: "100%" }}>
                {/* Flex 1 chiếm 50% */}
                <Flex flex={1} gap={16} style={{ height: "40px" }}>
                  <Typography.Text style={{ width: "318px", display: "flex" }}>
                    성명<span style={{ color: "#DC0000" }}> *</span>
                  </Typography.Text>
                  <Input placeholder="CUST-001 CUST_REP" />
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
                      담당자 전화번호
                      <span style={{ color: "#DC0000" }}> *</span>
                    </Typography.Text>
                  </Flex>

                  <Flex flex={8} vertical gap={8}>
                    <Flex gap={8} style={{ height: 40 }}>
                      <Input placeholder="CUST-001 CUST_REP_PHONE" />
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>

              {/* ============CUST-001 REP_DEP_TIT=========== */}
              <Flex gap={32} style={{ width: "584px" }}>
                <Flex flex={1} gap={16} style={{ height: "40px" }}>
                  <Typography.Text style={{ width: "318px", display: "flex" }}>
                    부서/직급
                  </Typography.Text>
                  <Input placeholder="CUST-001 REP_DEP_TIT" />
                </Flex>

                {/* Empty flex to maintain layout - invisible */}
                <Flex flex={1}></Flex>
              </Flex>
            </Flex>
          </Flex>
        )}

        {/* Button here */}
            <Flex style={{ height: "56px", marginTop: "80px" }}>
              <Flex gap={10} style={{ width: "900px", margin: "0 auto" }}>
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
    </div>
  );
};

export default SignupCorporate;
