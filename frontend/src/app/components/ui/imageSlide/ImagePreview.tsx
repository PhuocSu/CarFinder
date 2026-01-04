"use client";

import styles from "./css/ImagePreview.module.scss";

type Props = {
  onClick: () => void;
};

export default function ImagePreview({ onClick }: Props) {
  return (
    <div className={styles.previewWrapper} onClick={onClick}>
      <span className={styles.previewText}>👁 Preview</span>
    </div>
  );
}
