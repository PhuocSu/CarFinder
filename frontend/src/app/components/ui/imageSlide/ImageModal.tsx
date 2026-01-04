"use client";

import { Button, Image, Modal } from "antd";
import { useState } from "react";
import styles from "./css/ImageModal.module.scss";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
};

const ImageModal = ({ open, onClose, images }: Props) => {
  const [current, setCurrent] = useState(0);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
      closable
      className={styles.galleryModal}
    >
      <div className={styles.modalContent}>
        {/* Left content */}
        <div className={styles.modalMain}>
          <Image
            className={styles.modalImage}
            src={images[current]}
            alt="car-image"
            preview={false}
          />
          <div className={styles.counter}>
            {current + 1}/{images.length}
          </div>
          <Button
            className={styles.prev}
            onClick={() =>
              setCurrent(current === 0 ? images.length - 1 : current - 1)
            }
          >
            <LeftOutlined />
          </Button>

          <Button
            className={styles.next}
            onClick={() =>
              setCurrent(current === images.length - 1 ? 0 : current + 1)
            }
          >
            <RightOutlined />
          </Button>
        </div>

        {/* Right content */}
        <div className={styles.modalThumbs}>
          {images.map((img, idx) => {
            return (
              <div
                key={idx}
                className={`${styles.thumb} ${
                  idx === current ? styles.active : ""
                }`}
                onClick={() => setCurrent(idx)}
              >
                <Image src={img} alt="thumb" preview={false} />
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;
