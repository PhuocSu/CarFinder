"use client";

import { Flex } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Category } from "@/enums/category.enum";
import styles from "./css/FaqList.module.scss";
import { useFaqQuery } from "@/app/api/faq/useFaqQuery";
import FaqCard from "../../cards/FaqCard";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { faqState } from "@/store/faqStore.atom";
import { useAuth } from "@/hooks/useAuth";

const CategoryLabel: Record<Category, string> = {
  [Category.ALL]: "전체",
  [Category.VEHICLE_AND_CONTRACT_PROCEDURE]: "차량 및 계약 절차 관련",
  [Category.CONTRACT_CONDITIONS]: "계약 조건 관련",
  [Category.PAYMENT_AND_COSTS]: "결제/비용 관련",
  [Category.VEHICLE_ACCEPTANCE]: "인수관련",
  [Category.OTHERS]: "기타",
};

const onChange = (key: string) => {
  console.log("Selected Tab: ", key);
};

const FaqList = () => {
  const { user } = useAuth();
  const faqData = useRecoilValue(faqState);
  const { data } = useFaqQuery(faqData.page, faqData.limit, faqData.search);
  
  const filteredData = useMemo(() => {
    if (!data?.items) return [];

    return data.items.filter((faq) => {
      // Admin thấy tất cả
      if (user?.role === "ADMIN") return true;
      // User thường không thấy temporary save
      return !faq.isTemporarySave;
    });
  }, [data, user]);

  const items: TabsProps["items"] = Object.values(Category).map((cat) => ({
    key: cat,
    label: CategoryLabel[cat],
    children: (
      <div>
        {filteredData
          .filter((faq) => {
            if (cat === Category.ALL) {
              return true;
            }
            return faq.category === cat;
          })
          .map((faq) => (
            <FaqCard key={faq.id} faq={faq} />
          ))}
      </div>
    ),
  }));

  return (
    <Flex vertical>
      <Tabs
        defaultActiveKey={Category.ALL}
        items={items}
        onChange={onChange}
        className={styles["custom-tabs"]}
      />
    </Flex>
  );
};

export default FaqList;
