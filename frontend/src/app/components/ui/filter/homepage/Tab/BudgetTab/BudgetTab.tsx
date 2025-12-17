"use client";

import { Button, Flex, Select } from "antd";
import { BUDGET_OPTIONS } from "@/constants/homepage/budgetOptions";
import styles from "./BudgetTab.module.scss";

const BudgetTab = () => {
  return (
    <div>
      {/* hiện tại cứ set là 692px đã */}
      <Flex vertical gap={20} style={{ padding: "24px", width: "642px" }}>
        <Flex gap={10} style={{ height: "52px", width: "100%" }}>
          <Select
            className={styles["select--budget__min"]}
            placeholder="최소 금액"
            options={BUDGET_OPTIONS}
          />

          <Select
            className={styles["select--budget__max"]}
            placeholder="최대 금액"
            options={BUDGET_OPTIONS}
          />

          <Button
            className={styles["button--budget"]}
            data-icon="none"
            data-shownumber="true"
            data-size="X-large"
            data-state="enabled"
            data-style="primary"
          >
            <span
              className={styles["button--budget__text"]}
            >
              조회
            </span>
          </Button>
        </Flex>

        <Flex gap={8} style={{ height: "32px" }}>
          <div
            className={styles["button--budget__filter"]}
            data-icon="none"
            data-shownumber="true"
            data-size="small"
            data-state="enabled"
            data-style="tertiary"
          >
            <div
              className={styles["button--budget__badge"]}
            > 
              2,500만원 이하
            </div>
          </div>

          <div
            className={styles["button--budget__filter"]}
            data-icon="none"
            data-shownumber="true"
            data-size="small"
            data-state="enabled"
            data-style="tertiary"
          >
            <div
              className={styles["button--budget__badge"]}
            >
              2,500만원 ~ 3,000만원
            </div>
          </div>

          <div
            className={styles["button--budget__filter"]}
            data-icon="none"
            data-shownumber="true"
            data-size="small"
            data-state="enabled"
            data-style="tertiary"
          >
            <div
              className={styles["button--budget__badge"]}
            >
              3,000만원 ~ 3,500만원
            </div>
          </div>

          <div
            className={styles["button--budget__filter"]}
            data-icon="none"
            data-shownumber="true"
            data-size="small"
            data-state="enabled"
            data-style="tertiary"
          >
            <div
              className={styles["button--budget__badge"]}
            >
              3,500만원 이상
            </div>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default BudgetTab;
