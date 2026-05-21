"use client";

import useFetchAgencyQuery from "@/app/api/users/useFetchAgencyQuery";
import useFetchBusinessQuery from "@/app/api/users/useFetchBusinessQuery";
import { authState } from "@/store/authStore.atom";
import { buyMyCarFormState } from "@/store/buyMyCar.atom";
import StepTwoFormData from "@/types/stepTwoFormData";
import { Button, Flex, Input, Typography, DatePicker, Select } from "antd";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

interface StepTwoProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

const StepTwo = ({ onNext, onPrevious }: StepTwoProps) => {
  const [formData, setFormData] = useRecoilState(buyMyCarFormState);

  const { user } = useRecoilValue(authState);
  const businessQuery = useFetchBusinessQuery(
    user?.role === "BUSINESS" ? user?.sub?.toString() : undefined,
  );
  const agencyQuery = useFetchAgencyQuery(
    user?.role === "AGENCY" ? user?.sub?.toString() : undefined,
  );
  const userData =
    user?.role === "BUSINESS" ? businessQuery.data : agencyQuery.data;

  useEffect(() => {
    if (!userData) return;

    setFormData((prev) => ({
      ...prev,
      companyName: userData.custName || "",
      representativeName: userData.reprsntName || "",
      businessRegistrationNumber: userData.bnsmRegNo || "",
    }));
  }, [userData, setFormData]);

  return (
    <Flex vertical gap={40} align="center">
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Flex vertical>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 18,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            차량정보 확인
          </Typography.Text>
          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-70, #37373E)",
              fontSize: 28,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            차량 정보 및 예산 결제금액을 확인해주세요.
          </Typography.Text>

          <Typography.Text
            style={{
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 24,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            개인사업자 명의로 계약 진행할게요.
          </Typography.Text>
        </Flex>

        <Flex>/*Để rỗng đoạn này đã*/</Flex>
      </Flex>

      <Flex vertical gap={24} style={{ width: "100%" }}>
        <Flex justify="space-between" gap={24}>
          {/* Left Column */}
          <Flex vertical gap={16} style={{ flex: 1 }}>
            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                법인명 (Company Name)
              </Typography.Text>
              <Input
                placeholder="CUST-001 CUST_NM"
                defaultValue="유지운"
                style={{ height: 48 }}
                value={userData?.custName}
                disabled
              />
            </Flex>

            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                대표자명 (Representative Name)
              </Typography.Text>
              <Input
                placeholder="CUST-001 REPRSNT_NM"
                defaultValue="유지운"
                style={{ height: 48 }}
                value={userData?.reprsntName}
                disabled
              />
            </Flex>

            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                (자택) 전화번호 (Home Phone Number)
              </Typography.Text>
              <Input
                placeholder="CUST-001 TEL_NO"
                style={{ height: 48 }}
                value={formData.homePhone}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    homePhone: e.target.value,
                  }))
                }
              />
              <Typography.Text style={{ fontSize: 12, color: "#666" }}>
                전화번호를 입력해주세요.
              </Typography.Text>
            </Flex>

            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                희망 배송일 (Desired Delivery Date)
              </Typography.Text>
              <DatePicker
                placeholder="CT-001 DLV_HOPE_DT"
                style={{ width: "100%", height: 48 }}
                format="YYYY-MM-DD"
                onChange={(_, dateString) =>
                  setFormData((prev) => ({
                    ...prev,
                    desiredDeliveryDate: dateString || "",
                  }))
                }
              />
              <Typography.Text style={{ fontSize: 12, color: "#666" }}>
                희망배송일을 선택해주세요.
              </Typography.Text>
            </Flex>
          </Flex>

          {/* Right Column */}
          <Flex vertical gap={16} style={{ flex: 1 }}>
            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                사업자등록번호 (Business Registration Number)
              </Typography.Text>
              <Input
                placeholder="CUST-001 BSNM_REG_NO"
                style={{ height: 48 }}
                value={userData?.bnsmRegNo}
                disabled
              />
            </Flex>

            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                담당자 연락처 (Contact Person's Information)
              </Typography.Text>
              <Flex gap={8}>
                <Input
                  placeholder="CUST-001 CUST_REP_NM"
                  defaultValue="유지운"
                  style={{ height: 48, flex: 1 }}
                  disabled
                />
                <Input
                  placeholder="CUST-001 CUST_REP_PHONE"
                  defaultValue="010-9981-9918"
                  style={{ height: 48, flex: 3 }}
                  disabled
                />
              </Flex>
            </Flex>

            <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                이메일 (Email)
              </Typography.Text>
              <Flex align="center" gap={8}>
                <Input
                  placeholder="CUST-001 CORP_EMAIL"
                  style={{ height: 48, flex: 1 }}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
                {/* <Typography.Text style={{ fontSize: 16 }}>@</Typography.Text>
                <Select 
                  defaultValue="value"
                  style={{ width: 120, height: 48 }}
                  options={[{ value: 'value', label: 'value' }]}
                /> */}
              </Flex>
              <Typography.Text style={{ fontSize: 12, color: "#666" }}>
                이메일을 입력해주세요.
              </Typography.Text>
            </Flex>

            {/* <Flex vertical gap={8}>
              <Typography.Text style={{ fontSize: 14, fontWeight: 500 }}>
                환급 계좌 (Refund Account)
              </Typography.Text>
              <Flex gap={8}>
                <Input 
                  placeholder="CT-001 REFUND_BANK"
                  style={{ height: 48, flex: 1 }}
                />
                <Input 
                  placeholder="CT-001 REFUND_ACCT"
                  style={{ height: 48, flex: 1 }}
                />
                <Input 
                  placeholder="CT-001 REFUND_NM"
                  style={{ height: 48, flex: 1 }}
                />
              </Flex>
            </Flex> */}
          </Flex>
        </Flex>
      </Flex>

      <Button
        style={{
          width: "450px",
          height: "56px",
          borderColor: "#2F2C4D",
          background: "#2F2C4D",
          color: "white",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
        onClick={onNext}
      >
        주문신청
      </Button>
    </Flex>
  );
};

export default StepTwo;
