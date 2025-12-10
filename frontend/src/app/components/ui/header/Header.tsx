"use client";

import { Layout, Typography } from "antd";
import Image from "next/image";
import styles from "./Header.module.css";

const { Header: AntdHeader } = Layout;

const Header = () => {
  return (
    <AntdHeader>
      <div
        className={styles.header}
      >
        <div
          className={styles.header__top}
        >
          <Typography.Text className={styles.header__top__login}>로그인</Typography.Text>
          <Typography.Text className={styles.header__top__register}>회원가입</Typography.Text>
        </div>

        <div
          className={styles.header__bottom}
        >
          <div className={styles.header__logo}>
            <Image
              src="/images/gnb_logo.png"
              alt="KGM 인증중고차"
              width={288}
              height={32}
            />
          </div>

          {/* Menu */}
          <div className={styles.header__nav}>
            <Typography.Text className={styles.header__nav__item}>내차사기</Typography.Text>
            <Typography.Text className={styles.header__nav__item}>내차팔기</Typography.Text>
            <Typography.Text className={styles.header__nav__item}>KGM 인증소개</Typography.Text>
            <Typography.Text className={styles.header__nav__item}>이벤트</Typography.Text>
            <Typography.Text className={styles.header__nav__item}>자주 묻는 질문</Typography.Text>
            <Typography.Text className={styles.header__nav__item}>공지사항</Typography.Text>
          </div>
        </div>
      </div>
    </AntdHeader>
  );
};

export default Header;
