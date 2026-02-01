"use client";
import { eventState } from "@/store/eventStore.atom";
import { Pagination } from "antd";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEventQuery } from "@/app/api/event/useEventQuery";

const EventPagination = () => {
  const { page, limit, search } = useRecoilValue(eventState);
    const { data } = useEventQuery(page, limit, search);
    const setEventState = useSetRecoilState(eventState);
  
    const handlePageChange = (page: number) => {
      setEventState((prev) => ({
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
        onChange={handlePageChange}
        showSizeChanger={false}
        showQuickJumper={false}
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

export default EventPagination;

// Mai test
