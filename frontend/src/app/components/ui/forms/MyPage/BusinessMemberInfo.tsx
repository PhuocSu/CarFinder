"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Input, Typography, Spin, Form } from "antd";
import useFetchBusinessQuery from "@/app/api/users/useFetchBusinessQuery";
import useUpdateBusinessMutation from "@/app/api/users/useUpdateBusinessMutation";
import { authState } from "@/store/authStore.atom";
import { useRecoilValue } from "recoil";

const BusinessMemberInfo = () => {
  const { user } = useRecoilValue(authState);
  const { data: userData, isLoading, error } = useFetchBusinessQuery(user?.sub?.toString());
  const updateMutation = useUpdateBusinessMutation(user?.sub?.toString());
  const [form] = Form.useForm();

  const handleSave = async (values: any) => {
    // Remove password confirmation and clean data
    const { custPwConfirm, ...dataToUpdate } = values;
    
    // Filter out empty values and convert number fields
    const cleanedData: any = {};
    Object.entries(dataToUpdate).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        // Convert specific fields to numbers if needed
        if ((key === 'corpTellNo' || key === 'custRepPhone') && typeof value === 'string') {
          const cleanNumber = value.replace(/-/g, ''); // Remove hyphens from phone numbers
          cleanedData[key] = parseInt(cleanNumber, 10) || undefined; // Convert to number
        } else {
          cleanedData[key] = value;
        }
      }
    });
    
    console.log("Data to update:", cleanedData);
    updateMutation.mutate(cleanedData);
  };

  if (isLoading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <img src="/images/loadcat.gif" alt="Loading..." style={{ width: '100px', height: '100px' }} />
    </div>
  );
  if (error) return <div>Error loading user data</div>;

  return (
    <Flex vertical style={{ width: "590px" }}>
      <Flex vertical gap={8} style={{ marginBottom: "40px" }}>
        <Typography.Text
          style={{
            color: "var(--base-fg-color-base-fg-60, #4A4A50)",
            fontSize: 18,
            fontFamily: "Noto Sans KR",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          회원정보 관리
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
          회원님의 정보를 수정할 수 있어요.
        </Typography.Text>
      </Flex>

      <Form
        id="businessForm"
        form={form}
        layout="vertical"
        initialValues={{
          ...userData,
          custPw: "",
          custPwConfirm: "",
        }}
        onFinish={handleSave}
        style={{ width: "100%" }}
      >
        <Flex vertical gap={20}>
        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            아이디<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Input placeholder="CUST-001 CUST_ID" value={userData?.custId} readOnly style={{ backgroundColor: "#f5f5f5", color: "#000000", cursor: "default" }} />
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            이름<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="custName" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 CUST_NM" />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            대표자명<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="reprsntName" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 REPRSNT_NM" />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            사업자등록번호<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="bnsmRegNo" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 BSNM_REG_NO" />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            비밀번호<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="custPw" style={{ flex: 1, margin: 0 }}>
            <Input.Password
              placeholder="새 비밀번호 입력"
              autoComplete="new-password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            비밀번호 확인<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>

          <Form.Item name="custPwConfirm" style={{ flex: 1, margin: 0 }}>
            <Input.Password
              placeholder="새 비밀번호 확인"
              autoComplete="new-password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            법인 대표번호<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="corpTellNo" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 CORP_TEL_NO" value={userData?.corpTellNo} />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            사업자등록증
          </Typography.Text>
          <Form.Item name="bnsmRegCert" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 BSNM_REG_CERT" value={userData?.bnsmRegCert} />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            사업장 주소
          </Typography.Text>
          <Form.Item name="custAddr" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 ADDR" value={userData?.custAddr} />
          </Form.Item>
        </Flex>

        <Flex vertical gap={20} style={{ borderTop: "1px solid #E5E5E5", paddingTop: "30px" }}>
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
            담당자 성명<span style={{ color: "#DC0000" }}> *</span>
            </Typography.Text>
          <Form.Item name="custRep" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 CUST_REP" value={userData?.custRep} />
          </Form.Item>
          </Flex>
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
            담당자 연락처 <span style={{ color: "#DC0000" }}> *</span>
            </Typography.Text>
          <Form.Item name="custRepPhone" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 CUST_REP_PHONE" value={userData?.custRepPhone} />
          </Form.Item>
          </Flex>
          <Flex flex={1} gap={16} style={{ height: "40px" }}>
            <Typography.Text style={{ width: "318px", display: "flex" }}>
            부서/직함 
            </Typography.Text>
          <Form.Item name="repDepTit" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 REP_DEP_TIT" value={userData?.repDepTit}/>
          </Form.Item>
          </Flex>
        </Flex>

        <Typography.Text
          style={{
            textAlign: "right",
            color: "var(--base-fg-color-base-fg-60, #4A4A50)",
            fontSize: 14,
            fontFamily: "Noto Sans KR",
            fontWeight: "700",
            wordWrap: "break-word",
            cursor: "pointer",
          }}
        >
          회원탈퇴하기
        </Typography.Text>
      </Flex>
      </Form>

      <Button
        type="primary"
        htmlType="submit"
        form="businessForm"
        loading={updateMutation.isPending}
        style={{
          width: "450px",
          height: "56px",
          margin: "80px auto 0",
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
        저장하기
      </Button>
    </Flex>
  );
};

export default BusinessMemberInfo;
