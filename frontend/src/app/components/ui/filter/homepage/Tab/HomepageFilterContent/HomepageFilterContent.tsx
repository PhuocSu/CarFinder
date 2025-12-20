"use client";

import { Button, Flex, Input, Typography } from "antd";
import styles from "./HomepageFilterContent.module.scss";

const HomepageFilterContent = () => {
  return (
    <Flex vertical className={styles["homepage-container"]}>
      <div style={{ gap: "8px" }}>
        <Typography.Text className={styles["homepage-container--title"]}>
          내 차 팔 때, 믿을 수 있는 첫걸음
        </Typography.Text>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography.Text className={styles["homepage-container--text"]}>
            복잡한 절차 없이 간편하게.
          </Typography.Text>
          <Typography.Text className={styles["homepage-container--text"]}>
            KG 모빌리티가 정직한 가격으로 내 차를 매입해 드립니다.
          </Typography.Text>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Input
          className={styles["homepage-container--input__content"]}
          placeholder="차량을 123가4567"
        />
        <Input
          className={styles["homepage-container--input__content"]}
          placeholder="소유주명"
        />

        <Button
          className={styles["homepage-container--sell-button"]}
          data-icon="none"
          data-shownumber="true"
          data-size="large"
          data-state="enabled"
          data-style="secondary"
        >
          <span className={styles["sell-button__span"]}>내차팔기</span>
        </Button>
      </div>
    </Flex>
  );
};

export default HomepageFilterContent;
