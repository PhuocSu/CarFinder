"use client";
import { Button, Modal } from "antd";
import { useState } from "react";

const DeleteAcceptModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return <Modal closable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    
    <p>정말 삭제하시겠습니까?</p>
    <Button onClick={handleOk}>삭제</Button>
    <Button onClick={handleCancel}>취소</Button>
  </Modal>;
};
