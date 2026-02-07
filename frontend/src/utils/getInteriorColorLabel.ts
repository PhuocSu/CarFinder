import { INTERIOR_COLOR_OPTIONS } from "@/constants/listPage/interior-color/interior-color-options";
import { InteriorColor } from "@/enums/interior-color.enum";

export const getInteriorColorLabel = (color: InteriorColor) => {
  const colorOption = INTERIOR_COLOR_OPTIONS.find((option) => option.key === color);
  return colorOption ? colorOption.label : color;
};