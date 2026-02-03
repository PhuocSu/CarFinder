"use client";

import { Flex, Spin } from "antd";
import NoticeCard from "../../cards/NoticeCard";
import NoticeActionFooter from "./NoticeActionFooter";
import { useNoticeQuery } from "@/app/api/notice/useNoticeQuery";
import { useRecoilValue } from "recoil";
import { noticeState } from "@/store/noticeStore.atom";
import { useAuth } from "@/hooks/useAuth";
import { useMemo } from "react";

const NoticeList = () => {
  const noticeData = useRecoilValue(noticeState);
  const searchTerm = noticeData.search;

  const { data, isFetching , error } = useNoticeQuery(
    noticeData.page,
    noticeData.limit,
    searchTerm,
  );

    const { user } = useAuth();

  const filteredData = useMemo(() => {
    if (!data?.items) return [];
    
    return data.items.filter((item) => {
      if (user?.role === "ADMIN") return true;
      return !item.isTemporarySave;
    });
  }, [data, user]);

  if (isFetching ) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <Flex vertical>
        {filteredData.map((item) => (
          <NoticeCard key={item.id} notice={item} />
        ))}
      </Flex>
    </div>
  );
};

export default NoticeList;
