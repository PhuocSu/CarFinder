"use client";

import { Layout, Typography } from "antd";
import Image from "next/image";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const { Header: AntdHeader } = Layout;

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Kiểm tra 1 lần khi load component
    checkAuth();

    // Lắng nghe sự kiện từ login/logout
    window.addEventListener("authChanged", checkAuth);

    // Cleanup
    return () => {
      window.removeEventListener("authChanged", checkAuth);
    };
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("rememberMe");
    //Kích hoạt sự kiện authChanged để cập nhật toàn cục
    window.dispatchEvent(new Event("authChanged"));
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AntdHeader>
      <div className={styles.header}>
        <div className={styles.header__top}>
          {isAuthenticated ? (
            <>
              <Typography.Text
                className={styles.header__top__logout}
                onClick={handleLogout}
              >
                로그아웃
              </Typography.Text>
              <Typography.Text className={styles.header__top__mypage}>
                마이 페이지
              </Typography.Text>
            </>
          ) : (
            <>
              <Typography.Text className={styles.header__top__login}>
                로그인
              </Typography.Text>
              <Typography.Text className={styles.header__top__register}>
                회원가입
              </Typography.Text>
            </>
          )}
        </div>

        <div className={styles.header__bottom}>
          <div className={styles.header__logo}>
            <Image
              src="/images/gnb_logo.png"
              alt="KGM 인증중고차"
              width={288}
              height={32}
            />
          </div>

          <div className={styles.header__nav}>
            <Typography.Text className={styles.header__nav__item}>
              내차사기
            </Typography.Text>
            <Typography.Text className={styles.header__nav__item}>
              내차팔기
            </Typography.Text>
            <Typography.Text className={styles.header__nav__item}>
              KGM 인증소개
            </Typography.Text>
            <Typography.Text className={styles.header__nav__item}>
              이벤트
            </Typography.Text>
            <Typography.Text className={styles.header__nav__item}>
              자주 묻는 질문
            </Typography.Text>
            <Typography.Text className={styles.header__nav__item}>
              공지사항
            </Typography.Text>
          </div>
        </div>
      </div>
    </AntdHeader>
  );
}
