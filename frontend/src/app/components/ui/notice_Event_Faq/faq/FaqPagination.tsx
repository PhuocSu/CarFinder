"use client";
import { Pagination } from "antd";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { faqState } from "@/store/faqStore.atom";
import { useFaqQuery } from "@/app/api/faq/useFaqQuery";

const FaqPagination = () => {
  const { page, limit, search } = useRecoilValue(faqState);
  const { data } = useFaqQuery(page, limit, search);
  const setFaqData = useSetRecoilState(faqState);

  const handlePageChange = (page: number) => {
    setFaqData((prev) => ({
      ...prev,
      page: page
    }));
  };

  return (
    <>
      <Pagination
        current={page}
        total={data?.total || 0}
        pageSize={limit}
        showSizeChanger={false}
        showQuickJumper={false}
        onChange={handlePageChange}
        itemRender={(page, type, originalElement) => {
          if (type === "page") {
            return <a>{page}</a>;
          }
          if (type === "prev" || type === "next") {
            return null; // hide prev/next
          }
          return originalElement;
        }}
        style={{
          textAlign: "center",
          justifyContent: "center",
          marginTop: 20
        }}
        className="custom-pagination"
      />
      <style jsx>{`
        :global(.custom-pagination .ant-pagination-item-active) {
          border: none !important;
          background: transparent !important;
        }
        :global(.custom-pagination .ant-pagination-item-active a) {
          color: #000 !important;
          font-weight: 600 !important;
        }
      `}</style>
    </>
  );
};

export default FaqPagination;

// Mai test
