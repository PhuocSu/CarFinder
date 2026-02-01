"use client";
import { Button, Modal } from "antd";

interface EventDeleteAcceptModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const EventDeleteAcceptModal = ({
  open,
  onOk,
  onCancel,
  loading,
}: EventDeleteAcceptModalProps) => {
  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      onCancel={onCancel}
      centered
    >
      <p>정말 삭제하시겠습니까?</p>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button onClick={onCancel}>취소</Button>
        <Button
          type="primary"
          danger
          loading={loading}
          onClick={onOk}
        >
          삭제
        </Button>
      </div>
    </Modal>
  );
};

export default EventDeleteAcceptModal;
