"use client"

import { Flex, Typography } from "antd"
import FaqSearchBar from "./FaqSearchBar"
import FaqList from "./FaqList"
import FaqActionFooter from "./FaqActionFooter"
import FaqPagination from "./FaqPagination"

const FaqPage = () => {
    return (
        <div>
            <Flex justify="space-between" align="center" style={{ height: "66px", width: "100%" }}>
                <Flex gap={8} vertical>
                    <Typography.Text style={{ alignSelf: 'stretch', color: 'var(--base-fg-color-base-fg-70, #37373E)', fontSize: 24, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>공지사항</Typography.Text>
                    <Typography.Text style={{ alignSelf: 'stretch', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'var(--base-fg-color-base-fg-60, #4A4A50)', fontSize: 16, fontFamily: 'Noto Sans KR', fontWeight: '400', wordWrap: 'break-word' }}>KGM 인증중고차의 새로운 소식을 전달 받아보세요.</Typography.Text>
                </Flex>

                <FaqSearchBar />

            </Flex>

            <FaqList />

            <FaqActionFooter />

            <FaqPagination />
        </div>
    )
}

export default FaqPage