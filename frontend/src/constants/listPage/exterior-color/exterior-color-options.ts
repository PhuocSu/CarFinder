import ExteriorColor from "@/enums/exterior-color.enum";

export const EXTERIOR_COLOR_OPTIONS: {
  key: ExteriorColor;
  label: string;
  swatchColor: string;
}[] = [
  { key: ExteriorColor.WHITE, label: "흰색", swatchColor: "rgb(255, 255, 255)" },
  { key: ExteriorColor.BLACK, label: "검정색", swatchColor: "rgb(0, 0, 0)" },
  { key: ExteriorColor.MOUSE_GRAY, label: "쥐색", swatchColor: "rgb(86, 86, 86)" },
  { key: ExteriorColor.BLUE, label: "청색", swatchColor: "rgb(0, 0, 255)" },
  { key: ExteriorColor.SILVER, label: "은색", swatchColor: "rgb(225, 225, 225)" },
  { key: ExteriorColor.SILVER_GRAY, label: "은회색", swatchColor: "rgb(33, 59, 115)" },
  { key: ExteriorColor.PEARL, label: "진주색", swatchColor: "rgb(255, 250, 250)" },
  { key: ExteriorColor.RED, label: "빨간색", swatchColor: "rgb(255, 0, 0)" },
  { key: ExteriorColor.YELLOW, label: "노란색", swatchColor: "rgb(255, 255, 0)" },
  { key: ExteriorColor.GREEN, label: "녹색", swatchColor: "rgb(0, 255, 0)" },
];
