"use client";

import { EventCards } from "@/types/event";
import { formatDate } from "@/utils/formatDate";
import { Button, Flex, Image, Typography } from "antd";
import styles from "./css/EventCard.module.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteEventMutation } from "@/app/api/event/useDeleteEventMutation";
import EventDeleteAcceptModal from "../notice_Event_Faq/event/EventDeleteAcceptModal";

interface EventCardProps {
  event: EventCards;
}

const EventCard = ({ event }: EventCardProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const deleteMutation = useDeleteEventMutation();

  const handleDeleteModalOpen = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn event bubbling
    console.log("🔓 Mở modal");
    setIsModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsModalOpen(false);
  };

  const handleDeleteModalConfirm = () => {
    deleteMutation.mutate(event.id, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleEdit = () => {
    router.push(`/event/write?id=${event.id}`);
  };

  const handleTemporarySave = () => {
    router.push(`/event/write?id=${event.id}`);
  };

  return (
    <Flex
      vertical
      className={styles["card--container"]}
      style={{ width: "285px", padding: "20px", border: "1px solid #E0E0E3" }}
    >
      <div style={{ position: "relative" }}>
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          preview={false}
        />

        {event.isTemporarySave == true && (
          <div
            style={{
              width: "77px",
              height: "24px",
              paddingLeft: 10,
              paddingRight: 10,
              background: "#555555",
              borderRadius: 10,
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 8,
              display: "inline-flex",
              cursor: "pointer",
              position: "absolute",
              top: 5,
              right: 5,
            }}
            onClick={handleTemporarySave}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                textAlign: "right",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                color: "white",
                fontSize: 12,
                fontFamily: "Noto Sans KR",
                fontWeight: "400",
                wordWrap: "break-word",
              }}
            >
              임시저장
            </div>
          </div>
        )}
      </div>

      <Typography.Text
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "var(--base-fg-color-base-fg-60, #4A4A50)",
          fontSize: 14,
          fontFamily: "Noto Sans KR",
          fontWeight: "700",
          wordWrap: "break-word",
          marginTop: "10px",
        }}
      >
        {event.title}
      </Typography.Text>

      <Typography.Text
        style={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          color: "var(--base-fg-color-base-fg-50, #666670)",
          fontSize: 14,
          fontFamily: "Noto Sans KR",
          fontWeight: "400",
          wordWrap: "break-word",
          marginTop: "10px",
        }}
      >
        {formatDate(event.startDate)} ~ {formatDate(event.endDate)}
      </Typography.Text>

      <Flex gap={8} style={{ marginTop: "10px" }}>
        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="small"
          data-state="enabled"
          data-style="tertiary"
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            background: "var(--button-tertiary-bg-enabled, white)",
            borderRadius: 2,
            outline: "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
          onClick={handleEdit}
        >
          <span
            style={{
              color: "var(--button-tertiary-fg-enabled, #666670)",
              fontSize: 13,
              fontFamily: "Pretendard",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            수정
          </span>
        </Button>
        <Button
          data-icon="none"
          data-shownumber="true"
          data-size="small"
          data-state="enabled"
          data-style="tertiary"
          style={{
            flex: 1,
            paddingLeft: 12,
            paddingRight: 12,
            background: "var(--button-tertiary-bg-enabled, white)",
            borderRadius: 2,
            outline: "1px var(--button-tertiary-stroke-enabled, #CECED3) solid",
            outlineOffset: "-1px",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            display: "inline-flex",
          }}
          onClick={(e) => handleDeleteModalOpen(e)}
        >
          <span
            style={{
              color: "var(--button-tertiary-fg-enabled, #666670)",
              fontSize: 13,
              fontFamily: "Pretendard",
              fontWeight: "400",
              wordWrap: "break-word",
            }}
          >
            삭제
          </span>
        </Button>
      </Flex>

      <EventDeleteAcceptModal
        open={isModalOpen}
        onOk={handleDeleteModalConfirm}
        onCancel={handleDeleteModalClose}
        loading={deleteMutation.isPending}
      />
    </Flex>
  );
};

export default EventCard;
