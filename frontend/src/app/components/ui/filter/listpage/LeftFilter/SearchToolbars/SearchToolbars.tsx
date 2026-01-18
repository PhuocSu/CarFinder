"use client";

import { Button, Flex, Image, Typography } from "antd";
import styles from "./SearchToolbars.module.scss";

const SearchToolbars = () => {
    return (
        <Flex
        gap={8}
        style={{
          width: "100%",
          padding: "0px 0px 13px",
          borderBottom:
            "1px solid var(--base-stroke-color-base-stroke-20, #E2E4E8)",
        }}
      >
        <Button
          style={{
            height: "40px",
            flex: 1,
            borderRadius: 2,
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            background: "var(--button-tertiary-bg-enabled, #FFF)",
          }}
        >
          <Image
            src="/images/listPage/icon-list.svg"
            preview={false}
            width={24}
            height={24}
          />
          <Typography.Text className={styles.button__search__title}>
            최근 검색 조건
          </Typography.Text>
        </Button>
        <Button
          style={{
            height: "40px",
            flex: 1,
            borderRadius: 2,
            border: "1px solid var(--button-tertiary-stroke-enabled, #CECED3)",
            background: "var(--button-tertiary-bg-enabled, #FFF)",
          }}
        >
          <Image
            src="/images/listPage/icon-reload.svg"
            preview={false}
            width={24}
            height={24}
          />
          <Typography.Text className={styles.button__search__title}>
            초기화
          </Typography.Text>
        </Button>
      </Flex>
    )
}

export default SearchToolbars
