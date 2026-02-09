import { EXTERIOR_COLOR_OPTIONS } from "@/constants/listPage/exterior-color/exterior-color-options";
import ExteriorColor from "@/enums/exterior-color.enum";
import FuelType from "@/enums/fuel.enum";
import { getExteriorColorLabel } from "./getExteriorColorLabel";
import { getInteriorColorLabel } from "./getInteriorColorLabel";
import { InteriorColor } from "@/enums/interior-color.enum";

// formatSearchFilter.ts
type SubModelLookup = {
  id: number;
  subModelName: string;
};

type ModelLookup = {
  id: number;
  modelName: string;
  subModels?: SubModelLookup[];
};

type BadgeOption = {
  key: string;
  label: string;
};

type FormatSearchFilterOptions = {
  models?: ModelLookup[];
  badgeOptions?: BadgeOption[];
  separator?: string;
  subSeparator?: string;
};

export type SearchFilterToken = {
  text: string;
  bold?: boolean;
};

const buildBadgeLabelMap = (badgeOptions?: BadgeOption[]) => {
  if (!badgeOptions || badgeOptions.length === 0) return undefined;
  return badgeOptions.reduce<Record<string, string>>((acc, option) => {
    acc[option.key] = option.label;
    return acc;
  }, {});
};

const mapIdsToNames = (
  ids: number[] | undefined,
  lookup: Record<number, string> | undefined,
) => {
  if (!ids || ids.length === 0) return [];
  return ids.map((id) => lookup?.[id] ?? id.toString());
};

const pushTokenWithSeparator = (
  tokens: SearchFilterToken[],
  text: string,
  separator: string,
  bold = false,
) => {
  if (tokens.length > 0) tokens.push({ text: separator });
  tokens.push({ text, bold });
};

const tokensToString = (tokens: SearchFilterToken[]) =>
  tokens.map((t) => t.text).join("");

export const formatSearchFilter = (
  filters: any,
  options: FormatSearchFilterOptions = {},
) => {
  return tokensToString(formatSearchFilterTokens(filters, options));
};

export const formatSearchFilterTokens = (
  filters: any,
  options: FormatSearchFilterOptions = {},
) => {
  const separator = options.separator ?? " | ";
  const subSeparator = options.subSeparator ?? " - ";
  const tokens: SearchFilterToken[] = [];

  const modelMap = options.models?.reduce<Record<number, ModelLookup>>(
    (acc, m) => {
      acc[m.id] = m;
      return acc;
    },
    {},
  );
  const subModelMap = options.models?.reduce<Record<number, string>>(
    (acc, m) => {
      m.subModels?.forEach((s) => {
        acc[s.id] = s.subModelName;
      });
      return acc;
    },
    {},
  );
  const badgeLabelMap = buildBadgeLabelMap(options.badgeOptions);

  if (filters.modelIds && filters.modelIds.length > 0) {
    const modelParts = filters.modelIds.map((modelId: number) => {
      const model = modelMap?.[modelId];
      const modelName = model?.modelName ?? modelId.toString();

      if (
        filters.subModelIds &&
        filters.subModelIds.length > 0 &&
        model?.subModels
      ) {
        const subNames = model.subModels
          .filter((s) => filters.subModelIds.includes(s.id))
          .map((s) => s.subModelName);
        if (subNames.length > 0) {
          return { modelName, subNames };
        }
      }
      return { modelName, subNames: [] as string[] };
    });

    modelParts.forEach((entry: any, index: number) => {
      if (index > 0) tokens.push({ text: subSeparator });
      tokens.push({ text: entry.modelName, bold: true });
      if (entry.subNames.length > 0) {
        tokens.push({ text: subSeparator });
        tokens.push({ text: entry.subNames.join(subSeparator) });
      }
    });
  } else if (filters.subModelIds && filters.subModelIds.length > 0) {
    const subNames = mapIdsToNames(filters.subModelIds, subModelMap);
    if (subNames.length > 0) {
      pushTokenWithSeparator(tokens, subNames.join(subSeparator), separator);
    }
  }

  if (filters.badges && filters.badges.length > 0) {
    const badgeLabels = filters.badges.map(
      (badge: string) => badgeLabelMap?.[badge] ?? badge,
    );
    pushTokenWithSeparator(tokens, badgeLabels.join(subSeparator), separator);
  }

  if (filters.yearMin && filters.yearMax) {
    pushTokenWithSeparator(
      tokens,
      `${filters.yearMin.toLocaleString()} - ${filters.yearMax.toLocaleString()}`,
      separator,
    );
  }

  if (filters.priceMin && filters.priceMax) {
    pushTokenWithSeparator(
      tokens,
      `${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}`,
      separator,
    );
  }

  if (filters.mileageMin && filters.mileageMax) {
    pushTokenWithSeparator(tokens, `${filters.mileageMin.toLocaleString()} - ${filters.mileageMax.toLocaleString()}`, separator);
  }

  const fuelTypesRaw = filters.fuelTypes ?? filters.fuelType;
  const fuelTypes = Array.isArray(fuelTypesRaw)
    ? fuelTypesRaw
    : fuelTypesRaw
      ? [fuelTypesRaw]
      : [];

  if (fuelTypes.length > 0) {
    const fuelTypeLabels = fuelTypes.map(fuelType => {
      // Convert string to enum key
      const enumKey = fuelType.toUpperCase() as keyof typeof FuelType;
      return FuelType[enumKey] || fuelType; // Fallback to original if not found
    });
    pushTokenWithSeparator(tokens, fuelTypeLabels.join(subSeparator), separator);
  }

  if (filters.exColors && filters.exColors.length > 0) {
    const exColorLabels = filters.exColors.map((color: ExteriorColor) => {
      return getExteriorColorLabel(color); 
    });

    pushTokenWithSeparator(
      tokens,
      exColorLabels.join(subSeparator),
      separator,
    );
  }
  if (filters.inColors && filters.inColors.length > 0) {
    const inColorLabels = filters.inColors.map((color: InteriorColor) => {
      return getInteriorColorLabel(color); 
    });
    pushTokenWithSeparator(
      tokens,
      inColorLabels.join(subSeparator),
      separator,
    );
  }

  return tokens;
};
