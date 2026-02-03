"use client";

import { Button, Flex, Select } from "antd";
import { BUDGET_OPTIONS } from "@/constants/homepage/budgetOptions";
import styles from "./BudgetTab.module.scss";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { vehicleFilterState } from "@/store/VehicleFilter.atom";

const BudgetTab = () => {
  const router = useRouter();
  const [filter, setFilter] = useRecoilState(vehicleFilterState);

  const handleBudgetSearch = () => {
    const params = new URLSearchParams();
    
    if (filter.priceMin) {
      params.set('priceMin', filter.priceMin.toString());
    }
    
    if (filter.priceMax) {
      params.set('priceMax', filter.priceMax.toString());
    }
    
    const queryString = params.toString();
    router.push(`/listPage${queryString ? '?' + queryString : ''}`);
  };

  const handlePresetBudget = (min?: number, max?: number) => {
    setFilter(prev => ({
      ...prev,
      priceMin: min,
      priceMax: max,
      page: 1,
    }));
    
    const params = new URLSearchParams();
    if (min) params.set('priceMin', min.toString());
    if (max) params.set('priceMax', max.toString());
    
    const queryString = params.toString();
    router.push(`/listPage${queryString ? '?' + queryString : ''}`);
  };

  return (
    <div>
      <Flex vertical gap={20} style={{ padding: "24px", width: "100%" }}>
        <Flex gap={10} style={{ height: "52px" }}>
          <div style={{ width: "100%", display: "flex", gap: "8px" }}>
            <Select
              className={styles["select--budget__min"]}
              placeholder="최소 금액"
              options={BUDGET_OPTIONS}
              onChange={(value) => setFilter(prev => ({ ...prev, priceMin: value }))}
            />

            <Select
              className={styles["select--budget__max"]}
              placeholder="최대 금액"
              options={BUDGET_OPTIONS}
              onChange={(value) => setFilter(prev => ({ ...prev, priceMax: value }))}
            />
          </div>

          <Button
            className={styles["button--budget"]}
            data-icon="none"
            data-shownumber="true"
            data-size="X-large"
            data-state="enabled"
            data-style="primary"
            onClick={handleBudgetSearch}
          >
            <span className={styles["button--budget__text"]}>조회</span>
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
            onClick={() => handlePresetBudget(undefined, 25000000)}
          >
            <div className={styles["button--budget__badge"]}>
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
            onClick={() => handlePresetBudget(25000000, 30000000)}
          >
            <div className={styles["button--budget__badge"]}>
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
            onClick={() => handlePresetBudget(30000000, 35000000)}
          >
            <div className={styles["button--budget__badge"]}>
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
            onClick={() => handlePresetBudget(35000000, undefined)}
          >
            <div className={styles["button--budget__badge"]}>
              3,500만원 이상
            </div>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default BudgetTab;
