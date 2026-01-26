"use client";
import { Pagination } from "antd";
import { useState } from "react";
const NoticePagination = () => {
  const [current, setCurrent] = useState(1);
  const total = 60;
  const pageSize = 10;

  return (
    <Pagination
      defaultCurrent={1}
      total={60}
      pageSize={10}
      showSizeChanger={false}
      showQuickJumper={false}
      itemRender={(page, type, originalElement) => {
        if (type === "page") {
          return page <= current ? <a>{page}</a> : null // display page <= current
        }
        if (type === "prev" || type === "next") {
          return null; // hide prev/next
        }
        return originalElement;
      }}
      style={{ textAlign: "center", justifyContent: "center", marginTop: 20 }}
    />
  );
};

export default NoticePagination;

// Mai test
