"use client";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Input, Typography } from "antd";

const IndividualMemberInfo = () => {
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

      <Flex vertical gap={20}>
        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            아이디<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Input placeholder="CUST-001 CUST_ID" />
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            이름<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Input placeholder="CUST-001 CUST_NM" />
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
          <Input placeholder="CUST-001 HP_NO" />
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            이메일<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Input placeholder="CUST-001 EMAIL" />
        </Flex>

        <Flex flex={1} gap={16} style={{ height: "40px" }}>
          <Typography.Text style={{ width: "318px", display: "flex" }}>
            주소<span style={{ color: "#DC0000" }}> *</span>
          </Typography.Text>
          <Input placeholder="CUST-001 ADDR" />
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

      <Button
        data-icon="none"
        data-shownumber="true"
        data-size="X-large"
        data-state="enabled"
        data-style="primary"
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
        <div
          style={{
            color: "var(--button-primary-fg, white)",
            fontSize: 16,
            fontFamily: "Inter",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          저장하기
        </div>
      </Button>
    </Flex>
  );
};

export default IndividualMemberInfo;
