"use client";

import { Badge, Image } from "antd";
import styles from "./RightSidebar.module.scss";

interface RightSidebarProps {
  onOpen: () => void;
}

const RightSidebar = ({onOpen}: RightSidebarProps) => {
  return (
    <div className={styles["right-sidebar"]}>
      <div className={styles["right-sidebar__badge"]} onClick={onOpen}>
        <Badge count={5} style={{ backgroundColor: "#4F4C6B" }}>
          <Image
            src="/images/sidebar/RecentlyViewedBagde.svg"
            preview={false}
          />
        </Badge>
        <span>최근 본 차량</span>
        <span>
          <Image src="/images/sidebar/Separator.svg" preview={false} />
        </span>
      </div>

      <div className={styles["right-sidebar__badge"]}>
        <Badge count={5} style={{ backgroundColor: "#4F4C6B" }}>
          <Image src="/images/sidebar/FavoriteBadge.svg" preview={false} />
        </Badge>
        <span>관심차량</span>
        <span>
          <Image src="/images/sidebar/Separator.svg" preview={false} />
        </span>
      </div>

      <div className={styles["right-sidebar__badge"]}>
        <Badge count={5} style={{ backgroundColor: "#4F4C6B" }}>
          <Image src="/images/sidebar/CompareBadge.svg" preview={false} />
        </Badge>
        <span>비교하기</span>
        <span></span>
      </div>
    </div>
  );
};

export default RightSidebar;
