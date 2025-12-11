"use client";

import React, { useEffect } from "react";
import { Button, Checkbox, Divider, Form, Input, message, Typography } from "antd";
import { useLogin } from "@/app/api/auth/useLogin";
import { useSetRecoilState } from "recoil";
import { authState } from "@/store/authStore";
import { useRouter } from "next/navigation";
import styles from "./LoginForm.module.css";

const { Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const loginMutation = useLogin();
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const rememberMe = localStorage.getItem("rememberMe");
    if (savedUsername && rememberMe === "true") {
      form.setFieldsValue({
        username: savedUsername,
        remember: true,
      });
    }
  }, [form]);

  const onFinish = async (values: {
    username: string;
    password: string;
    remember?: boolean;
  }) => {
    try {
      //tách trường remember ra khỏi payload gửi lên server
      const { remember, ...loginData } = values;

      // Gọi API đăng nhập chỉ với username và password
      const response = await loginMutation.mutateAsync(loginData); //mở đầu bằng việc kích họat việc đăng nhập

      //1. lưu access token vào trong storage hoặc cookies
      localStorage.setItem("access_token", response.access_token);
      
      window.dispatchEvent(new Event("authChanged"));

      //2. Cập nhật state xác thực thực toàn cục
      setAuth({
        user: response.user,
        accessToken: response.access_token,
        isAuthenticated: true,
      });

      //3. Xử lý "Nhớ tài khoản"
      if (remember) {
        localStorage.setItem("username", values.username);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("username");
        localStorage.removeItem("rememberMe");
      }

      //4. Hiển thị thông báo thành công
      message.success("Login successfully");
      router.push("/");
    } catch (error) {
      console.log("Login failed: ", error);
      console.error("Login failed: ", error);
    }
  };

  return (
    <div
      style={{
        width: 446,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        gap: 40,
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      {/* Title */}
      <Title
        level={2}
        style={{
          textAlign: "center",
          color: "var(--base-fg-color-base-fg-70, #37373E)",
          fontSize: 28,
          fontFamily: "Noto Sans KR",
          fontWeight: 700,
          lineHeight: "38px",
        }}
      >
        로그인
      </Title>

      {/* Form */}
      <Form
        form={form}
        name="login"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ display: "flex", flexDirection: "column", gap: 24 }}
      >
        {/* Username */}
        <Form.Item<FieldType>
          label={<span style={{ fontSize: 16, color: "#4A4A50" }}>아이디</span>}
          name="username"
          rules={[{ required: true, message: "아이디를 입력해주세요." }]}
        >
          <Input
            placeholder="아이디를 입력해주세요."
            style={{
              height: 52,
              padding: "8px 16px",
              borderRadius: 2,
              border: "1px solid #CECED3",
            }}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item<FieldType>
          label={
            <span style={{ fontSize: 16, color: "#4A4A50" }}>비밀번호</span>
          }
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input.Password
            placeholder="비밀번호를 입력해주세요"
            style={{
              height: 52,
              padding: "8px 16px",
              borderRadius: 2,
              border: "1px solid #CECED3",
            }}
          />
        </Form.Item>

        {/* Remember + Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ fontSize: 14, color: "#666670" }}>
              아이디 저장
            </Checkbox>
          </Form.Item>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              height: 56,
              background: "var(--button-primary-bg-enabled, #2F2C4D)",
              fontSize: 16,
              fontWeight: 700,
              fontFamily: "Noto Sans KR",
            }}
            loading={loginMutation.isPending}
          >
            로그인
          </Button>
        </Form.Item>
      </Form>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          alignItems: "center",
        }}
      >
        <Typography.Link className={styles['header__bottom--character']} style={{color: 'var(--button-secondary-fg-enabled, #3533CC)'}}>회원가입</Typography.Link>
        <Divider
          orientation="vertical"
          style={{ margin: 0, height: "12px", borderColor: "#d9d9d9" }}
        />
        <Typography.Link className={styles['header__bottom--character']} style={{color: 'var(--base-fg-color-base-fg-40, #8F97A4)'}}>아이디 찾기</Typography.Link>
        <Divider
          orientation="vertical"
          style={{ margin: 0, height: "12px", borderColor: "#d9d9d9" }}
        />
        <Typography.Link className={styles['header__bottom--character']} style={{color: 'var(--base-fg-color-base-fg-40, #8F97A4)'}}>비밀번호 찾기</Typography.Link>
      </div>
    </div>
  );
};

export default LoginForm;