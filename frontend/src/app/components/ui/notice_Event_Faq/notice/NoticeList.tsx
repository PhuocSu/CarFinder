"use client"

import { Flex, Spin } from "antd"
import NoticeCard from "../../cards/NoticeCard"
import NoticeActionFooter from "./NoticeActionFooter"
import { useNoticeQuery } from "@/app/api/notice/useNoticeQuery"
import { useState } from "react"

const NoticeList = () => {
    const [page, setPage] = useState(1)
    const { data, isLoading } = useNoticeQuery(page, 10)

    return (
        <div>
            {isLoading ? (
                <Flex justify="center" style={{ padding: "40px" }}>
                    <Spin size="large" />
                </Flex>
            ) : (
                data?.items.map((item) => (
                    <Flex vertical key={item.id} style={{ marginBottom: 16 }}>
                        <NoticeCard notice={item} />
                    </Flex>
                ))
            )}
        </div>
    )
}

export default NoticeList

