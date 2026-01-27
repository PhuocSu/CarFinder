"use client";
import { Pagination } from "antd";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { noticeState } from "@/store/noticeStore.atom";
import { useNoticeQuery } from "@/app/api/notice/useNoticeQuery";
const NoticePagination = () => {
  const { page, limit, search } = useRecoilValue(noticeState);
  const { data } = useNoticeQuery(page, limit, search);
  const setNoticeState = useSetRecoilState(noticeState);

  const handlePageChange = (page: number) => {
    setNoticeState((prev) => ({
      ...prev,
      page: page,
    }));
  };

  return (
    <>
      <Pagination
        current={page}
        total={data?.total}
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
          marginTop: 20,
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

export default NoticePagination;

// Mai test
