import { InteriorColor } from "@/enums/interior-color.enum";

export const INTERIOR_COLOR_OPTIONS: {
  key: InteriorColor;
  label: string;
  swatchColor: string;
}[] = [
  { key: InteriorColor.BLACK_SERIES, label: "검정색 계열", swatchColor: "rgb(0, 0, 0)" },
  { key: InteriorColor.BROWN_SERIES, label: "갈색 계열", swatchColor: "rgb(223, 164, 110)" },
  { key: InteriorColor.BEIGE_SERIES, label: "베이지색 계열", swatchColor: "rgb(239, 204, 151)" },
  { key: InteriorColor.GRAY_SERIES, label: "회색 계열", swatchColor: "rgb(204, 204, 204)" },
  { key: InteriorColor.RED_SERIES, label: "빨간색 계열", swatchColor: "rgb(215, 46, 54)" },
  { key: InteriorColor.BLUE_SERIES, label: "청색 계열", swatchColor: "rgb(27, 53, 155)" },
  { key: InteriorColor.WHITE_SERIES, label: "흰색 계열", swatchColor: "rgb(233, 233, 233)" },
  { key: InteriorColor.ORANGE_SERIES, label: "녹색 계열", swatchColor: "rgb(26, 157, 78)" },
  { key: InteriorColor.YELLOW_SERIES, label: "주황색 계열", swatchColor: "rgb(239, 98, 37)" },
  { key: InteriorColor.YELLOW_SERIES, label: "노란색 계열", swatchColor: "rgb(244, 196, 62)" },
];
