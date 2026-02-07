import { EXTERIOR_COLOR_OPTIONS } from "@/constants/listPage/exterior-color/exterior-color-options";
import ExteriorColor from "@/enums/exterior-color.enum";

export const getExteriorColorLabel = (color: ExteriorColor) => {
  const colorOption = EXTERIOR_COLOR_OPTIONS.find(
    (option) => option.key === color,
  );
  return colorOption ? colorOption.label : color;
};
