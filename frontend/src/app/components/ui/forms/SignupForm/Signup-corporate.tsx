"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, DatePicker, Flex, Input, Radio, Typography } from "antd";
import { useState } from "react";
import useCreateBusinessMutation from "@/app/api/users/useCreateBusinessMutation";
import useCreateAgencyMutation from "@/app/api/users/useCreateAgencyMutation";
import CompletedSignup from "@/app/components/ui/forms/SignupForm/CompletedSignup";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { useCheckCustIdMutation } from "@/app/api/auth/useCheckCustIdMutation";

const SignupCorporate = () => {
  const [businessType, setBusinessType] = useState<"business" | "corporate">(
    "business",
  );
  const [isSignupComplete, setIsSignupComplete] = useState(false);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [checkedId, setCheckedId] = useState("");
  const [formData, setFormData] = useState({
    custName: "",
    custId: "",
    custPw: "",
    custPwConfirm: "",
    reprsntName: "",
    corpRegNo: "",
    corpTellNo: "",
    bnsmRegNo: "",
    bnsmRegCert: "",
    corpFaxNo: "",
    corpEmail: "",
    custRep: "",
    custRepPhone: "",
    repDepTit: "",
    birthDate: "",
    custAddr: "",
  });

  const dateFormat = 'YYYY/MM/DD';
  const router = useRouter();

  const createBusinessMutation = useCreateBusinessMutation();
  const createAgencyMutation = useCreateAgencyMutation();
  const { mutate: checkCustId, isPending } = useCheckCustIdMutation();

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

  const handleCheckCustId = () => {
    if (!formData.custId) {
      message.error("아이디를 입력해주세요");
      return;
    }
    
    checkCustId(formData.custId, {
      onSuccess: (response: any) => {
        console.log("Check ID response:", response);
        // Check if the response indicates success or failure
        if (response.success || response.available || !response.exists) {
          message.success("사용 가능한 custId입니다");
          setIsIdChecked(true);
          setCheckedId(formData.custId);
        } else {
          message.error("이미 사용 중인 custId입니다");
          setIsIdChecked(false);
        }
      },
      onError: (error: any) => {
        console.log("Check ID error:", error);
        const errorMessage = error.response?.data?.message || "아이디 중복 확인에 실패했습니다";
        message.error(errorMessage);
        setIsIdChecked(false);
      }
    });
  };

  const handleSubmit = () => {
    // Validation - only check required fields based on business type
    const requiredFields = [
      'custName', 'custId', 'custPw',
      'reprsntName', 'custRep', 'custRepPhone'
    ];
    
    // For individual business (agency), corpRegNo is not required
    if (businessType === 'corporate') {
      requiredFields.push('corpRegNo', 'corpTellNo');
    }
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    console.log("Business type:", businessType);
    console.log("Required fields:", requiredFields);
    console.log("Form data:", formData);
    console.log("Missing fields:", missingFields);
    
    if (missingFields.length > 0) {
      message.error(`필수 필드를 모두 입력해주세요: ${missingFields.join(', ')}`);
      return;
    }

    if (formData.custPw !== formData.custPwConfirm) {
      message.error("비밀번호가 일치하지 않습니다");
      return;
    }

    if (!isIdChecked || formData.custId !== checkedId) {
      message.error("아이디 중복확인을 해주세요");
      return;
    }

    // Choose mutation based on business type
    // Remove custPwConfirm from submitData as it's not sent to API
    const { custPwConfirm, ...dataToSubmit } = formData;
    
    // For individual business (agency), don't send corpRegNo if it's empty
    let finalData;
    console.log("Business type:", businessType);
    console.log("corpRegNo value:", dataToSubmit.corpRegNo);
    console.log("corpRegNo is empty:", !dataToSubmit.corpRegNo);
    
    if (businessType === 'business' && !dataToSubmit.corpRegNo) {
      // Create a copy without corpRegNo
      const { corpRegNo, ...dataWithoutCorpRegNo } = dataToSubmit;
      finalData = dataWithoutCorpRegNo;
      console.log("Removed corpRegNo from data");
    } else {
      finalData = dataToSubmit;
      console.log("Keeping all data including corpRegNo");
    }
    
    const submitData = {
      ...finalData,
      birthDate: formData.birthDate || undefined,
      custAddr: formData.custAddr || undefined,
      // Set role based on business type
      role: businessType === "corporate" ? "BUSINESS" : "AGENCY",
    };

    console.log("Final data before submission:", finalData);
    console.log("Submit data:", submitData);
    console.log("Using mutation:", businessType === "corporate" ? "createBusinessMutation" : "createAgencyMutation");

    const mutation = businessType === "corporate" ? createBusinessMutation : createAgencyMutation;
    
    if (businessType === 'corporate') {
      (mutation as any).mutate(submitData as any, {
        onSuccess: () => {
          setIsSignupComplete(true);
        }
      });
    } else {
      (mutation as any).mutate(submitData as any, {
        onSuccess: () => {
          setIsSignupComplete(true);
        }
      });
    }
  };

  // Show success component if signup is complete
  if (isSignupComplete) {
    return <CompletedSignup />;
  }

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
                      onChange={(e) =>
                        handleInputChange("custId", e.target.value)
                      }
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

            {/* ==============CUST-001 REPRSNT_NM and CUST-001 BSNM_REG_NO======= */}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  대표자명<span style={{ color: "#DC0000" }}> *</span>
                </Typography.Text>
                <Input placeholder="CUST-001 REPRSNT_NM" 
                  value={formData.reprsntName}
                  onChange={(e) => handleInputChange("reprsntName", e.target.value)}
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
                    사업자등록번호 <span style={{ color: "#DC0000" }}>*</span>
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 BSNM_REG_NO" 
                      value={formData.bnsmRegNo}
                      onChange={(e) => handleInputChange("bnsmRegNo", e.target.value)}
                    />
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
                <Input placeholder="CUST-001 CORP_TELL_NO" 
                  value={formData.corpTellNo}
                  onChange={(e) => handleInputChange("corpTellNo", e.target.value)}
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
                    대표자 생년월일
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <DatePicker
                      format={dateFormat}
                      onChange={handleDateChange}
                      style={{ width: "100%" }}
                      placeholder="CUST-001 BIRTH_DT"
                    />
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
                <Input placeholder="CUST-001 BSNM_REG_CERT" 
                  value={formData.bnsmRegCert}
                  onChange={(e) => handleInputChange("bnsmRegCert", e.target.value)}
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
                    팩스
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CORP_FAX_NO" 
                      value={formData.corpFaxNo}
                      onChange={(e) => handleInputChange("corpFaxNo", e.target.value)}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            {/* ============CUST-001 ADDR and CUST-001 CORP-EMAIL================= */}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  사업장 주소
                </Typography.Text>
                <Input placeholder="CUST-001 ADDR" 
                  value={formData.custAddr}
                  onChange={(e) => handleInputChange("custAddr", e.target.value)}
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
                    <Input placeholder="CUST-001 CORP_EMAIL" 
                      value={formData.corpEmail}
                      onChange={(e) => handleInputChange("corpEmail", e.target.value)}
                    />
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
                  <Input placeholder="CUST-001 CUST_REP" 
                    value={formData.custRep}
                    onChange={(e) => handleInputChange("custRep", e.target.value)}
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
                      담당자 전화번호
                      <span style={{ color: "#DC0000" }}> *</span>
                    </Typography.Text>
                  </Flex>

                  <Flex flex={8} vertical gap={8}>
                    <Flex gap={8} style={{ height: 40 }}>
                      <Input placeholder="CUST-001 CUST_REP_PHONE" 
                        value={formData.custRepPhone}
                        onChange={(e) => handleInputChange("custRepPhone", e.target.value)}
                      />
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
                  <Input placeholder="CUST-001 REP_DEP_TIT" 
                    value={formData.repDepTit}
                    onChange={(e) => handleInputChange("repDepTit", e.target.value)}
                  />
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
                      onChange={(e) =>
                        handleInputChange("custId", e.target.value)
                      }
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

            {/* ==============CUST-001 REPRSNT_NM and CUST-001 CORP_REG_NO========= */}
            <Flex gap={32} style={{ width: "100%" }}>
              {/* Flex 1 chiếm 50% */}
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  대표자명<span style={{ color: "#DC0000" }}> *</span>
                </Typography.Text>
                <Input placeholder="CUST-001 REPRSNT_NM" 
                  value={formData.reprsntName}
                  onChange={(e) => handleInputChange("reprsntName", e.target.value)}
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
                    법인등록번호 <span style={{ color: "#DC0000" }}>*</span>
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CORP_REG_NO" 
                      value={formData.corpRegNo}
                      onChange={(e) => handleInputChange("corpRegNo", e.target.value)}
                    />
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
                <Input placeholder="CUST-001 CORP_TELL_NO" 
                  value={formData.corpTellNo}
                  onChange={(e) => handleInputChange("corpTellNo", e.target.value)}
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
                    사업자등록번호 <span style={{ color: "#DC0000" }}>*</span>
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 BSNM_REG_NO" 
                      value={formData.bnsmRegNo}
                      onChange={(e) => handleInputChange("bnsmRegNo", e.target.value)}
                    />
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
                <Input placeholder="CUST-001 BSNM_REG_CERT" 
                  value={formData.bnsmRegCert}
                  onChange={(e) => handleInputChange("bnsmRegCert", e.target.value)}
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
                    대표자 생년월일
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <DatePicker
                      format={dateFormat}
                      onChange={handleDateChange}
                      style={{ width: "100%" }}
                      placeholder="CUST-001 BIRTH_DT"
                    />
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
                <Input 
                  placeholder="CUST-001 ADDR" 
                  value={formData.custAddr}
                  onChange={(e) => handleInputChange("custAddr", e.target.value)}
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
                    팩스
                  </Typography.Text>
                </Flex>

                <Flex flex={8} vertical gap={8}>
                  <Flex gap={8} style={{ height: 40 }}>
                    <Input placeholder="CUST-001 CORP_FAX_NO" 
                      value={formData.corpFaxNo}
                      onChange={(e) => handleInputChange("corpFaxNo", e.target.value)}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex gap={32} style={{ width: "584px" }}>
              <Flex flex={1} gap={16} style={{ height: "40px" }}>
                <Typography.Text style={{ width: "318px", display: "flex" }}>
                  이메일
                </Typography.Text>
                <Input 
                  placeholder="CUST-001 EMAIL" 
                  value={formData.corpEmail}
                  onChange={(e) => handleInputChange("corpEmail", e.target.value)}
                />
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
                  <Input placeholder="CUST-001 CUST_REP" 
                    value={formData.custRep}
                    onChange={(e) => handleInputChange("custRep", e.target.value)}
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
                      담당자 전화번호
                      <span style={{ color: "#DC0000" }}> *</span>
                    </Typography.Text>
                  </Flex>

                  <Flex flex={8} vertical gap={8}>
                    <Flex gap={8} style={{ height: 40 }}>
                      <Input placeholder="CUST-001 CUST_REP_PHONE" 
                        value={formData.custRepPhone}
                        onChange={(e) => handleInputChange("custRepPhone", e.target.value)}
                      />
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
                  <Input placeholder="CUST-001 REP_DEP_TIT" 
                    value={formData.repDepTit}
                    onChange={(e) => handleInputChange("repDepTit", e.target.value)}
                  />
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
              loading={businessType === "corporate" ? createBusinessMutation.isPending : createAgencyMutation.isPending}
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
    </div>
  );
};

export default SignupCorporate;
