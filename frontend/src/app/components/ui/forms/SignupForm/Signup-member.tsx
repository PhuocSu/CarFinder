"use client";

import { useCheckCustIdMutation } from "@/app/api/auth/useCheckCustIdMutation";
import useCreateIndividualMutation from "@/app/api/users/useCreateIndividualMutation";
import CompletedSignup from "@/app/components/ui/forms/SignupForm/CompletedSignup";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, DatePicker, Flex, Input, message, Radio, Typography } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const SignupMember = () => {
  const dateFormat = 'YYYY/MM/DD';
  const router = useRouter();
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [checkedId, setCheckedId] = useState("");
  const [formData, setFormData] = useState({
    custName: "",
    custId: "",
    custPw: "",
    custPwConfirm: "",
    hpNo: "",
    email: "",
    birthDate: "",
    custAddr: "",
  });
  
  const { mutate: checkCustId, isPending } = useCheckCustIdMutation();
  const { mutate: createIndividual, isPending: isCreating } = useCreateIndividualMutation();
  const handleCheckCustId = () => {
    if (!formData.custId.trim()) {
      message.error("custId를 입력해주세요");
      return;
    }
    checkCustId(formData.custId, {
      onSuccess: (data) => {
        console.log("Mutation success:", data);
        if (data.exists === true) {
          message.error("이미 사용 중인 custId입니다");
          setIsIdChecked(false);
        } else {
          message.success("사용 가능한 custId입니다");
          setIsIdChecked(true);
          setCheckedId(formData.custId);
        }
      },
      onError: (error) => {
        console.error("Mutation error:", error);
        message.error("검사 중 오류가 발생했습니다");
        setIsIdChecked(false);
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset ID check status if ID is changed
    if (field === 'custId' && value !== checkedId) {
      setIsIdChecked(false);
    }
  };

  const handleDateChange = (date: any, dateString: string | null) => {
    // Convert YYYY/MM/DD to YYYY-MM-DD format for ISO 8601 compliance
    if (dateString) {
      const isoDate = dateString.replace(/\//g, '-');
      setFormData(prev => ({
        ...prev,
        birthDate: isoDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        birthDate: ""
      }));
    }
  };

  const handleGoBack = () => {
    router.push("/signup/onboarding");
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.custName || !formData.custId || !formData.custPw || !formData.hpNo || !formData.email) {
      message.error("필수 필드를 모두 입력해주세요");
      return;
    }

    if (formData.custPw !== formData.custPwConfirm) {
      message.error("비밀번호가 일치하지 않습니다");
      return;
    }

    // Check if ID has been validated
    if (!isIdChecked || formData.custId !== checkedId) {
      message.error("아이디 중복확인을 해주세요");
      return;
    }

    // Create individual user
    createIndividual({
      custName: formData.custName,
      custId: formData.custId,
      custPw: formData.custPw,
      hpNo: formData.hpNo,
      email: formData.email,
      birthDate: formData.birthDate || undefined,
      custAddr: formData.custAddr || undefined,
    }, {
      onSuccess: () => {
        setIsSignupComplete(true);
      }
    });
  };

  if (isSignupComplete) {
    return <CompletedSignup />;
  }

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
            <Input 
              placeholder="CUST-001 CUST_NM" 
              value={formData.custName}
              onChange={(e) => handleInputChange("custName", e.target.value)}
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
                아이디 <span style={{ color: "#DC0000" }}>*</span>
              </Typography.Text>
            </Flex>

            {/* Input + Button + Ghi chú */}
            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input
                  placeholder="CUST-001 CUST_ID"
                  value={formData.custId}
                  onChange={(e) => handleInputChange("custId", e.target.value)}
                />
                <Button
                  type="primary"
                  style={{
                    height: 40,
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  loading={isPending}
                  onClick={handleCheckCustId}
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
              value={formData.custPw}
              onChange={(e) => handleInputChange("custPw", e.target.value)}
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
                  value={formData.custPwConfirm}
                  onChange={(e) => handleInputChange("custPwConfirm", e.target.value)}
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
            <Input 
              placeholder="CUST-001 HP_NO" 
              value={formData.hpNo}
              onChange={(e) => handleInputChange("hpNo", e.target.value)}
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
                이메일
              </Typography.Text>
            </Flex>

            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input 
                  placeholder="CUST-001 EMAIL" 
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
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
            <DatePicker 
              format={dateFormat}
              onChange={handleDateChange}
              style={{ width: "100%" }}
              placeholder="CUST-001 BIRTH_DT"
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
                주소
              </Typography.Text>
            </Flex>

            <Flex flex={8} vertical gap={8}>
              <Flex gap={8} style={{ height: 40 }}>
                <Input 
                  placeholder="CUST-001 ADDR" 
                  value={formData.custAddr}
                  onChange={(e) => handleInputChange("custAddr", e.target.value)}
                />
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
              onClick={handleGoBack}
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
              data-state={(!isIdChecked || formData.custId !== checkedId) ? "disabled" : "enabled"}
              data-style="primary"
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: 20,
                paddingRight: 20,
                background: (!isIdChecked || formData.custId !== checkedId) 
                  ? "color-mix(in srgb, var(--button-primary-bg-enabled, #2F2C4D) 50%, transparent)"
                  : "var(--button-primary-bg-enabled, #2F2C4D)",
                borderRadius: 2,
                justifyContent: "center",
                alignItems: "center",
                gap: 4,
                display: "inline-flex",
                cursor: (!isIdChecked || formData.custId !== checkedId) ? "not-allowed" : "pointer",
              }}
              onClick={handleSubmit}
              loading={isCreating}
              disabled={!isIdChecked || formData.custId !== checkedId}
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
