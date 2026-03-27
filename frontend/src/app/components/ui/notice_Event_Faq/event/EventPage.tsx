"use client";

import { Flex, Typography } from "antd";
import EventSearchBar from "./EventSearchBar";
import EventList from "./EventList";
import EventActionFooter from "./EventActionFooter";
import EventPagination from "./EventPagination";

const EventPage = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Flex
        justify="space-between"
        align="center"
        style={{ height: "66px", width: "100%", marginBottom: "24px" }}
      >
        <Flex gap={8} vertical>
          <Typography.Text
            style={{
              alignSelf: "stretch",
              color: "var(--base-fg-color-base-fg-70, #37373E)",
              fontSize: 24,
              fontFamily: "Noto Sans KR",
              fontWeight: "700",
              wordWrap: "break-word",
            }}
          >
            이벤트
          </Typography.Text>
          <Typography.Text
            style={{
              alignSelf: "stretch",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              color: "var(--base-fg-color-base-fg-60, #4A4A50)",
              fontSize: 16,
              fontFamily: "Noto Sans KR",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            KGM 인증중고차의 이벤트 소식을 접해보세요.
          </Typography.Text>
        </Flex>

        <EventSearchBar />
      </Flex>

      <EventList />

      <EventActionFooter />

      <EventPagination />
    </div>
  );
};

export default EventPage;
