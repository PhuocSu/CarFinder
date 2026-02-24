"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Input, Typography, Spin, Form } from "antd";
import useFetchIndividualQuery from "@/app/api/users/useFetchIndividualQuery";
import useUpdateIndividualMutation from "@/app/api/users/useUpdateIndividualMutation";
import { authState } from "@/store/authStore.atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";

const IndividualMemberInfo = () => {
  const { user } = useRecoilValue(authState);
  const { data: userData, isLoading, error } = useFetchIndividualQuery(user?.sub?.toString());
  const updateMutation = useUpdateIndividualMutation(user?.sub?.toString());
  const [form] = Form.useForm();

  const handleSave = async (values: any) => {
    // Remove password confirmation and empty values
    const { custPwConfirm, ...dataToUpdate } = values;
    const cleanedData = Object.fromEntries(
      Object.entries(dataToUpdate).filter(([_, value]) => value !== undefined && value !== "")
    );
    
    updateMutation.mutate(cleanedData);
  };

  if (isLoading) return <Spin size="large" />;
  if (error) return <div>Error loading user data</div>;

  return (
    <Flex vertical style={{ width: "590px"}}>
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
        id="individualForm"
        form={form}
        layout="vertical"
        initialValues={userData}
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
            비밀번호<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>

          <Input.Password
            placeholder="CUST-001 CUST_PW"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            비밀번호 확인<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>

          <Input.Password
            placeholder="CUST-001 CUST_PW"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            휴대전화번호<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="hpNo" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 HP_NO" value={userData?.hpNo} />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            이메일<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="email" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 EMAIL" value={userData?.email} />
          </Form.Item>
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            주소<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Form.Item name="custAddr" style={{ flex: 1, margin: 0 }}>
            <Input placeholder="CUST-001 ADDR" value={userData?.custAddr} />
          </Form.Item>
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
        form="individualForm"
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

export default IndividualMemberInfo;
