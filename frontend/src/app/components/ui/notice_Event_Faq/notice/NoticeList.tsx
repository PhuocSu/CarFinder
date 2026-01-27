"use client";

import { Flex, Spin } from "antd";
import NoticeCard from "../../cards/NoticeCard";
import NoticeActionFooter from "./NoticeActionFooter";
import { useNoticeQuery } from "@/app/api/notice/useNoticeQuery";
import { useRecoilValue } from "recoil";
import { noticeState } from "@/store/noticeStore.atom";

const NoticeList = () => {
  const noticeData = useRecoilValue(noticeState);
  const searchTerm = noticeData.search;

  const { data, isLoading, error } = useNoticeQuery(
    noticeData.page,
    noticeData.limit,
    searchTerm,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Flex vertical>
        {data?.items.map((item) => (
          <NoticeCard key={item.id} notice={item} />
        ))}
      </Flex>
    </div>
  );
};

export default NoticeList;
