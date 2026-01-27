"use client"

import { Button, Flex, Typography } from "antd";

interface NoticeActionFooterProps {
  total: number;
}

const NoticeActionFooter = ({ total }: NoticeActionFooterProps) => {
    return (
        <Flex justify="space-between" align="center">
            <Typography.Text>
                <span style={{ color: 'var(--base-fg-color-base-fg-70, #37373E)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '600', wordWrap: 'break-word' }}>
                    총 {total}건
                </span>
                <span style={{ color: 'var(--base-fg-color-base-fg-70, #37373E)', fontSize: 16, fontFamily: 'Pretendard', fontWeight: '400', wordWrap: 'break-word' }}>
                    의 게시글
                </span>
            </Typography.Text>
            <Button type="primary" style={{
                width: "80px",
                height: "40px",
                borderRadius: 0,
                background: 'var(--button-primary-bg-enabled, #2F2C4D)'
            }}
            >
                <div style={{ color: 'var(--button-primary-fg, white)', fontSize: 14, fontFamily: 'Noto Sans KR', fontWeight: '700', wordWrap: 'break-word' }}>검색</div>
            </Button>
        </Flex>
    );
};

export default NoticeActionFooter;