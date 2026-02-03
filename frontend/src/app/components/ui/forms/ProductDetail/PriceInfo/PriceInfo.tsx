"use client";

import { Button, Col, Flex, Image, Row, Typography } from "antd";
import styles from "../ProductDetail.module.scss";
import { useRecoilValue } from "recoil";
import { favoriteCarState } from "@/store/favoriteCar.atom";
import { useToggleFavoriteMutation } from "@/app/api/favorite/useToggleFavoriteMutation";
import { compareCarState } from "@/store/compareCar.atom";
import { useToggleCompareMutation } from "@/app/api/compare/useToggleCompareMutation";

const PriceInfo = () => {
      const favoriteCars = useRecoilValue(favoriteCarState);
      const toggleFavorite = useToggleFavoriteMutation();
      const isFavorite = favoriteCars.includes(1); //để tạm: vehicle.id
    
      const compareCars = useRecoilValue(compareCarState);
      const toggleCompare = useToggleCompareMutation();
      const isCompare = compareCars.includes(1);

  return (
    <Flex
      className={styles["container"]}
      vertical
      gap={16}
      style={{ width: "inherit", padding: "20px" }}
    >
      <Typography.Text
        style={{
          width: "100%",
          color: "var(--base-fg-color-base-fg-60, #4A4A50)",
          fontSize: 18,
          fontFamily: "Inter",
          fontWeight: "400",
          wordWrap: "break-word",
        }}
      >
        123마1243
      </Typography.Text>

      <Flex vertical gap={8}>
        <Typography.Text
          style={{
            width: "100%",
            color: "var(--base-fg-color-base-fg-70, #37373E)",
            fontSize: 20,
            fontFamily: "Noto Sans KR",
            fontWeight: "500",
            wordWrap: "break-word",
          }}
        >
          베리 뉴 티볼리 1.5 터보 가솔린 2WD V3 스페셜
        </Typography.Text>

        <Flex gap={12}>
          <Typography.Text>2022년형</Typography.Text>
          <div>.</div>
          <Typography.Text>1,023,232km</Typography.Text>
          <div>.</div>
          <Typography.Text>가솔린</Typography.Text>
        </Flex>
      </Flex>

      <Flex
        justify="space-between"
        style={{
          padding: "12px 16px",
          background: "var(--base-bg-color-base-bg-5, #F9F9F9)",
        }}
      >
        <div
          style={{
            color: "var(--base-fg-color-base-fg-60, #4A4A50)",
            fontSize: 14,
            fontFamily: "Noto Sans KR",
            fontWeight: "400",
            wordWrap: "break-word",
          }}
        >
          신차가
        </div>
        <Typography.Text
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--base-fg-color-base-fg-50, #666670)",
          }}
        >
          25,600,000원 <span style={{ color: "rgb(99, 100, 250)" }}>(10%)</span>
        </Typography.Text>
      </Flex>

      <Flex justify="space-between">
        <div
          style={{
            color: "var(--base-fg-color-base-fg-50, #666670)",
            fontSize: 16,
            fontFamily: "Noto Sans KR",
            fontWeight: "700",
            wordWrap: "break-word",
          }}
        >
          총 합계
        </div>
        <Typography.Text
          style={{
            color: "var(--primary-fg-color-primary-fg-90, #3A3851)",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          23,040,000원
        </Typography.Text>
      </Flex>

      <Button
        style={{
          width: "100%",
          height: 48,
          borderColor: "#2F2C4D",
          background: "#2F2C4D",
          color: "white",
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "700",
          wordWrap: "break-word",
        }}
      >
        구매하기
      </Button>

      <Flex justify="flex-end" style={{}}>
        <Image
          style={{ padding: "6px", cursor: "pointer" }}
          src={
            isCompare
              ? "/images/CompareIconFilled.svg"
              : "/images/CompareIcon.svg"
          }
          alt="CompareIcon"
          preview={false}
          onClick={() => toggleCompare.mutate(1)} //vehicle.id
        />

        <Image
          style={{ padding: "6px", cursor: "pointer" }}
          src={
            isFavorite
              ? "/images/FavoriteIconFilled.svg"
              : "/images/FavoriteIcon.svg"
          }
          alt="FavoriteIcon"
          preview={false}
          onClick={() => toggleFavorite.mutate(1)} //vehicle.id
        />
      </Flex>
    </Flex>
  );
};

export default PriceInfo;
